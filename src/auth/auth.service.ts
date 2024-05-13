import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()


export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>,

    private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    try{

      const {docnum_type, docnum, password, ...userData}= createUserDto;

      if((docnum_type==='CC' || docnum_type==='CE') && isNaN(+docnum)){
        console.log('entro')
        throw new BadRequestException('Must be a number')

      }

      const user = await this.userModel.create({
        ...userData,
        docnum_type,
        docnum,
        password: bcrypt.hashSync(password,10),
        //encriptar
      });

      console.log(docnum_type, docnum)

     

      

      const {name, email, phone}=user;
      return {name, email, phone};

    }catch(error){
      console.log(error)
      this.handleDBErrors(error);

    }
  }

  async login (loginUserDto:LoginUserDto){

    

    const {password, email}= loginUserDto;

    const user = await this.userModel.findOne({
      email
    })

    console.log(password)
    console.log(process.env.PORT)
    

    if(!user)
      throw new UnauthorizedException('Not valid credentials');

     if( !bcrypt.compareSync(password, user.password))
       throw new UnauthorizedException('Not valid credentials (password)')

    const {name}=user;
    return {
      name,
      email,
      token: this.getJwtToken({id: user.id})
    };

    //TODO: retornat el jwt

  }

  async checkAuthStatus(user:User){
    return{
      ...user,
      token: this.getJwtToken({id: user.id})
    };
  }

  private getJwtToken(payload: JwtPayload){
    const token= this.jwtService.sign(payload);
    return token;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {

    // const pokemon =await this.findOne(term);

    // if(updateUserDto.tittle)
    //   updateProductDto.tittle = updateProductDto.tittle.toLocaleLowerCase();


    try{
      
      await user.updateOne(updateUserDto);
      return {...user.toJSON(), ...updateUserDto};

    } catch (error){

      this.handleDBErrors(error);
    
    }

    
  }



  private handleDBErrors(error:any): never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail)
    if(error.code === '400')
       throw new BadRequestException('c')
    console.log(error.code)

    throw new InternalServerErrorException('pls check your logs')
  }
}
