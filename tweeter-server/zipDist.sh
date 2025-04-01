#!/bin/bash

# Build dist
npm run build

# Zip dist
powershell.exe -Command "Compress-Archive -Path '.\dist\src\*' -DestinationPath '.\dist.zip' -Force"

echo dist.zip overwritten
echo -e '\n------------------------------------------------------------------------------------------------'