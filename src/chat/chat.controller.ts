import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages/all')
  async getMessages() {
    return this.chatService.getAllMessages();
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:username')
  async getUser(@Param('username') username: string, @Req() req) {
    return this.chatService.getMessagesBetweenUsers(
      username,
      req.user.username,
    );
  }
}
