@echo off
title Electron Tools Build Tools

echo Copying AET...
echo --------------
MOVE /Y %CD%"\..\Advanced Electron Tools\Advanced Electron Tools\bin\Debug\Advanced Electron Tools.exe" %CD%..\aet.exe
echo --------------
echo DONE...
pause
exit