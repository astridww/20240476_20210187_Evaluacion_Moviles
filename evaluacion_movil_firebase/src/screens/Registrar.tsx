import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { saveUser } from '../hooks/useAddUser';

export default function Registrar({ navigation }: any) {
  const { register, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [busy, setBusy] = useState(false);

  const handleRegister = async () => {
    if (busy) return;
    if (!email || !password || !nombre || !fechaNacimiento || !carnet || !imagenUrl) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setBusy(true);
    const uid = await register(email, password);

    if (uid) {
      const saved = await saveUser(uid, {
        email: email.trim(),
        nombre: nombre.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        carnet: carnet.trim(),
        imagenUrl: imagenUrl.trim(),
      });

      if (saved) {
        Alert.alert('Éxito', 'Cuenta creada correctamente');
      }
    }
    setBusy(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear cuenta</Text>

        {imagenUrl ? (
          <Image
            source={{ uri: imagenUrl }}
            style={styles.avatar}
            onError={() => {}}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>Foto</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Carnet institucional</Text>
          <TextInput
            style={styles.input}
            placeholder="20210187"
            value={carnet}
            onChangeText={setCarnet}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>URL de imagen</Text>
          <TextInput
            style={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
            autoCapitalize="none"
            value={imagenUrl}
            onChangeText={setImagenUrl}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={busy}
        >
          {busy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Entra</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#999',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0288d1',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#0288d1',
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});
