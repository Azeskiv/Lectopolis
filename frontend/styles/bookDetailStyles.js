import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  /* Main book block */
  bookContainer: {
    flexDirection: 'row',
    ...fragments.card,
    padding: 25,
    margin: 15,
    borderRadius: 15,
    borderLeftWidth: 5,
    ...fragments.leftAccent(),
  },
  bookImage: {
    width: 130,
    height: 195,
    borderRadius: 10,
    backgroundColor: colors.beige,
    ...fragments.shadows.medium,
  },

  /* Info */
  bookInfo: { flex: 1, marginLeft: 20, justifyContent: 'center' },
  bookTitle: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: colors.text, lineHeight: 28 },
  bookAuthor: { fontSize: 17, color: colors.textLight, marginBottom: 20, fontStyle: 'italic' },

  /* Rating */
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mutedBackground,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  star: { fontSize: 22, marginRight: 6 },
  averageText: { fontSize: 22, fontWeight: '700', color: colors.secondary },
  ratingCount: { fontSize: 16, color: colors.textLight, marginLeft: 8 },

  /* Sections */
  section: { ...fragments.section, padding: 25, marginHorizontal: 15, marginTop: 15, borderRadius: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingBottom: 10,
  },
  synopsis: { fontSize: 16, lineHeight: 25, color: colors.textSecondary },

  /* Form */
  ratingForm: { marginTop: 15 },
  label: { fontSize: 17, fontWeight: '700', marginBottom: 12, color: colors.primary },
  starsRow: { flexDirection: 'row', marginBottom: 25, justifyContent: 'center' },
  starButton: { fontSize: 45, marginHorizontal: 3 },
  starDisplay: { fontSize: 32, marginRight: 5 },
  commentInput: {
    backgroundColor: colors.mutedBackground,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: colors.text,
  },

  /* Buttons */
  submitButton: { ...fragments.buttonPrimary, padding: 18, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: colors.white, fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  cancelButton: { marginTop: 12, padding: 15, alignItems: 'center' },
  cancelButtonText: { color: colors.primary, fontSize: 17, fontWeight: '600' },

  /* User rating */
  userRatingCard: { backgroundColor: colors.mutedBackground, padding: 20, borderRadius: 12, marginTop: 15, borderLeftWidth: 4, ...fragments.leftAccent() },
  userComment: { fontSize: 16, color: colors.textSecondary, marginTop: 12, marginBottom: 18, lineHeight: 24 },

  /* Actions */
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  editButton: { flex: 1, ...fragments.buttonPrimary, padding: 12, borderRadius: 8, alignItems: 'center' },
  editButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  deleteButton: { flex: 1, backgroundColor: colors.danger, padding: 12, borderRadius: 8, alignItems: 'center' },
  deleteButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },

  /* Rating cards */
  ratingCard: { backgroundColor: colors.cardBackground, padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: colors.beige, ...fragments.shadows.small },
  ratingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ratingUser: { fontSize: 17, fontWeight: '700', color: colors.primary, textDecorationLine: 'underline' },
  starsRowSmall: { flexDirection: 'row' },
  starSmall: { fontSize: 16 },
  ratingComment: { fontSize: 16, color: colors.textSecondary, marginBottom: 12, lineHeight: 24 },
  ratingDate: { fontSize: 13, color: colors.textLight, fontStyle: 'italic' },
  noRatings: { textAlign: 'center', color: colors.textLight, fontSize: 17, padding: 30, fontStyle: 'italic' },
});

export default styles;
