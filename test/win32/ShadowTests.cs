using System;
using System.IO;

class ShadowTests {
    static void Main() {
        Console.WriteLine("Running Windows Style Tests");

        if (File.Exists(@".\node_modules\electron\dist\electron.exe")) {
            Console.WriteLine("Test 1 Passed");
        } else {
            Console.WriteLine("Test 1 Failed");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\node-pty\build\Release\conpty.node")) {
            Console.WriteLine("Test 2 Passed");
        } else {
            Console.WriteLine("Test 2 Failed");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\node-pty\build\Release\pty.node")) {
            Console.WriteLine("Test 3 Passed");
        } else {
            Console.WriteLine("Test 3 Failed");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\uuid\dist\index.js")) {
            Console.WriteLine("Test 4 Passed");
        } else {
            Console.WriteLine("Test 4 Failed");
            Environment.Exit(1);
        }

        Console.WriteLine("All tests passed (Windows)");

        //Every Test Passed, exit with code 0
        Environment.Exit(0);
    }
}