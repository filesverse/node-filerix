cmake_minimum_required(VERSION 3.16)

set(CMAKE_TOOLCHAIN_FILE ${CMAKE_CURRENT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake CACHE STRING "Vcpkg toolchain file")

project(node-filerix VERSION 1.1.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(${CMAKE_SOURCE_DIR}/include)

find_package(filerix CONFIG REQUIRED)
find_package(unofficial-node-addon-api CONFIG REQUIRED)

add_library(node_filerix SHARED wrapper.cc)
set_target_properties(node_filerix PROPERTIES 
  OUTPUT_NAME "filerix"
  PREFIX "" 
  SUFFIX ".node"
)

target_link_libraries(node_filerix PRIVATE 
  filerix::filerix
  unofficial::node-addon-api::node-addon-api
)

install(TARGETS node_filerix
  LIBRARY DESTINATION lib/node_modules/filerix
)
