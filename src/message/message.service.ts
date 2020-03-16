import { Injectable, Logger } from '@nestjs/common';
import { Message } from './message';

@Injectable()
export class MessageService {
  private readonly logger: Logger = new Logger();

  async sendMessage(message: Message) {
    this.logger.log(message.toString());
  }
}
