
import { ConfigModule, ConfigService } from '@nestjs/config'; // For environment variables (optional)
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
// import { MongooseModule, Schema } from '@nestjs/mongoose';


@Module({
  imports: [
    // Adjust path if needed
    // MongooseModule.forRootAsync(
    //   {
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_URI'), // Get URI from environment variable
    //   }),
    //   inject: [ConfigService],
    // })
    MongooseModule.forRoot('mongodb://localhost:27017/nest-lifelink')
    , UserModule,
  ],
  
})
export class AppModule {}
