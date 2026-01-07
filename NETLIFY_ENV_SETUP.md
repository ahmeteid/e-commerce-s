# Netlify Environment Variables Setup Guide

This guide explains how to set up environment variables for your Netlify deployment.

## 📋 Required Environment Variables

### `VITE_API_BASE_URL`
- **Description**: Your backend API base URL
- **Local Development**: `http://localhost:8080/api`
- **Production**: `https://your-backend-url.com/api` (e.g., `https://your-backend.onrender.com/api`)

## 🔧 Setting Up Environment Variables in Netlify

### Method 1: Via Netlify Dashboard (Recommended)

1. **Go to Your Site**
   - Log in to [Netlify Dashboard](https://app.netlify.com)
   - Select your site

2. **Navigate to Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Or click **Site configuration** → **Environment variables**

3. **Add Environment Variable**
   - Click **"Add variable"** or **"Add environment variable"**
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)
   - **Scopes**: Select where it applies
     - ✅ **Production**: For production builds
     - ✅ **Deploy previews**: For preview deployments
     - ✅ **Branch deploys**: For branch-specific deployments
   - Click **"Save"**

4. **Redeploy**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - Or push a new commit to trigger automatic deployment

### Method 2: Via Netlify CLI

1. **Install Netlify CLI** (if not already installed)
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Set Environment Variable**
   ```bash
   netlify env:set VITE_API_BASE_URL "https://your-backend-url.com/api"
   ```

4. **Verify Environment Variables**
   ```bash
   netlify env:list
   ```

5. **Redeploy**
   ```bash
   netlify deploy --prod
   ```

## 📝 Environment Variable Examples

### For Local Development
Create `.env.local` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### For Production (Netlify)
Set in Netlify Dashboard:
```
VITE_API_BASE_URL=https://ecommerce-backend.onrender.com/api
```

### For Different Environments

**Production:**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

**Staging:**
```
VITE_API_BASE_URL=https://staging-api.yourdomain.com/api
```

## ⚠️ Important Notes

1. **Vite Prefix Required**: All environment variables must start with `VITE_` to be accessible in your Vite app
2. **Redeploy Required**: After adding/changing environment variables, you must redeploy for changes to take effect
3. **No Trailing Slash**: Don't add trailing slash to the API URL (e.g., use `/api` not `/api/`)
4. **HTTPS Required**: Production URLs must use HTTPS (Netlify enforces this)

## 🔍 Verifying Environment Variables

### In Your Code
The environment variable is used in `src/constants/api.js`:
```javascript
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
```

### In Browser Console
You can check if the variable is loaded:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

### In Netlify Build Logs
Check the build logs in Netlify to see if environment variables are being used:
1. Go to **Deploys** tab
2. Click on a deploy
3. Check the build logs for environment variable usage

## 🐛 Troubleshooting

### Environment Variable Not Working

**Problem**: API calls still use localhost
- **Solution**: 
  - Verify variable name is exactly `VITE_API_BASE_URL`
  - Check that variable is set for the correct scope (Production/Preview)
  - Redeploy after setting the variable
  - Clear browser cache

**Problem**: Build fails or variable is undefined
- **Solution**:
  - Ensure variable starts with `VITE_`
  - Check Netlify build logs for errors
  - Verify variable is set in correct environment scope

**Problem**: CORS errors
- **Solution**:
  - Ensure backend CORS allows your Netlify domain
  - Update backend `FRONTEND_URL` environment variable
  - Check backend logs for CORS errors

## 📚 Additional Resources

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Netlify CLI Documentation](https://cli.netlify.com/)

---

**Need Help?** Check the build logs in Netlify dashboard for detailed error messages.

