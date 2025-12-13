import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

export const loginStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 48, fontWeight: '700', textAlign: 'center', marginBottom: 8, color: colors.primary, textShadowColor: 'rgba(139,69,19,0.1)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 50, color: colors.textLight, fontStyle: 'italic' },
  input: { backgroundColor: colors.white, padding: 18, borderRadius: 12, marginBottom: 18, fontSize: 17, borderWidth: 2, borderColor: colors.secondary, ...fragments.shadows.small },
  button: { ...fragments.buttonPrimary, padding: 18, borderRadius: 12, marginTop: 15 },
  buttonDisabled: { backgroundColor: colors.beige },
  buttonText: { color: colors.white, fontSize: 19, fontWeight: '700', letterSpacing: 0.5 },
  switchText: { textAlign: 'center', color: colors.primary, marginTop: 25, fontSize: 16, fontWeight: '500' },
});
