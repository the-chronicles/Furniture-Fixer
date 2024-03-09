import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';

export default function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const validatePhone = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSendOTP = () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Please enter a valid Indian phone number');
      return;
    }

    setError('');
    setStep(2);
    // Handle OTP sending logic here
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    // Handle OTP verification logic here
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'Enter your phone number to receive OTP'
            : 'Enter the OTP sent to your phone'}
        </Text>
      </View>

      <View style={styles.form}>
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
              <Text style={styles.buttonText}>Send OTP</Text>
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Verify OTP</Text>
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

        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Remember your password? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.backToLoginLink}>Sign In</Text>
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
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E1E1E1',
    textAlign: 'center',
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
  button: {
    backgroundColor: '#99631f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
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
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  backToLoginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  backToLoginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#99631f',
  },
});