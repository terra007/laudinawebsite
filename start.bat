@echo off
rem Startet die Website lokal und oeffnet sie im Browser.
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js ist nicht installiert.
  echo Bitte die LTS-Version von https://nodejs.org installieren und diese Datei danach erneut starten.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Erster Start: Die Bausteine der Website werden installiert. Das dauert ein paar Minuten ...
  call npm install
  if errorlevel 1 (
    echo Die Installation ist fehlgeschlagen. Bitte die Meldung oben an Claude weitergeben.
    pause
    exit /b 1
  )
)

echo.
echo Die Website startet. Der Browser oeffnet sich gleich mit http://localhost:3210
echo Dieses Fenster offen lassen, solange die Website laufen soll. Beenden mit Strg+C.
echo.
start "" cmd /c "timeout /t 10 /nobreak >nul & start http://localhost:3210"
call npm run dev -- -p 3210
pause
