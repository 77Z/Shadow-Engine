//Copyright © Vince Richter 2020
//Copyright © 77Z™ 2020

#include "main.h"

void print(std::string text) {
    std::cout << text << std::endl;
}

inline bool exists(const std::string& name) {
    struct stat buffer;
    return (stat (name.c_str(), &buffer) == 0);
}

int main() {

    print("Running Linux Style Tests");

    if (exists("./node_modules/electron/dist/electron")) {
        print("Test 1 Passed");
    } else {
        print("Test 1 Failed");
        exit(1);
    }

    if (exists("./node_modules/node-pty/build/Release/pty.node")) {
        print("Test 2 Passed");
    } else {
        print("Test 2 Failed");
        exit(1);
    }

    if (exists("./node_modules/uuid/dist/index.js")) {
        print("Test 3 Passed");
    } else {
        print("Test 3 Failed");
        exit(1);
    }

    print("All tests passed (Linux)");

    //Every Test Passed, exit with code 0
    return 0;
}
