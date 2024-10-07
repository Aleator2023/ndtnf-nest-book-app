import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>, 
  ) {}

  async signup(userData: any) {
    const { email, password, firstName, lastName } = userData;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new this.userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await user.save(); 

   
    return this.generateJwtToken(user);
  }

  async signin(email: string, password: string) {
   
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    
    return this.generateJwtToken(user);
  }

  
  generateJwtToken(user: any) {
    const payload = { id: user._id, email: user.email, firstName: user.firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}