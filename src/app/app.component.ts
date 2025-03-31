import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Ye add karna zaroori hai
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: { sender: string; text: string }[] = [];
  messageText: string = '';
  username: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.username = prompt('Enter your name:') || 'User';

    this.socketService.onMessage((msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.socketService.sendMessage({ sender: this.username, text: this.messageText });
      this.messageText = '';
    }
  }
}
