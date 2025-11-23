# Quick Deployment Instructions

## ✅ What's Been Done

1. **Root endpoint added** to server - `/` now returns API status
2. **Axios configuration** created with environment variable support
3. **All components updated** to use the configured axios instance
4. **Vercel configuration** file created
5. **Deployment guide** created

## 🚀 Deploy Frontend to Vercel (3 Steps)

### Option 1: Via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Navigate to client and deploy
cd client
vercel --prod
```

**When prompted:**
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time) or **Yes** (if updating)
- Project name? **nilgiri-transport** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

### Option 2: Via Vercel Dashboard

1. Go to https://vercel.com and sign in
2. Click **"New Project"**
3. Import your Git repository
4. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://college-bus-drjx.onrender.com`
6. Click **"Deploy"**

## 🔧 Environment Variable

**IMPORTANT**: Add this environment variable in Vercel:

- **Key**: `REACT_APP_API_URL`
- **Value**: `https://college-bus-drjx.onrender.com`

**Where to add:**
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Or during deployment setup

## ✅ Verify Deployment

After deployment, test:

1. **Backend Root**: https://college-bus-drjx.onrender.com/
   - Should return JSON with API status

2. **Frontend**: Your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Should load the home page

3. **API Integration**: 
   - Navigate to Fees page - should load buses
   - Try admin login - should connect to backend

## 📝 Notes

- The axios configuration automatically uses `REACT_APP_API_URL` in production
- In development, it uses the proxy from `package.json` (localhost:5000)
- Auth tokens are automatically included via axios interceptors
- 401 errors automatically redirect to login

## 🐛 Troubleshooting

**API calls failing?**
- Check `REACT_APP_API_URL` is set in Vercel
- Verify backend URL is accessible
- Check browser console for CORS errors

**Build failing?**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**Need to update backend URL?**
- Update `REACT_APP_API_URL` in Vercel environment variables
- Redeploy (or it will auto-redeploy if connected to Git)

