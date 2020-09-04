module.exports = {
    index: `const r = require("raylib");
const def = require("./raylib_definitions");

const screenWidth = 1280;
const screenHeight = 720;

r.SetConfigFlags(def.systemConfigFlags.FLAG_WINDOW_RESIZABLE);

r.InitWindow(screenWidth, screenHeight, "Shadow Engine");
r.SetTargetFPS(60);

while(!r.WindowShouldClose()) {
    r.BeginDrawing();
        if (r.IsKeyDown(def.keyboardKey.KEY_F11)) {
            r.ToggleFullscreen();
        }
        
        r.ClearBackground(r.BLACK);
        
        r.DrawText("Hello, World!", 1, 0, 20, r.WHITE);
    r.EndDrawing();
}`,
    raylib_definitions: `//Copyright © Vince Richter 2020\n//Copyright © 77Z 2020\n\nmodule.exports = {\n    systemConfigFlags: {\n        FLAG_RESERVED           : 1,    // Reserved\n        FLAG_FULLSCREEN_MODE    : 2,    // Set to run program in fullscreen\n        FLAG_WINDOW_RESIZABLE   : 4,    // Set to allow resizable window\n        FLAG_WINDOW_UNDECORATED : 8,    // Set to disable window decoration (frame and buttons)\n        FLAG_WINDOW_TRANSPARENT : 16,   // Set to allow transparent window\n        FLAG_WINDOW_HIDDEN      : 128,  // Set to create the window initially hidden\n        FLAG_WINDOW_ALWAYS_RUN  : 256,  // Set to allow windows running while minimized\n        FLAG_MSAA_4X_HINT       : 32,   // Set to try enabling MSAA 4X\n        FLAG_VSYNC_HINT         : 64    // Set to try enabling V-Sync on GPU\n    },\n    tracelogType: {\n        LOG_ALL     : 0,    // Display all logs\n        LOG_TRACE   : 1,\n        LOG_DEBUG   : 2,\n        LOG_INFO    : 3,\n        LOG_WARNING : 4,\n        LOG_ERROR   : 5,\n        LOG_FATAL   : 6,\n        LOG_NONE    : 7    // Disable logging\n    },\n    keyboardKey: {\n        // Alphanumeric keys\n        KEY_APOSTROPHE      : 39,\n        KEY_COMMA           : 44,\n        KEY_MINUS           : 45,\n        KEY_PERIOD          : 46,\n        KEY_SLASH           : 47,\n        KEY_ZERO            : 48,\n        KEY_ONE             : 49,\n        KEY_TWO             : 50,\n        KEY_THREE           : 51,\n        KEY_FOUR            : 52,\n        KEY_FIVE            : 53,\n        KEY_SIX             : 54,\n        KEY_SEVEN           : 55,\n        KEY_EIGHT           : 56,\n        KEY_NINE            : 57,\n        KEY_SEMICOLON       : 59,\n        KEY_EQUAL           : 61,\n        KEY_A               : 65,\n        KEY_B               : 66,\n        KEY_C               : 67,\n        KEY_D               : 68,\n        KEY_E               : 69,\n        KEY_F               : 70,\n        KEY_G               : 71,\n        KEY_H               : 72,\n        KEY_I               : 73,\n        KEY_J               : 74,\n        KEY_K               : 75,\n        KEY_L               : 76,\n        KEY_M               : 77,\n        KEY_N               : 78,\n        KEY_O               : 79,\n        KEY_P               : 80,\n        KEY_Q               : 81,\n        KEY_R               : 82,\n        KEY_S               : 83,\n        KEY_T               : 84,\n        KEY_U               : 85,\n        KEY_V               : 86,\n        KEY_W               : 87,\n        KEY_X               : 88,\n        KEY_Y               : 89,\n        KEY_Z               : 90,\n\n        // Function keys\n        KEY_SPACE           : 32,\n        KEY_ESCAPE          : 256,\n        KEY_ENTER           : 257,\n        KEY_TAB             : 258,\n        KEY_BACKSPACE       : 259,\n        KEY_INSERT          : 260,\n        KEY_DELETE          : 261,\n        KEY_RIGHT           : 262,\n        KEY_LEFT            : 263,\n        KEY_DOWN            : 264,\n        KEY_UP              : 265,\n        KEY_PAGE_UP         : 266,\n        KEY_PAGE_DOWN       : 267,\n        KEY_HOME            : 268,\n        KEY_END             : 269,\n        KEY_CAPS_LOCK       : 280,\n        KEY_SCROLL_LOCK     : 281,\n        KEY_NUM_LOCK        : 282,\n        KEY_PRINT_SCREEN    : 283,\n        KEY_PAUSE           : 284,\n        KEY_F1              : 290,\n        KEY_F2              : 291,\n        KEY_F3              : 292,\n        KEY_F4              : 293,\n        KEY_F5              : 294,\n        KEY_F6              : 295,\n        KEY_F7              : 296,\n        KEY_F8              : 297,\n        KEY_F9              : 298,\n        KEY_F10             : 299,\n        KEY_F11             : 300,\n        KEY_F12             : 301,\n        KEY_LEFT_SHIFT      : 340,\n        KEY_LEFT_CONTROL    : 341,\n        KEY_LEFT_ALT        : 342,\n        KEY_LEFT_SUPER      : 343,\n        KEY_RIGHT_SHIFT     : 344,\n        KEY_RIGHT_CONTROL   : 345,\n        KEY_RIGHT_ALT       : 346,\n        KEY_RIGHT_SUPER     : 347,\n        KEY_KB_MENU         : 348,\n        KEY_LEFT_BRACKET    : 91,\n        KEY_BACKSLASH       : 92,\n        KEY_RIGHT_BRACKET   : 93,\n        KEY_GRAVE           : 96,\n\n        // Keypad keys\n        KEY_KP_0            : 320,\n        KEY_KP_1            : 321,\n        KEY_KP_2            : 322,\n        KEY_KP_3            : 323,\n        KEY_KP_4            : 324,\n        KEY_KP_5            : 325,\n        KEY_KP_6            : 326,\n        KEY_KP_7            : 327,\n        KEY_KP_8            : 328,\n        KEY_KP_9            : 329,\n        KEY_KP_DECIMAL      : 330,\n        KEY_KP_DIVIDE       : 331,\n        KEY_KP_MULTIPLY     : 332,\n        KEY_KP_SUBTRACT     : 333,\n        KEY_KP_ADD          : 334,\n        KEY_KP_ENTER        : 335,\n        KEY_KP_EQUAL        : 336\n    },\n    mouseButton: {\n        MOUSE_LEFT_BUTTON   : 0,\n        MOUSE_RIGHT_BUTTON  : 1,\n        MOUSE_MIDDLE_BUTTON : 2\n    },\n    androidButton: {\n        KEY_BACK            : 4,\n        KEY_MENU            : 82,\n        KEY_VOLUME_UP       : 24,\n        KEY_VOLUME_DOWN     : 25\n    },\n    gamepadNumber: {\n        GAMEPAD_PLAYER1     : 0,\n        GAMEPAD_PLAYER2     : 1,\n        GAMEPAD_PLAYER3     : 2,\n        GAMEPAD_PLAYER4     : 3\n    },\n    gamepadButton: {\n        // This is here just for error checking\n        GAMEPAD_BUTTON_UNKNOWN          : 0,\n\n        // This is normally a DPAD\n        GAMEPAD_BUTTON_LEFT_FACE_UP     : 1,\n        GAMEPAD_BUTTON_LEFT_FACE_RIGHT  : 2,\n        GAMEPAD_BUTTON_LEFT_FACE_DOWN   : 3,\n        GAMEPAD_BUTTON_LEFT_FACE_LEFT   : 4,\n\n        // This normally corresponds with PlayStation and Xbox controllers\n        // XBOX: [Y,X,A,B]\n        // PS3: [Triangle,Square,Cross,Circle]\n        // No support for 6 button controllers though..\n        GAMEPAD_BUTTON_RIGHT_FACE_UP    : 5,\n        GAMEPAD_BUTTON_RIGHT_FACE_RIGHT : 6,\n        GAMEPAD_BUTTON_RIGHT_FACE_DOWN  : 7,\n        GAMEPAD_BUTTON_RIGHT_FACE_LEFT  : 8,\n\n        // Triggers\n        GAMEPAD_BUTTON_LEFT_TRIGGER_1   : 9,\n        GAMEPAD_BUTTON_LEFT_TRIGGER_2   : 10,\n        GAMEPAD_BUTTON_RIGHT_TRIGGER_1  : 11,\n        GAMEPAD_BUTTON_RIGHT_TRIGGER_2  : 12,\n\n        // These are buttons in the center of the gamepad\n        GAMEPAD_BUTTON_MIDDLE_LEFT      : 13,    //PS3 Select\n        GAMEPAD_BUTTON_MIDDLE           : 14,    //PS Button/XBOX Button\n        GAMEPAD_BUTTON_MIDDLE_RIGHT     : 15,    //PS3 Start\n\n        // These are the joystick press in buttons\n        GAMEPAD_BUTTON_LEFT_THUMB       : 16,\n        GAMEPAD_BUTTON_RIGHT_THUMB      : 17\n    },\n    gamepadAxis: {\n        // This is here just for error checking\n        GAMEPAD_AXIS_UNKNOWN            : 0,\n\n        // Left stick\n        GAMEPAD_AXIS_LEFT_X             : 1,\n        GAMEPAD_AXIS_LEFT_Y             : 2,\n\n        // Right stick\n        GAMEPAD_AXIS_RIGHT_X            : 3,\n        GAMEPAD_AXIS_RIGHT_Y            : 4,\n\n        // Pressure levels for the back triggers\n        GAMEPAD_AXIS_LEFT_TRIGGER       : 5,    // [1..-1] (pressure-level)\n        GAMEPAD_AXIS_RIGHT_TRIGGER      : 6     // [1..-1] (pressure-level)\n    }\n}\n\n//This file is incomplete\n//I stopped at line 680\n`
}