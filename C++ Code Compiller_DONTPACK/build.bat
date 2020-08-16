@echo off
echo Compiling resources.rc
windres resources.rc dist\res.o
echo Compiling cc.cpp <- res.o
g++ -Wl,-subsystem,windows -o dist\codecomp.exe dist\res.o cc.cpp
echo Done!