cmake_minimum_required(VERSION 3.16)

set(CMAKE_TOOLCHAIN_FILE ${CMAKE_CURRENT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake CACHE STRING "Vcpkg toolchain file")

project(node-filerix VERSION 1.0.2 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(
  ${CMAKE_SOURCE_DIR}/include 
  ${CMAKE_SOURCE_DIR}/vcpkg_installed/x64-linux/include
)

find_package(filerix CONFIG REQUIRED)
find_package(unofficial-node-api-headers CONFIG REQUIRED)

add_library(node_filerix MODULE wrapper.cc)
set_target_properties(node_filerix PROPERTIES 
  OUTPUT_NAME "filerix"
  PREFIX "" 
  SUFFIX ".node"
)

target_link_libraries(node_filerix PRIVATE 
  filerix::filerix
  unofficial::node-api-headers::node-api-headers
)

install(TARGETS node_filerix
  LIBRARY DESTINATION lib/node_modules
  RUNTIME DESTINATION bin
)
