import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [{
    provide: 'USER_SERVICE',
    useClass: UsersService
  }]
})
export class UsersModule { }
