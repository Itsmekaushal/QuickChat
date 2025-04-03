import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  joinRoom(username: string, roomID: string, callback: (roomFull: boolean) => void) {
    this.socket.emit('joinRoom', { username, roomID });
    this.socket.on('roomFull', () => callback(true));
    this.socket.on('roomJoined', () => callback(false));
  }

  sendMessage(roomId: string, message: { sender: string; text: string }) {
    this.socket.emit('message', { roomId, ...message });
  }

  onMessage(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }

  leaveRoom(roomID: string) {
    this.socket.emit('leaveRoom', roomID);
  }

  onUserCount(callback: (count: number) => void) {
    this.socket.on('userCount', callback);
  }
}
