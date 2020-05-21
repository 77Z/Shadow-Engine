@echo off
title Shadow Engine Setup Process

echo ------------------------
echo Making Program Folder...
mkdir %localappdata%\Programs\shadow-engine
echo Done.
echo ------------------------
echo Copying required development files:
echo Copying ShadowLog.exe
copy exe\ShadowLog.exe %localappdata%\Programs\shadow-engine
echo Done.
echo Creating DiscordRPC Folder.
mkdir %localappdata%\Programs\shadow-engine\DiscordRPC
echo Done.
echo Copying DiscordRPC Folder
copy DiscordRPC %localappdata%\Programs\shadow-engine\DiscordRPC
echo Done.
echo Creating transports Folder.
mkdir %localappdata%\Programs\shadow-engine\DiscordRPC\transports
echo Done.
echo Copying DiscordRPC\transports
copy DiscordRPC\transports %localappdata%\Programs\shadow-engine\DiscordRPC\transports
echo Done.
echo ------------------------
echo Copying Terrain...
mkdir %localappdata%\Programs\shadow-engine\Terrain
copy "exe\Terrain\Terrain Error Lookup.exe" "%localappdata%\Programs\shadow-engine\Terrain\Terrain Error Lookup.exe"
