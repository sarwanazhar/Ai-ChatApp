import { registerUser } from '@/api/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState("")


  // Responsive Hooks
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallPhone = width < 380;

  const handleSubmit = async () => {
    setErr(""); // clear previous errors

    if (!email || !password) {
      setErr("Please enter both email and password");
      return;
    }

    try {
      const result = await registerUser(email, password);

      // Show success message (optional)
      alert(result.message || "Registered successfully");

      // Redirect to login screen
      router.replace("/login");
    } catch (error: any) {
      console.log("Register error:", error);

      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.msg ||
        error.message ||
        "Registration failed";

      setErr(serverMessage);
      alert(serverMessage);
    }
  };


  // Dynamic Styles based on screen size
  const cardWidth = isTablet ? 450 : '100%';
  const cardPadding = isSmallPhone ? 20 : 32;

  return (
    // Main Background Gradient (gray-900 via purple-900 to black)
    <LinearGradient
      colors={['#111827', '#581c87', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Card Container with Dynamic Width */}
          <View style={[styles.card, { width: cardWidth, padding: cardPadding }]}>

            {/* Header Section */}
            <View style={styles.header}>
              <LinearGradient
                colors={['#a855f7', '#db2777']} // purple-500 to pink-600
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <UserPlus color="white" size={32} />
              </LinearGradient>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to start chatting with AI</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>

              {
                err && (
                  <Text style={{
                    textAlign: "center",
                    color: "red",
                  }}>
                    {err}
                  </Text>
                )
              }

              {/* Register Button */}
              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#a855f7', '#db2777']} // purple-500 to pink-600
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#1f2937', // bg-gray-800
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151', // border-gray-700
    alignSelf: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android Shadow
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 9999, // rounded-full
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af', // text-gray-400
    textAlign: 'center',
    fontSize: 14,
  },
  form: {
    gap: 20, // Space between inputs
  },
  inputGroup: {
    marginBottom: 0,
  },
  label: {
    color: '#d1d5db', // text-gray-300
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    width: '100%',
    backgroundColor: '#374151', // bg-gray-700
    borderColor: '#4b5563', // border-gray-600
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#9ca3af',
  },
  linkText: {
    color: '#c084fc', // purple-400
    fontWeight: '600',
  },
});