import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; 
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';
import { BooksModule } from './books/books.module';
import { GitlabService } from './gitlab/gitlab.service';
import { GitlabController } from './gitlab/gitlab.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users.controller';  

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_books'),
    BooksModule,
    HttpModule,
  ],
  controllers: [GithubController, GitlabController, AppController, UsersController],  
  providers: [GithubService, GitlabService, AppService],
})
export class AppModule {}