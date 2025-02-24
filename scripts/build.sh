#!/bin/bash

echo "Downloading filerix vcpkg port..."
git clone --recurse-submodules https://github.com/filesverse/vcpkg-port.git || { echo "Failed to download filerix vcpkg port"; exit 1; }

echo "Copying filerix vcpkg port..."
mv ./vcpkg-port ./vcpkg/ports/filerix || { echo "Failed to copy filerix vcpkg port"; exit 1; }

echo "Bootstrapping vcpkg..."
./vcpkg/bootstrap-vcpkg.sh || { echo "Failed to bootstrap vcpkg"; exit 1; }

echo "Installing dependencies with vcpkg..."
./vcpkg/vcpkg --feature-flags=manifests install --triplet x64-linux-release || { echo "Failed to install dependencies"; exit 1; }

echo "Generating build files with CMake..."
mkdir build && cd build
cmake .. || { echo "Failed to generate CMake build files"; exit 1; }

echo "Building the project..."
cmake --build . --parallel || { echo "Build failed"; exit 1; }
cd ..

echo "Removing RPATH from filerix.node..."
chrpath --delete ./build/filerix.node || echo "No RPATH to remove"

echo "Installation and build complete!"
