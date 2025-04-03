import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  joinRoom(username: string, roomID: string, accessID: string, callback: (error: string | null) => void) {
    this.socket.emit('joinRoom', { username, roomID, accessID }, (response: { success: boolean; error?: string }) => {
      callback(response.success ? null : response.error || 'Unknown error');
    });
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

  disconnect() {
    this.socket.disconnect();
  }
}
