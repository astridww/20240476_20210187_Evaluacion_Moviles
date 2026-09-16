import { useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al iniciar sesión';
      setError(msg);
      console.error('Login error:', e);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<string | null> => {
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      return credential.user.uid;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al registrarse';
      setError(msg);
      console.error('Register error:', e);
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return { user, loading, error, login, register, logout };
}
