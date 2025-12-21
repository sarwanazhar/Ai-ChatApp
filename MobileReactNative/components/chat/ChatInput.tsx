import { LinearGradient } from "expo-linear-gradient";
import { Send } from "lucide-react-native";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder="Type your message..."
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity onPress={onSend} disabled={!value.trim()}>
          <LinearGradient
            colors={["#3b82f6", "#9333ea"]}
            style={[
              styles.sendButton,
              !value.trim() && { opacity: 0.5 },
            ]}
          >
            <Send color="white" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#1f2937",
    borderTopWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "white",
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
