import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

export default function RatingCard({ rating, onViewProfile }) {
  return (
    <View style={styles.ratingCard}>
      <View style={styles.ratingHeader}>
        <TouchableOpacity onPress={() => onViewProfile && onViewProfile(rating.userId)}>
          <Text style={styles.ratingUser}>{rating.usuario}</Text>
        </TouchableOpacity>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Text key={s} style={styles.star}>
              {s <= rating.score ? '⭐' : '☆'}
            </Text>
          ))}
        </View>
      </View>
      {rating.comment && (
        <Text style={styles.ratingComment}>{rating.comment}</Text>
      )}
      <Text style={styles.ratingDate}>
        {new Date(rating.createdAt).toLocaleDateString('es-ES')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingUser: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
  },
  ratingComment: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 24,
  },
  ratingDate: {
    fontSize: 13,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});
