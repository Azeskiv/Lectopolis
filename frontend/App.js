import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import { clearAuthToken } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [viewingUserId, setViewingUserId] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuthToken(); // Limpiar token al cerrar sesión
    setUser(null);
    setSelectedBook(null);
    setShowRecommendations(false);
    setShowSettings(false);
    setViewingUserId(null);
    setShowEditProfile(false);
  };

  const handleSelectBook = (book) => {
    setShowRecommendations(false);
    setShowSettings(false);
    setViewingUserId(null);
    setShowEditProfile(false);
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  const handleShowRecommendations = () => {
    setSelectedBook(null);
    setShowSettings(false);
    setShowRecommendations(true);
  };

  const handleBackFromRecommendations = () => {
    setShowRecommendations(false);
  };

  const handleShowSettings = () => {
    setSelectedBook(null);
    setShowRecommendations(false);
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const handleViewProfile = (userId) => {
    setSelectedBook(null);
    setShowRecommendations(false);
    setShowSettings(false);
    setShowEditProfile(false);
    setViewingUserId(userId);
  };

  const handleBackFromProfile = () => {
    setViewingUserId(null);
  };

  const handleEditProfile = () => {
    setViewingUserId(null);
    setShowEditProfile(true);
  };

  const handleBackFromEditProfile = () => {
    setShowEditProfile(false);
  };

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
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

  // Si se está mostrando configuración
  if (showSettings) {
    return (
      <>
        <SettingsScreen
          user={user}
          onBack={handleBackFromSettings}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Si se está viendo un perfil
  if (viewingUserId) {
    return (
      <>
        <ProfileScreen
          userId={viewingUserId}
          currentUser={user}
          onBack={handleBackFromProfile}
          onSelectBook={handleSelectBook}
          onEditProfile={handleEditProfile}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Si se está editando perfil
  if (showEditProfile) {
    return (
      <>
        <EditProfileScreen
          user={user}
          onBack={handleBackFromEditProfile}
          onProfileUpdated={handleProfileUpdated}
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
          onViewProfile={handleViewProfile}
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
        onShowSettings={handleShowSettings}
        onViewProfile={handleViewProfile}
      />
      <StatusBar style="light" />
    </>
  );
}
