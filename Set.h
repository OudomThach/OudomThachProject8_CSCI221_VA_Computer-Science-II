/*
    Name: Oudom Thach
    Course: CSCI 221 - Computer Science II
    Project: Project 8
    File: Set.h

    This file defines a template-based Set class.
    A set stores unique items, so no duplicate item is allowed.
*/

#ifndef SET_H
#define SET_H

// The Set class works with any data type that supports assignment and ==.
template <typename T>
class Set
{
private:
    // The dynamic array that stores the set items.
    T* items;

    // The current number of items stored in the set.
    int itemCount;

    // The current maximum number of items the dynamic array can hold.
    int capacity;

    // The starting capacity for an empty set.
    static constexpr int DEFAULT_CAPACITY = 4;

    // Returns the array index of item, or -1 when item is not found.
    int indexOf(const T& item) const;

    // Creates a larger dynamic array and copies the current items into it.
    void resize(int newCapacity);

public:
    // Creates an empty set.
    Set();

    // Releases the dynamically allocated array.
    ~Set();

    // Creates a deep copy of another set.
    Set(const Set<T>& other);

    // Copies another set into this set using deep copy assignment.
    Set<T>& operator=(const Set<T>& other);

    // Adds a new item only if it is not already in the set.
    bool add(const T& item);

    // Removes an item if it exists in the set.
    bool remove(const T& item);

    // Returns the number of items currently stored in the set.
    int getCurrentSize() const;

    // Returns true if the item is already a member of the set.
    bool contains(const T& item) const;

    // Returns a pointer to a new dynamic array containing every set item.
    T* toArray() const;
};

// Constructor: allocate the starting dynamic array and mark the set empty.
template <typename T>
Set<T>::Set()
{
    capacity = DEFAULT_CAPACITY;
    itemCount = 0;
    items = new T[capacity];
}

// Destructor: free the memory owned by this set.
template <typename T>
Set<T>::~Set()
{
    delete[] items;
}

// Copy constructor: allocate a new array and copy each item.
template <typename T>
Set<T>::Set(const Set<T>& other)
{
    capacity = other.capacity;
    itemCount = other.itemCount;
    items = new T[capacity];

    for (int i = 0; i < itemCount; ++i)
    {
        items[i] = other.items[i];
    }
}

// Assignment operator: protect self-assignment, then deep copy the data.
template <typename T>
Set<T>& Set<T>::operator=(const Set<T>& other)
{
    if (this != &other)
    {
        delete[] items;

        capacity = other.capacity;
        itemCount = other.itemCount;
        items = new T[capacity];

        for (int i = 0; i < itemCount; ++i)
        {
            items[i] = other.items[i];
        }
    }

    return *this;
}

// Search helper: walk through the used part of the array and compare items.
template <typename T>
int Set<T>::indexOf(const T& item) const
{
    for (int i = 0; i < itemCount; ++i)
    {
        if (items[i] == item)
        {
            return i;
        }
    }

    return -1;
}

// Resize helper: make a new array, copy current items, and delete old memory.
template <typename T>
void Set<T>::resize(int newCapacity)
{
    T* newItems = new T[newCapacity];

    for (int i = 0; i < itemCount; ++i)
    {
        newItems[i] = items[i];
    }

    delete[] items;
    items = newItems;
    capacity = newCapacity;
}

// Add item: reject duplicates because a set cannot contain the same item twice.
template <typename T>
bool Set<T>::add(const T& item)
{
    if (contains(item))
    {
        return false;
    }

    if (itemCount == capacity)
    {
        resize(capacity * 2);
    }

    items[itemCount] = item;
    ++itemCount;

    return true;
}

// Remove item: shift later items left so the array remains packed.
template <typename T>
bool Set<T>::remove(const T& item)
{
    int removeIndex = indexOf(item);

    if (removeIndex == -1)
    {
        return false;
    }

    for (int i = removeIndex; i < itemCount - 1; ++i)
    {
        items[i] = items[i + 1];
    }

    --itemCount;
    return true;
}

// Size function: return how many unique items are in the set.
template <typename T>
int Set<T>::getCurrentSize() const
{
    return itemCount;
}

// Membership function: use the search helper to decide if item exists.
template <typename T>
bool Set<T>::contains(const T& item) const
{
    return indexOf(item) != -1;
}

// Array export function: caller receives a new array and must delete[] it.
template <typename T>
T* Set<T>::toArray() const
{
    T* arrayCopy = new T[itemCount];

    for (int i = 0; i < itemCount; ++i)
    {
        arrayCopy[i] = items[i];
    }

    return arrayCopy;
}

#endif
