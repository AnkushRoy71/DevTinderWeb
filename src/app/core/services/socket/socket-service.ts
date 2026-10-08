import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { io, type Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment.development';
import type {
  ChatMessagePayload,
  ClientToServerEvents,
  JoinChatPayload,
  ServerToClientEvents,
} from '../../shared/types/socket-events';

@Service()
export class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  connect(): void {
    this.getSocket();
  }

  joinChat(senderId: string, receiverId: string): void {
    const payload: JoinChatPayload = { senderId, receiverId };
    this.getSocket().emit('joinChat', payload);
  }

  sendMessage(payload: ChatMessagePayload): void {
    this.getSocket().emit('sendMessage', payload);
  }

  receiveMessage(): Observable<ChatMessagePayload> {
    return new Observable((subscriber) => {
      const socket = this.getSocket();
      const listener = (payload: ChatMessagePayload) => {
        console.log('Received message in service:', payload);
        subscriber.next(payload);
      };

      socket.on('receiveMessage', listener);
      return () => socket.off('receiveMessage', listener);
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  private getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (!this.socket) {
      this.socket = io(environment.API_URL, { withCredentials: true }) as Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;
    }

    return this.socket;
  }
}
