import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getBookRatings, createRating, updateRating, deleteRating } from '../services/api';
import RatingCard from '../components/RatingCard';
import GlobalView from '../components/GlobalView';
import Card from '../components/Card';
import { commonStyles, colors } from '../styles/commonStyles';
import styles from '../styles/bookDetailStyles';

export default function BookDetailScreen({ book, user, onBack, onViewProfile }) {
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
    <GlobalView title={book.titulo} onBack={onBack} loading={loading}>
      {/* Book Info */}
      <Card style={styles.bookContainer} leftAccent={colors.primary}>
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
        </Card>

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
            <Card style={styles.userRatingCard}>
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
            </Card>
          ) : (
            <Card style={styles.ratingForm}>
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
            </Card>
          )}
        </View>

        {/* All Ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todas las valoraciones ({ratings.length})</Text>
          {ratings.length === 0 ? (
            <Text style={styles.noRatings}>
              Aún no hay valoraciones para este libro
            </Text>
          ) : (
            ratings.map((rating) => (
              <RatingCard 
                key={rating.id} 
                rating={rating} 
                onViewProfile={onViewProfile}
              />
            ))
          )}
        </View>
      { /* end children for GlobalView */ }
    </GlobalView>
  );
}

