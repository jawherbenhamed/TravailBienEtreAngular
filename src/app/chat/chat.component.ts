import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../_services/web-socket.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService) { }
  user;
  ngOnInit(): void {
    this.user=localStorage.getItem("username");
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    console.log("user>",this.user)
    const chatMessageDto = new ChatMessageDto(this.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls.message.reset();
  }
}

