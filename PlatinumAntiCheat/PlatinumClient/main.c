//Copyright © Vince Richter 2020
//Copyright © 77Z 2020

#include "main.h"

int main() {
    printf("Paranoid fish\n");

    loop();

    return 0;
}

int loop() {
    vbox_processes();
    Sleep(5000);
    loop();
}

int vbox_processes() {
    int res = FALSE;
    HANDLE hpSnap;
    PROCESSENTRY32 pentry;

    hpSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hpSnap != INVALID_HANDLE_VALUE) {
        pentry.dwSize = sizeof(PROCESSENTRY32);
    } else {
        return FALSE;
    }

    if (!Process32First(hpSnap, &pentry)) {
        CloseHandle(hpSnap);
        return FALSE;
    }

    do {
        if (lstrcmpi(pentry.szExeFile, "cheatengine.exe") == 0) {
            printf("CHEAT ENGINE DETECTED!\n");
            exit(0);
            res = TRUE;
        }

        if (lstrcmpi(pentry.szExeFile, "vboxtray.exe") == 0) {
            printf("VMBOX!\n");
            exit(0);
            res = TRUE;
        }

        if (lstrcmpi(pentry.szExeFile, "vboxservice.exe") == 0) {
            printf("VMBOX!\n");
            exit(0);
            res = TRUE;
        }

        if (lstrcmpi(pentry.szExeFile, "VBoxControl.exe") == 0) {
            printf("VMBOX!\n");
            exit(0);
            res = TRUE;
        }
    } while (Process32Next(hpSnap, &pentry));
    return res;
}