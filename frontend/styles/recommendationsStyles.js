import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  titleContainer: { padding: 20, backgroundColor: colors.cardBackground, borderBottomWidth: 1, borderBottomColor: colors.beige },
  title: { fontSize: 26, fontWeight: '700', color: colors.primary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: colors.textLight, textAlign: 'center', fontStyle: 'italic' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 20, fontSize: 16, color: colors.primary, textAlign: 'center' },
  /* empty state moved to commonStyles and EmptyState component */
  scrollView: { flex: 1 },
  scrollContent: { padding: 15 },
  bookCard: { ...fragments.card, borderRadius: 15, padding: 20, marginBottom: 20, flexDirection: 'row', borderLeftWidth: 5, ...fragments.leftAccent() },
  bookImage: { width: 100, height: 150, borderRadius: 8, backgroundColor: colors.beige, ...fragments.shadows.small },
  noImagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  noImageText: { fontSize: 40 },
  bookInfo: { flex: 1, marginLeft: 15 },
  badgeContainer: { marginBottom: 8 },
  badge: { ...fragments.badge },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  bookTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 6, lineHeight: 22 },
  bookAuthor: { fontSize: 14, color: colors.textLight, marginBottom: 12, fontStyle: 'italic' },
  reasonContainer: { backgroundColor: colors.mutedBackground, padding: 12, borderRadius: 8, marginBottom: 12, borderLeftWidth: 3, ...fragments.leftAccent() },
  reasonLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  reasonText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  actionButton: { ...fragments.buttonPrimary, padding: 10, borderRadius: 8 },
  actionButtonText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  reloadButton: { backgroundColor: colors.cardBackground, padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 10, borderWidth: 2, borderColor: colors.secondary, borderStyle: 'dashed' },
  reloadButtonText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { fontSize: 13, color: colors.textLight, textAlign: 'center', fontStyle: 'italic' },
});

export default styles;
