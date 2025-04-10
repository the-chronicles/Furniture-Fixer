import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#99631f',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="[category]"  // Note the brackets for dynamic route
        options={{
            headerShown: false,
        }}
      />
    </Stack>
  );
}