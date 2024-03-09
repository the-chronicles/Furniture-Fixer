import { Redirect } from 'expo-router';

export default function Index() {
  // You can add authentication check logic here
  // For now, we'll redirect to login by default
  return <Redirect href="/login" />;
}