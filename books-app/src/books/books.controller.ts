import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BooksService, Book } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findOne(Number(id));
  }

  @Post()
  create(@Body() book: Book) {
    this.booksService.create(book);
  }
}