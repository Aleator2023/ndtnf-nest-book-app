import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([{ title: 'Test Book', author: 'Test Author', year: 2024, isbn: '123456' }]),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ title: 'Test Book', author: 'Test Author', year: 2024, isbn: '123456' }),
            }),
            create: jest.fn().mockImplementation((bookData) => ({
              ...bookData,
              save: jest.fn().mockResolvedValue(bookData),
            })),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ title: 'Updated Book', author: 'Updated Author', year: 2024, isbn: '123456' }),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ title: 'Deleted Book', author: 'Deleted Author', year: 2024, isbn: '123456' }),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should return all books', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ title: 'Test Book', author: 'Test Author', year: 2024, isbn: '123456' }]);
  });

  it('should return one book by id', async () => {
    const result = await service.findOne('someId');
    expect(result).toEqual({ title: 'Test Book', author: 'Test Author', year: 2024, isbn: '123456' });
  });

  it('should create a new book', async () => {
    const newBook = { title: 'New Book', author: 'Author', year: 2024, isbn: '654321' };
    const result = await service.create(newBook);
    
    expect(result).toMatchObject(newBook);
  });

  it('should update a book', async () => {
    const updatedBook = { title: 'Updated Book', author: 'Updated Author', year: 2024, isbn: '123456' };
    const result = await service.update('someId', updatedBook);
    expect(result).toEqual(updatedBook);
  });

  it('should delete a book', async () => {
    const result = await service.delete('someId');
    expect(result).toEqual({ title: 'Deleted Book', author: 'Deleted Author', year: 2024, isbn: '123456' });
  });
});