import { Message } from "@/components/Message";
import { MessageType } from "@/types/chat";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Props {
  messages: MessageType[];
  showEmptyState?: boolean; // NEW
}

export function ChatMessages({ messages, showEmptyState }: Props) {
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        ref.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Message
          content={item.content}
          isUser={item.isUser}
          timestamp={item.timestamp}
        />
      )}
      contentContainerStyle={[
        styles.list,
        messages.length === 0 && styles.emptyList,
      ]}
      ListEmptyComponent={
        showEmptyState ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Start the conversation by typing and sending the message !
            </Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyList: {
    flex: 1,
  },
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
