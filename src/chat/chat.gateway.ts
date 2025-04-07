import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { sender: string; recipient: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (data.text.includes('глупость')) return;

    const message = await this.chatService.saveMessage(
      data.sender,
      data.recipient,
      data.text,
    );

    this.server.emit('message', message);
  }
}
