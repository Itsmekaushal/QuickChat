import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Initialize the socket connection to the server
    this.socket = io('http://localhost:5000');

    // Handle connection errors
    this.socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    // Handle reconnection attempts
    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnection Attempt: ${attempt}`);
    });

    // Handle successful reconnection
    this.socket.on('reconnect', (attempt) => {
      console.log(`Reconnected after ${attempt} attempts`);
    });

    // Handle disconnection
    this.socket.on('disconnect', (reason) => {
      console.log(`Disconnected: ${reason}`);
    });
  }

  // Join a chat room with a username and room ID
  joinRoom(username: string, roomID: string) {
    this.socket.emit('joinRoom', { username, roomID });
  }

  // Send a chat message
  sendMessage(message: { sender: string; text: string }) {
    this.socket.emit('message', message);
  }

  // Leave the current chat room
  leaveRoom() {
    this.socket.emit('leaveRoom');
  }

  // Listen for incoming messages
  onMessage(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }

  // Listen for updates to the user count in the room
  onUserCount(callback: (count: number) => void) {
    this.socket.on('userCount', callback);
  }

  // Listen for error messages from the server
  onError(callback: (error: string) => void) {
    this.socket.on('error', callback);
  }
}
