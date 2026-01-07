@echo off
REM Batch script to run Spring Boot backend
echo Starting Spring Boot Backend...
echo.

"C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start backend
    echo Make sure Java and Maven are installed
    pause
)

