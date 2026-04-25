/*
    Name: Oudom Thach
    Course: CSCI 221 - Computer Science II
    Project: Project 8
    File: main.cpp

    This program tests the template-based Set class.
    It shows adding, removing, counting, membership checking,
    and returning a pointer to a dynamically created array.
*/

#include <iostream>
#include <string>
#include "Set.h"

// Prints whether an operation succeeded or failed.
void printResult(const std::string& action, bool result, const std::string& successText, const std::string& failText)
{
    std::cout << action << ": ";

    if (result)
    {
        std::cout << successText;
    }
    else
    {
        std::cout << failText;
    }

    std::cout << '\n';
}

// Prints yes or no for membership test results.
void printMembership(const std::string& question, bool result)
{
    std::cout << question << ' ' << (result ? "yes" : "no") << '\n';
}

int main()
{
    // Create a Set object that stores integers.
    Set<int> numbers;

    // Print the project heading.
    std::cout << "Project 8 - Template Set Test\n";
    std::cout << "Name: Oudom Thach\n\n";

    // Add unique items to the set.
    std::cout << "Adding integer items:\n";
    printResult("Add 10", numbers.add(10), "added", "not added");
    printResult("Add 20", numbers.add(20), "added", "not added");
    printResult("Add 30", numbers.add(30), "added", "not added");

    // Try to add a duplicate item to prove duplicates are not allowed.
    printResult("Add duplicate 20", numbers.add(20), "added", "not added because it is already in the set");

    // Display the number of items in the set.
    std::cout << "\nCurrent number of integer items: " << numbers.getCurrentSize() << '\n';

    // Check if specific items are members of the set.
    printMembership("Is 20 in the integer set?", numbers.contains(20));
    printMembership("Is 99 in the integer set?", numbers.contains(99));

    // Remove one item that exists and one item that does not exist.
    std::cout << "\nRemoving integer items:\n";
    printResult("Remove 20", numbers.remove(20), "removed", "not removed");
    printResult("Remove 99", numbers.remove(99), "removed", "not removed because it was not found");

    // Display the new item count after removals.
    std::cout << "\nNumber of integer items after removals: " << numbers.getCurrentSize() << '\n';

    // Get a dynamically created array that contains the set items.
    int* numberArray = numbers.toArray();

    // Print the dynamic array contents returned by toArray().
    std::cout << "Items returned by dynamically created integer array: ";
    for (int i = 0; i < numbers.getCurrentSize(); ++i)
    {
        if (i > 0)
        {
            std::cout << ' ';
        }

        std::cout << numberArray[i];
    }
    std::cout << "\n";

    // Free the dynamic array created by toArray().
    delete[] numberArray;

    // Create a second Set object with strings to show the template works with another type.
    Set<std::string> names;

    // Add string items and reject a duplicate string item.
    std::cout << "\nAdding string items to show the template works with another type:\n";
    printResult("Add Oudom", names.add("Oudom"), "added", "not added");
    printResult("Add Thach", names.add("Thach"), "added", "not added");
    printResult("Add duplicate Oudom", names.add("Oudom"), "added", "not added because it is already in the set");

    // Print the string set size and membership result.
    std::cout << "Current number of string items: " << names.getCurrentSize() << '\n';
    printMembership("Is Oudom in the string set?", names.contains("Oudom"));

    // End the test program.
    std::cout << "\nTest complete.\n";

    return 0;
}
