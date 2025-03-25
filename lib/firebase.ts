import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, RecaptchaVerifier  } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);


// const app = initializeApp(firebaseConfig);

// export default app; 



// forceRecaptchaFlowForTesting: true;


const app = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(app);

export { auth };



