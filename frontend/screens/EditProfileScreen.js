import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { updateUserProfile } from '../services/api';

const AVATAR_EMOJIS = ['👤', '😊', '🤓', '📚', '✨', '🌟', '💫', '🎭', '🎨', '🎵', '🎬', '🎮', '🐱', '🐶', '🦊', '🦉', '🐼', '🦁', '🐯', '🐻'];

export default function EditProfileScreen({ user, onBack, onProfileUpdated }) {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '👤');
  const [bio, setBio] = useState(user.bio || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUserProfile(user.id, profilePicture, bio);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      onProfileUpdated({ ...user, profilePicture, bio });
      onBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Foto de Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
          <Text style={styles.sectionSubtitle}>Elige un emoji que te represente</Text>
          
          <View style={styles.avatarPreview}>
            <Text style={styles.avatarPreviewEmoji}>{profilePicture}</Text>
          </View>

          <View style={styles.emojiGrid}>
            {AVATAR_EMOJIS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiOption,
                  profilePicture === emoji && styles.emojiOptionSelected
                ]}
                onPress={() => setProfilePicture(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Biografía */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biografía</Text>
          <Text style={styles.sectionSubtitle}>
            Cuéntanos algo sobre ti y tus gustos literarios
          </Text>
          
          <TextInput
            style={styles.bioInput}
            placeholder="Ej: Amante de la ciencia ficción y la fantasía..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            maxLength={200}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{bio.length}/200</Text>
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Guardar cambios</Text>
          )}
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  backButton: {
    width: 80,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#A0826D',
    marginBottom: 20,
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarPreviewEmoji: {
    fontSize: 50,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  emojiOption: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F8F4E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8DCC4',
  },
  emojiOptionSelected: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
    borderWidth: 3,
  },
  emojiText: {
    fontSize: 28,
  },
  bioInput: {
    backgroundColor: '#F8F4E8',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#4A3728',
    borderWidth: 2,
    borderColor: '#E8DCC4',
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: '#A0826D',
    textAlign: 'right',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#8B4513',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
