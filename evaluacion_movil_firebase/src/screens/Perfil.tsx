import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { auth, database } from '../config/firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS } from '../constants/theme'; 

export default function Perfil() {
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const [nombre, setNombre] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
  const [carnet, setCarnet] = useState<string>('');
  const [fotoUrl, setFotoUrl] = useState<string>('');

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const docRef = doc(database, 'usuarios', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || '');
          setFechaNacimiento(data.fechaNacimiento || '');
          setCarnet(data.carnet || '');
          setFotoUrl(data.fotoUrl || '');
        } else {
          Alert.alert('Aviso', 'No se encontraron datos registrados para este usuario');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    if (!userId) return;
    if (!nombre.trim() || !fechaNacimiento.trim() || !carnet.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena los datos de nombre, fecha y carnet');
      return;
    }

    setUpdating(true);
    try {
      const docRef = doc(database, 'usuarios', userId);
      await updateDoc(docRef, {
        nombre,
        fechaNacimiento,
        carnet,
        fotoUrl,
      });

      Alert.alert('Éxito', 'Informacion actualizada correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la informacion en Firestore.');
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un problema al cerrar sesion.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Text style={styles.title}>Perfil de Usuario</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: fotoUrl || 'https://unsplash.com/es/s/fotos/perfil' }}
            style={styles.profileImage}
          />
        </View>

        <Input
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <Input
          placeholder="Fecha de nacimiento (DD/MM/AAAA)"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />

        <Input
          placeholder="Carnet institucional"
          value={carnet}
          onChangeText={setCarnet}
        />

        <Input
          placeholder="URL Imagen de perfil"
          value={fotoUrl}
          onChangeText={setFotoUrl}
        />

        <View style={styles.buttonSpacing}>
          <Button
            title={updating ? 'Guardando...' : 'Actualizar Perfil'}
            onPress={handleUpdate}
          />
        </View>

        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.textPrimary,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.border,
  },
  buttonSpacing: {
    marginBottom: 10,
    marginTop: 10,
  },
});