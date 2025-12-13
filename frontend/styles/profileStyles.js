import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

export const profileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: 15, paddingTop: 50, borderBottomWidth: 3, borderBottomColor: colors.secondary },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 20, fontSize: 16, color: colors.primary },

  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },

  profileCard: { ...fragments.card, borderRadius: 15, padding: 20, marginBottom: 20, ...fragments.shadows.large, borderLeftWidth: 5, ...fragments.leftAccent() },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarEmoji: { fontSize: 40 },
  profileInfo: { flex: 1 },
  username: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 5 },
  statsText: { fontSize: 15, color: colors.textLight },

  bioContainer: { backgroundColor: colors.mutedBackground, padding: 12, borderRadius: 8, marginTop: 10, borderLeftWidth: 3, ...fragments.leftAccent() },
  bioLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  bioText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  editButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  editButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  ratingsSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.primary, marginBottom: 15 },
  ratingCard: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 15, marginBottom: 15, flexDirection: 'row', ...fragments.shadows.small, borderLeftWidth: 4, borderLeftColor: colors.secondary },
  bookCover: { width: 60, height: 90, borderRadius: 6, marginRight: 12, backgroundColor: colors.beige },
  ratingContent: { flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  bookAuthor: { fontSize: 13, color: colors.textLight, marginBottom: 8, fontStyle: 'italic' },
  scoreContainer: { marginBottom: 8 },
  stars: { fontSize: 16 },
  comment: { fontSize: 13, color: colors.textSecondary, fontStyle: 'italic', marginBottom: 8, lineHeight: 18 },
  date: { fontSize: 11, color: colors.textLight },
  emptyRatings: { padding: 40, alignItems: 'center' },
  emptyRatingsEmoji: { fontSize: 60, marginBottom: 15 },
  emptyRatingsText: { fontSize: 15, color: colors.textLight, textAlign: 'center' },
});
