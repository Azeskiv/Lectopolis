import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getLanguagePreferences, updateLanguagePreferences } from '../services/api';

const EUROPEAN_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'Inglés', flag: '🇬🇧' },
  { code: 'fr', name: 'Francés', flag: '🇫🇷' },
  { code: 'de', name: 'Alemán', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugués', flag: '🇵🇹' },
  { code: 'nl', name: 'Holandés', flag: '🇳🇱' },
  { code: 'pl', name: 'Polaco', flag: '🇵🇱' },
  { code: 'ru', name: 'Ruso', flag: '🇷🇺' },
  { code: 'sv', name: 'Sueco', flag: '🇸🇪' },
  { code: 'no', name: 'Noruego', flag: '🇳🇴' },
  { code: 'da', name: 'Danés', flag: '🇩🇰' },
  { code: 'fi', name: 'Finlandés', flag: '🇫🇮' },
  { code: 'el', name: 'Griego', flag: '🇬🇷' },
  { code: 'cs', name: 'Checo', flag: '🇨🇿' },
  { code: 'ro', name: 'Rumano', flag: '🇷🇴' },
];

export default function SettingsScreen({ user, onBack }) {
  const [selectedLanguages, setSelectedLanguages] = useState(['es']);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const data = await getLanguagePreferences(user.id);
      const languages = data.preferredLanguages.split(',').filter(l => l);
      setSelectedLanguages(languages.length > 0 ? languages : ['es']);
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
      setSelectedLanguages(['es']);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (code) => {
    if (selectedLanguages.includes(code)) {
      // No permitir deseleccionar todos
      if (selectedLanguages.length === 1) {
        Alert.alert('Aviso', 'Debes seleccionar al menos un idioma');
        return;
      }
      setSelectedLanguages(selectedLanguages.filter(l => l !== code));
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const languagesString = selectedLanguages.join(',');
      await updateLanguagePreferences(user.id, languagesString);
      Alert.alert('Éxito', 'Preferencias de idioma guardadas correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar las preferencias');
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
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>⚙️ Configuración de Idiomas</Text>
        <Text style={styles.subtitle}>
          Selecciona los idiomas en los que quieres buscar libros
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Cargando preferencias...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Los libros se buscarán en los idiomas seleccionados.
              Puedes elegir varios.
            </Text>
          </View>

          <View style={styles.languagesContainer}>
            {EUROPEAN_LANGUAGES.map((lang) => {
              const isSelected = selectedLanguages.includes(lang.code);
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.languageCard, isSelected && styles.languageCardSelected]}
                  onPress={() => toggleLanguage(lang.code)}
                >
                  <View style={styles.languageContent}>
                    <Text style={styles.flag}>{lang.flag}</Text>
                    <View style={styles.languageInfo}>
                      <Text style={[styles.languageName, isSelected && styles.languageNameSelected]}>
                        {lang.name}
                      </Text>
                      <Text style={styles.languageCode}>{lang.code.toUpperCase()}</Text>
                    </View>
                  </View>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.selectedInfo}>
            <Text style={styles.selectedCount}>
              {selectedLanguages.length} idioma{selectedLanguages.length !== 1 ? 's' : ''} seleccionado{selectedLanguages.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>💾 Guardar preferencias</Text>
            )}
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  infoBox: {
    backgroundColor: '#FFF9E6',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#5A4A3A',
    lineHeight: 20,
  },
  languagesContainer: {
    gap: 12,
  },
  languageCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8DCC4',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageCardSelected: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFFEF8',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 15,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 4,
  },
  languageNameSelected: {
    color: '#8B4513',
    fontWeight: '700',
  },
  languageCode: {
    fontSize: 12,
    color: '#A0826D',
    fontWeight: '500',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E8DCC4',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxSelected: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedInfo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedCount: {
    fontSize: 15,
    color: '#8B4513',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#8B4513',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
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
