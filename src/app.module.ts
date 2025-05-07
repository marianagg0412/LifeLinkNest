/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config'; // For environment variables (optional)
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    MedicalRecordModule,
  ],
})
export class AppModule {}
