import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BookCommentsService } from './book-comments.service';
import { BookComment } from './book-comment.schema';

@WebSocketGateway({
  cors: {
    origin: '*', // Позволяет подключения с любых источников. Для безопасности можно указать конкретный URL.
    credentials: true,
  },
})
export class BookCommentsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  async getAllComments(@MessageBody() bookId: string): Promise<BookComment[]> {
    console.log('Received getAllComments for bookId:', bookId);
    return this.bookCommentsService.findAllBookComments(bookId);
  }

  @SubscribeMessage('addComment')
  async addComment(@MessageBody() commentData: { bookId: string; comment: string }): Promise<BookComment> {
    console.log('Received addComment with data:', commentData);
    const newComment = await this.bookCommentsService.create(commentData);
    this.server.emit('commentAdded', newComment);
    return newComment;
  }
}