# Shadow Engine

 A game engine!

![CI](https://ci.appveyor.com/api/projects/status/github/77Z/Shadow-Engine?branch=master&svg=true)
[![Build Status](https://travis-ci.com/77Z/Shadow-Engine.svg?branch=master)](https://travis-ci.com/77Z/Shadow-Engine)
![GitHub repo size](https://img.shields.io/github/repo-size/77Z/Shadow-Engine)
![GitHub issues](https://img.shields.io/github/issues/77Z/Shadow-Engine)
![GitHub](https://img.shields.io/github/license/77Z/Shadow-Engine)
![Platforms](https://img.shields.io/badge/Platforms-Win-green)
![Lines of code](https://img.shields.io/tokei/lines/github/77Z/Shadow-Engine)
![GitHub last commit](https://img.shields.io/github/last-commit/77Z/Shadow-Engine)

[AppVeyor Build](https://ci.appveyor.com/project/77Z/Shadow-Engine)

[Travis Build](https://travis-ci.com/github/77Z/Shadow-Engine)

### Table of Contents

- [Run on your system](https://github.com/77Z/Shadow-Engine#Run)


## Run

In order to run Shadow Engine on your computer you need these things:

- A Windows 10 Machine
- [Node.js](https://nodejs.org "Node.js")
- [Git](https://git-scm.com/)
- [Python](https://python.org)

```PowerShell
$ git clone --depth=30 https://github.com/77Z/Shadow-Engine.git
$ cd Shadow-Engine
$ npm i
$ npm run rebuild
$ npm start
```

### Then move everything in DeveloperSetup to C:\Users\USERNAME\AppData\Local\Programs\shadow-engine

<br>
<br>
<br>

To Update:

```PowerShell
$ git pull
$ npm i
$ npm run rebuild
$ npm start
```

# FAQ

- WHY ISN'T IT RUNNNINNNG!!!!

    The most common reason why Shadow might not run is due to node-pty and robotjs, these both rely on Python, so make sure that Python3 is installed properly, this is usaually only a problem on Windows, but Shadow only runs on Windows sooo..

# Wiki

Use the wiki to your advantage!
[Wiki](https://github.com/77Z/Shadow-Engine/wiki)

# Licence

[Licence](https://github.com/77Z/Shadow-Engine/blob/master/LICENSE)
