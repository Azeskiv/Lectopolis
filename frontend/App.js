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
    clearAuthToken();
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

  if (!user) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <StatusBar style="auto" />
      </>
    );
  }

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

  if (showSettings) {
    return (
      <>
        <SettingsScreen
          user={user}
          onBack={handleBackFromSettings}
          onLanguagesUpdated={(languages) => setUser({...user, preferredLanguages: languages})}
        />
        <StatusBar style="light" />
      </>
    );
  }

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
