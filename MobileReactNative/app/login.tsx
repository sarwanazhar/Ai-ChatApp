import { AuthContext } from "@/libs/authprovider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { LogIn } from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState("")

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };


  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setErr("Please enter a valid email")
      return;
    }
    try {
      await login(email, password);
      router.replace("/"); // Navigate after successful login
    } catch (err: any) {
      console.log("Login error object:", err);

      // Try multiple possible places for the server message
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.msg ||
        err.response?.data?.errors?.[0]?.message;

      // Fallback to generic message
      const messageToShow = serverMessage || err.message || "Unknown error";

      setErr(messageToShow)
    }
  };

  return (
    // Main Background Gradient (gray-900 via gray-800 to black)
    <LinearGradient
      colors={["#111827", "#1f2937", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Card Container */}
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header}>
              <LinearGradient
                colors={["#3b82f6", "#9333ea"]} // blue-500 to purple-600
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <LogIn color="white" size={32} />
              </LinearGradient>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue chatting with AI
              </Text>
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
                  placeholderTextColor="#9ca3af" // gray-400
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
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af" // gray-400
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

              {/* Submit Button */}
              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
                <LinearGradient
                  colors={["#3b82f6", "#9333ea"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Dont have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/register")}>
                <Text style={styles.linkText}>Sign Up</Text>
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
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#1f2937", // bg-gray-800
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: "#374151", // border-gray-700
    width: "100%",
    maxWidth: 450, // max-w-md equivalent
    alignSelf: "center",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Shadow property for Android
    elevation: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 9999, // rounded-full
    marginBottom: 16,
  },
  title: {
    fontSize: 24, // h1 size roughly
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    color: "#9ca3af", // text-gray-400
    textAlign: "center",
    fontSize: 14,
  },
  form: {
    gap: 20, // Space between inputs (React Native 0.71+)
  },
  inputGroup: {
    marginBottom: 0, // Handled by gap in parent, or add margin here if older RN
  },
  label: {
    color: "#d1d5db", // text-gray-300
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    width: "100%",
    backgroundColor: "#374151", // bg-gray-700
    borderColor: "#4b5563", // border-gray-600
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "white",
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#9ca3af", // text-gray-400
  },
  linkText: {
    color: "#60a5fa", // text-blue-400
  },
});
