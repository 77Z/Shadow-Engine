using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows;
using System.Runtime.InteropServices;

namespace Advanced_Electron_Tools
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                //There aren't any arguments, so close
                Console.WriteLine("There are no arguments specified");
            } else
            {
                //there are arguments, so check which command to execute
                if (args[0] == "--simKey")
                {
                    //this command is to simulate a keypress on the keyboard
                    if (args.Length < 2)
                    {
                        Console.WriteLine("No key specified, refer to --help");
                    } else
                    {
                        Console.WriteLine($"Simulating Keypress key: {args[1]}");
                        //KeyboardSim.Send(KEY_K);
                        
                    }
                } else if (args[0] == "--help")
                {
                    //display help dialog
                    Console.WriteLine("Advanced Electron Tools(System C# Tools) help:");
                    Console.WriteLine("--moveMouse ------------- arguments: int x, int y");
                } else if (args[0] == "--moveMouse")
                {
                    //this command will change the mouse position on the screen.

                    //check to see if there is the proper amount of arguments
                    if (args.Length < 3)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        //there are enough arguments to continue,
                        //PointConverter pc = new PointConverter();

                        //Point pt = new Point();

                        //pt = (Point)pc.ConvertFromString("0, 768");

                        ETMouse.SetCursorPos(Convert.ToInt32(args[1]), Convert.ToInt32(args[2]));
                    }
                } else if (args[0] == "--mouseClick")
                {
                    if (args.Length < 3)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        //convert string args to ints
                        int x = Convert.ToInt32(args[1]);
                        int y = Convert.ToInt32(args[2]);

                        //Move mouse
                        ETMouse.SetCursorPos(x, y);

                        //Click mouse
                        ETMouse.mouse_event(0x02, x, y, 0, 0);
                        ETMouse.mouse_event(0x04, x, y, 0, 0);
                    }
                } else if (args[0] == "--lockWorkstation")
                {
                    //Locking the computer

                    Console.WriteLine("Locking");
                    System.Diagnostics.Process.Start(@"C:\WINDOWS\system32\rundll32.exe", "user32.dll,LockWorkStation");
                } else if (args[0] == "--checkForWindow")
                {
                    //Used for checking if a window exists
                    if (args.Length < 2)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        if (ETWindow.WindowExists(args[1]))
                        {
                            Console.WriteLine("true");
                        } else
                        {
                            Console.WriteLine("false");
                        }
                    }
                } else if (args[0] == "--moveWindow")
                {
                    //Moving a window
                    if (args.Length < 4)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        ETWindow.MoveWindow(args[1], Int32.Parse(args[2]), Int32.Parse(args[3]));
                    }
                } else if (args[0] == "--getWindow")
                {
                    //Getting window rectangle
                    if (args.Length < 2)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        ETWindow.GetWindow(args[1]);
                    }
                } else if (args[0] == "--minimizeWindow")
                {
                    //Closing the specified window
                    if (args.Length < 2)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        ETWindow.MinimizeWindow(args[1]);
                    }
                } else if (args[0] == "--setWindowTitle")
                {
                    if (args.Length < 3)
                    {
                        Console.WriteLine("Not enough arguments, refer to --help");
                    } else
                    {
                        ETWindow.SetWindowTitle(args[1], args[2]);
                    }
                } else
                {
                    //if no such command exists, display this message
                    Console.WriteLine("Not a valid command, use --help for a list of valid commands and their actions");
                }
            }

            //Console.ReadKey();
        }
    }
}
