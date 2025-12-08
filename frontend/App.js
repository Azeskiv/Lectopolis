import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import { clearAuthToken } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuthToken(); // Limpiar token al cerrar sesión
    setUser(null);
    setSelectedBook(null);
    setShowRecommendations(false);
  };

  const handleSelectBook = (book) => {
    setShowRecommendations(false);
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  const handleShowRecommendations = () => {
    setSelectedBook(null);
    setShowRecommendations(true);
  };

  const handleBackFromRecommendations = () => {
    setShowRecommendations(false);
  };

  // Si no hay usuario, mostrar login
  if (!user) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <StatusBar style="auto" />
      </>
    );
  }

  // Si se están mostrando recomendaciones
  if (showRecommendations) {
    return (
      <>
        <RecommendationsScreen
          user={user}
          onBack={handleBackFromRecommendations}
          onSelectBook={handleSelectBook}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Si hay un libro seleccionado, mostrar detalles
  if (selectedBook) {
    return (
      <>
        <BookDetailScreen
          book={selectedBook}
          user={user}
          onBack={handleBack}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Mostrar pantalla principal
  return (
    <>
      <HomeScreen
        user={user}
        onLogout={handleLogout}
        onSelectBook={handleSelectBook}
        onShowRecommendations={handleShowRecommendations}
      />
      <StatusBar style="light" />
    </>
  );
}
