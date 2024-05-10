import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy} from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ ConfigModule],
      inject: [ConfigService],
      useFactory: ( configService: ConfigService)=> {
        // console.log('jwt secret', configService.get('JWT_SECRET'))
        // console.log('JWT_SECRET', process.env.JWT_SECRET)
        return{
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: '2h'
            }
        }
      }
    })
  ],
  exports: [JwtStrategy, JwtModule, PassportModule, MongooseModule]
})
export class AuthModule {}
