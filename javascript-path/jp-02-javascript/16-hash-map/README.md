<h1 align="center">
  Hash Map
</h1>

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)

</div>

[screenshot]: ./screenshot.png "preview"

![preview][screenshot]

**_DESCRIPTION_**: in this repo, I built a custom Hash Map data structure from scratch. The main focus was to understand better memory allocation and fast data retrieval. To achieve this, the implementation includes a custom hashing algorithm, collision management (using Linked Lists), and an automatic resizing logic triggered by a specific load factor to maintain performance as the dataset grows.

HashMap methods:

- `hash(key)` - takes a key and produces a hash code with it.
- `set(key, value)` - add an entry to the list, replace value if already exists.
- `get(key)` - returns the value that is assigned to this key.
- `has(key)` - returns true or false based on whether or not the key is in the hash map.
- `remove(key)` - remove the entry.
- `length()` - returns the number of stored keys in the hash map.
- `clear()` - removes all entries in the hash map.
- `keys()` - returns an array containing all the keys inside the hash map.
- `values()` - returns an array containing all the values.
- `entries()` - returns an array that contains each key, value pair.

& LinkedList class with their helpers
