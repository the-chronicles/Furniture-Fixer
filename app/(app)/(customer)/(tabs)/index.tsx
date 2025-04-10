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
import { router, useRouter } from "expo-router";


const services = [
  // Sofa Repair Services
  {
    id: 1,
    name: "Sagging Issue/Belt Tight",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 2,
    name: "Frame Repair w/o Material",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 3,
    name: "Frame Repair with Wood",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1560185127-2d5d2d6e79ef?w=500",
  },
  {
    id: 4,
    name: "Markin Replacement",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1560185127-2d5d2d6e79ef?w=500",
  },
  {
    id: 5,
    name: "Upholstery Replacement",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 6,
    name: "Recliner Foam Replacement",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 7,
    name: "Recliner Upholstery",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 8,
    name: "Recliner Liver Replacement",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500",
  },
  {
    id: 9,
    name: "Recliner Mechanism",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 10,
    name: "Sofa Dry-Cleaning",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 11,
    name: "Sofa Sanitizing",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 12,
    name: "Polish & Touching",
    category: "Sofa Repair",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  
  // Furniture Installation Services
  {
    id: 13,
    name: "Chair Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 14,
    name: "Stool Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 15,
    name: "Side Table Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 16,
    name: "Coffee Table Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 17,
    name: "Shoe Rack Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 18,
    name: "Study Table Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 19,
    name: "Study Desk Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 20,
    name: "TV Unit Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 21,
    name: "Entertainment Unit",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 22,
    name: "Wardrobe Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 23,
    name: "Bed Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 24,
    name: "Bunk Bed Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 25,
    name: "Book Shelf Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 26,
    name: "Dressing Table Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 27,
    name: "Chest of Drawers",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 28,
    name: "Wall Mount TV Unit",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
  {
    id: 29,
    name: "Wall Shelf Installation",
    category: "Furniture Installation",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
  },
];

export default function CustomerHome() {


  const router = useRouter();
  
  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  const handleViewMore = (category: string) => {
    router.push({ pathname: '/(customer)/category/[category]', params: { category } });
  };


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

      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <View key={category}>
          <Text style={styles.sectionTitle}>{category}</Text>
          <View style={styles.gridContainer}>
            {/* Show first 4 services */}
            {categoryServices.slice(0, 4).map((service) => (
              <TouchableOpacity key={service.id} style={styles.gridItem}>
                <Image source={{ uri: service.image }} style={styles.gridImage} />
                <Text style={styles.gridName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
            {/* View More button */}
            <TouchableOpacity 
              style={styles.viewMoreItem}
              onPress={() => handleViewMore(category)}
            >
              <Text style={styles.viewMoreText}>View More</Text>
              <Text style={styles.viewMoreSubText}>{categoryServices.length} services</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 50,
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
    aspectRatio: 1,
  },
  gridImage: {
    height: "70%",
  },
  gridName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#1A1A1A",
    padding: 8,
    textAlign: "center",
  },
  viewMoreItem: {
    width: '30%',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viewMoreText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#99631f',
    textAlign: 'center',
  },
  viewMoreSubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});