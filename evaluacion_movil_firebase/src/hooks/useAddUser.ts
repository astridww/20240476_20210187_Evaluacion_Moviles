import { doc, setDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

export async function saveUser(uid: string, data: {
  email: string;
  nombre: string;
  fechaNacimiento: string;
  carnet: string;
  imagenUrl: string;
}): Promise<boolean> {
  try {
    await setDoc(doc(database, 'usuarios', uid), data);
    return true;
  } catch (e) {
    console.error('Error guardando usuario:', e);
    return false;
  }
}
