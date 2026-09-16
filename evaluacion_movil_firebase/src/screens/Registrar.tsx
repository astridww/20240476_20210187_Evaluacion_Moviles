import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Registrar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Registro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
