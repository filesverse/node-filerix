#!/bin/bash

NO_INSTALL=0
if [[ "$1" == "--noinstall" ]]; then
  NO_INSTALL=1
fi

TMP_DIR=$(mktemp -d) || { echo "Failed to create temp directory"; exit 1; }
echo "Using temporary directory: $TMP_DIR"

cd "$TMP_DIR" || { echo "Failed to enter temp directory"; exit 1; }

echo "Cloning the repository with submodules..."
git clone --recurse-submodules https://github.com/filesverse/node-filerix.git || { echo "Failed to clone repository"; exit 1; }

echo "Downloading filerix vcpkg port..."
git clone --recurse-submodules https://github.com/filesverse/vcpkg-port.git || { echo "Failed to download filerix vcpkg port"; exit 1; }

echo "Copying filerix vcpkg port..."
mv ./vcpkg-port ./node-filerix/vcpkg/ports/filerix || { echo "Failed to copy filerix vcpkg port"; exit 1; }

cd node-filerix || { echo "Failed to enter the project directory"; exit 1; }

echo "Bootstrapping vcpkg..."
./vcpkg/bootstrap-vcpkg.sh || { echo "Failed to bootstrap vcpkg"; exit 1; }

echo "Installing dependencies with vcpkg..."
./vcpkg/vcpkg --feature-flags=manifests install || { echo "Failed to install dependencies"; exit 1; }

echo "Generating build files with cmake..."
cmake -B build -S . || { echo "Failed to generate cmake build files"; exit 1; }

echo "Building the project..."
cmake --build build || { echo "Build failed"; exit 1; }

if [[ $NO_INSTALL -eq 0 ]]; then
  echo "Installing the built project..."
  cd build && sudo make install || { echo "Installation failed"; exit 1; }
fi

cd "$HOME" || { echo "Failed to return to home directory"; exit 1; }

echo "Removing temporary folder: $TMP_DIR"
rm -rf "$TMP_DIR" || { echo "Removing temp folder failed"; exit 1; }

echo "Installation and build complete!"
