import LinkedList from "../../app/src/fastLinkedList"
import "./extend"





describe("Core", () => {
  

  test('Init empty', () => {
    new LinkedList()
  })

  test('Init with array elements values', () => {
    new LinkedList("a", "b", "c", "d")
  })

  test('Init with array elements', () => {
    new LinkedList("a", "b", "c", "d")
  })


  describe("static", () => {
    let ls: LinkedList<string>
    beforeEach(() => {
      ls = new LinkedList("a", "b", "c", "d")
    })


    describe("Iteration", () => {
      test("forof", () => {
        const ex = expect(["a", "b", "c", "d"])
        for (let e of ls) {
          ex.ordered(e)
        }
      })

      test("foreach", () => {
        const ex = expect(["a", "b", "c", "d"])
        ls.forEach((e) => {
          ex.ordered(e)
        })
      })

      test("foreach reverse", () => {
        const ex = expect(["d", "c", "b", "a"])
        ls.forEach.reverse((e) => {
          ex.ordered(e)
        })
      })
    })

    test('Init with LinkedList', () => {
      const ex = expect(["a", "b", "c", "d"])
      for (let e of new LinkedList(ls)) {
        ex.ordered(e)
      }
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

    describe("mutate", () => {
      test('push val', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
      test('unshift val', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
      test('push Token', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
      test('unshift Token', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
      test('pop', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
      test('shift', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
      test('remove after push', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
      test('remove after unshift', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
      test('add to another LinkedList', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })
      test('add to another LinkedList after manual remove', () => {
        let s = ls.toString(e => JSON.stringify(e))
        expect(s).toBe('["a", "b", "c", "d"]')
      })

    })
    
  })

  
})
