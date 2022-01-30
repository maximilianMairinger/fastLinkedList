# Fast linked list

General purpose, but clean doubly Linked List implementation for the web ([3.4kB](https://bundlephobia.com/package/fast-linked-list)), performing decently well in benchmarks.

> Please note that the length of the list is intentionally not being computed. Token#remove() has no way of mutating the length of the list, as it does not have a reference to it's parent list, only it's siblings. If you need this, use a different library.

## Installation

```shell
 $ npm i fast-linked-list
```

## Usage

For simple usage, the Token architecture is abstracted away.

```ts
import LinkedList from "fast-linked-list"

const ls = new LinkedList("b", "c")
const dElem = ls.push("a")
ls.toArray() // ["b", "c", "a"]

dElem.remove() // true (meaning successfully removed)
dElem.remove() // false

const dElem2 = ls.unshift(dElem.value)

for (const elem of ls) {
  console.log(elem) // "a", "b", "c"
}

ls.reverse()

const addedElems = ls.pushBulk(["x", "y", "z"])
ls.toArray() // ["c", "b", "a", "x", "y", "z"]

addedElems[1].remove()
ls.toArray() // ["c", "b", "a", "x", "z"]

ls.pop() // "z"
ls.shift() // "c"
ls.first // "b"
ls.last // "x"

ls.reverse().forEach((e) => {
  console.log(e) // "x", "a", "b"
})

const clone = new LinkedList(ls)
ls.clear()
```

Note that `reverse()` does not mutate the list, but only inverts all basic i/o functions of the list. E.g.: `push()` becomes `unshift()` and `first` becomes `last`. Hence the `reverse()` call performs with a time complexity of O(1).

### Working with Tokens

A Token can only exsist within one LinkedList. Appending it somewhere else will remove it from the current list.

```ts
import LinkedList, { Token } from "fast-linked-list"

const ls1 = new LinkedList("ls", "1")
const ls2 = new LinkedList("ls", "2")
const token = new Token("added")

ls1.pushToken(token); ls1.toArray() // ["ls", "1", "added"]
ls2.pushToken(token); ls2.toArray() // ["ls", "2", "added"]
ls1.toArray() // ["ls", "1"]



// Search for a value whose Token is unknown and remove it. Preferably keep a reference to the token if you plan to remove it (as this is O(n)).
ls2.forEach((val, tok) => {
  if (val === "ls") tok.remove()
})
```

## Contribute

All feedback is appreciated. Create a pull request or write an issue.
