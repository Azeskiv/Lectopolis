import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { login, register, setAuthToken } from '../services/api';
import { loginStyles as styles } from '../styles/loginStyles';
import GlobalView from '../components/GlobalView';

export default function LoginScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const response = await login(username, password);
        setAuthToken(response.token);
        Alert.alert('¡Éxito!', 'Has iniciado sesión correctamente');
        onLogin({ 
          id: response.userId, 
          username: response.username,
          preferredLanguages: response.preferredLanguages || 'es',
          profilePicture: response.profilePicture,
          bio: response.bio
        });
      } else {
        await register(username, password);
        Alert.alert('¡Éxito!', 'Usuario registrado. Ahora puedes iniciar sesión');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Algo salió mal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalView hideHeader>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>📚 Lectopolis</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Inicia sesión' : 'Crea tu cuenta'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GlobalView>
  );
}
