# Arena Frontend

A decentralized social media platform frontend built with Next.js and React.

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update configuration:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3000
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
  ```

### Starting the Application

1. Development mode:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── posts/        # Posts routes
│   └── profile/      # Profile routes
├── components/       # React components
│   ├── ui/          # UI components (Button, Input, etc.)
│   ├── post-card.tsx # Post display component
│   ├── profile-card.tsx # Profile display component
│   └── profile-edit-form.tsx # Profile edit form
├── lib/             # Utility functions
│   ├── api.ts       # API calls
│   └── utils.ts     # Helper functions
├── styles/          # Global styles
└── types/          # TypeScript types
```

## Components Overview

### Main Components

1. **PostCard**
   - Displays individual posts with content, author info, and interactions
   - Handles likes and comments
   - Shows avatar and formatted wallet address

2. **ProfileCard**
   - Displays user profile information
   - Shows avatar, username, and bio
   - Conditional edit button for own profile

3. **ProfileEditForm**
   - Form for editing profile details
   - Handles username, bio, and profile picture URL
   - Loading states and error handling

### UI Components

1. **Button**
   - Styled buttons with different variants
   - Loading states

2. **Input**
   - Custom input fields with styling
   - Placeholder support

3. **Textarea**
   - Custom textarea component
   - Max length support
   - Responsive design

## Component Flow Diagram

```
User Flow:

[Home Page]
     ↓
[PostCard] (Multiple instances)
     ↓
[Like/Comment Buttons]
     ↓
[API Calls]
     ↓
[Database]

Profile Flow:

[Profile Page]
     ↓
[ProfileCard]
     ↓
[Edit Button] (if own profile)
     ↓
[ProfileEditForm]
     ↓
[Form Submission]
     ↓
[API Calls]
     ↓
[Database]
```

## Features

1. **Authentication**
   - Connect wallet using RainbowKit
   - Ethereum wallet address as identity
   - Wallet address formatting

2. **Profile Management**
   - Create and update profile
   - Username (max 32 chars)
   - Bio (max 280 chars)
   - Profile picture URL

3. **Posting System**
   - Create posts (max 280 chars)
   - View all posts in feed
   - Timestamps

4. **Interactions**
   - Like posts
   - Comment on posts
   - Real-time updates

## Error Handling

- Loading states for all async operations
- Error messages for failed operations
- Form validation
- Wallet connection errors

## Styling

- Tailwind CSS for styling
- Responsive design
- Custom theme colors
- Utility-first approach

## Development Tools

- TypeScript for type safety
- Next.js for routing and SSR
- RainbowKit for wallet connection
- ethers.js for blockchain interactions
- Tailwind CSS for styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
