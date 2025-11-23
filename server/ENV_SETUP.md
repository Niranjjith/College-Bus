# Environment Variables Setup

## Create .env file

Create a `.env` file in the `server` directory with the following content:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://niranjjithbathery_db_user:804diZ7xJvHIMzp8@cluster0.scxp5yc.mongodb.net/nilgiri_transport?retryWrites=true&w=majority&appName=Cluster0

# Server Port
PORT=5000

# JWT Secret Key
JWT_SECRET=nilgiri-transport-secret-key-2025
```

## Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Server port (default: 5000)
   - `JWT_SECRET`: Secret key for JWT tokens (use a strong random string in production)

3. The `.env` file is already in `.gitignore` so it won't be committed to version control.

## Current Configuration

- **MongoDB URI**: Already configured with your connection string
- **Port**: 5000
- **JWT Secret**: nilgiri-transport-secret-key-2025


