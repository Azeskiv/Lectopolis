import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8',
  },
  header: {
    backgroundColor: '#8B4513',
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
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
  },
  /* empty state moved to commonStyles and EmptyState component */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 5,
  },
  statsText: {
    fontSize: 15,
    color: '#8B6F47',
  },
  bioContainer: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  bioLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    color: '#5A4A3A',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ratingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#E8DCC4',
  },
  ratingContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#8B6F47',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  scoreContainer: {
    marginBottom: 8,
  },
  stars: {
    fontSize: 16,
  },
  comment: {
    fontSize: 13,
    color: '#5A4A3A',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 18,
  },
  date: {
    fontSize: 11,
    color: '#A0826D',
  },
  emptyRatings: {
    padding: 40,
    alignItems: 'center',
  },
  emptyRatingsEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyRatingsText: {
    fontSize: 15,
    color: '#A0826D',
    textAlign: 'center',
  },
});
