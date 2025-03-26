import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(customer)" />
      {/* Add other app groups here if needed */}
    </Stack>
  );
}