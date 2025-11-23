# Deployment Guide

## Backend (Render)

The backend is already deployed at: `https://college-bus-drjx.onrender.com`

### Environment Variables in Render:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: 5000 (or let Render assign)

### Root Endpoint
The server now has a root endpoint that returns:
```json
{
  "message": "College Bus Transport API is running",
  "status": "OK",
  "version": "1.0.0",
  "endpoints": {
    "buses": "/api/buses",
    "admin": "/api/admin/login",
    "health": "/"
  }
}
```

## Frontend (Vercel)

### Step 1: Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Navigate to client directory
```bash
cd client
```

### Step 4: Set Environment Variable
In Vercel dashboard or via CLI:
```bash
vercel env add REACT_APP_API_URL
# Enter: https://college-bus-drjx.onrender.com
```

Or add it in Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `REACT_APP_API_URL` = `https://college-bus-drjx.onrender.com`

### Step 5: Deploy to Vercel
```bash
vercel --prod
```

### Alternative: Deploy via Vercel Dashboard
1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository
4. Set root directory to `client`
5. Add environment variable: `REACT_APP_API_URL` = `https://college-bus-drjx.onrender.com`
6. Deploy

## Configuration

### API Configuration
The frontend uses a centralized axios configuration in `client/src/config/axios.js`:
- Automatically uses `REACT_APP_API_URL` environment variable in production
- Falls back to proxy in development (localhost:5000)
- Automatically includes auth tokens in requests
- Handles 401 errors and redirects to login

### Environment Variables

**Development** (uses proxy from package.json):
- No environment variable needed
- Proxy: `http://localhost:5000`

**Production** (Vercel):
- `REACT_APP_API_URL`: `https://college-bus-drjx.onrender.com`

## Testing

After deployment, test these endpoints:

1. **Backend Root**: https://college-bus-drjx.onrender.com/
2. **Buses API**: https://college-bus-drjx.onrender.com/api/buses
3. **Health Check**: https://college-bus-drjx.onrender.com/health
4. **Frontend**: Your Vercel URL

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure Render backend has CORS enabled (already configured in `server/index.js`).

### API Not Found
- Check that `REACT_APP_API_URL` is set correctly in Vercel
- Verify the backend URL is accessible
- Check browser console for errors

### Build Failures
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard
- Verify Node.js version compatibility

