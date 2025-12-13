import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8',
  },
  header: {
    backgroundColor: '#8B4513',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  backButton: {
    width: 80,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#A0826D',
    marginBottom: 20,
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarPreviewEmoji: {
    fontSize: 50,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // gap is not reliable — use margin on each emoji option
  },
  emojiOption: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F8F4E8',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 2,
    borderColor: '#E8DCC4',
  },
  emojiOptionSelected: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
    borderWidth: 3,
  },
  emojiText: {
    fontSize: 28,
  },
  bioInput: {
    backgroundColor: '#F8F4E8',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#4A3728',
    borderWidth: 2,
    borderColor: '#E8DCC4',
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: '#A0826D',
    textAlign: 'right',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#8B4513',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default styles;
