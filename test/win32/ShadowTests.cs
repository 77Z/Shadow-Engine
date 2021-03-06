using System;
using System.IO;

class ShadowTests {
    static void Main() {
        Console.WriteLine("Running Windows Style Tests");

        if (File.Exists(@".\node_modules\electron\dist\electron.exe")) {
            writePass("Test 1 Passed ✓");
        } else {
            writeFail("Test 1 Failed ✗");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\node-pty\build\Release\conpty.node")) {
            writePass("Test 2 Passed ✓");
        } else {
            writeFail("Test 2 Failed ✗");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\node-pty\build\Release\pty.node")) {
            writePass("Test 3 Passed ✓");
        } else {
            writeFail("Test 3 Failed ✗");
            Environment.Exit(1);
        }

        if (File.Exists(@".\node_modules\uuid\dist\index.js")) {
            writePass("Test 4 Passed ✓");
        } else {
            writeFail("Test 4 Failed ✗");
            Environment.Exit(1);
        }

        Console.WriteLine("All tests passed (Windows)");

        //Every Test Passed, exit with code 0
        Environment.Exit(0);
    }

    static void writePass(string inp) {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine(inp);
        Console.ResetColor();
    }

    static void writeFail(string inp) {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(inp);
        Console.ResetColor();
    }
}