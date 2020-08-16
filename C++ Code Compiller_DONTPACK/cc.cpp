//Copyright © 77Z 2020

/* #include <iostream>

int main(int argc, char** argv) {
    std::cout << argc << " argument(s):" << std::endl;
    for (int i = 0; i < argc; ++i)
        std::cout << argv[i] << std::endl;
    return 0;
} */

#include "cc.h"

LRESULT CALLBACK WndProc(HWND hwnd, UINT Message, WPARAM wParam, LPARAM lParam) {
    
    BOOL checked = IsDlgButtonChecked(hwnd, ID_WINSUBSYS);

    switch(Message) {
        case WM_CREATE: {
            
            //Top text
            CreateWindow(TEXT("STATIC"), TEXT("Shadow Engine C++ Compiler"),
                WS_VISIBLE | WS_CHILD,
                5, 5,
                200, 20,
                hwnd, (HMENU) NULL, NULL, NULL);


            CreateWindow(TEXT("EDIT"), TEXT("C++ File"),
                WS_VISIBLE | WS_CHILD | WS_BORDER,
                5, 55,
                400, 20,
                hwnd, (HMENU) NULL, NULL, NULL);
            
            CreateWindow(TEXT("EDIT"), TEXT("Resource File"),
                WS_VISIBLE | WS_CHILD | WS_BORDER,
                5, 80,
                400, 20,
                hwnd, (HMENU) NULL, NULL, NULL);
            
            CreateWindow(TEXT("BUTTON"), TEXT("Windows Subsystem"),
                WS_VISIBLE | WS_CHILD | BS_CHECKBOX,
                5, 30,
                200, 20,
                hwnd, (HMENU) ID_WINSUBSYS, NULL, NULL);
            
            CreateWindow(TEXT("BUTTON"), TEXT("BUILD"),
                WS_VISIBLE | WS_CHILD,
                335, 165,
                100, 50,
                hwnd, (HMENU) ID_BUILD, NULL, NULL);

            break;
        }

        case WM_COMMAND: {
            if (checked) {
                CheckDlgButton(hwnd, ID_WINSUBSYS, BST_UNCHECKED);
            } else {
                CheckDlgButton(hwnd, ID_WINSUBSYS, BST_CHECKED);
            }

            switch(LOWORD(wParam)) {
                case ID_BUILD: {
                    MessageBox(hwnd, "Building...", "Shadow Engine", MB_ICONEXCLAMATION | MB_OK);
                    break;
                }
            }



            break;
        }

        case WM_DESTROY: {
            PostQuitMessage(0);
            break;
        }

        default:
            return DefWindowProc(hwnd, Message, wParam, lParam);
    }
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    WNDCLASSEX wc; // Properties struct for the window
    HWND hwnd;    //  The window handle
    MSG msg;     //   Temporary location for messages

    //Zero out the struct and set the stuff we want to modify
    memset(&wc, 0, sizeof(wc));
    wc.cbSize          = sizeof(WNDCLASSEX);
    wc.lpfnWndProc     = WndProc;        //All the messages get sent here
    wc.hInstance       = hInstance;
    wc.hCursor         = LoadCursor(NULL, IDC_ARROW); //Default Mouse cursor
    
    //COLOR_WINDOW is a define for a system color, line 9555 in WinUser.h
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW);
    wc.lpszClassName = "WindowClass";
    wc.hIcon         = LoadIcon(NULL, IDI_APPLICATION); //Loads the standard system icon, change it to a resource for a custom one
    wc.hIconSm       = LoadIcon(NULL, IDI_APPLICATION);

    if (!RegisterClassEx(&wc)) {
        //Create a error msgbox if window registration fails
        MessageBox(NULL, "ERROR: Window Creation Failed", "ERROR", MB_ICONEXCLAMATION | MB_OK);
        return 0;
    }

    //Window Location and Dimensions
    hwnd = CreateWindowEx(WS_EX_CLIENTEDGE, "WindowClass", "Shadow Engine", WS_VISIBLE | WS_SYSMENU,
        CW_USEDEFAULT,    //  X         //
        CW_USEDEFAULT,   //   Y        //
        450,            //    WIDTH   //
        250,           //     HEIGHT //
        NULL, NULL, hInstance, NULL
    );

    if (hwnd == NULL) {
        //Create a error msgbox if window registration fails
        MessageBox(NULL, "ERROR: Window Creation Failed", "ERROR", MB_ICONEXCLAMATION | MB_OK);
        return 0;
    }

    /*
        This is the heart of our program where all input is processed and 
        sent to WndProc. Note that GetMessage blocks code flow until it receives something, so
        this loop will not produce unreasonably high CPU usage
    */
    while(GetMessage(&msg, NULL, 0, 0) > 0) { /* If no error is received... */
        TranslateMessage(&msg); /* Translate key codes to chars if present */
        DispatchMessage(&msg); /* Send it to WndProc */
    }
    return msg.wParam;
}