#include "ShadowCore.h"
#include "version.h"

#ifdef _WIN32

#include <Windows.h>

#endif

#include <iostream>
#include <string>
#include <ctime>
#include <stdlib.h>
#include <fstream>
#include <cstring>
#include <vector>

EXPORT void print(std::string text) {
	std::cout << text;
}
EXPORT void println(std::string text) {
	std::cout << text << std::endl;
}

EXPORT void printa(char text[]) {
	std::cout << text;
}
EXPORT void printlna(char text[]) {
	std::cout << text << std::endl;
}

EXPORT int getSysMemoryUsage() {
#ifdef _WIN32
	MEMORYSTATUSEX statex;
	statex.dwLength = sizeof(statex);
	GlobalMemoryStatusEx(&statex);

	return statex.dwMemoryLoad;
#endif
#ifdef linux
	return 0;
#endif
}

time_t now = time(0);
char* dt = ctime(&now);

EXPORT void aboutCore() {
	print("ShadowCore Version "); println(CORE_VERSION);
	print("Time of Run: "); println(dt);
	print("Time of Compile: "); print(__DATE__); print(" "); println(__TIME__);
}

EXPORT std::string coreVersion() {
	return CORE_VERSION;
}


/* Randomizers */
/* Can be used within ShadowBrowser or by the JavaScript end */

EXPORT int RandomNumber(int seed) {
	if (seed == -1) {
		return rand();
	} else {
		srand(seed);
		return rand();
	}
}

/* File Manipulation */

// Read a file, Returns error string if fail, returns file data if success
// Max of 100000 characters in file for performance reasons
// If you need mroe, write your own file reader.
std::string readFile(std::string fileLoc) {
	std::fstream file;
	file.open(fileLoc);
	if (!file) { return "CORE: ERROR READING FILE"; }
	char ch[100000];
	while (1) {
		file >> ch;
		if (file.eof())	//Reaches end of file
			break;	//Escape from loop
	}
	file.close(); // Free memory
	return charArrToString(ch, sizeof(ch) / sizeof(char));
}

// Write to a file, returns 0 if success, 1 if fail
int writeFile(std::string fileLoc, std::string data) {
	std::ofstream file;
#ifdef _WIN32
	//Windows Likes character arrays you special snowflake
	file.open(StringToCharArr(fileLoc));
#else
	file.open(fileLoc);
#endif
	if (!file) { return 1; }
	file << data;
	file.close();
	return 0;
}

/* Utils */

// Supply a string and boom out comes a character array
EXPORT char* StringToCharArr(std::string inputString) {
	int stringlength = inputString.length();
	char stringArr[stringlength + 1];
	return strcpy(stringArr, inputString.c_str());
}

//Supply a character array, size and boom out comes a string
//To get size, sizeof(charArrayVar) / sizeof(char)
EXPORT std::string charArrToString(char* a, int size) { 
	std::string str = ""; 
	for (int i = 0; i < size; i++) { 
		str = str + a[i];
	}
	return str;
}

// Split string function
// https://stackoverflow.com/questions/16286095/similar-function-to-javas-string-split-in-c
std::vector<std::string> split(std::string str, std::string sep) {
	char* cstr = const_cast<char*>(str.c_str());
	char* current;
	std::vector<std::string> arr;
	current = strtok(cstr, sep.c_str());
	while (current != NULL){
		arr.push_back(current);
		current=strtok(NULL, sep.c_str());
	}
	return arr;
}
