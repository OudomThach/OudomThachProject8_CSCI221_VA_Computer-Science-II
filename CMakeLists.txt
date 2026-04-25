cmake_minimum_required(VERSION 3.10)

project(Project8Set LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(project8
    main.cpp
    Set.h
)

if (MSVC)
    target_compile_options(project8 PRIVATE /W4)
else()
    target_compile_options(project8 PRIVATE -Wall -Wextra -pedantic)
endif()
