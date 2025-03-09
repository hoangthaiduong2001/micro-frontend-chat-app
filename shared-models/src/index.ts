export type User = {
  id: string;
  username: string;
  online: boolean;
};

export type OnlineUsers = User[];

export type ChatMessage = {
  id: string;
  sender: User;
  receiver: User;
  message: string;
  timestamp: number;
};

export type ChatHistory = ChatMessage[];
