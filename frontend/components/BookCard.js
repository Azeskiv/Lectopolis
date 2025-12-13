import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

export default function BookCard({ book, onPress }) {
  return (
    <TouchableOpacity style={styles.bookCard} onPress={onPress}>
      <Image
        source={{ uri: book.portada || 'https://via.placeholder.com/100x150' }}
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.titulo}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {book.autores}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>
            {book.valoracion?.promedio > 0
              ? book.valoracion.promedio.toFixed(1)
              : 'Sin valorar'}
          </Text>
          <Text style={styles.ratingCount}>
            ({book.valoracion?.total || 0})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  bookAuthor: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    marginRight: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.textLight,
  },
});
