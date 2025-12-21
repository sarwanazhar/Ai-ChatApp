export interface MessageType {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: MessageType[];
  updatedAt: Date;
}
