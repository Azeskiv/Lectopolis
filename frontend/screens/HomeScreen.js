import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { searchBooks, getLanguagePreferences } from '../services/api';
import BookCard from '../components/BookCard';
import GlobalView from '../components/GlobalView';
import { commonStyles } from '../styles/commonStyles';
import { homeStyles as styles } from '../styles/homeStyles';
import EmptyState from '../components/EmptyState';

export default function HomeScreen({ user, onLogout, onSelectBook, onShowRecommendations, onShowSettings, onViewProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLanguages, setUserLanguages] = useState('es');

  useEffect(() => {
    if (user && user.preferredLanguages) {
      setUserLanguages(user.preferredLanguages);
    } else {
      loadUserLanguages();
    }
  }, []);

  const loadUserLanguages = async () => {
    try {
      const data = await getLanguagePreferences(user.id);
      setUserLanguages(data.preferredLanguages || 'es');
    } catch (error) {
      setUserLanguages('es');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    try {
      const results = await searchBooks(searchQuery, userLanguages);
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
    <BookCard book={item} onPress={() => onSelectBook(item)} />
  );

  const headerRightComponent = (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onShowSettings} style={[styles.settingsButton, { marginRight: 8 }]}> 
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GlobalView
      title={'📚 Lectopolis'}
      subtitle={`Hola, ${user.username} 👤`}
      onSubtitlePress={() => onViewProfile(user.id)}
      rightComponent={headerRightComponent}
      useScroll={false}
    >
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

      <TouchableOpacity style={styles.recommendationsButton} onPress={onShowRecommendations}>
        <Text style={styles.recommendationsEmoji}>✨</Text>
        <Text style={styles.recommendationsText}>Recomendaciones personalizadas</Text>
      </TouchableOpacity>

      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <EmptyState emoji="🔍" title="Busca tu libro favorito" subtitle="Usa la barra de búsqueda para encontrar libros" />
      )}
    </GlobalView>
  );
}
