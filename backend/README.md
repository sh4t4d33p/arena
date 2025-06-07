# Arena Backend API

A decentralized social media platform backend built with NestJS and PostgreSQL.

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update database configuration:
  ```
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=your_password
  DATABASE_NAME=arena_db
  ```

### Database Setup

1. Create the database:
```bash
createdb arena_db
```

2. Run migrations:
```bash
npm run migration:run
```

### Starting the Server

1. Development mode:
```bash
npm run start:dev
```

2. Production mode:
```bash
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - Connect Ethereum wallet
  - Response: `{ success: boolean, message: string }`

### User Profile
- `GET /users/:wallet` - Get user profile
  - Response: `{ wallet_address, username, bio, profile_pic_url }`
- `PATCH /users/:wallet` - Update user profile
  - Body: `{ username, bio, profile_pic_url }`
  - Response: `{ success: boolean, message: string }`

### Posts
- `POST /posts` - Create new post
  - Body: `{ content }`
  - Response: `{ id, wallet_address, content, created_at }`
- `GET /posts` - Get all posts
  - Response: `[Post[]]`

### Interactions
- `POST /posts/:postId/likes` - Like a post
  - Response: `{ success: boolean, message: string }`
- `POST /posts/:postId/comments` - Comment on a post
  - Body: `{ content }`
  - Response: `{ id, post_id, wallet_address, content, created_at }`

### Error Responses
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Invalid authentication
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

## Project Structure

```
src/
├── auth/           # Authentication module
├── posts/          # Posts module
├── users/          # User profiles module
├── likes/          # Likes module
├── comments/       # Comments module
├── config/         # Configuration files
├── middleware/     # Custom middleware
└── entities/       # Database entities
```

## Database Schema

### Users
- `wallet_address` (Primary Key)
- `username` (VARCHAR)
- `bio` (TEXT)
- `profile_pic_url` (TEXT)

### Posts
- `id` (Primary Key)
- `wallet_address` (Foreign Key)
- `content` (TEXT)
- `created_at` (TIMESTAMP)

### Likes
- `id` (Primary Key)
- `post_id` (Foreign Key)
- `wallet_address` (Foreign Key)
- `created_at` (TIMESTAMP)

### Comments
- `id` (Primary Key)
- `post_id` (Foreign Key)
- `wallet_address` (Foreign Key)
- `content` (TEXT)
- `created_at` (TIMESTAMP)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
