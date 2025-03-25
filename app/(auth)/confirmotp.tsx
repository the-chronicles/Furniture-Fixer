import { OtpInput } from "@/components/otp";
// import { AuthHeader, Button, ResendButton } from "@/components/shared";
import { app, auth } from "@/lib/firebaseConfig";
// import tw from "@/tw";
// import { useTheme } from "@/utils/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import { showToast } from "@/utils/functions";
import { useTranslation } from "react-i18next";

export default function ConfirmOtp() {
  const { t } = useTranslation();
  const { verificationId } = useLocalSearchParams<{ verificationId: string }>();
  // const { isDark } = useTheme();
  const router = useRouter();
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleOtp() {
    try {
      setIsLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      await signInWithCredential(auth, credential);
      
      showToast(t("otpVerified"), "success");
      router.push("/(protected)/(onboarding)/name");
    } catch (err: any) {
      Alert.alert("Error", t("errorOtp"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={tw.style("flex-1 px-6 bg-white", isDark && "bg-custom-black")}>
      <KeyboardAwareScrollView contentContainerStyle={{ gap: 37 }} showsVerticalScrollIndicator={false}>
        {/* <AuthHeader title={t("confirmationCode")} /> */}
        <Text>Confirm</Text>
        <View style={{ gap: 67, marginTop: 13 }}>
          {/* <OtpInput code={otpCode} setCode={setOTPCode} maximumLength={6} setIsPinReady={setIsPinReady} /> */}
          <TextInput code={otpCode} setCode={setOTPCode} maximumLength={6} setIsPinReady={setIsPinReady} />
          {/* <ResendButton resendFunction={() => {}} /> */}
            <Button title="Resend" resendFunction={() => {}}  />
        </View>
        <Button title="button" isLoading={isLoading} onPress={handleOtp} disabled={!isPinReady} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
