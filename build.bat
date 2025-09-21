@echo off

REM Suppress all npm warnings and build the project
set npm_config_warn=false
set npm_config_audit=false
set npm_config_fund=false
set npm_config_loglevel=error

REM Install dependencies with suppressed warnings
npm install --silent --no-audit --no-fund

REM Build the project
npm run build

echo Build completed successfully!
pause
