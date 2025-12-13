import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#8B4513',
  secondary: '#D4AF37',
  background: '#F8F4E8',
  cardBackground: '#FFF',
  text: '#2C1810',
  textSecondary: '#5A4A3A',
  textLight: '#A0826D',
  border: '#E8DCC8',
  error: '#D32F2F',
  success: '#388E3C',
  star: '#FFD700',
  white: '#FFFFFF',
  beige: '#E8DCC4',
  mutedBackground: '#FFF9E6',
  danger: '#C44536',
  deepBlue: '#0B5FFF',
  lightBlue: '#60B0FF',
  paleBlue: '#F0F6FB',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.secondary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 2,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

// Lightweight, plain JS fragments you can spread into StyleSheet.create
const _shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const fragments = {
  shadows: _shadows,
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ..._shadows.small,
  },
  section: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ..._shadows.medium,
  },
  leftAccent: (color = colors.secondary, width = 4) => ({ borderLeftWidth: width, borderLeftColor: color }),
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  badge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  typography: {
    title: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
    subtitle: { fontSize: 15, color: colors.textLight },
  },
};
