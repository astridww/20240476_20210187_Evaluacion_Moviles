import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Login({ navigation }: any) {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await login(email, password);
    setBusy(false);
    if (!ok) {
      Alert.alert('Error', error || 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Iniciar sesión</Text>

        <Input
          label="Correo"
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
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

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={busy}
        />
      </Card>

      <Button
        title="¿Sin cuenta? Regístrate"
        variant="secondary"
        onPress={() => navigation.navigate('Registrar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 8,
  },
});
