import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm';
import entities from './typeorm';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CustomersModule, UsersModule, PaymentsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tutorial_db',
    entities,
    synchronize: true
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
