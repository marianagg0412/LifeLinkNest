import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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
    private readonly userModel:Model<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try{

      const {password, ...userData}= createUserDto;

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password,10),
        //encriptar
      });

      const {name, email, phone}=user;
      return {name, email, phone};

    }catch(error){
      this.handleDBErrors(error);

    }
  }

  async login (loginUserDto:LoginUserDto){

    

    const {password, email}= loginUserDto;

    const user = await this.userModel.findOne({
      email
    })

    console.log(password)
    

    if(!user)
      throw new UnauthorizedException('Not valid credentials');

     if( !bcrypt.compareSync(password, user.password))
       throw new UnauthorizedException('Not valid credentials (password)')

    const {name}=user;
    return {email,name};

    //TODO: retornat el jwt

  

}



  private handleDBErrors(error:any): never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail)
    console.log(error)

    throw new InternalServerErrorException('pls check your logs')
  }
}
