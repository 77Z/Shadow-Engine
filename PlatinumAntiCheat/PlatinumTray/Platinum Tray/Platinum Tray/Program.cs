using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Drawing;
using System.Diagnostics;

namespace Platinum_Tray
{
    class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {

            using (var mutex = new Mutex(false, "77zsite.tk PlatinumTray"))
            {
                bool isAnotherInstanceOpen = !mutex.WaitOne(TimeSpan.Zero);
                if (isAnotherInstanceOpen)
                {
                    MessageBox.Show("ERROR: A PLATINUM INSTANCE IS ALREADY OPEN", "Platinum AntiCheat", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }


                //Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);

                if (!File.Exists("Platinum.ico"))
                {
                    MessageBox.Show("ERROR: PLATINUM FAILED TO START. MISSING FILES IN PLATINUM DIRECTORY", "Platinum AntiCheat", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Application.Exit();
                }

                if (!File.Exists("platinum.exe"))
                {
                    MessageBox.Show("ERROR: PLATINUM FAILED TO START. MISSING FILES IN PLATINUM DIRECTORY", "Platinum AntiCheat", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Application.Exit();
                }

                if (!File.Exists("SomethingFishy.exe"))
                {
                    MessageBox.Show("ERROR: PLATINUM FAILED TO START. MISSING FILES IN PLATINUM DIRECTORY", "Platinum AntiCheat", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Application.Exit();
                }

                NotifyIcon notifyIcon = new NotifyIcon();
                notifyIcon.ContextMenuStrip = GetContext();
                notifyIcon.Icon = new Icon("Platinum.ico");
                notifyIcon.Visible = true;

                //Process.Start("platinum.exe");
                using (Process myProcess = Process.Start("platinum.exe"))
                {
                    do
                    {
                        //
                    } while (!myProcess.WaitForExit(1000));

                    //MessageBox.Show("Process Ended", "Platinum", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    Process.Start("SomethingFishy.exe");
                    Environment.Exit(0);
                }

                Application.Run();

                //Do whatever

                

            }
        }

        private static ContextMenuStrip GetContext()
        {
            ContextMenuStrip CMS = new ContextMenuStrip();
            CMS.Items.Add("Close Platinum", null, new EventHandler(Exit_Click));
            CMS.Items.Add("Settings", null, new EventHandler(Settings_Click));
            return CMS;
        }

        private static void Settings_Click(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        private static void Exit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
