import LinkedList from "../../app/src/fastLinkedList"
import "./extend"





describe("Core", () => {
  

  test('Init empty', () => {
    new LinkedList()
  })

  test('Init with array elements', () => {
    new LinkedList("a", "b", "c", "d")
  })


  describe("static", () => {
    let ls: LinkedList<string>
    beforeEach(() => {
      ls = new LinkedList("a", "b", "c", "d")
    })

    test('Init with LinkedList', () => {
      new LinkedList(ls)
    })


    describe("getter", () => {

      test("first", () => {
        expect(ls.first).toBe("a")
      })

      test("last", () => {
        expect(ls.last).toBe("d")
      })

      test("length", () => {
        expect(ls.length).toBe(4)
      })
    })

    describe("Iteration", () => {

      
      
      
      test("forof", () => {
        const ex = expect(["a", "b", "c", "d"])
        for (let e of ls) {
          ex.ordered(e)
        }
      })

      test("forof2", () => {
        const ex = expect(["a", "b", "c", "d"])
        for (let e of ls) {
          ex.ordered(e)
        }
      })

    })
    


    describe("toString", () => {
      test('plain', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
      test('json', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
    })
    
  })

  
})
