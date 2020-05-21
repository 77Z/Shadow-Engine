Set WshShell = WScript.CreateObject("WScript.Shell")
'WshShell.SendKeys WScript.Arguments.Item(0)
Set colArgs = WScript.Arguments.Named
strKeys = colArgs.Item("keys")
WshShell.SendKeys strKeys