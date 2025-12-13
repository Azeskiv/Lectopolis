import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Badge({ children, style, variant = 'neutral' }) {
  const variantStyle = variant === 'primary' ? styles.primary : styles.neutral;

  return (
    <View style={[styles.badge, variantStyle, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    color: '#222',
  },
  neutral: {
    backgroundColor: '#eee',
  },
  primary: {
    backgroundColor: '#ffd966',
  },
});
