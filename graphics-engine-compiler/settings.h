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
//         - Vulkan    (LIN_DEB_VULKAN)
//     - Red Hat, Fedora, SUSE, etc...     .rpm
//         - Shadow    (LIN_RPM_SHADOW)
//         - Vulkan    (LIN_RPM_VULKAN)

#define WINDOWSNT_SHADOW
