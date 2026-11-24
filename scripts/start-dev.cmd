@echo off
REM Xiaoban frontend launcher: start Vite dev server (minimized) and open browser.
cd /d "%~dp0\.."
start "xiaoban-dev" /min cmd /c "npm run dev -- --port 5173 --strictPort"
ping -n 6 127.0.0.1 >nul
start "" http://localhost:5173
exit
