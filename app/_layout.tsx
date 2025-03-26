import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreAllLogs(true);  

export default function RootLayout() {
  return (
    <>
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
