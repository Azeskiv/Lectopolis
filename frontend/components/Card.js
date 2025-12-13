import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Card({ children, style, leftAccent, onPress }) {
  const Container = onPress ? TouchableOpacity : View;

  const accentStyle = leftAccent
    ? { borderLeftWidth: 6, borderLeftColor: leftAccent }
    : null;

  return (
    <Container style={[styles.card, accentStyle, style]} onPress={onPress}>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    // elevation for Android
    elevation: 2,
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
});
