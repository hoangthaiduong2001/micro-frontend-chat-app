import { User } from '@nx-chat-assignment/shared-models';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { UsersService } from '../services/users.service';

const userSockets: Record<string, string> = {};
export const ChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    socket.on('user:login', (username: string) => {
      const user = AuthService.login(username);
      if (!user) {
        io.emit('user:error', {
          event: 'user:error',
          message: 'Username is already taken',
        });
        return;
      }

      socket.data.user = user;
      userSockets[user.id] = socket.id;

      io.emit('usersOnline', {
        event: 'usersOnline',
        data: UsersService.getOnlineUsers(),
      });
    });

    socket.on('user:reconnect', (oldSocketId: string) => {
      const userId = Object.keys(userSockets).find(
        (id) => userSockets[id] === oldSocketId
      );
      if (userId) {
        userSockets[userId] = socket.id;
      }
    });

    socket.on('message:send', (data) => {
      const newData = typeof data === 'string' ? JSON.parse(data) : data;
      const { receiver, message } = newData;
      const sender: User = socket.data.user ?? socket.handshake.auth.user;
      if (!sender) {
        socket.emit('error', {
          event: 'message:send',
          message: 'User not logged in',
        });
        return;
      }
      if (!receiver || !receiver.id) {
        socket.emit('error', {
          event: 'message:send',
          message: 'Receiver is required',
        });
        return;
      }

      const receiverUser = UsersService.getOnlineUsers().find(
        (user: User) => user.id === receiver.id
      );

      if (!receiverUser) {
        socket.emit('error', {
          event: 'message:send',
          message: 'Receiver not found',
        });
        return;
      }

      const chatMessage = MessagesService.sendMessage(
        sender,
        receiverUser,
        message
      );

      socket.emit('message:receive', {
        event: 'message:receive',
        data: chatMessage,
      });

      const receiverSocketId = userSockets[receiver.id];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message:receive', {
          event: 'message:receive',
          data: chatMessage,
        });
      }
    });

    socket.on('user:disconnect', () => {
      const user: User = socket.data.user;
      if (user) {
        AuthService.logout(user.id);
        delete userSockets[user.id];
        io.emit('usersOnline', {
          event: 'usersOnline',
          data: UsersService.getOnlineUsers(),
        });
      }
    });
  });
};
