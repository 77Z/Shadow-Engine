//Copyright © Vince Richter 2020
//Copyright © 77Z 2020

#pragma once

//Select Platform to compile to

// WINDOWS  MAC  LINUX  WII  GAMECUBE  ANDROID  IOS  WIIU

#define WINDOWS

//which graphics engine the final result should use
// Windows
//     - Shadow        (WINDOWSNT_SHADOW)
//     - OpenGL        (WINDOWSNT_OPENGL)
//     - Your engine here??
// MacOS
//     - Metal         (DARWIN_METAL)
//     - OpenGL        (DARWIN_OPENGL)
//     - Shadow        (DARWIN_SHADOW)
//     - Your engine here??
// Linux
//     - Debian, Ubuntu, etc...            .deb
//         - Shadow    (LIN_DEB_SHADOW)
//         - OpenGL    (LIN_DEB_OPENGL)
//     - Red Hat, Fedora, SUSE, etc...     .rpm
//         - Shadow    (LIN_RPM_SHADOW)
//         - OpenGL    (LIN_RPM_OPENGL)

#define WINDOWS_SHADOW