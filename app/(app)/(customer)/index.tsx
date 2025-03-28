import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { BellDot, Search } from "lucide-react-native";

const services = [
  {
    id: 1,
    name: "Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 2,
    name: "Assembly",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 3,
    name: "Restoration",
    image: "https://images.unsplash.com/photo-1560185127-2d5d2d6e79ef?w=500",
  },
  {
    id: 4,
    name: "Cleaning",
    image: "https://images.unsplash.com/photo-1560185127-2d5d2d6e79ef?w=500",
  },
  {
    id: 5,
    name: "Upholstery",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 6,
    name: "Refresher",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 7,
    name: "Moving Help",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 8,
    name: "Moving Help",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=5000",
  },
  {
    id: 9,
    name: "Help",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
];

export default function CustomerHome() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello!</Text>
          <Text style={styles.subtitle}>What service do you need today?</Text>
        </View>

        <TouchableOpacity style={styles.notification}>
          <BellDot size={20} color="#99631f" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search for services...</Text>
      </View>

      <Text style={styles.sectionTitle}>Our Services</Text>

      <View style={styles.gridContainer}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.gridItem}>
            <Image source={{ uri: service.image }} style={styles.gridImage} />
            <Text style={styles.gridName}>{service.name}</Text>x
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 60,
    paddingLeft: 24,
    paddingBottom: 24,
    backgroundColor: "#99631f",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    color: "#E1E1E1",
  },
  notification: {
    position: "absolute",
    right: 24,
    top: 70,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 24,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
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
    fontFamily: "Inter-Regular",
    color: "#666",
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#1A1A1A",
    marginHorizontal: 24,
    marginBottom: 20,
  },
  // Grid styles
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gridItem: {
    width: "30%",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    aspectRatio: 1, // Makes items square
  },
  gridImage: {
    // width: '100%',
    height: "70%",
  },
  gridName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#1A1A1A",
    padding: 8,
    textAlign: "center",
  },
});
