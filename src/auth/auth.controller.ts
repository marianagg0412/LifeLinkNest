import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      
      return this.authService.create(createUserDto);

    } catch (error) {
      this.handleCreateError(error);
    }
    
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

  private handleCreateError(error: any){
    throw new BadRequestException('Failed to create user');
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(
    @GetUser()user: User
  ){
    return this.authService.checkAuthStatus(user);

  }

 
}
