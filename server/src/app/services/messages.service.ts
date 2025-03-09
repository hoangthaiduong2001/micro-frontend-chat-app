import { User, ChatMessage } from '@nx-chat-assignment/shared-models';
import { ChatRepository } from '../repositories/chat.repository';

export const MessagesService = {
  sendMessage: (sender: User, receiver: User, message: string): ChatMessage => {
    return ChatRepository.addMessage(sender, receiver, message);
  },

  getChatHistory: (userId: string, receiverId: string) => {
    return ChatRepository.getHistory(userId, receiverId);
  },
};
