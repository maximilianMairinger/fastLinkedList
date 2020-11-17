import LinkedList from "../../app/src/fastLinkedList"

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


    describe("toString", () => {
      test('Plain', () => {
        let s = ls.toString()
        expect(s).toBe("[a, b, c, d]")
      })
    })
  
    
  })

  
})
