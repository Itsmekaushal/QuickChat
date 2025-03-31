import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  sendMessage(message: { sender: string; text: string }) {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }
}