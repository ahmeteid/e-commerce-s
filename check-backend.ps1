# Script to check if backend is running
Write-Host "Checking Backend Status..." -ForegroundColor Cyan
Write-Host ""

# Check if Java process is running
$javaProcess = Get-Process java -ErrorAction SilentlyContinue
if ($javaProcess) {
    Write-Host "✅ Java process is running (PID: $($javaProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "❌ No Java process found" -ForegroundColor Red
    Write-Host "   Please start the backend first using: cd backend; .\run-backend.ps1" -ForegroundColor Yellow
    exit
}

# Check if port 8080 is listening
Write-Host "Checking port 8080..." -ForegroundColor Cyan
$portCheck = Test-NetConnection -ComputerName localhost -Port 8080 -InformationLevel Quiet -WarningAction SilentlyContinue
if ($portCheck) {
    Write-Host "✅ Port 8080 is open and listening" -ForegroundColor Green
} else {
    Write-Host "⚠️  Port 8080 is not yet listening (backend might still be starting...)" -ForegroundColor Yellow
    Write-Host "   Spring Boot takes 30-60 seconds to fully start" -ForegroundColor Yellow
}

# Try to reach the API
Write-Host ""
Write-Host "Testing API endpoint..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/products" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Backend API is responding! Status Code: $($response.StatusCode)" -ForegroundColor Green
    $products = $response.Content | ConvertFrom-Json
    Write-Host "   Found $($products.Count) products in the database" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Backend is ready! Your frontend can now fetch data from:" -ForegroundColor Green
    Write-Host "   http://localhost:8080/api" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  API endpoint not yet accessible: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "The backend might still be starting. Please wait 30-60 seconds and try again." -ForegroundColor Yellow
    Write-Host "You can check the backend logs in the terminal where you started it." -ForegroundColor Yellow
}

