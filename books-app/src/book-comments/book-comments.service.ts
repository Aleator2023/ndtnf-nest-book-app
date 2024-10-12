import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookComment, BookCommentDocument } from './book-comment.schema';

@Injectable()
export class BookCommentsService {
  constructor(@InjectModel(BookComment.name) private bookCommentModel: Model<BookCommentDocument>) {}

  async create(commentData: BookComment): Promise<BookComment> {
    console.log('Creating a new comment:', commentData); 
    const comment = new this.bookCommentModel(commentData);
    const savedComment = await comment.save();
    console.log('Saved comment:', savedComment); 
    return savedComment;
  }

  async findAll(): Promise<BookComment[]> {
    return this.bookCommentModel.find().exec();
  }

  async findOne(id: string): Promise<BookComment> {
    return this.bookCommentModel.findById(id).exec();
  }

  async findAllBookComments(bookId: string): Promise<BookComment[]> {
    console.log('Fetching comments for bookId:', bookId); 
    const comments = await this.bookCommentModel.find({ bookId }).exec();
    console.log('Fetched comments:', comments); 
    return comments;
  }
  async update(id: string, comment: BookComment): Promise<BookComment> {
    return this.bookCommentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
  }

  async delete(id: string): Promise<BookComment> {
    return this.bookCommentModel.findByIdAndDelete(id).exec();
  }
}