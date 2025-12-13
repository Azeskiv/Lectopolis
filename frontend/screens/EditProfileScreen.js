import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { updateUserProfile } from '../services/api';
import GlobalView from '../components/GlobalView';
import styles from '../styles/editProfileStyles';
import PrimaryButton from '../components/PrimaryButton';

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
      if (onProfileUpdated) onProfileUpdated({ ...user, profilePicture, bio });
      onBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlobalView title="Editar Perfil" onBack={onBack}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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
                  profilePicture === emoji && styles.emojiOptionSelected,
                ]}
                onPress={() => setProfilePicture(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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

        <PrimaryButton onPress={handleSave} loading={saving}>
          💾 Guardar cambios
        </PrimaryButton>
      </ScrollView>
    </GlobalView>
  );
}
