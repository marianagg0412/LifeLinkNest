import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

  ) {}

  async create(createUserDto: CreateUserDto) {
    
    try {
      const{password, rol, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({id: user.id, rol: user.roles})
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login (loginUserDto: LoginUserDto){

    const {password, email} = loginUserDto

    const user = await this.userRepository.findOne({

      where: {email},
      select: {email: true, password: true, id: true, roles: true}
    });

    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    return {
      ...user,
      token: this.getJwtToken({id: user.id, rol: user.roles})
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({id: user.id, rol: user.roles})
    }
  }

  private getJwtToken(payload: JwtPayload){

    const token = this.jwtService.sign(payload);
    return token;

  }

  async update(user: User, updateUserDto: UpdateUserDto) {

    // const pokemon =await this.findOne(term);

    // if(updateUserDto.tittle)
    //   updateProductDto.tittle = updateProductDto.tittle.toLocaleLowerCase();

    const userr = await this.userRepository.preload({
      id: user.id, 
      ...updateUserDto,
    });

    if(!userr)
      throw new BadRequestException('User not found');

    try {
      await this.userRepository.save(userr);
      return userr;
    } catch (error) {
      this.handleDBErrors(error);
    }

    
  }

  private handleDBErrors(error:any): never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail)
    console.log(error)

    throw new InternalServerErrorException('pls check your logs')
  }
}
