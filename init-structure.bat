@echo off
echo Initializing ExpressJS Project Directory Structure...

REM Create root directories
mkdir config
mkdir controllers
mkdir middlewares
mkdir models
mkdir routes
mkdir services
mkdir utils

REM Create files in the root directory
break > .env

echo Directory structure with initialized successfully.
