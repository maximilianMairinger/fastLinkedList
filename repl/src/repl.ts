import {LinkedList} from "./../../app/src/fastLinkedList"
//const testElem = document.querySelector("#test")
// import yallist from "yallist"
import * as yallist from "yallist"
import benchmarkSuite from "highlvl-benchmark"
import delay from "delay"
import timoi from "timoi"
import {List, Item} from "linked-list"

class Token<T> extends Item {
  constructor(public value: T){super()}
}

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


const benchmark = benchmarkSuite(1000000);


const toBeAdded = []
for (let i = 0; i < 1000000; i++) {
  toBeAdded.push(i)
}

benchmark(
  function linkedList() {
    const ls = new LinkedList()
    let tok2 = ls.push("www")
    ls.pushBulk(toBeAdded)
    let tok1 = ls.push("lol")
    ls.pushBulk(toBeAdded)
    ls.pushBulk(toBeAdded)
    
    return () => {
      tok1.remove()
      tok1 = ls.unshift(22)
      tok2.remove()
      tok2 = ls.push(33)
    }
  },
  function nativeArray() {
    const ls = []
    let tok2 = ls.length
    ls.push("www")
    for (let e of toBeAdded) {
      ls.push(e)
    }
    let tok1 = ls.length
    ls.push("lol")
    for (let e of toBeAdded) {
      ls.push(e)
    }
    for (let e of toBeAdded) {
      ls.push(e)
    }
    return () => {
      ls.splice(tok1, 1)
      ls.unshift(22)
      tok1 = 0
      ls.splice(tok2, 1)
      tok2 = ls.length
      ls.push(33)
    }
  }

)


// const ls = new LinkedList<string>("a", "b", "c")
// ls.forEach(console.log)
// for (let e of ls) {
//   console.log(e)
// }




