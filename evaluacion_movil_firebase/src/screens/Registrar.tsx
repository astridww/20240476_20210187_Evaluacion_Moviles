import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { saveUser } from '../hooks/useAddUser';
import { COLORS } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

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
        <Card>
          <Text style={styles.title}>Crear cuenta</Text>

          {imagenUrl ? (
            <Image source={{ uri: imagenUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>Foto</Text>
            </View>
          )}

          <Input
            label="Correo"
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            label="Nombre completo"
            placeholder="Juan Pérez"
            value={nombre}
            onChangeText={setNombre}
          />
          <Input
            label="Fecha de nacimiento"
            placeholder="DD/MM/AAAA"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
          />
          <Input
            label="Carnet institucional"
            placeholder="20210187"
            value={carnet}
            onChangeText={setCarnet}
          />
          <Input
            label="URL de imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={imagenUrl}
            onChangeText={setImagenUrl}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={busy}
          />
        </Card>

        <Button
          title="¿Ya tienes cuenta? Entra"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 8,
  },
});
