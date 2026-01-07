# Netlify Deployment - Mock Data Mode

This project is configured to use **mock data** for Netlify deployment. No backend is required!

## ✅ What's Configured

- **6 Products** displayed using mock data
- **No Backend Required** - All API calls are commented out
- **Ready for Netlify** - Just deploy and it works!

## 🚀 Deploy to Netlify

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub.

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Configure:
   - **Build command**: `npm run build` (auto-detected)
   - **Publish directory**: `dist` (auto-detected)
5. Click **"Deploy site"**

**No environment variables needed!** The app uses mock data.

## 📦 Products Included (6 Items)

1. **Laptop Pro 15"** - $1,299.99
2. **Wireless Mouse** - $29.99
3. **Smartphone X** - $899.99
4. **Wireless Headphones** - $199.99
5. **Cotton T-Shirt** - $19.99
6. **Denim Jeans** - $59.99

## 🔄 To Enable Backend (Optional)

If you want to use a backend later:

1. **Uncomment backend code** in:
   - `src/context/ProductContext.jsx` - Uncomment the try-catch block
   - `src/services/api.js` - Uncomment API imports
   - `src/constants/api.js` - Already active, just set environment variable

2. **Deploy backend** to Render/Railway/etc.

3. **Set environment variable** in Netlify:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

4. **Redeploy** frontend

## 📝 Files Modified for Mock Data

- ✅ `src/context/ProductContext.jsx` - Uses mock data directly
- ✅ `src/services/api.js` - Backend calls commented out
- ✅ `src/constants/api.js` - API config kept for future use

All backend code is **commented, not deleted** - easy to re-enable!

## 🎉 That's It!

Your site will work immediately on Netlify with 6 products using mock data. No backend setup needed!

