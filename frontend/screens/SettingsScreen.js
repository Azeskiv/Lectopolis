import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getLanguagePreferences, updateLanguagePreferences } from '../services/api';
import styles from '../styles/settingsStyles';
import GlobalView from '../components/GlobalView';
import PrimaryButton from '../components/PrimaryButton';

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

export default function SettingsScreen({ user, onBack, onLanguagesUpdated }) {
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
      
      // Notificar al componente padre que los idiomas fueron actualizados
      if (onLanguagesUpdated) {
        onLanguagesUpdated(languagesString);
      }
      
      Alert.alert('Éxito', 'Preferencias de idioma guardadas correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar las preferencias');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlobalView title={'⚙️ Configuración de Idiomas'} subtitle={'Selecciona los idiomas en los que quieres buscar libros'} onBack={onBack} loading={loading}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>⚙️ Configuración de Idiomas</Text>
        <Text style={styles.subtitle}>
          Selecciona los idiomas en los que quieres buscar libros
        </Text>
      </View>

      {!loading && (
        <>
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

          <PrimaryButton onPress={handleSave} loading={saving}>
            💾 Guardar preferencias
          </PrimaryButton>
        </>
      )}
    </GlobalView>
  );
}

// styles are now imported from ../styles/settingsStyles
