import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(
    sender: string,
    recipient: string,
    text: string,
  ): Promise<Message> {
    return new this.messageModel({
      sender,
      recipient,
      text,
      timestamp: new Date(),
    }).save();
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().sort({ timestamp: 1 }).exec();
  }

  async getMessagesBetweenUsers(
    username1: string,
    username2: string,
  ): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { sender: username1, recipient: username2 },
          { sender: username2, recipient: username1 },
        ],
      })
      .sort({ timestamp: 1 })
      .exec();
  }
}
