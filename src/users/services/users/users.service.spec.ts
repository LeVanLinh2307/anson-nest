import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: USER_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user repo define', () => {
    expect(userRepository).toBeDefined()
  })

  describe('createUser', () => {
    it('create new user with encode pass', async () => {
      await service.createUser({
        username: 'anson',
        email: 'll@gmail.com',
        password: '123'
      })

      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'anson',
        email: 'll@gmail.com',
        password: '123'
      })
    })
  })
});
