import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";

interface Service {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
}

const servicesData: Service[] = [
  // Sofa Repair Services
  {
    id: 1,
    name: "Sagging Issue/Belt Tight (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa1.jpg",
    price: "₹750",
  },
  {
    id: 2,
    name: "Sagging Issue/Belt Tight (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa2.jpg",
    price: "₹1000",
  },
  {
    id: 3,
    name: "Sagging Issue/Belt Tight (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa3.jpg",
    price: "₹1500",
  },

  {
    id: 4,
    name: "Frame Repair w/o Material (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa4.jpg",
    price: "₹1500",
  },
  {
    id: 5,
    name: "Frame Repair w/o Material (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa5.jpg",
    price: "₹2000",
  },
  {
    id: 6,
    name: "Frame Repair w/o Material (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa6.jpg",
    price: "₹2500",
  },

  {
    id: 7,
    name: "Frame Repair with Wood (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa7.jpg",
    price: "₹3200",
  },
  {
    id: 8,
    name: "Frame Repair with Wood (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa8.jpg",
    price: "₹4500",
  },
  {
    id: 9,
    name: "Frame Repair with Wood (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa9.jpg",
    price: "₹5500",
  },

  {
    id: 10,
    name: "Markin Replacement (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa10.jpg",
    price: "₹750",
  },
  {
    id: 11,
    name: "Markin Replacement (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa11.jpg",
    price: "₹2000",
  },
  {
    id: 12,
    name: "Markin Replacement (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa12.jpg",
    price: "₹3600",
  },

  {
    id: 13,
    name: "Upholstery Replacement (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa13.jpg",
    price: "₹2250",
  },
  {
    id: 14,
    name: "Upholstery Replacement (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa14.jpg",
    price: "₹5000",
  },
  {
    id: 15,
    name: "Upholstery Replacement (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa15.jpg",
    price: "₹7000",
  },

  {
    id: 16,
    name: "Recliner Foam Replacement (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa16.jpg",
    price: "₹6500",
  },
  {
    id: 17,
    name: "Recliner Foam Replacement (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa17.jpg",
    price: "₹9500",
  },
  {
    id: 18,
    name: "Recliner Foam Replacement (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa18.jpg",
    price: "₹13000",
  },

  {
    id: 19,
    name: "Recliner Upholstery (Single-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa19.jpg",
    price: "₹4500",
  },
  {
    id: 20,
    name: "Recliner Upholstery (Two-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa20.jpg",
    price: "₹6700",
  },
  {
    id: 21,
    name: "Recliner Upholstery (Three-Seater)",
    category: "Sofa Repair",
    image: "https://example.com/sofa21.jpg",
    price: "₹9000",
  },

  {
    id: 22,
    name: "Recliner Liver Replacement",
    category: "Sofa Repair",
    image: "https://example.com/sofa22.jpg",
    price: "₹2000",
  },
  {
    id: 23,
    name: "Recliner Mechanism (Manual)",
    category: "Sofa Repair",
    image: "https://example.com/sofa23.jpg",
    price: "₹7000",
  },
  {
    id: 24,
    name: "Recliner Mechanism (Automatic)",
    category: "Sofa Repair",
    image: "https://example.com/sofa24.jpg",
    price: "₹13000",
  },

  {
    id: 25,
    name: "Sofa Dry-Cleaning (Per Seat)",
    category: "Sofa Repair",
    image: "https://example.com/sofa25.jpg",
    price: "₹500/seat",
  },
  {
    id: 26,
    name: "Sofa Sanitizing (Per Seat)",
    category: "Sofa Repair",
    image: "https://example.com/sofa26.jpg",
    price: "₹2500/seat",
  },
  {
    id: 27,
    name: "Polish & Touching (Per Seat)",
    category: "Sofa Repair",
    image: "https://example.com/sofa27.jpg",
    price: "₹500/seat",
  },

  // Furniture Installation Services
  {
    id: 28,
    name: "Chair Installation",
    category: "Furniture Installation",
    image: "https://example.com/install1.jpg",
    price: "₹500",
  },
  {
    id: 29,
    name: "Stool Installation",
    category: "Furniture Installation",
    image: "https://example.com/install2.jpg",
    price: "₹500",
  },
  {
    id: 30,
    name: "Side Table Installation",
    category: "Furniture Installation",
    image: "https://example.com/install3.jpg",
    price: "₹650",
  },
  {
    id: 31,
    name: "Coffee Table Installation",
    category: "Furniture Installation",
    image: "https://example.com/install4.jpg",
    price: "₹650",
  },
  {
    id: 32,
    name: "Shoe Rack Installation",
    category: "Furniture Installation",
    image: "https://example.com/install5.jpg",
    price: "₹875",
  },
  {
    id: 33,
    name: "Study Table Installation",
    category: "Furniture Installation",
    image: "https://example.com/install6.jpg",
    price: "₹875",
  },
  {
    id: 34,
    name: "Study Desk Installation",
    category: "Furniture Installation",
    image: "https://example.com/install7.jpg",
    price: "₹1175",
  },
  {
    id: 35,
    name: "TV Unit Installation",
    category: "Furniture Installation",
    image: "https://example.com/install8.jpg",
    price: "₹1150",
  },
  {
    id: 36,
    name: "Entertainment Unit Installation",
    category: "Furniture Installation",
    image: "https://example.com/install9.jpg",
    price: "₹1650",
  },
  {
    id: 37,
    name: "Wardrobe (2 Door)",
    category: "Furniture Installation",
    image: "https://example.com/install10.jpg",
    price: "₹650",
  },
  {
    id: 38,
    name: "Wardrobe (3 Door)",
    category: "Furniture Installation",
    image: "https://example.com/install11.jpg",
    price: "₹850",
  },
  {
    id: 39,
    name: "Wardrobe (4 Door)",
    category: "Furniture Installation",
    image: "https://example.com/install12.jpg",
    price: "₹1150",
  },
  {
    id: 40,
    name: "Wardrobe (Sliding)",
    category: "Furniture Installation",
    image: "https://example.com/install13.jpg",
    price: "₹1350",
  },
  {
    id: 41,
    name: "Bed with Storage",
    category: "Furniture Installation",
    image: "https://example.com/install14.jpg",
    price: "₹1650",
  },
  {
    id: 42,
    name: "Single Bed",
    category: "Furniture Installation",
    image: "https://example.com/install15.jpg",
    price: "₹1150",
  },
  {
    id: 43,
    name: "Hydraulic Bed",
    category: "Furniture Installation",
    image: "https://example.com/install16.jpg",
    price: "₹1650",
  },
  {
    id: 44,
    name: "Bunk Bed",
    category: "Furniture Installation",
    image: "https://example.com/install17.jpg",
    price: "₹1750",
  },
  {
    id: 45,
    name: "Book Shelf",
    category: "Furniture Installation",
    image: "https://example.com/install18.jpg",
    price: "₹650",
  },
  {
    id: 46,
    name: "Dressing Table",
    category: "Furniture Installation",
    image: "https://example.com/install19.jpg",
    price: "₹1150",
  },
  {
    id: 47,
    name: "Chest of Drawers (3)",
    category: "Furniture Installation",
    image: "https://example.com/install20.jpg",
    price: "₹875",
  },
  {
    id: 48,
    name: "Chest of Drawers (4)",
    category: "Furniture Installation",
    image: "https://example.com/install21.jpg",
    price: "₹1175",
  },
  {
    id: 49,
    name: "Wall Mount TV Unit",
    category: "Furniture Installation",
    image: "https://example.com/install22.jpg",
    price: "₹1675",
  },
  {
    id: 50,
    name: "Wall Shelf",
    category: "Furniture Installation",
    image: "https://example.com/install23.jpg",
    price: "₹875",
  },
];

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = servicesData
    .filter((service) => service.category === category)
    .filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#99631f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceItem}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No services found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1A1A1A",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: "Inter-Regular",
    color: "#1A1A1A",
  },
  listContainer: {
    padding: 16,
  },
  serviceItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  servicePrice: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#99631f",
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
});
