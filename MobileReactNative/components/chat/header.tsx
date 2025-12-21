import { LinearGradient } from "expo-linear-gradient";
import { Menu, MessageSquare } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  onMenu: () => void;
}

export function ChatHeader({ title, onMenu }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
        <Menu color="#d1d5db" size={24} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <LinearGradient
          colors={["#a855f7", "#db2777"]}
          style={styles.icon}
        >
          <MessageSquare color="white" size={18} />
        </LinearGradient>

        <View>
          <Text style={styles.title}>
            {title ?? "AI Assistant"}
          </Text>
          <Text style={styles.subtitle}>
            Always here to help
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: "#1f2937",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#374151",
  },
  menuButton: { padding: 8, marginRight: 8 },
  titleContainer: { flexDirection: "row", alignItems: "center" },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: { color: "white", fontWeight: "bold", fontSize: 16 },
  subtitle: { color: "#9ca3af", fontSize: 12 },
});
