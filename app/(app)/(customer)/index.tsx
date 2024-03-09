import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search } from 'lucide-react-native';

const services = [
  {
    id: 1,
    name: 'Furniture Repair',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500',
  },
  {
    id: 2,
    name: 'Assembly',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500',
  },
  {
    id: 3,
    name: 'Restoration',
    image: 'https://images.unsplash.com/photo-1560185127-2d5d2d6e79ef?w=500',
  },
];

export default function CustomerHome() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, John! 👋</Text>
        <Text style={styles.subtitle}>What service do you need today?</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search for services...</Text>
      </View>

      <Text style={styles.sectionTitle}>Our Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <Text style={styles.serviceName}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      <View style={styles.bookingCard}>
        <Text style={styles.bookingTitle}>Chair Repair</Text>
        <Text style={styles.bookingStatus}>In Progress</Text>
        <Text style={styles.bookingDate}>Today, 2:30 PM</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 24,
    backgroundColor: '#99631f',
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E1E1E1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 24,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1A1A1A',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  servicesScroll: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  serviceCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceImage: {
    width: '100%',
    height: 100,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    padding: 12,
  },
  bookingCard: {
    margin: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  bookingStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 4,
  },
  bookingDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
});