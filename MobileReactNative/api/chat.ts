import { API } from "./client";

export const createChat = async (): Promise<string> => {
  const res = await API.post("/chat/create");
  return res.data.chatId;
};

export const getAllChats = async () => {
  const res = await API.get("/chat/getall");
  return res.data.chats;
};
