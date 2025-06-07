import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../src/posts/posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/entities/post.entity';
import { Like } from '../src/entities/like.entity';
import { Comment } from '../src/entities/comment.entity';
import { User } from '../src/entities/user.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;
  let likeRepository: Repository<Like>;
  let commentRepository: Repository<Comment>;

  const mockPostRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockLikeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockCommentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(Like),
          useValue: mockLikeRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    likeRepository = module.get<Repository<Like>>(getRepositoryToken(Like));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const mockPost = { id: 1, content: 'Test post', wallet_address: '0x123' };
      mockPostRepository.create.mockReturnValue(mockPost);
      mockPostRepository.save.mockResolvedValue(mockPost);

      const result = await service.createPost({ content: 'Test post', wallet_address: '0x123' });
      expect(result).toEqual(mockPost);
      expect(postRepository.create).toHaveBeenCalledWith({ content: 'Test post', wallet_address: '0x123' });
      expect(postRepository.save).toHaveBeenCalledWith(mockPost);
    });
  });

  describe('likePost', () => {
    it('should create a new like', async () => {
      const mockLike = { post_id: 1, wallet_address: '0x123' };
      mockLikeRepository.create.mockReturnValue(mockLike);
      mockLikeRepository.save.mockResolvedValue(mockLike);

      const result = await service.likePost({ post_id: 1, wallet_address: '0x123' });
      expect(result).toEqual(mockLike);
      expect(likeRepository.create).toHaveBeenCalledWith({ post_id: 1, wallet_address: '0x123' });
      expect(likeRepository.save).toHaveBeenCalledWith(mockLike);
    });
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const mockComment = { id: 1, content: 'Test comment', wallet_address: '0x123', post_id: 1 };
      mockCommentRepository.create.mockReturnValue(mockComment);
      mockCommentRepository.save.mockResolvedValue(mockComment);

      const result = await service.createComment({ content: 'Test comment', wallet_address: '0x123', post_id: 1 });
      expect(result).toEqual(mockComment);
      expect(commentRepository.create).toHaveBeenCalledWith({ content: 'Test comment', wallet_address: '0x123', post_id: 1 });
      expect(commentRepository.save).toHaveBeenCalledWith(mockComment);
    });
  });
});
