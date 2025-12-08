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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    marginRight: 5,
  },
  averageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingCount: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  synopsis: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  ratingForm: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    fontSize: 40,
    marginRight: 5,
  },
  starDisplay: {
    fontSize: 30,
    marginRight: 5,
  },
  commentInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  userRatingCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  userComment: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  ratingCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  starsRowSmall: {
    flexDirection: 'row',
  },
  starSmall: {
    fontSize: 14,
  },
  ratingComment: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },
  ratingDate: {
    fontSize: 12,
    color: '#999',
  },
  noRatings: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    padding: 20,
  },
});
