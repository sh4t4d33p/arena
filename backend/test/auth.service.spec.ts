import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../src/exceptions/user-not-found.exception';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyUser', () => {
    it('should return user if found', async () => {
      const mockUser = { wallet_address: '0x123', username: 'test' };
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.verifyUser('0x123');
      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { wallet_address: '0x123' } });
    });

    it('should throw UserNotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.verifyUser('0x123')).rejects.toThrow(UserNotFoundException);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { wallet_address: '0x123' } });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser = { wallet_address: '0x123', username: 'test' };
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.createUser({ wallet_address: '0x123', username: 'test' });
      expect(result).toEqual(mockUser);
      expect(userRepository.save).toHaveBeenCalledWith({ wallet_address: '0x123', username: 'test' });
    });
  });
});
