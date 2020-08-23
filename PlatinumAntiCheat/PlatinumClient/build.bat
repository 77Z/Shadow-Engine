@echo off

:compile
echo Compiling resources.rc
windres resources.rc res.o
echo DONE!
echo ------------------------------
echo Compiling main.c <- res.o
gcc -Wl,-subsystem,windows -o platinum.exe res.o main.c
echo DONE!

:move
echo Moving output file to PlatinumTray bin debug folder
copy platinum.exe "..\PlatinumTray\Platinum Tray\Platinum Tray\bin\Debug\"
echo DONE!

:clean
echo Cleaning Workspace...
del res.o
echo Deleted res.o
echo DONE! 