import { ChatRepository } from '../repositories/chat.repository';

export const UsersService = {
  getOnlineUsers: () => {
    return ChatRepository.getUsersOnline();
  },
};
