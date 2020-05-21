@echo off
title Build Shadow Engine Build Tools

echo Asuming project path: %UserProfile%\source\repos\Shadow Build Tools\Shadow Build Tools.sln
echo -------------------------
echo Asuming build path: C:\Program Files\dotnet\dotnet.exe
echo -------------------------
echo Building Project...
"C:\Program Files\dotnet\dotnet.exe" build "%UserProfile%\source\repos\Shadow Build Tools\Shadow Build Tools\Shadow Build Tools.csproj"
echo Copying assets...
copy "%UserProfile%\source\repos\Shadow Build Tools\Shadow Build Tools\bin\Debug\netcoreapp3.1\Shadow Build Tools.exe" "%localappdata%\Programs\shadow-engine\Shadow Build Tools.exe"
copy "%UserProfile%\source\repos\Shadow Build Tools\Shadow Build Tools\bin\Debug\netcoreapp3.1\Shadow Build Tools.dll" "%localappdata%\Programs\shadow-engine\Shadow Build Tools.dll"
copy "%UserProfile%\source\repos\Shadow Build Tools\Shadow Build Tools\bin\Debug\netcoreapp3.1\Shadow Build Tools.runtimeconfig.json" "%localappdata%\Programs\shadow-engine\Shadow Build Tools.runtimeconfig.json"