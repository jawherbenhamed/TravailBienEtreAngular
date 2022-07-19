import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../_services/web-socket.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService,private userService:UserService ) { }
  user;
  photo;
  ngOnInit(): void {
    this.user=localStorage.getItem("username");
    this.photo=JSON.parse(localStorage.getItem("user")).photo
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    console.log("user>",this.user)
    const chatMessageDto = new ChatMessageDto(this.user, sendForm.value.message,this.photo);
    this.webSocketService.sendMessage(chatMessageDto);
    this.userService.sendMessage(chatMessageDto).subscribe(
      (response) => {
        console.log("message sent",response);
 
      }, 
      (error)=>{
        console.log(error);
      }
      
    );
    
    sendForm.controls.message.reset();
  }
}

