# MakeFile for GCC Version of ShadowBrowserCore
#
# The ShadowBrowser Core can be compiled into different things
# In this GCC Version of the core, you can compile to a
# Windows DLL, Object File for Windows, and Object File for Linux


# Compile to Windows DLL: make windll
# Compile to Windows Lib: make win
# Compile to Linux   Lib: make linux

CC=g++
OSVER=ERROR

INPUTFILES=main.cpp

OUTFILE=ShadowCore

ifeq ($(OS),Windows_NT)
	OSVER = WIN
else
	OSVER = LINUX
endif

all:
	@echo Compile to Windows DLL: make windll
	@echo Compile to Windows Lib: make win
	@echo Compile to Linux   Lib: make linux
	@echo ------------------------------------
	@echo NOTE, It's recomended to only compile to your machines target

windll:
	$(CC) -shared -o .\bin\$(OUTFILE).dll -D WINDOWSDLL $(INPUTFILES)
	copy ShadowCore.h .\bin\include\ShadowCore.h

win:
	$(CC) -c -o .\bin\$(OUTFILE).o $(INPUTFILES)
	copy ShadowCore.h .\bin\include\ShadowCore.h

linux:
	$(CC) -c -o ./bin/$(OUTFILE).o $(INPUTFILES)
	cp ShadowCore.h ./bin/include/ShadowCore.h
