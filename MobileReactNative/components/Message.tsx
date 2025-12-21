import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function Message({ content, isUser, timestamp }: MessageProps) {
  // Format time (e.g., 10:30 AM)
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <View style={[
      styles.messageContainer, 
      isUser ? styles.userContainer : styles.aiContainer
    ]}>
      {isUser ? (
        // User Message Bubble (Gradient)
        <LinearGradient
          colors={['#3b82f6', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bubble}
        >
          <Text style={styles.text}>{content}</Text>
          <Text style={styles.userTime}>{formattedTime}</Text>
        </LinearGradient>
      ) : (
        // AI Message Bubble (Solid Gray)
        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.text}>{content}</Text>
          <Text style={styles.aiTime}>{formattedTime}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    width: '100%',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    // Creating the "chat bubble" shape
    borderBottomRightRadius: 4, 
  },
  aiBubble: {
    backgroundColor: '#374151', // gray-700
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
  userTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  aiTime: {
    fontSize: 10,
    color: '#9ca3af', // gray-400
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});