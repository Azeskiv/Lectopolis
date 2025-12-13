import { StyleSheet } from 'react-native';
import { colors, fragments } from './commonStyles';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paleBlue },
  header: { backgroundColor: colors.deepBlue, padding: 15, paddingTop: 50, borderBottomWidth: 3, borderBottomColor: colors.lightBlue },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  titleContainer: { padding: 20, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: '#E6F0FA' },
  title: { fontSize: 26, fontWeight: '700', color: colors.deepBlue, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#4A6A86', textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 20, fontSize: 16, color: colors.deepBlue },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },
  infoBox: { backgroundColor: colors.white, padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: colors.lightBlue, marginBottom: 20, ...fragments.shadows.small },
  infoText: { fontSize: 14, color: '#344A5F', lineHeight: 20 },
  languagesContainer: {},
  languageCard: { backgroundColor: colors.white, borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#E6F0FA', ...fragments.shadows.small },
  languageCardSelected: { borderColor: colors.lightBlue, backgroundColor: '#F7FBFF' },
  languageContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  flag: { fontSize: 30, marginRight: 14 },
  languageInfo: { flex: 1 },
  languageName: { fontSize: 17, fontWeight: '600', color: '#203545', marginBottom: 4 },
  languageNameSelected: { color: colors.deepBlue, fontWeight: '700' },
  languageCode: { fontSize: 12, color: '#6F92AE', fontWeight: '500' },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: '#E6F0FA', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white },
  checkboxSelected: { backgroundColor: colors.lightBlue, borderColor: colors.lightBlue },
  checkmark: { color: colors.white, fontSize: 18, fontWeight: '700' },
  selectedInfo: { marginTop: 20, marginBottom: 10, alignItems: 'center' },
  selectedCount: { fontSize: 15, color: colors.deepBlue, fontWeight: '600' },
  saveButton: { backgroundColor: colors.deepBlue, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, marginBottom: 20, ...fragments.shadows.large },
  saveButtonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});

export default styles;
