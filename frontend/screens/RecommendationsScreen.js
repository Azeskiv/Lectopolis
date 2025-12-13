import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getRecommendations } from '../services/api';
import GlobalView from '../components/GlobalView';
import styles from '../styles/recommendationsStyles';
import EmptyState from '../components/EmptyState';

export default function RecommendationsScreen({ user, onBack, onSelectBook }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const data = await getRecommendations(user.id);
      
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
        setMessage('');
      } else {
        setMessage(data.message || 'No hay recomendaciones disponibles en este momento.');
        setRecommendations([]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las recomendaciones');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book) => {
    const bookData = {
      id: book.id,
      titulo: book.titulo,
      autores: book.autor,
      portada: book.portada,
      sinopsis: book.razon
    };
    onSelectBook(bookData);
  };

  return (
    <GlobalView
      title={'✨ Recomendaciones IA'}
      subtitle={'Basadas en tus valoraciones'}
      onBack={onBack}
      loading={loading}
    >
      {message ? (
        <EmptyState emoji="📚" title="¡Empieza a valorar!" subtitle={message} />
      ) : (
        <>
          {recommendations.map((book, index) => (
            <TouchableOpacity
              key={book.id || index}
              style={styles.bookCard}
              onPress={() => handleBookPress(book)}
            >
              {/* Portada */}
              {book.portada ? (
                <Image source={{ uri: book.portada }} style={styles.bookImage} />
              ) : (
                <View style={[styles.bookImage, styles.noImagePlaceholder]}>
                  <Text style={styles.noImageText}>📖</Text>
                </View>
              )}

              {/* Info del libro */}
              <View style={styles.bookInfo}>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✨ IA</Text>
                  </View>
                </View>

                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.titulo}
                </Text>
                
                <Text style={styles.bookAuthor} numberOfLines={1}>
                  {book.autor}
                </Text>

                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonLabel}>Por qué te puede gustar:</Text>
                  <Text style={styles.reasonText} numberOfLines={3}>
                    {book.razon}
                  </Text>
                </View>

                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Ver detalles →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Botón para recargar */}
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={loadRecommendations}
          >
            <Text style={styles.reloadButtonText}>🔄 Generar nuevas recomendaciones</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              💡 Las recomendaciones mejoran cuanto más valores libros
            </Text>
          </View>
        </>
      )}
    </GlobalView>
  );
}

// styles moved to ../styles/recommendationsStyles
