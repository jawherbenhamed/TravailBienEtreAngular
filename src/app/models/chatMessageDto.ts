export class ChatMessageDto {
    sender: string;
    content: string;
    photo:string

    constructor(sender: string, content: string,photo){
        this.sender = sender;
        this.content = content;
        this.photo= photo;
    }
}
