import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);  

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" />
    <Stack.Screen name="signup" />
    <Stack.Screen name="forgot-password" />
  </Stack>
  );
}
