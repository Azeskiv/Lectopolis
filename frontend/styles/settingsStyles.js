import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FB', // soft blue background
  },
  header: {
    backgroundColor: '#0B5FFF', // deep blue
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 3,
    borderBottomColor: '#60B0FF', // lighter accent
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  titleContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6F0FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0B5FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#4A6A86',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#0B5FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#60B0FF',
    marginBottom: 20,
    shadowColor: '#0B5FFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#344A5F',
    lineHeight: 20,
  },
  languagesContainer: {
    // 'gap' is not supported reliably in React Native; use spacing on children instead
    // keep this container simple; spacing is provided by each language card's marginBottom
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6F0FA',
    shadowColor: '#051433',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  languageCardSelected: {
    borderColor: '#60B0FF',
    backgroundColor: '#F7FBFF',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 30,
    marginRight: 14,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#203545',
    marginBottom: 4,
  },
  languageNameSelected: {
    color: '#0B5FFF',
    fontWeight: '700',
  },
  languageCode: {
    fontSize: 12,
    color: '#6F92AE',
    fontWeight: '500',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#60B0FF',
    borderColor: '#60B0FF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedInfo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedCount: {
    fontSize: 15,
    color: '#0B5FFF',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#0B5FFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#0B5FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default styles;
