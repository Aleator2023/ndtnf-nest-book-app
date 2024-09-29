import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_books'), // Подключение к MongoDB
    BooksModule, // Импорт модуля книг
  ],
})
export class AppModule {}