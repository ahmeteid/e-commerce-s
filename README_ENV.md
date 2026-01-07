# Environment Variables Quick Reference

## 📁 Files Created

- **`.env.example`** - Template file (committed to git)
- **`.env.local`** - Local development file (gitignored)
- **`NETLIFY_ENV_SETUP.md`** - Detailed Netlify setup guide

## 🚀 Quick Setup

### For Local Development

The `.env.local` file is already created with:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

This will be used automatically when running `npm run dev`.

### For Netlify Deployment

1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Add variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend-url.com/api`
3. Redeploy your site

## 📝 Environment Variable

| Variable | Description | Local | Production |
|----------|-------------|-------|------------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` | `https://your-backend.com/api` |

## ⚠️ Important

- Variables must start with `VITE_` to be accessible in Vite
- `.env.local` is gitignored (safe for local secrets)
- `.env.example` is committed (template for team)
- Always redeploy after changing Netlify environment variables

## 📚 More Information

See `NETLIFY_ENV_SETUP.md` for detailed instructions.

