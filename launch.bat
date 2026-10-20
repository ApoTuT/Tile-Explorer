@echo off
setlocal
cd /d "%~dp0"
py -3.12 -c "import sys" >nul 2>&1
if not errorlevel 1 (
    py -3.12 main.py
    goto done
)
py -3 -c "import sys" >nul 2>&1
if not errorlevel 1 (
    py -3 main.py
    goto done
)
python -c "import sys" >nul 2>&1
if not errorlevel 1 (
    python main.py
    goto done
)
echo Python 3.10 or newer is required. Install Python, then run this file again.
:done
pause
