import { Injectable, Logger } from '@nestjs/common';
import { Message } from './message';

@Injectable()
export class MessageService {
  private readonly logger: Logger = new Logger();

  async sendMessage(notification: Notificable) {
    this.logger.log(notification.toNotification());
  }
}
