import {LinkedList} from "./../../app/src/fastLinkedList"
//const testElem = document.querySelector("#test")
// import yallist from "yallist"
import * as yallist from "./yallah"
import benchmarkSuite from "highlvl-benchmark"
import delay from "delay"
import timoi from "timoi"
import {List, Item} from "./npmLinkedList"

class Token<T> extends Item {
  constructor(public value: T){super()}
}

const benchmark = benchmarkSuite(1000000);

(async () => {
  await delay(1000)
  
  benchmark(
    function Yallist() {
      const myList = yallist.create([])
      return () => {
        myList.push(22)
      }
    },
    function FastLinkedList() {
      const myList = new LinkedList()
      return () => {
        myList.push(22)
      }
    },
    function NpmLinkedList() {
      const myList = new List()
      return () => {
        myList.append(new Token(22))
      }
    }
    
  )  
})()

