import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { login, register, setAuthToken } from '../services/api';

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
        // Guardar el token para peticiones autenticadas
        setAuthToken(response.token);
        Alert.alert('¡Éxito!', 'Has iniciado sesión correctamente');
        onLogin({ id: response.userId, username: response.username });
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8', // Beige cálido tipo papel antiguo
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#8B4513', // Marrón cálido
    textShadowColor: 'rgba(139, 69, 19, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    color: '#A0826D',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 17,
    borderWidth: 2,
    borderColor: '#D4AF37', // Dorado suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#C8B69D',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchText: {
    textAlign: 'center',
    color: '#8B4513',
    marginTop: 25,
    fontSize: 16,
    fontWeight: '500',
  },
});
