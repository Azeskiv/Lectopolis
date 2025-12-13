import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8',
  },
  titleContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DCC4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#A0826D',
    textAlign: 'center',
    fontStyle: 'italic',
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
    color: '#8B4513',
    textAlign: 'center',
  },
  /* empty state moved to commonStyles and EmptyState component */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  bookCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#E8DCC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 40,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
  },
  badgeContainer: {
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 6,
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#8B6F47',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  reasonContainer: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 13,
    color: '#5A4A3A',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  reloadButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderStyle: 'dashed',
  },
  reloadButtonText: {
    color: '#8B4513',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#A0826D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default styles;
