import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; 
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';
import { BooksModule } from './books/books.module';
import { GitlabService } from './gitlab/gitlab.service';
import { GitlabController } from './gitlab/gitlab.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_books'),
    BooksModule,
    HttpModule, // Импортируем HttpModule
  ],
  controllers: [GithubController, GitlabController],
  providers: [GithubService, GitlabService],
})
export class AppModule {}