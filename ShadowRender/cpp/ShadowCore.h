//Copyright (c) 77Z 2021

#ifndef _SHADOWCORE_
#define _SHADOWCORE_

#include <string>
#include <cstring>
#include <vector>

//DLL Support
#ifdef WINDOWSDLL
#define EXPORT __declspec(dllexport)
#else
#define EXPORT  
#endif

//General Print
EXPORT void print(std::string text); //C++ String Style Print
EXPORT void println(std::string text);

EXPORT void printa(char text[]); //C Char Array Style Print
EXPORT void printlna(char text[]);

//Get system spec
EXPORT int getSysMemoryUsage(); //Get System Memory Usage

//Micellaneous
EXPORT void aboutCore(); //Info about ShadowCore
EXPORT std::string coreVersion();

//Randomizers
EXPORT int RandomNumber(int seed = -1); //Set to -1 for no seed 

//File Manipulation
std::string readFile(std::string fileLoc);
int writeFile(std::string fileLoc, std::string data);

//Utils
EXPORT char* StringToCharArr(std::string inputString);
EXPORT std::string charArrToString(char* a, int size);
std::vector<std::string> split(std::string str, std::string sep);

#endif /* _SHADOWCORE_ */
