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

export default function HomeScreen({ user, onLogout, onSelectBook }) {
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
