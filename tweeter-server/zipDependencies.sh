#!/bin/bash

# Create nodejs if not already created
mkdir -p nodejs

# Copy node_modules into nodejs
echo  -e '\n\n\n\nCopying node_modules into nodejs... might want to find a good book...'
rm -rf ./nodejs/node_modules
cp -r ./node_modules/ ./nodejs/node_modules/
echo Finished copying

# Remove symbolic tweeter-shared link and copy tweeter-shared to nodejs/node_modules
rm -rf ./nodejs/node_modules/tweeter-shared
cp -r ../tweeter-shared/ ./nodejs/node_modules/tweeter-shared/
echo -e '\nReplaced symbolic link for tweeter-shared\n'

# Create nodejs.zip, overwriting a previous nodejs.zip if present
echo -e "Zipping nodejs... might want to see if there's a sequel..."
powershell.exe -Command "Compress-Archive -Path '.\nodejs' -DestinationPath '.\nodejs.zip' -Force"
echo Zipped nodejs into nodejs.zip

echo -e '\nScript finished\n'