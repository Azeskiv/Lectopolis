import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

export const homeStyles = StyleSheet.create({
  settingsButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  settingsText: { fontSize: 22 },
  logoutButton: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  logoutText: { color: colors.white, fontWeight: '700', fontSize: 15 },

  searchContainer: { flexDirection: 'row', padding: 18, backgroundColor: colors.mutedBackground, borderBottomWidth: 1, borderBottomColor: colors.beige },
  searchInput: { flex: 1, backgroundColor: colors.white, padding: 15, borderRadius: 12, fontSize: 17, borderWidth: 2, borderColor: colors.secondary, marginRight: 12, ...fragments.shadows.small },
  searchButton: { backgroundColor: colors.primary, paddingHorizontal: 25, borderRadius: 12, justifyContent: 'center', minWidth: 90, ...fragments.shadows.medium },
  searchButtonText: { color: colors.white, fontWeight: '700', textAlign: 'center', fontSize: 16 },

  listContainer: { padding: 18 },
  /* empty state moved to commonStyles and EmptyState component */
  recommendationsButton: { backgroundColor: colors.secondary, marginHorizontal: 20, marginTop: 15, marginBottom: 15, padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...fragments.shadows.large },
  recommendationsEmoji: { fontSize: 22, marginRight: 10 },
  recommendationsText: { color: colors.white, fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
});
