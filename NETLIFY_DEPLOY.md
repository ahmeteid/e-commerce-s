# Deploy to Netlify - Step by Step Guide

This guide will help you deploy your e-commerce frontend to Netlify.

## 🚀 Quick Deploy Steps

### Step 1: Prepare Your Code

1. Make sure your code is pushed to GitHub
2. Ensure `netlify.toml` is in the root directory (already created ✅)

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Add New Site**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select your repository (`e-commerce-s`)

3. **Configure Build Settings**
   - **Base directory**: Leave empty (or `./`)
   - **Build command**: `npm run build` (auto-detected)
   - **Publish directory**: `dist` (auto-detected)
   - Click **"Deploy site"**

4. **Set Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Click **"Add variable"**
   - Add:
     ```
     Key: VITE_API_BASE_URL
     Value: https://your-backend-url.com/api
     ```
   - Replace `your-backend-url.com` with your actual backend URL
   - Click **"Save"**

5. **Redeploy**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. **Set Environment Variables**
   ```bash
   netlify env:set VITE_API_BASE_URL "https://your-backend-url.com/api"
   ```

### Step 3: Update Backend CORS (If you have a backend)

If your backend is deployed separately, update the CORS configuration to allow your Netlify domain:

1. Go to your backend hosting (Render, Railway, etc.)
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-site.netlify.app
   ```
3. Redeploy backend

### Step 4: Verify Deployment

1. Visit your Netlify site: `https://your-site-name.netlify.app`
2. Check if products load correctly
3. Open browser console (F12) to check for errors

## 🔧 Configuration Details

### netlify.toml

The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing: All routes redirect to `index.html`
- Node version: 18

### Environment Variables

**Required:**
- `VITE_API_BASE_URL` - Your backend API URL (e.g., `https://backend.onrender.com/api`)

**Optional:**
- Any other Vite environment variables you need

## 📝 Important Notes

1. **Backend Required**: This frontend needs a backend API to work. Make sure your backend is deployed first.

2. **Environment Variables**: 
   - Must start with `VITE_` to be accessible in Vite
   - Set in Netlify dashboard → Site settings → Environment variables
   - Changes require a redeploy

3. **Build Process**:
   - Netlify runs `npm install` automatically
   - Then runs `npm run build`
   - Serves files from `dist` directory

4. **Custom Domain**:
   - Netlify provides free SSL
   - You can add a custom domain in Site settings → Domain management

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
- Check that all dependencies are in `package.json`
- Ensure `node_modules` is not in `.gitignore` incorrectly

**Error: Build command failed**
- Check Netlify build logs
- Verify Node version (should be 18+)

### API Not Connecting

**CORS Errors:**
- Ensure backend CORS allows your Netlify domain
- Check `VITE_API_BASE_URL` is set correctly
- Verify backend is running and accessible

**Network Errors:**
- Check browser console for errors
- Verify backend URL is correct
- Test backend URL directly in browser

### Products Not Loading

- Check browser console (F12)
- Verify `VITE_API_BASE_URL` environment variable
- Ensure backend is deployed and running
- Check network tab for API requests

## 🎉 Success!

Once deployed, your site will be live at:
- **Netlify URL**: `https://your-site-name.netlify.app`
- **Custom Domain**: (if configured) `https://yourdomain.com`

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Netlify Build Settings](https://docs.netlify.com/configure-builds/overview/)

---

**Happy Deploying! 🚀**

