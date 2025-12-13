import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.secondary,
  },
  backButton: { width: 80 },
  backText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  headerTitle: { color: colors.white, fontSize: 20, fontWeight: '700' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },

  section: { ...fragments.card, borderRadius: 15, padding: 20, marginBottom: 20, borderLeftWidth: 5, ...fragments.leftAccent() },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.primary, marginBottom: 5 },
  sectionSubtitle: { fontSize: 14, color: colors.textLight, marginBottom: 20 },

  avatarPreview: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20, ...fragments.shadows.large },
  avatarPreviewEmoji: { fontSize: 50 },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  emojiOption: { width: 50, height: 50, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', margin: 6, borderWidth: 2, borderColor: colors.beige },
  emojiOptionSelected: { backgroundColor: colors.mutedBackground, borderColor: colors.secondary, borderWidth: 3 },
  emojiText: { fontSize: 28 },

  bioInput: { backgroundColor: colors.background, borderRadius: 12, padding: 15, fontSize: 15, color: colors.text, borderWidth: 2, borderColor: colors.beige, minHeight: 100 },
  charCount: { fontSize: 12, color: colors.textLight, textAlign: 'right', marginTop: 8 },

  saveButton: { ...fragments.buttonPrimary, marginBottom: 20 },
  saveButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});

export default styles;
