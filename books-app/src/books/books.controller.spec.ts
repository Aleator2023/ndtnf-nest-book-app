import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.schema';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    isbn: '123456789',
    year: 2024, // Добавляем недостающее поле year
  };

  const mockBooksService = {
    findAll: jest.fn().mockResolvedValue([mockBook]),
    findOne: jest.fn().mockResolvedValue(mockBook),
    create: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue(mockBook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', async () => {
    const books = await controller.findAll();
    expect(books).toEqual([mockBook]);
  });

  it('should return one book by id', async () => {
    const book = await controller.findOne('someId');
    expect(book).toEqual(mockBook);
  });

  it('should create a new book', async () => {
    const newBook = await controller.create(mockBook);
    expect(newBook).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const updatedBook = await controller.update('someId', mockBook);
    expect(updatedBook).toEqual(mockBook);
  });

  it('should delete a book', async () => {
    const deletedBook = await controller.delete('someId');
    expect(deletedBook).toEqual(mockBook);
  });
});