import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, CreditCard, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

const menuItems = [
  {
    icon: Settings,
    title: 'Account Settings',
    description: 'Manage your personal information',
  },
  {
    icon: CreditCard,
    title: 'Payment Methods',
    description: 'Manage your payment options',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure notification preferences',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Manage your account security',
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'Get help with your account',
  },
];

export default function Profile() {
  const handleLogout = () => {
    // Here you would typically clear any auth tokens or user data
    router.replace('/signup');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <item.icon size={24} color="#99631f" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <View style={styles.menuIcon}>
            <LogOut size={24} color="#FF4B4B" />
          </View>
          <View style={styles.menuText}>
            <Text style={[styles.menuTitle, styles.logoutText]}>Log Out</Text>
            <Text style={styles.menuDescription}>Sign out of your account</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#99631f',
    padding: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E1E1E1',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  menuDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    marginTop: 24,
  },
  logoutText: {
    color: '#FF4B4B',
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 24,
  },
});