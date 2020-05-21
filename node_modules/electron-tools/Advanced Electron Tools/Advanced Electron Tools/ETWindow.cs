using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Diagnostics;

namespace Advanced_Electron_Tools
{
    class ETWindow
    {
        [DllImport("user32.dll", SetLastError = true)]
        static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

        [DllImport("user32.dll", SetLastError = true)]
        static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

        [DllImport("user32.dll", SetLastError = true)]
        static extern bool GetWindowRect(IntPtr hwnd, ref Rect rectangle);

        [DllImport("user32.dll", SetLastError = true)]
        static extern bool CloseWindow(IntPtr hWnd);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool SetWindowText(IntPtr hWnd, string lpString);



        public struct Rect
        {
            public int Left { get; set; }
            public int Top { get; set; }
            public int Right { get; set; }
            public int Bottom { get; set; }
        }

        const uint SWP_NOSIZE = 0x0001;
        const uint SWP_NOZORDER = 0x0004;

        public static bool WindowExists(string WindowName)
        {
            IntPtr hWnd = FindWindow(WindowName, null);

            if (hWnd != IntPtr.Zero)
            {
                //Window Exists, return true
                return true;
            } else
            {
                //Window doesn't exist, return false.
                return false;
            }
        }

        public static void MoveWindow(string WindowName, int x, int y)
        {
            IntPtr hWnd = FindWindow(WindowName, null);

            if (hWnd != IntPtr.Zero)
            {
                //Window Exists, Continue
                SetWindowPos(hWnd, IntPtr.Zero, x, y, 0, 0, SWP_NOSIZE | SWP_NOZORDER);
            }
        }

        public static void GetWindow(string WindowName)
        {
            IntPtr hWnd = FindWindow(WindowName, null);

            if (hWnd != IntPtr.Zero)
            {
                //Rect WindowRect = new Rect();
                //Console.WriteLine(GetWindowRect(hWnd, ref WindowRect));

                //Process[] processes = processes.GetProcessesByName(WindowName);
                //Process lol = processes[0];

            } else
            {
                //Window isn't running
            }
        }

        public static void MinimizeWindow(string WindowName)
        {
            IntPtr hWnd = FindWindow(WindowName, null);

            if (hWnd != IntPtr.Zero)
            {
                CloseWindow(hWnd);
            } else
            {
                //Window isn't running
            }
        }

        public static void SetWindowTitle(string WindowName, string text)
        {
            IntPtr hWnd = FindWindow(WindowName, null);

            if (hWnd != IntPtr.Zero)
            {
                SetWindowText(hWnd, text);
            } else
            {
                //Window isn't running
            }
        }
    }
}
