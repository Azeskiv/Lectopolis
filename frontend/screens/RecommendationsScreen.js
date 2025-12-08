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
import { getRecommendations } from '../services/api';

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
    // Convertir formato de recomendación a formato de libro para BookDetailScreen
    const bookData = {
      id: book.id,
      titulo: book.titulo,
      autores: book.autor,
      portada: book.portada,
      sinopsis: book.razon // Usar la razón como descripción inicial
    };
    onSelectBook(bookData);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>✨ Recomendaciones para ti</Text>
        <Text style={styles.subtitle}>
          Basadas en tus valoraciones y gustos personales
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>
            Analizando tus gustos con IA...
          </Text>
        </View>
      ) : message ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={styles.emptyTitle}>¡Empieza a valorar!</Text>
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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
        </ScrollView>
      )}
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
  titleContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DCC4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#A0826D',
    textAlign: 'center',
    fontStyle: 'italic',
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
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#A0826D',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  bookCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#E8DCC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 40,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
  },
  badgeContainer: {
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 6,
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#8B6F47',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  reasonContainer: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 13,
    color: '#5A4A3A',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  reloadButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderStyle: 'dashed',
  },
  reloadButtonText: {
    color: '#8B4513',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#A0826D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
