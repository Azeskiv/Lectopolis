import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

export default function Header({ 
  title, 
  subtitle, 
  onBack, 
  rightComponent,
  onTitlePress 
}) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onTitlePress}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </TouchableOpacity>
      )}
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
