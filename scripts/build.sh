#!/bin/bash

echo "Downloading filerix vcpkg port..."
git clone --recurse-submodules https://github.com/filesverse/vcpkg-port.git || { echo "Failed to download filerix vcpkg port"; exit 1; }

echo "Copying filerix vcpkg port..."
mv ./vcpkg-port ./vcpkg/ports/filerix || { echo "Failed to copy filerix vcpkg port"; exit 1; }

echo "Bootstrapping vcpkg..."
./vcpkg/bootstrap-vcpkg.sh || { echo "Failed to bootstrap vcpkg"; exit 1; }

echo "Installing dependencies with vcpkg..."
./vcpkg/vcpkg --feature-flags=manifests install || { echo "Failed to install dependencies"; exit 1; }

echo "Generating build files with cmake..."
cmake -B build -S . || { echo "Failed to generate cmake build files"; exit 1; }

echo "Building the project..."
cmake --build build || { echo "Build failed"; exit 1; }

echo "Installation and build complete!"
