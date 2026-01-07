# PowerShell script to run Spring Boot backend
# This script uses the full path to Maven

Write-Host "Starting Spring Boot Backend..." -ForegroundColor Green
Write-Host ""

$mavenPath = "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd"

if (Test-Path $mavenPath) {
    & $mavenPath spring-boot:run
} else {
    Write-Host "Maven not found at: $mavenPath" -ForegroundColor Red
    Write-Host "Trying to find Maven..." -ForegroundColor Yellow
    
    $maven = Get-Command mvn -ErrorAction SilentlyContinue
    if ($maven) {
        Write-Host "Found Maven in PATH, using it..." -ForegroundColor Green
        mvn spring-boot:run
    } else {
        Write-Host "ERROR: Maven not found!" -ForegroundColor Red
        Write-Host "Please install Maven or add it to your PATH" -ForegroundColor Yellow
        exit 1
    }
}

