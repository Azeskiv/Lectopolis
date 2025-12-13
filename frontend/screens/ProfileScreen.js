import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getUserProfile } from '../services/api';
import { profileStyles as styles } from '../styles/profileStyles';
import GlobalView from '../components/GlobalView';
import EmptyState from '../components/EmptyState';

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
      loadBooksDetails(data.ratings);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el perfil');
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
        // Error silenciado
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
    return <GlobalView onBack={onBack} loading={true} />;
  }

  if (!profile) {
    return (
      <GlobalView onBack={onBack}>
        <EmptyState emoji="😕" title="Usuario no encontrado" />
      </GlobalView>
    );
  }

  return (
    <GlobalView title={profile.username} onBack={onBack}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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
    </GlobalView>
  );
}
