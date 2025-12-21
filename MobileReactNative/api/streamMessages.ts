import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetch } from "expo/fetch";

const BASE_URL = "https://chatappbackend-tjis.onrender.com";

export async function streamChatMessage(
  chatId: string,
  prompt: string,
  onToken: (delta: string) => void,
  onDone: () => void
) {
  const token = await AsyncStorage.getItem("userToken");

  const response = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      chat_id: chatId,
      prompt,
    }),
  });

  if (!response.body) return onDone();

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process each line separated by newline
    let lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (let line of lines) {
      line = line.trim();

      // Only handle `data: {...}` lines
      if (line.startsWith("data:")) {
        const jsonStr = line.replace(/^data:\s*/, "");

        try {
          const parsed = JSON.parse(jsonStr);

          if (parsed.delta) {
            onToken(parsed.delta);
          }
        } catch {
          // ignore non‑json lines
        }
      }

      // If server signals done, call onDone
      if (line === `event: done`) {
        onDone();
        return;
      }
    }
  }

  onDone();
}
