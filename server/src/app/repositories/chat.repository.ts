import {
  ChatHistory,
  ChatMessage,
  OnlineUsers,
  User,
} from '@nx-chat-assignment/shared-models';
import { v4 as uuidv4 } from 'uuid';

const chatHistory: ChatHistory = [];
let onlineUsers: OnlineUsers = [];

export const ChatRepository = {
  getHistory: (userId: string, receiverId: string): ChatHistory =>
    chatHistory
      .filter(
        (msg) =>
          (msg.sender.id === userId && msg.receiver.id === receiverId) ||
          (msg.sender.id === receiverId && msg.receiver.id === userId)
      )
      .slice(-50),

  addMessage: (sender: User, receiver: User, message: string) => {
    const chatMessage: ChatMessage = {
      id: uuidv4(),
      sender,
      receiver,
      message,
      timestamp: Date.now(),
    };
    chatHistory.push(chatMessage);

    if (chatHistory.length > 50) chatHistory.shift();
    return chatMessage;
  },

  addUser: (user: User) => {
    const existingUser = onlineUsers.find((u) => u.id === user.id);
    if (!existingUser) {
      onlineUsers.push(user);
    } else {
      existingUser.online = true;
    }
    return onlineUsers;
  },

  removeUser: (userId: string) => {
    onlineUsers = onlineUsers.filter((user) => user.id !== userId);
    return onlineUsers;
  },

  getUsersOnline: (): OnlineUsers => onlineUsers,
};
