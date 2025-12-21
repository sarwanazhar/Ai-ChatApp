import { Chat } from "@/types/chat";
import { LinearGradient } from "expo-linear-gradient";
import { LogOut, MessageSquare, Plus, X } from "lucide-react-native";
import React from "react";
import {
    Dimensions,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.8;

interface Props {
  open: boolean;
  chats: Chat[];
  currentChatId: string;
  userName: string;
  onClose: () => void;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onLogout: () => void;
}

export function Sidebar({
  open,
  chats,
  currentChatId,
  userName,
  onClose,
  onSelectChat,
  onNewChat,
  onLogout,
}: Props) {
  if (!open) return null;

  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat History</Text>
          <TouchableOpacity onPress={onClose}>
            <X color="#9ca3af" size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.newChatBtn} onPress={onNewChat}>
          <LinearGradient
            colors={["#3b82f6", "#9333ea"]}
            style={styles.newChatGradient}
          >
            <Plus color="white" size={20} />
            <Text style={styles.newChatText}>New Chat</Text>
          </LinearGradient>
        </TouchableOpacity>

        <FlatList
          data={[...chats].sort(
            (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chatItem,
                currentChatId === item.id && styles.activeChat,
              ]}
              onPress={() => onSelectChat(item.id)}
            >
              <MessageSquare
                size={18}
                color={currentChatId === item.id ? "#60a5fa" : "#9ca3af"}
              />
              <Text
                style={[
                  styles.chatTitle,
                  currentChatId === item.id && { color: "#93c5fd" },
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.user}>
          <LinearGradient
            colors={["#3b82f6", "#9333ea"]}
            style={styles.avatar}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {userName[0].toUpperCase()}
            </Text>
          </LinearGradient>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ color: "white" }}>{userName}</Text>
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>Online</Text>
          </View>

          <TouchableOpacity onPress={onLogout}>
            <LogOut color="#9ca3af" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#1f2937",
    paddingTop: Platform.OS === "ios" ? 40 : 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  newChatBtn: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  newChatGradient: {
    flexDirection: "row",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  newChatText: {
    color: "white",
    fontWeight: "600",
  },
  chatItem: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },
  activeChat: {
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  chatTitle: {
    color: "#e5e7eb",
    flex: 1,
  },
  user: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#374151",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
