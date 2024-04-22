
import { ConfigModule, ConfigService } from '@nestjs/config'; // For environment variables (optional)
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
// import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';



@Module({
  imports: [
    ConfigModule.forRoot(),
    // Adjust path if needed
    // MongooseModule.forRootAsync(
    //   {
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_URI'), // Get URI from environment variable
    //   }),
    //   inject: [ConfigService],
    // })
    
    MongooseModule.forRoot(
      // 'mongodb://localhost:27017/nest-lifelink'
      process.env.DB_HOST
    ),
    ProductModule, 
    AuthModule,
  ],
  
})
export class AppModule {}
