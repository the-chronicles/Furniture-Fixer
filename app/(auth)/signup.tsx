import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { Link, router, useRouter } from "expo-router";
import { useFirebaseLogin } from "@/hooks/useFirebaseLoginHook";
import { firebaseConfig } from "@/lib/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function Signup() {
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    otp?: string;
  }>({});
  const { recaptchaVerifier, sendOtp, verifyOtp } = useFirebaseLogin();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);

  // const router = useRouter();

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSendOtp = async () => {
    try {
      const id = await sendOtp(phoneNumber);
      setVerificationId(id ?? null);
      Alert.alert(
        "OTP Sent",
        "Please check your phone for the verification code."
      );
      setStep(2);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!verificationId) return;

      await verifyOtp(verificationId, otp);
      Alert.alert("Success", "Phone number verified successfully!");
      console.log("Navigating to customer page...");
      
      router.replace("/(app)/(customer)");
    } catch (error) {
      console.error("Full Error:", error);
      Alert.alert("Error", "Failed to navigate: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          {step === 1 ? "" : "Verify your phone number"}
        </Text>
      </View>

      <View style={styles.form}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

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
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInput}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+912345678901"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  // maxLength={10}
                />
              </View>
              {errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSendOtp}
            >
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
            {errors.otp ? (
              <Text style={styles.errorText}>{errors.otp}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.signupButtonText}>
                Verify & Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                setStep(1);
                setOtp("");
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
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#99631f",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#fff",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#fff",
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#E1E1E1",
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  countryCode: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
  input: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    textAlign: "center",
    letterSpacing: 8,
    fontSize: 24,
  },
  errorText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#FF4B4B",
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: "#99631f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  signupButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  resendButton: {
    alignItems: "center",
    marginTop: 16,
  },
  resendText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#99631f",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#99631f",
  },
});



// import React, { useState } from "react";
// import { View, TextInput, Button, Text, Alert } from "react-native";
// import { useFirebaseLogin } from "@/hooks/useFirebaseLoginHook";
// import { auth, firebaseConfig } from "@/lib/firebaseConfig";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { router } from "expo-router";

// const AuthScreen = () => {
//   const { recaptchaVerifier, sendOtp, verifyOtp } = useFirebaseLogin();
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
//       router.replace('/(app)/(customer)');
//     } catch (error) {
//       Alert.alert("Error", "Invalid OTP. Please try again.");

//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       {/* ✅ Recaptcha component is now correctly used inside a component */}
//       {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={auth.app.options} /> */}

//       <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

//       <Text>Enter your phone number:</Text>
//       <TextInput
//       style={styles.input}
//         placeholder="+912345678901"
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
//     </View>
//   );
// };

// export default AuthScreen;
