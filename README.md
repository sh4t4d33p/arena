# Decentralized Social Media MVP

A decentralized social media platform built on Ethereum blockchain technology, allowing users to interact using their wallet addresses.

## Features

- 🌐 Login using Ethereum wallet (RainbowKit + ethers.js)
- 📝 Create and update user profiles
- 📣 Post short messages (280 characters max)
- 👀 View consolidated feed of all users' posts
- 👍 Like posts
- 💬 Comment on posts

## Tech Stack

### Frontend
- React.js
- Next.js
- Tailwind CSS
- RainbowKit
- ethers.js

### Backend
- NestJS
- TypeScript
- PostgreSQL

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Git

### Frontend Setup
1. Clone the repository:
```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run start:dev
```

## Usage

1. Connect your Ethereum wallet using RainbowKit
2. Create or update your profile
3. Start posting, liking, and commenting on posts

## Database Schema

The application uses PostgreSQL with the following tables:

### Users
- `wallet_address` (Primary Key)
- `username`
- `bio`
- `profile_pic_url`

### Posts
- `id` (Primary Key)
- `wallet_address` (Foreign Key)
- `content`
- `created_at`

### Likes
- `id` (Primary Key)
- `post_id` (Foreign Key)
- `wallet_address` (Foreign Key)
- `created_at`

### Comments
- `id` (Primary Key)
- `post_id` (Foreign Key)
- `wallet_address` (Foreign Key)
- `content`
- `created_at`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
