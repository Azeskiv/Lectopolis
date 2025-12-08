import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { searchBooks } from '../services/api';

export default function HomeScreen({ user, onLogout, onSelectBook, onShowRecommendations }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setBooks(results);
      if (results.length === 0) {
        Alert.alert('Sin resultados', 'No se encontraron libros');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => onSelectBook(item)}
    >
      <Image
        source={{ uri: item.portada || 'https://via.placeholder.com/100x150' }}
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.titulo}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {item.autores}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>
            {item.valoracion.promedio > 0
              ? item.valoracion.promedio.toFixed(1)
              : 'Sin valorar'}
          </Text>
          <Text style={styles.ratingCount}>
            ({item.valoracion.total})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📚 Lectopolis</Text>
          <Text style={styles.headerSubtitle}>Hola, {user.username}</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar libros..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.searchButtonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Botón de Recomendaciones */}
      <TouchableOpacity
        style={styles.recommendationsButton}
        onPress={onShowRecommendations}
      >
        <Text style={styles.recommendationsEmoji}>✨</Text>
        <Text style={styles.recommendationsText}>Recomendaciones personalizadas</Text>
      </TouchableOpacity>

      {/* Results */}
      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🔍</Text>
          <Text style={styles.emptyTitle}>Busca tu libro favorito</Text>
          <Text style={styles.emptySubtitle}>
            Usa la barra de búsqueda para encontrar libros
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8', // Beige biblioteca
  },
  header: {
    backgroundColor: '#8B4513', // Marrón madera
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37', // Borde dorado
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
    marginTop: 5,
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoutText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 18,
    gap: 12,
    backgroundColor: '#FFF9E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DCC4',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    fontSize: 17,
    borderWidth: 2,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 25,
    borderRadius: 12,
    justifyContent: 'center',
    minWidth: 90,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  listContainer: {
    padding: 18,
  },
  bookCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37', // Borde dorado izquierdo
  },
  bookImage: {
    width: 90,
    height: 135,
    borderRadius: 8,
    backgroundColor: '#E8DCC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 18,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4A3728',
    lineHeight: 24,
  },
  bookAuthor: {
    fontSize: 15,
    color: '#8B6F47',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  star: {
    fontSize: 18,
    marginRight: 6,
  },
  rating: {
    fontSize: 17,
    fontWeight: '700',
    color: '#D4AF37',
  },
  ratingCount: {
    fontSize: 14,
    color: '#A0826D',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 17,
    color: '#A0826D',
    textAlign: 'center',
    lineHeight: 24,
  },
  recommendationsButton: {
    backgroundColor: '#D4AF37',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  recommendationsEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  recommendationsText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
