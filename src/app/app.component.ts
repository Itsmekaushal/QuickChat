import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: { sender: string; text: string }[] = [];
  messageText: string = '';
  username: string = '';
  roomId: string = '';
  userCount: number = 0;
  isJoined: boolean = false;  

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.username = prompt('Enter your name:') || 'User';
    this.roomId = prompt('Enter Room ID:') || this.generateRoomId();

    this.socketService.joinRoom(this.username, this.roomId, (roomFull: boolean) => {
      if (roomFull) {
        alert('Room is full! Try another Room ID.');
        return;
      }
      this.isJoined = true;
      this.socketService.onMessage((msg) => this.messages.push(msg));
      this.socketService.onUserCount((count) => this.userCount = count);
    });
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.socketService.sendMessage(this.roomId, {
        sender: this.username,
        text: this.messageText
      });
      this.messageText = '';
    }
  }

  leaveChat() {
    this.socketService.leaveRoom(this.roomId);
    this.isJoined = false;
    this.messages = [];
  }

  generateRoomId(): string {
    return Math.random().toString(36).substr(2, 6);
  }
}
