# Smart Note App

A note-taking REST API with AI-powered summarization built with Node.js, Express, MongoDB, and Google Gemini AI.

## Features

- User authentication (JWT)
- CRUD operations for notes
- AI note summarization
- Profile picture upload
- Email-based password reset
- GraphQL support

## Prerequisites

- Node.js (v18+)
- MongoDB
- Redis
- Google Gemini AI API Key

## Quick Start

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   # Create .env file with:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/smart-note-app
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_APP_EMAIL=your_email@gmail.com
   GOOGLE_APP_PASSWORD=your_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Run the application**

   ```bash
   # Development
   pnpm run dev

   # Production
   pnpm start
   ```

## API Endpoints

### Authentication

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with OTP
- `POST /upload-profile` - Upload profile picture

### Notes

- `GET /notes` - Get user notes (paginated)
- `POST /notes` - Create new note
- `GET /notes/:id` - Get specific note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `POST /notes/:id/summarize` - Generate AI summary

### GraphQL

- `POST /graphql` - GraphQL endpoint for advanced queries

## Author

**Kareem Adel Awwad**

- GitHub: [@KareemAdelAwwad](https://github.com/KareemAdelAwwad)
- Email: kareem.adel.awwad@gmail.com
