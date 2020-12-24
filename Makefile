# Copyright © 77Z 2020
# Copyright © Vince Richter 2020
#
# run 'make' to build Shadow Engine
# run 'make clean' to clean up files that the
# makefile has made
#
# Quick word of warning, Shadow Engine is big, so
# when you build it, it's gonna take up a LOT of
# space

# Compilers and other things
CPP=g++
CC=gcc

NAME=Shadow Engine
SHORTNAME=Shadow
DISTROINFO=cat /etc/os-release
KERNELVERSION=uname -r

all:
	@echo Creating build environment folder
	@mkdir dist
	@echo Creating product.json, distroinfo.txt, kernelver.txt
	@$(DISTROINFO) > ./dist/distroinfo.txt
	@$(KERNELVERSION) > ./dist/kernelver.txt
	@echo {\"name\": \"$(NAME)\", \"shortName\": \"$(SHORTNAME)\", \"distroInfo\": \"distroinfo.txt\", \"kernelver\": \"kernelver.txt\", \"licenseURL\": \"https://github.com/77Z/Shadow-Engine/blob/master/LICENSE\"} > ./dist/product.json
	# Install Packages
	@echo Installing Packages...
	npm install
	@echo Packages Installed.
	# Build C++ Plugins
	@echo Building C++ Plugins
	npm run rebuild
	@echo Done.
	# Build Tests
	@echo Building tests with $(CPP)
	$(CPP) -o ./bufferLinuxTests ./test/linux/main.cpp
	@echo Done building tests, executing...
	chmod +x ./bufferLinuxTests
	./bufferLinuxTests
	@echo Done.

development:
	@echo -e '\e[31m' ---------------------------------------------------------
	@echo -e '\e[31m' WARNING: YOU ARE BUILDING A DEVELOPMENT BUILD OF SHADOW.
	@echo -e '\e[31m' THESE BUILDS ARE BIGGER IN SIZE THAN A RELEASE BUILD, SO
	@echo -e '\e[31m' BE PREPARED FOR A LARGE FILE.
	@echo -e '\e[31m' ---------------------------------------------------------

clean:
	@echo Cleaning...
	rm -d -rf ./dist
	rm ./bufferLinuxTests