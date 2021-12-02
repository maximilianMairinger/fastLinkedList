import {LinkedList} from "./../../app/src/fastLinkedList"
//const testElem = document.querySelector("#test")
// import yallist from "yallist"
import * as yallist from "yallist"
import benchmarkSuite from "highlvl-benchmark"
import delay from "delay"
import timoi from "timoi"
import {List, Item} from "linked-list"




const ls = new LinkedList("b", "c")
const dElem = ls.push("a")
console.log(ls.toArray()) // ["b", "c", "a"]

console.log(dElem.remove()) // true (meaning successfully removed)
console.log(dElem.remove()) // false

const dElem2 = ls.unshift(dElem.value)

for (const elem of ls) {
  console.log(elem) // "a", "b", "c"
}

ls.reverse()

const addedElems = ls.pushBulk(["x", "y", "z"])
console.log(ls.toArray()) // ["c", "b", "a", "x", "y", "z"]

addedElems[1].remove()
console.log(ls.toArray()) // ["c", "b", "a", "x", "z"]

ls.pop() // "z"
ls.shift() // "c"
ls.first // "b"
ls.last // "x"

console.log(ls.toArray())
ls.forEachReverse((e) => {
  console.log(e) // "x", "a", "b"
})

const clone = new LinkedList(ls)
ls.clear()

console.log(clone.toArray())


console.log(ls.toArray(), ls.first, ls.last)






















// class Token<T> extends Item {
//   constructor(public value: T){super()}
// }

// const benchmark = benchmarkSuite(10);

// (async () => {
//   await delay(1000)
  
//   const toBeAdded = []
//   for (let i = 0; i < 1000000; i++) {
//     toBeAdded.push(i)
//   }

//   benchmark(
//     function Yallist() {
//       const myList = yallist.create([])
      
//       return () => {
//         for (let e of toBeAdded) {
//           myList.push(e)  
//         }
//       }
//     },
//     function FastLinkedListBulk() {
//       const myList = new LinkedList()
//       return () => {
//         myList.pushBulk(toBeAdded)
//       }
//     },
//     function FastLinkedList() {
//       const myList = new LinkedList()
//       return () => {
//         for (let e of toBeAdded) {
//           myList.push(e)  
//         }
//       }
//     },
//     function NpmLinkedList() {
//       const myList = new List()
//       return () => {
//         for (let e of toBeAdded) {
//           myList.append(new Token(e))  
//         }
//       }
//     },
//     function NativeArray() {
//       const myList = []
//       return () => {
//         for (let e of toBeAdded) {
//           myList.push(e)  
//         }
        
//       }
//     }
    
//   )  
// })()


// const benchmark = benchmarkSuite(1000000);


// const toBeAdded = []
// for (let i = 0; i < 1000000; i++) {
//   toBeAdded.push(i)
// }

// benchmark(
//   function linkedList() {
//     const ls = new LinkedList()
//     let tok2 = ls.push("www")
//     ls.pushBulk(toBeAdded)
//     let tok1 = ls.push("lol")
//     ls.pushBulk(toBeAdded)
//     ls.pushBulk(toBeAdded)
    
//     return () => {
//       tok1.remove()
//       tok1 = ls.unshift(22)
//       tok2.remove()
//       tok2 = ls.push(33)
//     }
//   },
//   function nativeArray() {
//     const ls = []
//     let tok2 = ls.length
//     ls.push("www")
//     for (let e of toBeAdded) {
//       ls.push(e)
//     }
//     let tok1 = ls.length
//     ls.push("lol")
//     for (let e of toBeAdded) {
//       ls.push(e)
//     }
//     for (let e of toBeAdded) {
//       ls.push(e)
//     }
//     return () => {
//       ls.splice(tok1, 1)
//       ls.unshift(22)
//       tok1 = 0
//       ls.splice(tok2, 1)
//       tok2 = ls.length
//       ls.push(33)
//     }
//   }

// )


// const ls = new LinkedList<string>("a", "b", "c")
// ls.forEach(console.log)
// for (let e of ls) {
//   console.log(e)
// }




