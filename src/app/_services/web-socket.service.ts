import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService  {

  webSocket: WebSocket;
  chatMessages: any;

  constructor(private userService:UserService ) { 
  }
  getMessages(){
    this.userService.getMyMessages('travail').subscribe(
      (response) => {
        this.chatMessages=response;
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/travail/chat');
    this.getMessages()
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
      
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
