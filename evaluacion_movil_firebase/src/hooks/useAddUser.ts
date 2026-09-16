import { doc, setDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

export type UserData = {
  email: string;
  nombre: string;
  fechaNacimiento: string;
  carnet: string;
  imagenUrl: string;
};

export async function saveUser(uid: string, data: UserData): Promise<boolean> {
  try {
    await setDoc(doc(database, 'usuarios', uid), data);
    console.log('Usuario guardado en Firestore con uid:', uid);
    return true;
  } catch (e) {
    console.error('Error al guardar usuario:', e);
    return false;
  }
}
