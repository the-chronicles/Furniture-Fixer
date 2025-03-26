import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { PhoneAuthProvider, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/lib/firebase';
// import auth from '@react-native-firebase/auth';


export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    phone: '',
    otp: ''
  });

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSendOTP = async () => {
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
      return;
    }
    
    if (!validatePhone(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid Indian phone number' }));
      return;
    }

    try {
      if (Platform.OS === 'web') {
        // For web platform
        const recaptchaVerifier = new PhoneAuthProvider.RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
        
        const phoneNumber = `+91${phone}`;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        setVerificationId(confirmationResult.verificationId);
        setStep(2);
        setErrors({ phone: '', otp: '' });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrors(prev => ({ ...prev, phone: 'Error sending OTP. Please try again.' }));
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      router.replace('/(app)/(customer)');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          {step === 1 ? 'Sign in with your phone number' : 'Enter the verification code'}
        </Text>
      </View>

      <View style={styles.form}>
        {Platform.OS === 'web' && <div id="recaptcha-container" />}
        
        {step === 1 ? (
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

            <TouchableOpacity style={styles.loginButton} onPress={handleSendOTP}>
              <Text style={styles.loginButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
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

            <TouchableOpacity style={styles.loginButton} onPress={handleVerifyOTP}>
              <Text style={styles.loginButtonText}>Verify & Sign In</Text>
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

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
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
    backgroundColor: '#99631f',
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
    textAlign: 'center',
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
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FF4B4B',
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#99631f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
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
    color: '#99631f',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#99631f',
  },
});









// // New update
// // import { AuthHeader, Button } from "@/components/shared";
// import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { Input } from "@/components/forms/Input";
// import { useRef, useState } from "react";
// import { useRouter } from "expo-router";
// // import tw from "@/tw";
// // import { useTheme } from "@/utils/hooks";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { PhoneModal } from "@/components/shared/PhoneModal";
// // import { showToast } from "@/utils/functions";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"; // Use the correct package
// import { PhoneAuthProvider } from "firebase/auth";
// import { useTranslation } from "react-i18next";
// import { app, auth } from "@/lib/firebaseConfig";
// import { Modal } from "react-native";

// const Schema = z.object({
//   phone: z.string().min(1).refine((phoneNumber) => /^[0-9]+$/.test(phoneNumber), {
//     message: "Phone number must contain only numbers",
//   }),
// });

// type ValidationType = z.infer<typeof Schema>;

// export default function Login() {
//   const { t } = useTranslation();
//   const recaptchaVerifier = useRef(null);
//   // const { isDark } = useTheme();
//   const [countryCode, setCountryCode] = useState("+234");
//   const router = useRouter();
//   const [showCountryCodeModal, setShowCountryCodeModal] = useState(false);
//   const methods = useForm<ValidationType>({
//     mode: "onBlur",
//     resolver: zodResolver(Schema),
//   });

//   function closeModal() {
//     setShowCountryCodeModal(false);
//   }

//   const handleSubmit: SubmitHandler<ValidationType> = async (values) => {
//     try {
//       const phoneProvider = new PhoneAuthProvider(auth);
//       const verificationId = await phoneProvider.verifyPhoneNumber(
//         countryCode + values.phone,
//         recaptchaVerifier.current as any
//       );
//       showToast("Verification code sent!", "success");

//       // Navigate to confirm OTP page
//       router.push({
//         pathname: "/(auth)/confirm-otp",
//         params: { verificationId, phone: countryCode + values.phone, countryCode },
//       });
//     } catch (err: any) {
//       showToast(`Error: ${err.message}`, "error");
//     }
//   };

//   return (
//     <>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={app.options}
//         attemptInvisibleVerification={true}
//       />
//       <Modal
//         isShowingModal={showCountryCodeModal}
//         closeModal={closeModal}
//         handlePress={(arg) => setCountryCode(arg)}
//       />
//       <SafeAreaView style={tw.style("flex-1 px-6 bg-white", isDark && "bg-custom-black")}>
//         <KeyboardAwareScrollView contentContainerStyle={{ gap: 37 }} showsVerticalScrollIndicator={false}>
//           {/* <AuthHeader title={t("loginPhone")} /> */}
//           <Text>Login</Text>
//           <View style={{ gap: 24 }}>
//             <FormProvider {...methods}>
//               <TextInput<ValidationType>
//                 keyboardType="number-pad"
//                 inputLeftElement={
//                   <TouchableOpacity onPress={() => setShowCountryCodeModal(true)} accessible={true}>
//                     <Text style={tw.style("font-dmSans-500 text-lg text-custom-black", isDark && "text-white")}>
//                       {countryCode}
//                     </Text>
//                   </TouchableOpacity>
//                 }
//                 placeholder="923 434 3"
//                 name="phone"
//               />
//             </FormProvider>
//           </View>
//           {/* <Button isLoading={methods.formState.isSubmitting} onPress={methods.handleSubmit(handleSubmit)} /> */}
//           <Button title="Submit" isLoading={methods.formState.isSubmitting} onPress={methods.handleSubmit(handleSubmit)} />
//         </KeyboardAwareScrollView>
//       </SafeAreaView>
//     </>
//   );
// }
