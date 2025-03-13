import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Index() {
  // You can add authentication check logic here
  // For now, we'll redirect to login by default
  return (
    <SafeAreaView>
      <Redirect href="/login" />
    </SafeAreaView>
  );
}
