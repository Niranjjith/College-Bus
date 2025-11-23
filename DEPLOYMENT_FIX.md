# Vercel Deployment Fix Guide

## The Problem
Vercel is getting "Unexpected end of JSON input" error when reading package.json.

## Solution Options

### Option 1: Set Root Directory in Vercel Dashboard (RECOMMENDED)

1. Go to https://vercel.com and select your project
2. Go to **Settings** → **General**
3. Find **Root Directory** setting
4. Set it to: `client`
5. Click **Save**
6. Go to **Deployments** and click **Redeploy**

This tells Vercel to treat the `client` folder as the project root.

### Option 2: Deploy from Client Directory

If you're using Vercel CLI:

```bash
cd client
vercel --prod
```

Make sure you're IN the client directory when running the command.

### Option 3: Use Root vercel.json (Current Setup)

I've created a root `vercel.json` that points to the client directory. This should work, but you still need to:

1. **Set Environment Variable in Vercel Dashboard:**
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://college-bus-drjx.onrender.com`

2. **Redeploy** your project

## Verification Steps

After fixing, verify:

1. ✅ Root `package.json` is valid JSON (no trailing commas, proper closing)
2. ✅ `client/package.json` is valid JSON
3. ✅ Root directory is set to `client` in Vercel dashboard
4. ✅ Environment variable `REACT_APP_API_URL` is set
5. ✅ Build command is `npm run build`
6. ✅ Output directory is `build`

## If Still Failing

1. Check Vercel build logs for the exact error
2. Verify the package.json file encoding (should be UTF-8)
3. Try deleting and recreating the project in Vercel
4. Make sure there are no hidden characters in package.json files

## Quick Test

Test your package.json files locally:
```bash
# Test root package.json
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))"

# Test client package.json
node -e "JSON.parse(require('fs').readFileSync('client/package.json', 'utf8'))"
```

Both should complete without errors.

