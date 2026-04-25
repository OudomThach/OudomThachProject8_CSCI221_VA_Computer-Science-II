Project 8 - Template Set Class
Name: Oudom Thach
Course: CSCI 221 - Computer Science II

Repository Purpose
------------------
This repository contains the C++ Project 8 assignment and a separate web demo.
The C++ files implement Programming Project 17.7 from Problem Solving with C++:
Tenth Edition, Global Edition by Walter Savitch.

Assignment Summary
------------------
Write a template-based class that implements a set of items. A set is a
collection where no item occurs more than once.

The class must support:
1. Add a new item to the set.
2. Remove an item from the set.
3. Return the number of items in the set.
4. Determine if an item is a member of the set.
5. Return a pointer to a dynamically created array containing each item.

The caller is responsible for deallocating the dynamic array returned by
toArray().

Files
-----
Set.h
    Template-based Set class.

main.cpp
    C++ test program for Set<int> and Set<std::string>.

instructions_and_results.txt
    Compile instructions, run instructions, textbook confirmation, and actual
    test output.

index.html
styles.css
app.js
    Cyberpunk-style web demo for visually testing the set behavior.

How to Test the C++ Program
---------------------------
Open PowerShell in this repository folder.

Compile:
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o project8.exe

Run:
.\project8.exe

Expected Result
---------------
The program should show:
1. Integer items 10, 20, and 30 added.
2. Duplicate 20 rejected.
3. Membership checks for 20 and 99.
4. 20 removed.
5. 99 not removed because it is missing.
6. Dynamic array output: 10 30.
7. String set test with Oudom and Thach.
8. Duplicate Oudom rejected.

How to View the Web Demo
------------------------
Open index.html in a web browser.

The web page includes:
1. Manual cyberpunk-style live Set tester at the top.
2. Assignment instruction explanation.
3. C++ function map.
4. Compile and run commands.
5. Automatic step-by-step playback at the bottom showing the test results.

Note
----
The web demo is only a visual presentation helper. The required assignment
implementation is in Set.h and main.cpp.
