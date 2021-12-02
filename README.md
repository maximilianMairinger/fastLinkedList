# Fast linked list

Minimal ([2.4kB](https://bundlephobia.com/package/fast-linked-list)) and fast linked list for the web.

## Installation

```shell
 $ npm i fast-linked-list
```

## Usage

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

ls.forEachReverse((e) => {
  console.log(e) // "x", "a", "b"
})

const clone = new LinkedList(ls)
ls.clear()
```

## Contribute

All feedback is appreciated. Create a pull request or write an issue.
