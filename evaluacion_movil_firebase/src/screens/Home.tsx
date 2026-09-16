import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { database } from '../config/firebase';
import { COLORS } from '../constants/theme';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  const { user, logout } = useAuth();
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPerfil = async () => {
      const docSnap = await getDoc(doc(database, 'usuarios', user.uid));
      if (docSnap.exists()) {
        setPerfil(docSnap.data());
      }
      setLoading(false);
    };
    fetchPerfil();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        {perfil?.imagenUrl ? (
          <Image source={{ uri: perfil.imagenUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>Foto</Text>
          </View>
        )}

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{perfil?.nombre || '—'}</Text>

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{user?.email || '—'}</Text>

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <Text style={styles.value}>{perfil?.fechaNacimiento || '—'}</Text>

        <Text style={styles.label}>Carnet</Text>
        <Text style={styles.value}>{perfil?.carnet || '—'}</Text>
      </Card>

      <Button
        title="Cerrar sesión"
        variant="secondary"
        onPress={logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.border,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
});
