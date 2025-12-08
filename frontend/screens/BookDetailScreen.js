import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getBookRatings, createRating, updateRating, deleteRating } from '../services/api';

export default function BookDetailScreen({ book, user, onBack }) {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [editingRating, setEditingRating] = useState(null);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      const data = await getBookRatings(book.id);
      setRatings(data.valoraciones || []);
      setAverage(data.promedio || 0);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las valoraciones');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (score === 0) {
      Alert.alert('Error', 'Por favor selecciona una puntuación');
      return;
    }

    try {
      if (editingRating) {
        await updateRating(editingRating.id, score, comment);
        Alert.alert('¡Éxito!', 'Valoración actualizada');
        setEditingRating(null);
      } else {
        await createRating(book.id, user.id, score, comment);
        Alert.alert('¡Éxito!', 'Valoración publicada');
      }
      setScore(0);
      setComment('');
      await loadRatings();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar esta valoración?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRating(ratingId);
              Alert.alert('Eliminado', 'Valoración eliminada');
              await loadRatings();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar');
            }
          },
        },
      ]
    );
  };

  const handleEditRating = (rating) => {
    setEditingRating(rating);
    setScore(rating.score);
    setComment(rating.comment || '');
  };

  const userRating = ratings.find((r) => r.usuario === user.username);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>

        {/* Book Info */}
        <View style={styles.bookContainer}>
          <Image
            source={{ uri: book.portada || 'https://via.placeholder.com/150x220' }}
            style={styles.bookImage}
          />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.titulo}</Text>
            <Text style={styles.bookAuthor}>{book.autores}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.averageText}>
                {average > 0 ? average.toFixed(1) : 'Sin valorar'}
              </Text>
              <Text style={styles.ratingCount}>({ratings.length})</Text>
            </View>
          </View>
        </View>

        {/* Synopsis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.synopsis}>{book.sinopsis}</Text>
        </View>

        {/* Rating Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {userRating && !editingRating ? 'Tu valoración' : 'Valora este libro'}
          </Text>

          {userRating && !editingRating ? (
            <View style={styles.userRatingCard}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Text key={s} style={styles.starDisplay}>
                    {s <= userRating.score ? '⭐' : '☆'}
                  </Text>
                ))}
              </View>
              {userRating.comment && (
                <Text style={styles.userComment}>{userRating.comment}</Text>
              )}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  onPress={() => handleEditRating(userRating)}
                  style={styles.editButton}
                >
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteRating(userRating.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.ratingForm}>
              <Text style={styles.label}>Puntuación</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <TouchableOpacity key={s} onPress={() => setScore(s)}>
                    <Text style={styles.starButton}>
                      {s <= score ? '⭐' : '☆'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Comentario (opcional)</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Comparte tu opinión..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitRating}
              >
                <Text style={styles.submitButtonText}>
                  {editingRating ? 'Actualizar' : 'Publicar valoración'}
                </Text>
              </TouchableOpacity>

              {editingRating && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setEditingRating(null);
                    setScore(0);
                    setComment('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* All Ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todas las valoraciones ({ratings.length})</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : ratings.length === 0 ? (
            <Text style={styles.noRatings}>
              Aún no hay valoraciones para este libro
            </Text>
          ) : (
            ratings.map((rating) => (
              <View key={rating.id} style={styles.ratingCard}>
                <View style={styles.ratingHeader}>
                  <Text style={styles.ratingUser}>{rating.usuario}</Text>
                  <View style={styles.starsRowSmall}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Text key={s} style={styles.starSmall}>
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
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8',
  },
  header: {
    backgroundColor: '#8B4513',
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 25,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  bookImage: {
    width: 130,
    height: 195,
    borderRadius: 10,
    backgroundColor: '#E8DCC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4A3728',
    lineHeight: 28,
  },
  bookAuthor: {
    fontSize: 17,
    color: '#8B6F47',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  star: {
    fontSize: 22,
    marginRight: 6,
  },
  averageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  ratingCount: {
    fontSize: 16,
    color: '#A0826D',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 25,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#8B4513',
    borderBottomWidth: 2,
    borderBottomColor: '#D4AF37',
    paddingBottom: 10,
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 25,
    color: '#5A4A3A',
  },
  ratingForm: {
    marginTop: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    color: '#8B4513',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'center',
  },
  starButton: {
    fontSize: 45,
    marginHorizontal: 3,
  },
  starDisplay: {
    fontSize: 32,
    marginRight: 5,
  },
  commentInput: {
    backgroundColor: '#FFF9E6',
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: '#4A3728',
  },
  submitButton: {
    backgroundColor: '#8B4513',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cancelButton: {
    marginTop: 12,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#8B4513',
    fontSize: 17,
    fontWeight: '600',
  },
  userRatingCard: {
    backgroundColor: '#FFF9E6',
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  userComment: {
    fontSize: 16,
    color: '#5A4A3A',
    marginTop: 12,
    marginBottom: 18,
    lineHeight: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#C44536',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8DCC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#8B4513',
  },
  starsRowSmall: {
    flexDirection: 'row',
  },
  starSmall: {
    fontSize: 16,
  },
  ratingComment: {
    fontSize: 16,
    color: '#5A4A3A',
    marginBottom: 12,
    lineHeight: 24,
  },
  ratingDate: {
    fontSize: 13,
    color: '#A0826D',
    fontStyle: 'italic',
  },
  noRatings: {
    textAlign: 'center',
    color: '#A0826D',
    fontSize: 17,
    padding: 30,
    fontStyle: 'italic',
  },
});
