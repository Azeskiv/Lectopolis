import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getUserProfile } from '../services/api';

export default function ProfileScreen({ userId, currentUser, onBack, onSelectBook, onEditProfile }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState({});

  const isOwnProfile = currentUser && currentUser.id === userId;

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile(userId);
      setProfile(data);
      
      // Cargar detalles de libros para las valoraciones
      loadBooksDetails(data.ratings);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el perfil');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBooksDetails = async (ratings) => {
    const details = {};
    for (const rating of ratings) {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${rating.bookId}`);
        if (response.ok) {
          const data = await response.json();
          details[rating.bookId] = {
            titulo: data.volumeInfo.title || 'Sin título',
            autores: data.volumeInfo.authors?.join(', ') || 'Autor desconocido',
            portada: data.volumeInfo.imageLinks?.thumbnail || null,
          };
        }
      } catch (error) {
        console.error(`Error loading book ${rating.bookId}:`, error);
      }
    }
    setBookDetails(details);
  };

  const renderStars = (score) => {
    return '⭐'.repeat(score) + '☆'.repeat(5 - score);
  };

  const handleBookPress = (bookId) => {
    const book = bookDetails[bookId];
    if (book) {
      onSelectBook({
        id: bookId,
        titulo: book.titulo,
        autores: book.autores,
        portada: book.portada,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😕</Text>
          <Text style={styles.emptyTitle}>Usuario no encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Perfil Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {profile.profilePicture ? (
                <Text style={styles.avatarEmoji}>{profile.profilePicture}</Text>
              ) : (
                <Text style={styles.avatarEmoji}>👤</Text>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{profile.username}</Text>
              <Text style={styles.statsText}>
                📚 {profile.ratingsCount} valoracion{profile.ratingsCount !== 1 ? 'es' : ''}
              </Text>
            </View>
          </View>

          {profile.bio && (
            <View style={styles.bioContainer}>
              <Text style={styles.bioLabel}>Sobre mí:</Text>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          )}

          {isOwnProfile && (
            <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
              <Text style={styles.editButtonText}>✏️ Editar perfil</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Valoraciones */}
        <View style={styles.ratingsSection}>
          <Text style={styles.sectionTitle}>Valoraciones de {profile.username}</Text>
          
          {profile.ratings && profile.ratings.length > 0 ? (
            profile.ratings.map((rating) => {
              const book = bookDetails[rating.bookId];
              return (
                <TouchableOpacity
                  key={rating.id}
                  style={styles.ratingCard}
                  onPress={() => handleBookPress(rating.bookId)}
                >
                  {book && book.portada && (
                    <Image source={{ uri: book.portada }} style={styles.bookCover} />
                  )}
                  <View style={styles.ratingContent}>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {book?.titulo || 'Cargando...'}
                    </Text>
                    <Text style={styles.bookAuthor} numberOfLines={1}>
                      {book?.autores || ''}
                    </Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.stars}>{renderStars(rating.score)}</Text>
                    </View>
                    {rating.comment && (
                      <Text style={styles.comment} numberOfLines={3}>
                        "{rating.comment}"
                      </Text>
                    )}
                    <Text style={styles.date}>
                      {new Date(rating.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyRatings}>
              <Text style={styles.emptyRatingsEmoji}>📖</Text>
              <Text style={styles.emptyRatingsText}>
                {isOwnProfile 
                  ? 'Aún no has valorado ningún libro' 
                  : 'Este usuario aún no ha valorado libros'}
              </Text>
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#8B4513',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 5,
  },
  statsText: {
    fontSize: 15,
    color: '#8B6F47',
  },
  bioContainer: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  bioLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    color: '#5A4A3A',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ratingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#E8DCC4',
  },
  ratingContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#8B6F47',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  scoreContainer: {
    marginBottom: 8,
  },
  stars: {
    fontSize: 16,
  },
  comment: {
    fontSize: 13,
    color: '#5A4A3A',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    color: '#A0826D',
  },
  emptyRatings: {
    padding: 40,
    alignItems: 'center',
  },
  emptyRatingsEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyRatingsText: {
    fontSize: 15,
    color: '#A0826D',
    textAlign: 'center',
  },
});
