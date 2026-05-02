@echo off
title Coding Practice Hub - Starting...
echo [1/2] Starting Backend and Frontend...
echo Please wait, browser will open automatically.

:: Start the npm project in a minimized window or background
start /b npm start

:: Wait for a few seconds to let the server start
timeout /t 5 /nobreak > NUL

:: Open the browser to the dashboard URL
start http://localhost:5173

echo.
echo ==========================================
echo Hub is RUNNING! Keep this window open.
echo To STOP, just close this terminal.
echo ==========================================
pause
