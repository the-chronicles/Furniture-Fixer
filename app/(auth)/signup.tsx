// // // import { useState } from 'react';
// // // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
// // // import { Link, router } from 'expo-router';
// // // import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
// // // import { auth } from '@/lib/firebase';

// // // export default function Signup() {
// // //   const [name, setName] = useState('');
// // //   const [phone, setPhone] = useState('');
// // //   const [verificationId, setVerificationId] = useState('');
// // //   const [otp, setOtp] = useState('');
// // //   const [step, setStep] = useState(1); // 1: Details, 2: OTP
// // //   const [errors, setErrors] = useState({
// // //     name: '',
// // //     phone: '',
// // //     otp: ''
// // //   });

// // //   const validatePhone = (number: string) => {
// // //     const phoneRegex = /^[6-9]\d{9}$/;
// // //     return phoneRegex.test(number);
// // //   };

// // //   const handleSendOTP = async () => {
// // //     const newErrors = {
// // //       name: '',
// // //       phone: '',
// // //       otp: ''
// // //     };

// // //     if (!name.trim()) {
// // //       newErrors.name = 'Name is required';
// // //     }

// // //     if (!phone) {
// // //       newErrors.phone = 'Phone number is required';
// // //     } else if (!validatePhone(phone)) {
// // //       newErrors.phone = 'Please enter a valid Indian phone number';
// // //     }

// // //     setErrors(newErrors);

// // //     if (Object.values(newErrors).some(error => error)) return;

// // //   try {
// // //     const phoneNumber = `+91${phone}`;

// // //     // Initialize RecaptchaVerifier
// // //     const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
// // //       size: 'invisible',
// // //       callback: (response) => {
// // //         console.log('Recaptcha verified:', response);
// // //       },
// // //     });

// // //     const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// // //     setVerificationId(confirmation.verificationId);
// // //     setStep(2);
// // //   } catch (error) {
// // //     console.error('Error sending OTP:', error);
// // //     setErrors(prev => ({ ...prev, phone: 'Error sending OTP. Please try again.' }));
// // //   }
// // //   };

// // //   const handleVerifyOTP = async () => {
// // //     if (!otp || otp.length !== 6) {
// // //       setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
// // //       return;
// // //     }

// // //     try {
// // //       const credential = PhoneAuthProvider.credential(verificationId, otp);
// // //       await signInWithCredential(auth, credential);
// // //       router.replace('/(app)/(customer)');
// // //     } catch (error) {
// // //       console.error('Error verifying OTP:', error);
// // //       setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
// // //     }
// // //   };

// // //   return (
// // //     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
// // //       <View style={styles.header}>
// // //         <Image
// // //           source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
// // //           style={styles.logo}
// // //         />
// // //         <Text style={styles.title}>Create Account</Text>
// // //         <Text style={styles.subtitle}>
// // //           {step === 1 ? 'Join our community today' : 'Verify your phone number'}
// // //         </Text>
// // //       </View>

// // //       <View style={styles.form}>
// // //       <View id="recaptcha-container"></View>

// // //         {step === 1 ? (
// // //           <>
// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Full Name</Text>
// // //               <TextInput
// // //                 style={[styles.input, styles.textInput]}
// // //                 placeholder="Enter your full name"
// // //                 value={name}
// // //                 onChangeText={setName}
// // //               />
// // //               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.label}>Phone Number</Text>
// // //               <View style={styles.phoneInput}>
// // //                 <Text style={styles.countryCode}>+91</Text>
// // //                 <TextInput
// // //                   style={styles.input}
// // //                   placeholder="Enter your phone number"
// // //                   keyboardType="phone-pad"
// // //                   value={phone}
// // //                   onChangeText={setPhone}
// // //                   maxLength={10}
// // //                 />
// // //               </View>
// // //               {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
// // //             </View>

// // //             <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
// // //               <Text style={styles.signupButtonText}>Send OTP</Text>
// // //             </TouchableOpacity>
// // //           </>
// // //         ) : (
// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.label}>Enter OTP</Text>
// // //             <TextInput
// // //               style={[styles.input, styles.otpInput]}
// // //               placeholder="Enter 6-digit OTP"
// // //               keyboardType="number-pad"
// // //               value={otp}
// // //               onChangeText={setOtp}
// // //               maxLength={6}
// // //             />
// // //             {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

// // //             <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
// // //               <Text style={styles.signupButtonText}>Verify & Create Account</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity
// // //               style={styles.resendButton}
// // //               onPress={() => {
// // //                 setStep(1);
// // //                 setOtp('');
// // //               }}
// // //             >
// // //               <Text style={styles.resendText}>Resend OTP</Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         )}

// // //         <View style={styles.loginContainer}>
// // //           <Text style={styles.loginText}>Already have an account? </Text>
// // //           <Link href="/login" asChild>
// // //             <TouchableOpacity>
// // //               <Text style={styles.loginLink}>Sign In</Text>
// // //             </TouchableOpacity>
// // //           </Link>
// // //         </View>
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //   },
// // //   contentContainer: {
// // //     flexGrow: 1,
// // //   },
// // //   header: {
// // //     alignItems: 'center',
// // //     padding: 32,
// // //     backgroundColor: '#4A90E2',
// // //     borderBottomLeftRadius: 30,
// // //     borderBottomRightRadius: 30,
// // //   },
// // //   logo: {
// // //     width: 120,
// // //     height: 120,
// // //     borderRadius: 60,
// // //     marginBottom: 16,
// // //     borderWidth: 4,
// // //     borderColor: '#fff',
// // //   },
// // //   title: {
// // //     fontFamily: 'Poppins-Bold',
// // //     fontSize: 28,
// // //     color: '#fff',
// // //     marginBottom: 8,
// // //   },
// // //   subtitle: {
// // //     fontFamily: 'Inter-Regular',
// // //     fontSize: 16,
// // //     color: '#E1E1E1',
// // //   },
// // //   form: {
// // //     padding: 24,
// // //   },
// // //   inputGroup: {
// // //     marginBottom: 20,
// // //   },
// // //   label: {
// // //     fontFamily: 'Inter-SemiBold',
// // //     fontSize: 14,
// // //     color: '#333',
// // //     marginBottom: 8,
// // //   },
// // //   textInput: {
// // //     borderWidth: 1,
// // //     borderColor: '#E5E5E5',
// // //     borderRadius: 12,
// // //     backgroundColor: '#F8F9FA',
// // //   },
// // //   phoneInput: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     borderWidth: 1,
// // //     borderColor: '#E5E5E5',
// // //     borderRadius: 12,
// // //     backgroundColor: '#F8F9FA',
// // //   },
// // //   countryCode: {
// // //     fontFamily: 'Inter-SemiBold',
// // //     fontSize: 16,
// // //     color: '#333',
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 14,
// // //     borderRightWidth: 1,
// // //     borderRightColor: '#E5E5E5',
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     fontFamily: 'Inter-Regular',
// // //     fontSize: 16,
// // //     color: '#333',
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 14,
// // //   },
// // //   otpInput: {
// // //     borderWidth: 1,
// // //     borderColor: '#E5E5E5',
// // //     borderRadius: 12,
// // //     backgroundColor: '#F8F9FA',
// // //     textAlign: 'center',
// // //     letterSpacing: 8,
// // //     fontSize: 24,
// // //   },
// // //   errorText: {
// // //     fontFamily: 'Inter-Regular',
// // //     fontSize: 12,
// // //     color: '#FF4B4B',
// // //     marginTop: 4,
// // //   },
// // //   signupButton: {
// // //     backgroundColor: '#4A90E2',
// // //     borderRadius: 12,
// // //     padding: 16,
// // //     alignItems: 'center',
// // //     marginTop: 24,
// // //   },
// // //   signupButtonText: {
// // //     fontFamily: 'Inter-SemiBold',
// // //     fontSize: 16,
// // //     color: '#fff',
// // //   },
// // //   resendButton: {
// // //     alignItems: 'center',
// // //     marginTop: 16,
// // //   },
// // //   resendText: {
// // //     fontFamily: 'Inter-SemiBold',
// // //     fontSize: 14,
// // //     color: '#4A90E2',
// // //   },
// // //   loginContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginTop: 24,
// // //   },
// // //   loginText: {
// // //     fontFamily: 'Inter-Regular',
// // //     fontSize: 14,
// // //     color: '#666',
// // //   },
// // //   loginLink: {
// // //     fontFamily: 'Inter-SemiBold',
// // //     fontSize: 14,
// // //     color: '#4A90E2',
// // //   },
// // // });




// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Button,
// // //   SafeAreaView,
// // //   Text,
// // //   TextInput,
// // //   Touchable,
// // //   TouchableOpacity,
// // //   View,
// // // } from "react-native";
// // // import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "firebase/auth";
// // // import app from "@/lib/firebase";

// // // const auth = getAuth(app);

// // // export default function signup() {
// // //   // If null, no SMS has been sent
// // //   const [confirm, setConfirm] = useState(null);

// // //   // verification code (OTP - One-Time-Passcode)
// // //   const [code, setCode] = useState("");
// // //   const [initializing, setInitializing] = useState(true);
// // //   const [user, setUser] = useState();

// // //   function onAuthStateChanged(user) {
// // //     setUser(user);
// // //     if (initializing) setInitializing(false);
// // //   }

// // //   useEffect(() => {
// // //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// // //     return subscriber; // unsubscribe on unmount
// // //   }, []);

// // //   // Handle login

// // //   // Handle the button press
// // //   async function signInWithPhoneNumber(phoneNumber) {
// // //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
// // //     setConfirm(confirmation);
// // //   }

// // //   async function confirmCode() {
// // //     try {
// // //       await confirm.confirm(code);
// // //     } catch (error) {
// // //       console.log("Invalid code.");
// // //     }
// // //   }

// // //   if (initializing) return null;

// // //   if (!user) {
// // //     if (!confirm) {
// // //       return (
// // //         <SafeAreaView>
// // //           <TouchableOpacity
// // //             onPress={() => signInWithPhoneNumber("+1 650-555-3434")}
// // //           >
// // //             <Text>Sign I</Text>
// // //           </TouchableOpacity>
// // //         </SafeAreaView>
// // //       );
// // //     }

// // //     return (
// // //       <>
// // //         <TextInput value={code} onChangeText={(text) => setCode(text)} />
// // //         <Button title="Confirm Code" onPress={() => confirmCode()} />
// // //       </>
// // //     );
// // //   }

// // //   return (
// // //     <View>
// // //       <Text>Welcome {user.phoneNumber}</Text>
// // //     </View>
// // //   );
// // // }




// // // import React, { useState, useEffect } from "react";
// // // import { 
// // //   Button, SafeAreaView, Text, TextInput, TouchableOpacity, View 
// // // } from "react-native";
// // // import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "firebase/auth";
// // // import app from "@/lib/firebase";
// // // const auth = getAuth(app);

// // // export default function Signup() {
// // //   const [confirm, setConfirm] = useState(null);
// // //   const [code, setCode] = useState("");
// // //   const [initializing, setInitializing] = useState(true);
// // //   const [user, setUser] = useState(null);



// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// // //       setUser(user);
// // //       if (initializing) setInitializing(false);
// // //     });
// // //     return unsubscribe; // Cleanup function
// // //   }, []);

// // //   async function handleSignIn(phoneNumber) {
// // //     try {
// // //       const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
// // //       setConfirm(confirmation);
// // //     } catch (error) {
// // //       console.error("Error signing in:", error);
// // //     }
// // //   }

// // //   async function confirmCode() {
// // //     try {
// // //       await confirm.confirm(code);
// // //     } catch (error) {
// // //       console.error("Invalid code.");
// // //     }
// // //   }

// // //   if (initializing) return null;

// // //   return (
// // //     <SafeAreaView>
// // //       {!user ? (
// // //         !confirm ? (
// // //           <TouchableOpacity onPress={() => handleSignIn("+1 535-315-9904")} >
// // //             <Text> Phone Numer Sign In</Text>
// // //           </TouchableOpacity>
// // //         ) : (
// // //           <View>
// // //             <TextInput 
// // //               value={code} 
// // //               onChangeText={setCode} 
// // //               placeholder="Enter OTP"
// // //             />
// // //             <Button title="Confirm Code" onPress={confirmCode} />
// // //           </View>
// // //         )
// // //       ) : (
// // //         <Text>Welcome {user.phoneNumber}</Text>
// // //       )}
// // //     </SafeAreaView>
// // //   );
// // // }








// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   SafeAreaView,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "firebase/auth";
// // // import app from "@/lib/firebase";

// // const auth = getAuth(app);

// // export default function Signup() {
// //   const [confirm, setConfirm] = useState(null);
// //   const [code, setCode] = useState("");
// //   const [initializing, setInitializing] = useState(true);
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setUser(user);
// //       if (initializing) setInitializing(false);
// //     });

// //     return unsubscribe; // Cleanup function to unsubscribe on unmount
// //   }, [initializing]);

// //   // Handle phone number sign-in
// //   async function handleSignIn(phoneNumber) {
// //     try {
// //       const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
// //       setConfirm(confirmation);
// //     } catch (error) {
// //       console.error("Error signing in:", error);
// //     }
// //   }

// //   // Handle OTP confirmation
// //   async function confirmCode() {
// //     try {
// //       await confirm.confirm(code);
// //     } catch (error) {
// //       console.error("Invalid code.");
// //     }
// //   }

// //   if (initializing) return null;

// //   if (!user) {
// //     return (
// //       <SafeAreaView>
// //         {!confirm ? (
// //           <TouchableOpacity onPress={() => handleSignIn("+91 70086 52002")} style={{ padding: 20 }}>
// //             <Text>Phone Number Sign In</Text>
// //           </TouchableOpacity>
// //         ) : (
// //           <>
// //             <TextInput value={code} onChangeText={setCode} placeholder="Enter OTP" />
// //             <Button title="Confirm Code" onPress={confirmCode} />
// //           </>
// //         )}
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <View>
// //       <Text>Welcome {user?.phoneNumber}</Text>
// //     </View>
// //   );
// // }








// import React, { useState } from "react";
// import { View, TextInput, Button, Text, Alert } from "react-native";
// import { useFirebaseLogin } from "@/hooks/useFirebaseLoginHook";
// import { firebaseConfig } from "@/lib/firebaseConfig";

// const Signup = () => {
//   const { Recaptcha, RecaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({ firebaseConfig });

//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationId, setVerificationId] = useState<string | null>(null);
//   const [otp, setOtp] = useState("");

//   const handleSendOtp = async () => {
//     try {
//       const id = await sendOtp(phoneNumber);
//       setVerificationId(id);
//       Alert.alert("OTP Sent", "Please check your phone for the verification code.");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       if (!verificationId) return;
//       await verifyOtp(verificationId, otp);
//       Alert.alert("Success", "Phone number verified successfully!");
//     } catch (error) {
//       Alert.alert("Error", "Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       {Recaptcha}
//       <Text>Enter your phone number:</Text>
//       <TextInput
//         placeholder="+1234567890"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//         style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
//       />
//       <Button title="Send OTP" onPress={handleSendOtp} />

//       {verificationId && (
//         <>
//           <Text>Enter OTP:</Text>
//           <TextInput
//             placeholder="123456"
//             value={otp}
//             onChangeText={setOtp}
//             keyboardType="number-pad"
//             style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
//           />
//           <Button title="Verify OTP" onPress={handleVerifyOtp} />
//         </>
//       )}

//       {RecaptchaBanner}
//     </View>
//   );
// };

// export default Signup;












import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useFirebaseLogin } from "@/hooks/useFirebaseLoginHook";
import { auth, firebaseConfig } from "@/lib/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";


const AuthScreen = () => {
  const { recaptchaVerifier, sendOtp, verifyOtp } = useFirebaseLogin();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    try {
      const id = await sendOtp(phoneNumber);
      setVerificationId(id);
      Alert.alert("OTP Sent", "Please check your phone for the verification code.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!verificationId) return;
      await verifyOtp(verificationId, otp);
      Alert.alert("Success", "Phone number verified successfully!");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* ✅ Recaptcha component is now correctly used inside a component */}
      {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={auth.app.options} /> */}

      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      

      <Text>Enter your phone number:</Text>
      <TextInput
        placeholder="+1234567890"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />

      {verificationId && (
        <>
          <Text>Enter OTP:</Text>
          <TextInput
            placeholder="123456"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      )}
    </View>
  );
};

export default AuthScreen;
