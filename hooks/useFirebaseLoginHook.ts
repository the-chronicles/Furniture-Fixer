// import { FirebaseOptions } from "firebase/app";
// import { Auth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import React, { useRef } from "react";
// // import { FirebaseRecaptchaVerifierModal } from "@/components/shared/FirebaseRecaptchaVerifierModal";
// import { FirebaseRecaptchaVerifierModal } from "@/components/shared/FirebaseRecaptcherVerifierModal";
// import FirebaseRecaptchaBanner from "@/components/shared/FirebaseRecaptchaBanner";

// import { auth } from "@/lib/firebaseConfig";

// interface UseFirebaseLogin {
//   firebaseConfig: FirebaseOptions;
// }

// export const useFirebaseLogin = ({ firebaseConfig }: UseFirebaseLogin) => {
//   const recaptchaVerifier = useRef(null);

//   const sendOtp = async (phoneNumber: string) => {
//     if (!phoneNumber || !recaptchaVerifier.current) return;
//     const phoneProvider = new PhoneAuthProvider(auth);
//     return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
//   };

//   const verifyOtp = async (verificationId: string, otp: string) => {
//     if (!verificationId || !otp) return;
//     const credential = PhoneAuthProvider.credential(verificationId, otp);
//     return signInWithCredential(auth, credential);
//   };

//   return {
//     Recaptcha: <FirebaseRecaptchaVerifierModal, ref={recaptchaVerifier}, firebaseConfig={firebaseConfig} />,
//     RecaptchaBanner: <FirebaseRecaptchaBanner />,
//     sendOtp,
//     verifyOtp,
//   };
// };











import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../lib/firebaseConfig";

export const useFirebaseLogin = () => {
  const recaptchaVerifier = useRef(null);

  const sendOtp = async (phoneNumber: string) => {
    if (!phoneNumber || !recaptchaVerifier.current) return;
    const phoneProvider = new PhoneAuthProvider(auth);
    return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
  };

  const verifyOtp = async (verificationId: string, otp: string) => {
    if (!verificationId || !otp) return;
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    return signInWithCredential(auth, credential);
  };

  return { recaptchaVerifier, sendOtp, verifyOtp };
};






// import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import { useRef } from "react";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { auth } from "../lib/firebaseConfig";

// export const useFirebaseLogin = () => {
//   const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

//   const sendOtp = async (phoneNumber: string) => {
//     if (!phoneNumber || !recaptchaVerifier.current) return;
//     const phoneProvider = new PhoneAuthProvider(auth);
//     return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
//   };

//   const verifyOtp = async (verificationId: string, otp: string) => {
//     if (!verificationId || !otp) return;
//     const credential = PhoneAuthProvider.credential(verificationId, otp);
//     return signInWithCredential(auth, credential);
//   };

//   return { recaptchaVerifier, sendOtp, verifyOtp };
// };

