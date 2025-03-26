import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, PenTool as Tool } from 'lucide-react-native';

const bookings = [
  {
    id: 1,
    service: 'Chair Repair',
    date: 'Today, 2:30 PM',
    location: '123 Main St, New York',
    status: 'In Progress',
    technician: 'Mike Johnson',
  },
  {
    id: 2,
    service: 'Table Assembly',
    date: 'Tomorrow, 10:00 AM',
    location: '456 Park Ave, New York',
    status: 'Scheduled',
    technician: 'Sarah Smith',
  },
  {
    id: 3,
    service: 'Cabinet Restoration',
    date: 'Jan 25, 3:00 PM',
    location: '789 Broadway, New York',
    status: 'Completed',
    technician: 'David Brown',
  },
];

export default function Bookings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Bookings</Text>
        <Text style={styles.subtitle}>Track your service appointments</Text>
      </View>

      {bookings.map((booking) => (
        <TouchableOpacity key={booking.id} style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <View style={styles.serviceInfo}>
              <Tool size={20} color="#99631f" />
              <Text style={styles.serviceName}>{booking.service}</Text>
            </View>
            <Text style={[
              styles.status,
              booking.status === 'Completed' && styles.statusCompleted,
              booking.status === 'In Progress' && styles.statusInProgress,
              booking.status === 'Scheduled' && styles.statusScheduled,
            ]}>
              {booking.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Calendar size={16} color="#666" />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <MapPin size={16} color="#666" />
            <Text style={styles.detailText}>{booking.location}</Text>
          </View>

          <View style={styles.technicianInfo}>
            <Clock size={16} color="#666" />
            <Text style={styles.detailText}>Technician: {booking.technician}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  title: {
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
  bookingCard: {
    margin: 16,
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginLeft: 8,
  },
  status: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusInProgress: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  statusScheduled: {
    backgroundColor: '#FFF3E0',
    color: '#F57C00',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  technicianInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});