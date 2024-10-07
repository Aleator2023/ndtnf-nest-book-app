import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt({ message: 'Age must be an integer' }) // Проверка, что возраст является целым числом
  @Min(1, { message: 'Age must be at least 1' }) // Минимальное значение возраста
  @Max(120, { message: 'Age must be at most 120' }) // Максимальное значение возраста
  age: number;
}