Project 8 Web Demo
Name: Oudom Thach

Purpose
-------
This folder contains a separate web demo for the C++ Project 8 assignment.
It does not replace the C++ files. It visually demonstrates the same required
template Set operations from Programming Project 17.7.

The first screen now puts the interactive program at the top and shows:
By Oudom Thach

Files
-----
index.html
styles.css
app.js
README.txt

How to Open
-----------
Open this file in a browser:
C:\Users\sukma\Downloads\Computer Science II\Project\project_8\webdemo\index.html

What the Demo Shows
-------------------
1. A cyberpunk-style live program at the top of the page.
2. A clear explanation of what Programming Project 17.7 asks for.
3. Set<int> and Set<string> examples.
4. Add operation.
5. Remove operation.
6. contains operation.
7. getCurrentSize result.
8. toArray dynamic-array result.
9. Duplicate rejection.
10. C++ compile and run commands.
11. Actual C++ output from this computer.
12. A separate bottom section that automatically performs the test steps and
    shows the live result log.

Suggested Demo Test
-------------------
1. Open index.html.
2. Use the int tab.
3. Try adding 20.
   Expected result: duplicate is rejected.
4. Add 40.
   Expected result: 40 is added and size increases.
5. Remove 20.
   Expected result: 20 is removed and the array shifts left.
6. Check contains 99.
   Expected result: no.
7. Click toArray.
   Expected result: copied array text appears with delete[] reminder.
8. Switch to string.
9. Add Oudom.
   Expected result: duplicate is rejected.
10. Add another name.
    Expected result: the string set updates.

Automatic Walkthrough
---------------------
At the bottom of the page, the automatic walkthrough runs by itself. It starts
with an empty Set<int>, performs the same integer operations shown in the C++
test, then switches to Set<string>. This section is separate from the top
program so users can still test manually while the bottom result playback runs.

C++ Test Commands Shown in the Demo
-----------------------------------
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o project8.exe
.\project8.exe

Note
----
The web demo is only a presentation and visualization helper. The required
assignment implementation remains in Set.h and main.cpp.
