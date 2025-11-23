# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Step-by-Step Setup

1. **Install Root Dependencies**
   ```bash
   npm install
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start the Application**

   **Option A: Run both server and client together (Recommended)**
   ```bash
   npm run dev
   ```
   This will start:
   - Backend server on http://localhost:5000
   - React frontend on http://localhost:3000

   **Option B: Run separately**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm start
   ```

5. **Access the Application**
   - Open your browser and go to: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
     - Email: admintransport@gmail.com
     - Password: 123456

## First Run

On first run, the server will automatically create a `data.json` file in the `server` directory with:
- Admin credentials (already set up)
- All bus routes from the original HTML files
- Sample helpdesk and lost & found data

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Backend: Change PORT in `server/index.js` or set environment variable
- Frontend: React will prompt to use a different port

### Module Not Found Errors
Make sure you've installed dependencies in all three locations:
- Root directory
- server/ directory
- client/ directory

### CORS Errors
The server is configured to allow requests from localhost:3000. If you change the frontend port, update the CORS settings in `server/index.js`.

## Production Build

To create a production build:

```bash
cd client
npm run build
```

The built files will be in `client/build/`. You can serve these with any static file server or configure the Express server to serve them.


