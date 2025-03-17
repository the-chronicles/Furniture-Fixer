// // import { useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
// // import { Link, router } from 'expo-router';
// // import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';

// // export default function Signup() {
// //   const [name, setName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [verificationId, setVerificationId] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [step, setStep] = useState(1); // 1: Details, 2: OTP
// //   const [errors, setErrors] = useState({
// //     name: '',
// //     phone: '',
// //     otp: ''
// //   });

// //   const validatePhone = (number: string) => {
// //     const phoneRegex = /^[6-9]\d{9}$/;
// //     return phoneRegex.test(number);
// //   };

// //   // const handleSendOTP = async () => {
// //   //   const newErrors = {
// //   //     name: '',
// //   //     phone: '',
// //   //     otp: ''
// //   //   };

// //   //   if (!name.trim()) {
// //   //     newErrors.name = 'Name is required';
// //   //   }

// //   //   if (!phone) {
// //   //     newErrors.phone = 'Phone number is required';
// //   //   } else if (!validatePhone(phone)) {
// //   //     newErrors.phone = 'Please enter a valid Indian phone number';
// //   //   }

// //   //   setErrors(newErrors);

// //   //   // if (!Object.values(newErrors).some(error => error)) {
// //   //   //   try {
// //   //   //     // In a real implementation, this would be replaced with actual Firebase phone auth
// //   //   //     // For web, you'd need to implement reCAPTCHA verification
// //   //   //     // const appVerifier = window.recaptchaVerifier;
// //   //   //     const phoneNumber = `+91${phone}`;
// //   //   //     const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
// //   //   //     setVerificationId(confirmationResult.verificationId);
// //   //   //     setStep(2);
// //   //   //   } catch (error) {
// //   //   //     console.error('Error sending OTP:', error);
// //   //   //     setErrors(prev => ({ ...prev, phone: 'Error sending OTP. Please try again.' }));
// //   //   //   }
// //   //   // }

// //   //   if (Object.values(newErrors).some(error => error)) return;

// //   // try {
// //   //   const phoneNumber = `+91${phone}`;

// //   //   // Initialize RecaptchaVerifier
// //   //   const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
// //   //     size: 'invisible',
// //   //     callback: (response) => {
// //   //       console.log('Recaptcha verified:', response);
// //   //     },
// //   //   });

// //   //   const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// //   //   setVerificationId(confirmation.verificationId);
// //   //   setStep(2);
// //   // } catch (error) {
// //   //   console.error('Error sending OTP:', error);
// //   //   setErrors(prev => ({ ...prev, phone: 'Error sending OTP. Please try again.' }));
// //   // }
// //   // };

// //   const handleSendOTP = async () => {
// //     if (!phone) {
// //       setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
// //       return;
// //     }

// //     try {
// //       const phoneNumber = `+91${phone}`;
// //       const auth = getAuth();

// //       if (!window.recaptchaVerifier) {
// //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
// //           size: 'invisible',
// //           callback: (response) => {
// //             console.log('Recaptcha verified:', response);
// //           },
// //           'expired-callback': () => {
// //             console.error('Recaptcha expired. Please try again.');
// //           }
// //         });
// //       }

// //       const appVerifier = window.recaptchaVerifier;
// //       const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// //       setVerificationId(confirmation.verificationId);
// //       setStep(2);
// //     } catch (error) {
// //       console.error("Error sending OTP:", error);
// //       setErrors((prev) => ({ ...prev, phone: "Error sending OTP. Please try again." }));
// //     }
// //   };

// //   // const handleVerifyOTP = async () => {
// //   //   if (!otp || otp.length !== 6) {
// //   //     setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
// //   //     return;
// //   //   }

// //   //   try {
// //   //     const credential = PhoneAuthProvider.credential(verificationId, otp);
// //   //     await signInWithCredential(auth, credential);
// //   //     router.replace('/(app)/(customer)');
// //   //   } catch (error) {
// //   //     console.error('Error verifying OTP:', error);
// //   //     setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
// //   //   }
// //   // };

// //   const handleVerifyOTP = async () => {
// //     if (!otp || otp.length !== 6) {
// //       setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
// //       return;
// //     }

// //     try {
// //       const credential = PhoneAuthProvider.credential(verificationId, otp);
// //       await signInWithCredential(auth, credential);
// //       router.replace('/(app)/(customer)');
// //     } catch (error) {
// //       console.error('Error verifying OTP:', error);
// //       setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
// //       <View style={styles.header}>
// //         <Image
// //           source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
// //           style={styles.logo}
// //         />
// //         <Text style={styles.title}>Create Account</Text>
// //         <Text style={styles.subtitle}>
// //           {step === 1 ? 'Join our community today' : 'Verify your phone number'}
// //         </Text>
// //       </View>

// //       <View style={styles.form}>
// //       <View id="recaptcha-container"></View>

// //         {step === 1 ? (
// //           <>
// //             <View style={styles.inputGroup}>
// //               <Text style={styles.label}>Full Name</Text>
// //               <TextInput
// //                 style={[styles.input, styles.textInput]}
// //                 placeholder="Enter your full name"
// //                 value={name}
// //                 onChangeText={setName}
// //               />
// //               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
// //             </View>

// //             <View style={styles.inputGroup}>
// //               <Text style={styles.label}>Phone Number</Text>
// //               <View style={styles.phoneInput}>
// //                 <Text style={styles.countryCode}>+91</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   placeholder="Enter your phone number"
// //                   keyboardType="phone-pad"
// //                   value={phone}
// //                   onChangeText={setPhone}
// //                   maxLength={10}
// //                 />
// //               </View>
// //               {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
// //             </View>

// //             <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
// //               <Text style={styles.signupButtonText}>Send OTP</Text>
// //             </TouchableOpacity>
// //           </>
// //         ) : (
// //           <View style={styles.inputGroup}>
// //             <Text style={styles.label}>Enter OTP</Text>
// //             <TextInput
// //               style={[styles.input, styles.otpInput]}
// //               placeholder="Enter 6-digit OTP"
// //               keyboardType="number-pad"
// //               value={otp}
// //               onChangeText={setOtp}
// //               maxLength={6}
// //             />
// //             {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

// //             <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
// //               <Text style={styles.signupButtonText}>Verify & Create Account</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={styles.resendButton}
// //               onPress={() => {
// //                 setStep(1);
// //                 setOtp('');
// //               }}
// //             >
// //               <Text style={styles.resendText}>Resend OTP</Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         <View style={styles.loginContainer}>
// //           <Text style={styles.loginText}>Already have an account? </Text>
// //           <Link href="/login" asChild>
// //             <TouchableOpacity>
// //               <Text style={styles.loginLink}>Sign In</Text>
// //             </TouchableOpacity>
// //           </Link>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // main

// // import { useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
// // import { Link, router } from 'expo-router';
// // import { PhoneAuthProvider, signInWithCredential, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';

// // export default function Signup() {
// //   const [name, setName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [verificationId, setVerificationId] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [step, setStep] = useState(1);
// //   const [errors, setErrors] = useState({ name: '', phone: '', otp: '' });

// //   const validatePhone = (number: string) => /^[6-9]\d{9}$/.test(number);

// //   const handleSendOTP = async () => {
// //     setErrors({ name: '', phone: '', otp: '' });

// //     if (!name.trim()) {
// //       setErrors(prev => ({ ...prev, name: 'Name is required' }));
// //       return;
// //     }

// //     if (!phone) {
// //       setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
// //       return;
// //     }

// //     if (!validatePhone(phone)) {
// //       setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
// //       return;
// //     }

// //     try {
// //       const phoneNumber = `+234${phone}`;
// //       const confirmation = await signInWithPhoneNumber(auth, phoneNumber); // 🔹 Remove RecaptchaVerifier
// //       setVerificationId(confirmation.verificationId);
// //       setStep(2);
// //       Alert.alert("OTP Sent", "Please check your phone for the OTP.");
// //     } catch (error) {
// //       console.error("Error sending OTP:", error);
// //       setErrors(prev => ({ ...prev, phone: 'Error sending OTP. Try again.' }));
// //     }
// //   };

// //   const handleVerifyOTP = async () => {
// //     if (!otp || otp.length !== 6) {
// //       setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
// //       return;
// //     }

// //     if (!verificationId) {
// //       Alert.alert("Error", "No OTP request found. Please request OTP again.");
// //       setStep(1);
// //       return;
// //     }

// //     try {
// //       const credential = PhoneAuthProvider.credential(verificationId, otp);
// //       await signInWithCredential(auth, credential);
// //       Alert.alert("Success", "Account created successfully!");
// //       router.replace('/(app)/(customer)'); // Redirect to home page
// //     } catch (error) {
// //       console.error('Error verifying OTP:', error);
// //       setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Try again.' }));
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
// //       <View style={styles.header}>
// //         <Image source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }} style={styles.logo} />
// //         <Text style={styles.title}>Create Account</Text>
// //         <Text style={styles.subtitle}>{step === 1 ? 'Join our community today' : 'Verify your phone number'}</Text>
// //       </View>

// //       <View style={styles.form}>
// //         {Platform.OS === 'web' && <div id="recaptcha-container" />}

// //         {step === 1 ? (
// //           <>
// //             <View style={styles.inputGroup}>
// //               <Text style={styles.label}>Full Name</Text>
// //               <TextInput style={[styles.input, styles.textInput]} placeholder="Enter your full name" value={name} onChangeText={setName} />
// //               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
// //             </View>

// //             <View style={styles.inputGroup}>
// //               <Text style={styles.label}>Phone Number</Text>
// //               <View style={styles.phoneInput}>
// //                 <Text style={styles.countryCode}>+91</Text>
// //                 <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} maxLength={10} />
// //               </View>
// //               {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
// //             </View>

// //             <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
// //               <Text style={styles.signupButtonText}>Send OTP</Text>
// //             </TouchableOpacity>
// //           </>
// //         ) : (
// //           <View style={styles.inputGroup}>
// //             <Text style={styles.label}>Enter OTP</Text>
// //             <TextInput style={[styles.input, styles.otpInput]} placeholder="Enter 6-digit OTP" keyboardType="number-pad" value={otp} onChangeText={setOtp} maxLength={6} />
// //             {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

// //             <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
// //               <Text style={styles.signupButtonText}>Verify & Create Account</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.resendButton} onPress={() => setStep(1)}>
// //               <Text style={styles.resendText}>Resend OTP</Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         <View style={styles.loginContainer}>
// //           <Text style={styles.loginText}>Already have an account? </Text>
// //           <Link href="/login" asChild>
// //             <TouchableOpacity>
// //               <Text style={styles.loginLink}>Sign In</Text>
// //             </TouchableOpacity>
// //           </Link>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, Platform, StyleSheet } from "react-native";
// import { signInWithPhoneNumber, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

// export default function Signup() {
//   const [phone, setPhone] = useState("");
//   const [verificationId, setVerificationId] = useState("");
//   const [otp, setOtp] = useState("");
//   const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

//   useEffect(() => {
//     if (Platform.OS !== "web") {
//       setRecaptchaVerifier(new FirebaseRecaptchaVerifierModal({
//         firebaseConfig: auth.app.options,
//         attemptInvisibleVerification: true,
//       }));
//     }
//   }, []);

//   const handleSendOTP = async () => {
//     if (!phone) {
//       Alert.alert("Error", "Please enter your phone number");
//       return;
//     }

//     try {
//       const phoneNumber = `+91${phone}`;
//       const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
//       setVerificationId(confirmation.verificationId);
//       Alert.alert("OTP Sent", "Please check your messages.");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Could not send OTP. Please try again.");
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert("Error", "Please enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       Alert.alert("Success", "Authentication successful!");
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <View>
//       <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={auth.app.options} />

//       <Text>Phone Number</Text>
//       <TextInput
//         placeholder="Enter phone number"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />

//       <TouchableOpacity onPress={handleSendOTP}>
//         <Text>Send OTP</Text>
//       </TouchableOpacity>

//       {verificationId ? (
//         <>
//           <Text>Enter OTP</Text>
//           <TextInput
//             placeholder="Enter OTP"
//             value={otp}
//             onChangeText={setOtp}
//             keyboardType="number-pad"
//           />

//           <TouchableOpacity onPress={handleVerifyOTP}>
//             <Text>Verify OTP</Text>
//           </TouchableOpacity>
//         </>
//       ) : null}
//     </View>
//   );
// }

// // Add your styles here...
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   header: {
//     alignItems: 'center',
//     padding: 32,
//     backgroundColor: '#4A90E2',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//     borderWidth: 4,
//     borderColor: '#fff',
//   },
//   title: {
//     fontFamily: 'Poppins-Bold',
//     fontSize: 28,
//     color: '#fff',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#E1E1E1',
//   },
//   form: {
//     padding: 24,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   phoneInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   countryCode: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     borderRightWidth: 1,
//     borderRightColor: '#E5E5E5',
//   },
//   input: {
//     flex: 1,
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//     textAlign: 'center',
//     letterSpacing: 8,
//     fontSize: 24,
//   },
//   errorText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#FF4B4B',
//     marginTop: 4,
//   },
//   signupButton: {
//     backgroundColor: '#4A90E2',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   signupButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#fff',
//   },
//   resendButton: {
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   resendText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   loginText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#666',
//   },
//   loginLink: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
// });

// import { useState} from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
// import { Link, router } from 'expo-router';
// import { auth } from '@/lib/firebase';
// import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';

// export default function Signup() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1); // 1: Details, 2: OTP
//   const [errors, setErrors] = useState({
//     name: '',
//     phone: '',
//     otp: ''
//   });

//   const validatePhone = (number: string) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(number);
//   };

//   const handleSendOTP = async () => {
//     const newErrors = { name: '', phone: '', otp: '' };

//     if (!name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!validatePhone(phone)) {
//       newErrors.phone = 'Please enter a valid Indian phone number';
//     }

//     setErrors(newErrors);

//     if (!Object.values(newErrors).some(error => error)) {
//       try {
//         const phoneNumber = `+91${phone}`;

//         if (Platform.OS === 'web') {
//           // For Web: Use reCAPTCHA
//           const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//             size: 'invisible',
//             callback: () => console.log('reCAPTCHA verified'),
//             'expired-callback': () => {
//               setErrors(prev => ({ ...prev, phone: 'reCAPTCHA expired. Please try again.' }));
//             }
//           });

//           await recaptchaVerifier.render();
//           const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
//           setVerificationId(confirmationResult.verificationId);
//         } else {
//           // For Mobile: No reCAPTCHA needed
//           const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
//           setVerificationId(confirmationResult.verificationId);
//         }

//         setStep(2);
//         setErrors({ name: '', phone: '', otp: '' });
//       } catch (error: any) {
//         console.error('Error sending OTP:', error);
//         setErrors(prev => ({
//           ...prev,
//           phone: error?.message || 'Error sending OTP. Please try again.'
//         }));
//       }
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
//       return;
//     }

//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       router.replace('/(app)/(customer)');
//     } catch (error: any) {
//       console.error('Error verifying OTP:', error);
//       setErrors(prev => ({
//         ...prev,
//         otp: error?.message || 'Invalid OTP. Please try again.'
//       }));
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>
//           {step === 1 ? 'Join our community today' : 'Verify your phone number'}
//         </Text>
//       </View>

//       <View style={styles.form}>
//         {Platform.OS === 'web' && <div id="recaptcha-container" />}

//         {step === 1 ? (
//           <>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Full Name</Text>
//               <TextInput
//                 style={[styles.input, styles.textInput]}
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChangeText={setName}
//               />
//               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Phone Number</Text>
//               <View style={styles.phoneInput}>
//                 <Text style={styles.countryCode}>+91</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your phone number"
//                   keyboardType="phone-pad"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={10}
//                 />
//               </View>
//               {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
//             </View>

//             <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
//               <Text style={styles.signupButtonText}>Send OTP</Text>

//             </TouchableOpacity>
//           </>
//         ) : (
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Enter OTP</Text>
//             <TextInput
//               style={[styles.input, styles.otpInput]}
//               placeholder="Enter 6-digit OTP"
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={setOtp}
//               maxLength={6}
//             />
//             {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

//             <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
//               <Text style={styles.signupButtonText}>Verify & Create Account</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.resendButton}
//               onPress={() => {
//                 setStep(1);
//                 setOtp('');
//               }}
//             >
//               <Text style={styles.resendText}>Resend OTP</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View style={styles.loginContainer}>
//           <Text style={styles.loginText}>Already have an account? </Text>
//           <Link href="/login" asChild>
//             <TouchableOpacity>
//               <Text style={styles.loginLink}>Sign In</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   header: {
//     alignItems: 'center',
//     padding: 32,
//     backgroundColor: '#4A90E2',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//     borderWidth: 4,
//     borderColor: '#fff',
//   },
//   title: {
//     fontFamily: 'Poppins-Bold',
//     fontSize: 28,
//     color: '#fff',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#E1E1E1',
//   },
//   form: {
//     padding: 24,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   phoneInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   countryCode: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     borderRightWidth: 1,
//     borderRightColor: '#E5E5E5',
//   },
//   input: {
//     flex: 1,
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//     textAlign: 'center',
//     letterSpacing: 8,
//     fontSize: 24,
//   },
//   errorText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#FF4B4B',
//     marginTop: 4,
//   },
//   signupButton: {
//     backgroundColor: '#4A90E2',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   signupButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#fff',
//   },
//   resendButton: {
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   resendText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   loginText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#666',
//   },
//   loginLink: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
// });

// import { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
// import { Link, router } from 'expo-router';
// import { auth } from '@/lib/firebase';
// import {
//   PhoneAuthProvider,
//   signInWithCredential,
//   RecaptchaVerifier,
//   signInWithPhoneNumber
// } from 'firebase/auth';

// export default function Signup() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1); // 1: Details, 2: OTP
//   const [errors, setErrors] = useState({
//     name: '',
//     phone: '',
//     otp: ''
//   });

//   const validatePhone = (number: string) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(number);
//   };

//   const handleSendOTP = async () => {
//     const newErrors = {
//       name: '',
//       phone: '',
//       otp: ''
//     };

//     if (!name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!validatePhone(phone)) {
//       newErrors.phone = 'Please enter a valid Indian phone number';
//     }

//     setErrors(newErrors);

//     if (!Object.values(newErrors).some(error => error)) {
//       try {
//         const phoneNumber = `+91${phone}`;

//         if (Platform.OS === 'web') {
//           const existingRecaptcha = document.querySelector('#recaptcha-container div');
//           if (existingRecaptcha) {
//             existingRecaptcha.remove();
//           }

//           const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//             size: 'invisible',
//             callback: () => {
//               console.log('reCAPTCHA verified');
//             },
//             'expired-callback': () => {
//               setErrors(prev => ({ ...prev, phone: 'reCAPTCHA expired. Please try again.' }));
//             }
//           });

//           await recaptchaVerifier.render();
//           const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
//           setVerificationId(confirmationResult.verificationId);
//         } else {
//           const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
//           setVerificationId(confirmationResult.verificationId);
//         }

//         setStep(2);
//         setErrors({ name: '', phone: '', otp: '' });
//       } catch (error: any) {
//         console.error('Error sending OTP:', error);
//         setErrors(prev => ({
//           ...prev,
//           phone: error?.message || 'Error sending OTP. Please try again.'
//         }));
//       }
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
//       return;
//     }

//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       router.replace('/(app)/(customer)');
//     } catch (error: any) {
//       console.error('Error verifying OTP:', error);
//       setErrors(prev => ({
//         ...prev,
//         otp: error?.message || 'Invalid OTP. Please try again.'
//       }));
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>
//           {step === 1 ? 'Join our community today' : 'Verify your phone number'}
//         </Text>
//       </View>

//       <View style={styles.form}>
//         {Platform.OS === 'web' && <div id="recaptcha-container" />}

//         {step === 1 ? (
//           <>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Full Name</Text>
//               <TextInput
//                 style={[styles.input, styles.textInput]}
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChangeText={setName}
//               />
//               {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Phone Number</Text>
//               <View style={styles.phoneInput}>
//                 <Text style={styles.countryCode}>+91</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your phone number"
//                   keyboardType="phone-pad"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={10}
//                 />
//               </View>
//               {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
//             </View>

//             <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
//               <Text style={styles.signupButtonText}>Send OTP</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Enter OTP</Text>
//             <TextInput
//               style={[styles.input, styles.otpInput]}
//               placeholder="Enter 6-digit OTP"
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={setOtp}
//               maxLength={6}
//             />
//             {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

//             <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
//               <Text style={styles.signupButtonText}>Verify & Create Account</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.resendButton}
//               onPress={() => {
//                 setStep(1);
//                 setOtp('');
//               }}
//             >
//               <Text style={styles.resendText}>Resend OTP</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View style={styles.loginContainer}>
//           <Text style={styles.loginText}>Already have an account? </Text>
//           <Link href="/login" asChild>
//             <TouchableOpacity>
//               <Text style={styles.loginLink}>Sign In</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   header: {
//     alignItems: 'center',
//     padding: 32,
//     backgroundColor: '#4A90E2',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//     borderWidth: 4,
//     borderColor: '#fff',
//   },
//   title: {
//     fontFamily: 'Poppins-Bold',
//     fontSize: 28,
//     color: '#fff',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#E1E1E1',
//   },
//   form: {
//     padding: 24,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   phoneInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   countryCode: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     borderRightWidth: 1,
//     borderRightColor: '#E5E5E5',
//   },
//   input: {
//     flex: 1,
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     backgroundColor: '#F8F9FA',
//     textAlign: 'center',
//     letterSpacing: 8,
//     fontSize: 24,
//   },
//   errorText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 12,
//     color: '#FF4B4B',
//     marginTop: 4,
//   },
//   signupButton: {
//     backgroundColor: '#4A90E2',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   signupButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#fff',
//   },
//   resendButton: {
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   resendText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   loginText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#666',
//   },
//   loginLink: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 14,
//     color: '#4A90E2',
//   },
// });

//toh

import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { auth } from '@/lib/firebase';
import { 
  PhoneAuthProvider, 
  signInWithCredential, 
  RecaptchaVerifier,
  signInWithPhoneNumber 
} from 'firebase/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    otp: ''
  });

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSendOTP = async () => {
    const newErrors = {
      name: '',
      phone: '',
      otp: ''
    };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      try {
        const phoneNumber = `+91${phone}`;
        
        if (Platform.OS === 'web') {
          const existingRecaptcha = document.querySelector('#recaptcha-container div');
          if (existingRecaptcha) {
            existingRecaptcha.remove();
          }

          const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              console.log('reCAPTCHA verified');
            },
            'expired-callback': () => {
              setErrors(prev => ({ ...prev, phone: 'reCAPTCHA expired. Please try again.' }));
            }
          });

          await recaptchaVerifier.render();
          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
          setVerificationId(confirmationResult.verificationId);
        } else {
          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
          setVerificationId(confirmationResult.verificationId);
        }
        
        setStep(2);
        setErrors({ name: '', phone: '', otp: '' });
      } catch (error: any) {
        console.error('Error sending OTP:', error);
        setErrors(prev => ({ 
          ...prev, 
          phone: error?.message || 'Error sending OTP. Please try again.' 
        }));
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      router.replace('/(app)/(customer)');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setErrors(prev => ({ 
        ...prev, 
        otp: error?.message || 'Invalid OTP. Please try again.' 
      }));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          {step === 1 ? 'Join our community today' : 'Verify your phone number'}
        </Text>
      </View>

      <View style={styles.form}>
        {Platform.OS === 'web' && <div id="recaptcha-container" />}
        
        {step === 1 ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInput}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>

            <TouchableOpacity style={styles.signupButton} onPress={handleSendOTP}>
              <Text style={styles.signupButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={[styles.input, styles.otpInput]}
              placeholder="Enter 6-digit OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />
            {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

            <TouchableOpacity style={styles.signupButton} onPress={handleVerifyOTP}>
              <Text style={styles.signupButtonText}>Verify & Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                setStep(1);
                setOtp('');
              }}
            >
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E1E1E1',
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  countryCode: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FF4B4B',
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
  },
});