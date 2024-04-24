import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { IsEmail } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }
    // Proceed with user creation if no existing user is found
    const { password, ...userData } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new this.userModel({ ...userData, password: hashedPassword });
    await user.save();
    return { name: user.name, email: user.email, phone: user.phone };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({
      email,
    });

    //console.log(password)
    console.log(process.env.PORT);

    if (!user) throw new UnauthorizedException('Not valid credentials');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Not valid credentials (password)');

    const { name } = user;
    return { name, email };

    //TODO: retornat el jwt
  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(
        'Duplicate key error: Algún dato asociado ya está vinculado con otra cuenta',
      );
    } 
    // else if (error.code === 400){
    //   throw new BadRequestException(
    //     'Duplicate key error: Some data such as email or phone number already exists.',
    //   );
    // }
    console.log(error);
    throw new InternalServerErrorException('Please check your logs');
  }
}
