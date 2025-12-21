import { AuthContext } from "@/libs/authprovider";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { Sidebar } from "@/components/chat/Sidebar";
import { Chat } from "@/types/chat";

import { createChat, getAllChats } from "@/api/chat";
import { streamChatMessage } from "@/api/streamMessages";
import { ChatHeader } from "@/components/chat/header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const { logout } = useContext(AuthContext);
  
  const [userName, setUserName] = useState("User");
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  const loadUsername = async () => {
    try {
      const savedName = await AsyncStorage.getItem("email");
      if (savedName) setUserName(savedName);
    } catch (e) {
      console.error("Failed to load username", e);
    }
  };

  loadUsername();
}, []);


  useEffect(() => {
    (async () => {
      try {
        const data = await getAllChats();

        setChats(
          data.map((c: any) => ({
            id: c._id,
            title: c.title || "Chat",
            messages: Array.isArray(c.messages)
              ? c.messages.map((m: any) => ({
                id: `${Math.random()}`,
                content: m.content,
                isUser: m.role === "user",
                timestamp: new Date(m.createdAt),
              }))
              : [], // fallback if null
            updatedAt: new Date(c.updatedAt),
          }))
        );

        if (data.length) setCurrentChatId(data[0]._id);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim() || !currentChatId) return;

    const userMsg = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? { ...c, messages: [...c.messages, userMsg] }
          : c
      )
    );

    setInputMessage("");

    // Create temporary AI message with "Thinking..." placeholder
    const aiTempId = `${Date.now() + 1}`;

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
            ...c,
            messages: [
              ...c.messages,
              {
                id: aiTempId,
                content: "Thinking...", // initial placeholder
                isUser: false,
                timestamp: new Date(),
              },
            ],
          }
          : c
      )
    );

    // Stream tokens
    streamChatMessage(
      currentChatId,
      userMsg.content,
      (delta) => {
        setChats((prev) =>
          prev.map((c) =>
            c.id === currentChatId
              ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === aiTempId
                    ? {
                      ...m,
                      content:
                        // replace "Thinking..." on first chunk
                        m.content === "Thinking..."
                          ? delta
                          : m.content + delta,
                    }
                    : m
                ),
              }
              : c
          )
        );
      },
      () => {
        console.log("AI response complete");
      }
    );
  };

  const handleNewChat = async () => {
    try {
      const chatId = await createChat();
      const newC: Chat = {
        id: chatId,
        title: "Chat",
        messages: [],
        updatedAt: new Date(),
      };
      setChats([newC, ...chats]);
      setCurrentChatId(chatId);
      setSidebarOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const currentMessages =
    chats.find((c) => c.id === currentChatId)?.messages ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ChatHeader
        title={chats.find((c) => c.id === currentChatId)?.title}
        onMenu={() => setSidebarOpen(true)}
      />

      <View style={{ flex: 1 }}>
        {/** Replace ChatMessages with a FlatList here for empty UI */}
        <ChatMessages
          messages={currentMessages}
          showEmptyState={true}
        />

        <ChatInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={sendMessage}
        />
      </View>

      <Sidebar
        open={sidebarOpen}
        chats={chats}
        currentChatId={currentChatId ?? ""}
        userName={userName}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={(id) => {
          setCurrentChatId(id);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        onLogout={logout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
});
