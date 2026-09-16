import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[styles.button, isPrimary ? styles.btnPrimary : styles.btnSecondary]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#0284C7'} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: '#0284C7',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0284C7',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#0284C7',
  },
});