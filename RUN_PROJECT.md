# 🚀 How to Run the E-Commerce Project

## Quick Start Guide

You need **TWO terminal windows** - one for the backend and one for the frontend.

---

## Step 1: Start the Backend Server

Open **Terminal 1** and run:

### Option A: Using PowerShell Script (Windows - Recommended)
```powershell
cd "F:\React\omar aslan\e-commerce-s\backend"
.\run-backend.ps1
```

### Option B: Using Batch Script
```cmd
cd "F:\React\omar aslan\e-commerce-s\backend"
.\run-backend.bat
```

### Option C: Using Maven Directly
```powershell
cd "F:\React\omar aslan\e-commerce-s\backend"
mvn spring-boot:run
```

**Wait for the message:** `Started EcommerceApplication` (takes about 30-60 seconds)

---

## Step 2: Start the Frontend Server

Open **Terminal 2** (keep Terminal 1 running!) and run:

```powershell
cd "F:\React\omar aslan\e-commerce-s"
npm install
npm run dev
```

**Wait for the message:** `Local: http://localhost:5173`

---

## Step 3: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Products API**: http://localhost:8080/api/products
- **H2 Console** (Database): http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:ecommercedb`
  - Username: `sa`
  - Password: (leave empty)

---

## ✅ Verify Everything is Working

### Check Backend Status
```powershell
cd "F:\React\omar aslan\e-commerce-s"
.\check-backend.ps1
```

### Test Backend API
Open in browser: http://localhost:8080/api/products

You should see JSON data with products.

### Test Frontend
Open in browser: http://localhost:5173

The app should load and display products from the backend.

---

## 📋 Prerequisites

Make sure you have installed:
- ✅ **Node.js** (check: `node --version`)
- ✅ **Java JDK 17+** (check: `java -version`)
- ✅ **Maven** (check: `mvn --version`)

---

## 🛑 Stopping the Servers

- **Backend**: Press `Ctrl+C` in Terminal 1
- **Frontend**: Press `Ctrl+C` in Terminal 2

---

## 🐛 Troubleshooting

### Backend won't start?
- Check if port 8080 is already in use
- Make sure Java 17+ is installed: `java -version`
- Try: `cd backend; mvn clean install`

### Frontend won't start?
- Make sure Node.js is installed
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### Backend API not responding?
- Wait 30-60 seconds after starting backend
- Check backend logs in Terminal 1
- Verify with: `.\check-backend.ps1`

### Frontend showing mock data?
- Make sure backend is running on port 8080
- Check browser console for API errors
- Verify API URL in browser console: `console.log(import.meta.env.VITE_API_BASE_URL)`

---

## 📝 Current Configuration

- **Backend Port**: 8080
- **Frontend Port**: 5173
- **API Base URL**: `http://localhost:8080/api`
- **Database**: H2 (in-memory, no setup needed)

---

## 🎉 You're All Set!

Both servers should now be running and the frontend will fetch data from your backend API!

