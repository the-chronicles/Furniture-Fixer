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
} from "react-native";
import { router } from "expo-router";
import { useFirebaseLogin } from "@/hooks/useFirebaseLoginHook";
import { firebaseConfig } from "@/lib/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as Location from "expo-location";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Signup() {
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});
  const { recaptchaVerifier, sendOtp, verifyOtp } = useFirebaseLogin();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Firestore
  const db = getFirestore();
  const auth = getAuth();

  const storeUserData = async (userData: {
    phone: string;
    location: {
      coordinates: { latitude: number; longitude: number };
      address: string;
    };
  }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error("Error storing user data:", error);
      throw error;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "We need location permission to provide better service"
        );
        return false;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocode to get address
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const firstAddress = addressResponse[0];
        const formattedAddress = `${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.postalCode}, ${firstAddress.country}`;
        setAddress(formattedAddress);
      }

      return location;
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Error",
        "Could not get your location. Please enable location services."
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit Indian phone number",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, phone: undefined }));
    return true;
  };

  const handlePhoneNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    const limited = cleaned.slice(0, 10);
    setPhoneNumber(limited);

    // Clear error when typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!validatePhone(phoneNumber)) return;

      // const fullPhoneNumber = `+91${phoneNumber}`;
      // const id = await sendOtp(fullPhoneNumber);
      // setVerificationId(id ?? null);
      // Alert.alert("OTP Sent", "Please check your phone for the verification code");
      // setStep(2);
      router.replace("/(app)/(customer)");
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!verificationId) return;
      setIsSubmitting(true);

      // 1. Verify OTP first
      await verifyOtp(verificationId, otp);
      
      // 2. Get location
      const userLocation = await getCurrentLocation();
      if (!userLocation) {
        throw new Error("Could not get your location");
      }

      // 3. Prepare user data
      const userData = {
        phone: `+91${phoneNumber}`,
        location: {
          coordinates: {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          },
          address: address || "Address not available",
        },
      };

      // 4. Store in Firestore
      await storeUserData(userData);

      Alert.alert("Success", "Account created successfully!");
      router.replace("/(app)/(customer)");
    } catch (error) {
      console.error("Full Error:", error);
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setIsSubmitting(false);
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
        <Text style={styles.title}>Login/Register</Text>
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInput}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit mobile number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSendOtp}
            >
              <Text style={styles.signupButtonText}>Send OTP</Text>
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
            {errors.otp ? (
              <Text style={styles.errorText}>{errors.otp}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleVerifyOtp}
              disabled={isLoadingLocation}
            >
              <Text style={styles.signupButtonText}>
                {isLoadingLocation
                  ? "Getting your location..."
                  : "Verify & Continue"}
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
    textAlign: "center",
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
  locationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  locationLabel: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  locationText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
});
