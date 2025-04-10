// // import { Tabs } from 'expo-router';
// // import { Chrome as Home, Calendar, MessageSquare, User, House, UserRound } from 'lucide-react-native';

// // export default function CustomerTabLayout() {
// //   return (
// //     <Tabs
// //       screenOptions={{
// //         tabBarStyle: {
// //           backgroundColor: '#fff',
// //           borderTopWidth: 1,
// //           borderTopColor: '#E5E5E5',
// //         },
// //         tabBarActiveTintColor: '#99631f',
// //         tabBarInactiveTintColor: '#999',
// //         headerShown: false,

// //       }}
// //     >
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: 'Home',
// //           tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="bookings"
// //         options={{
// //           title: 'Bookings',
// //           tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="chat"
// //         options={{
// //           title: 'Support',
// //           tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="profile"
// //         options={{
// //           title: 'Profile',
// //           tabBarIcon: ({ color, size }) => <UserRound size={size} color={color} />,
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }

// import { Tabs } from "expo-router";
// import { Calendar, MessageSquare, UserRound, House } from "lucide-react-native";

// export default function CustomerTabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: "#fff",
//           borderTopWidth: 1,
//           borderTopColor: "#E5E5E5",
//         },
//         tabBarActiveTintColor: "#99631f",
//         tabBarInactiveTintColor: "#999",
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="bookings"
//         options={{
//           title: "Bookings",
//           tabBarIcon: ({ color, size }) => (
//             <Calendar size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="chat"
//         options={{
//           title: "Support",
//           tabBarIcon: ({ color, size }) => (
//             <MessageSquare size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <UserRound size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="category/[category]" 
        options={{
          presentation: 'card',
          headerShown: true,
          headerTintColor: '#99631f',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}