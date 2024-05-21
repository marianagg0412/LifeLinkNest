import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import {AuthGuard} from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decoraor';
import { RawHeaders } from './decorators/raw-header.decorator';
import { IncomingHttpHeaders } from 'http';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/vaid-roles';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  chechAuthStatus(
    @GetUser()user:User
  ){
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail:string,

    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,

  ){
    return {
      ok: true,
      message: 'Eres vip',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin','super-user'])
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      message: 'Hola eres vip2',
      user,
    }
  }

  @Get('profile')
  @Auth()
  privateRoute3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      message: 'Hola eres vip3',
      user,
    }
  }

  @Patch('edit-profile')
  @Auth()
  
  updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ){

    return this.authService.update(user, updateUserDto);
  }

  @Get('catalogue')
  @Auth()
  catalogue(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      message: 'Hola eres vip3',
      user,
    }
  }
  

}
