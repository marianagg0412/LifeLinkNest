
import { ConfigModule, ConfigService } from '@nestjs/config'; // For environment variables (optional)
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
// import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';





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
    
    // MongooseModule.forRoot(
    //   // 'mongodb://localhost:27017/nest-lifelink'
    //   process.env.DB_HOST
    // ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      


    }),
    // ProductModule,
    AuthModule, 
    
  ],
  
})
export class AppModule {}
