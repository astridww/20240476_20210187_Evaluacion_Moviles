// components/CustomCard.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface CustomCardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function CustomCard({ children, style }: CustomCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
});