import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  joinRoom(username: string, roomID: string, accessID: string) {
    this.socket.emit('joinRoom', { username, roomID, accessID });
  }

  sendMessage(message: { sender: string; text: string }) {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }

  onUserCount(callback: (count: number) => void) {
    this.socket.on('userCount', callback);
  }

  onError(callback: (error: string) => void) {
    this.socket.on('error', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
