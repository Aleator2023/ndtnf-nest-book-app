import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookComment {
  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  comment: string;
}

export type BookCommentDocument = BookComment & Document;
export const BookCommentSchema = SchemaFactory.createForClass(BookComment);