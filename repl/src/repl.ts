import LinkedList from "./../../app/src/fastLinkedList"
//const testElem = document.querySelector("#test")
import yallist from "yallist"
import benchmarkSuite from "highlvl-benchmark"


const benchmark = benchmarkSuite(1000000)

benchmark(
  function Yallist() {
    const myList = yallist.create([33, 34])
    return () => {
      myList.push(22)
    }
  },
  function FastLinkedList() {
    const myList = new LinkedList(33, 34)
    return () => {
      myList.push(22)
    }
  }
)

