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
  accessID: string = ''; // ✅ Now asking for Access ID
  userCount: number = 0;
  roomID = 'quickchatroom';
  isJoined = false;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.username = prompt('Enter your name:') || 'User';
    this.accessID = prompt('Enter Access ID:') || '';

    this.socketService.joinRoom(this.username, this.roomID, this.accessID);

    this.socketService.onMessage((msg) => {
      this.messages.push(msg);
    });

    this.socketService.onUserCount((count) => {
      this.userCount = count;
    });

    this.socketService.onError((error) => {
      alert(error);
      this.isJoined = false;
    });

    this.isJoined = true;
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.socketService.sendMessage({ sender: this.username, text: this.messageText });
      this.messageText = '';
    }
  }

  leaveChat() {
    this.isJoined = false;
    this.socketService.disconnect();
  }
}
