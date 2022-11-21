import _LinkedList, {LengthLinkedList, Token as _Token, LengthToken, End, Head, Tail} from "../../app/src/fastLinkedList"
import "./extend"

// TODO: insertBefore


describe("LinkedList", () => {
  go(_LinkedList, _Token)
})
describe("LengthLinkedList", () => {
  go(LengthLinkedList, LengthToken as any)


  describe("Spesific length prop test", () => {
    test("Static", () => {
      const l = new LengthLinkedList()
      expect(l.length).toBe(0)
      const ll = new LengthLinkedList("a", "b", "c", "d")
      expect(ll.length).toBe(4)
      const lll = new LengthLinkedList(new LengthLinkedList("a"))
      expect(lll.length).toBe(1)
    })

    describe("mutate", () => {
      test("push", () => {
        const l = new LengthLinkedList()
        l.push("a")
        expect(l.length).toBe(1)
        l.push("b")
        expect(l.length).toBe(2)
        const tok = l.popToken()
      })
      test("unshift", () => {
        const l = new LengthLinkedList()
        l.unshift("a")
        expect(l.length).toBe(1)
        l.unshift("b")
        expect(l.length).toBe(2)
      })
      test("pop", () => {
        const l = new LengthLinkedList("a", "b")
        l.pop()
        expect(l.length).toBe(1)
        l.pop()
        expect(l.length).toBe(0)
      })
      test("shift", () => {
        const l = new LengthLinkedList("a", "b")
        l.shift()
        expect(l.length).toBe(1)
        l.shift()
        expect(l.length).toBe(0)
      })
      test("remove", () => {
        const l = new LengthLinkedList()
        const tok1 = l.push("a")
        const tok2 = l.push("b")
        expect(l.length).toBe(2)
        tok1.remove()
        expect(l.length).toBe(1)
        tok1.remove()
        expect(l.length).toBe(1)
        tok2.remove()
        expect(l.length).toBe(0)
      })
      test("clear", () => {
        const l = new LengthLinkedList("a", "b")
        expect(l.length).toBe(2)
        l.clear()
        expect(l.length).toBe(0)
      })
      test("pushBulk", () => {
        const l = new LengthLinkedList()
        l.pushBulk(["a", "b"])
        expect(l.length).toBe(2)
        l.pushBulk(["a", "b"])
        expect(l.length).toBe(4)
      })
      test("unshiftBulk", () => {
        const l = new LengthLinkedList()
        l.unshiftBulk(["a", "b"])
        expect(l.length).toBe(2)
        l.unshiftBulk(["a", "b"])
        expect(l.length).toBe(4)
      })

      describe("reverse", () => {
        test("Static", () => {
          const l = new LengthLinkedList("a", "b")
          expect(l.length).toBe(2)
          l.reverse()
          expect(l.length).toBe(2)
        })

        test("Mutate", () => {
          const l = new LengthLinkedList("a", "b").reverse()
          expect(l.length).toBe(2)

          const e = l.push("c")
          expect(l.length).toBe(3)
          l.unshift("d")
          expect(l.length).toBe(4)
          l.push("e")
          expect(l.length).toBe(5)
          l.unshiftToken(new LengthToken("f", l) as any)
          expect(l.length).toBe(6)
          l.pushToken(e)
          expect(l.length).toBe(6)
          e.rm()
          expect(l.length).toBe(5)
          e.rm()
          expect(l.length).toBe(5)
          l.pop()
          expect(l.length).toBe(4)
          l.pop()
          expect(l.length).toBe(3)
          l.pop()
          expect(l.length).toBe(2)
          l.shift()
          expect(l.length).toBe(1)
          l.shift()
          expect(l.length).toBe(0)
        })
      })
    })
  })
})

function go(LinkedList: typeof _LinkedList, Token: typeof _Token) {
  describe("Core", () => {
  

  

    describe("init", () => {
      test('Empty', () => {
        new LinkedList()
      })
    
      test('With array elements values', () => {
        new LinkedList("a", "b", "c", "d")
      })
  
      test('With linkedList', () => {
        new LinkedList(new LinkedList("a", "b", "c", "d"))
      })
  
  
      test('With empty linkedList', () => {
        new LinkedList(new LinkedList())
      })
  
  
  
      describe("iterate", () => {
        test("Empty", () => {
          const ls = new LinkedList()
          const ex = expect(["start", "end"])
          ex.ordered("start")
          for (let e of ls) {
            ex.ordered(e as any)
          }
          ex.ordered("end")
        })
      
        test("With array elements values", () => {
          const ls = new LinkedList("a", "b", "c", "d")
          const ex = expect(["start", "a", "b", "c", "d", "end"])
          ex.ordered("start")
          for (let e of ls) {
            ex.ordered(e)
          }
          ex.ordered("end")
        })
  
        test("With linkedList", () => {
          const ls = new LinkedList(new LinkedList("a", "b", "c", "d"))
          const ex = expect(["start", "a", "b", "c", "d", "end"])
          ex.ordered("start")
          for (let e of ls) {
            ex.ordered(e)
          }
          ex.ordered("end")
        })
  
        test("With empty linkedList", () => {
          const ls = new LinkedList(new LinkedList())
          const ex = expect(["start", "end"])
          ex.ordered("start")
          for (let e of ls) {
            ex.ordered(e as any)
          }
          ex.ordered("end")
        })
      })
  
      
    })
  
    
  
    describe("static", () => {
      let ls: _LinkedList<string>
      beforeEach(() => {
        ls = new LinkedList("a", "b", "c", "d")
      })
  
      test("Empty prop", () => {
        const l = new LinkedList()
        expect(l.empty).toBe(true)
        const ll = new LinkedList("a", "b", "c", "d")
        expect(ll.empty).toBe(false)
        const lll = new LinkedList(new LinkedList("a"))
        expect(lll.empty).toBe(false)
      })
  
  
      describe("Iteration", () => {
        test("forof", () => {
          const ex = expect(["start", "a", "b", "c", "d", "end"])
          ex.ordered("start")
          for (let e of ls) {
            ex.ordered(e)
          }
          ex.ordered("end")
        })
  
        test("foreach", () => {
          const ex = expect(["start", "a", "b", "c", "d", "end"])
          ex.ordered("start")
          ls.forEach((e, tok) => {
            ex.ordered(e)
            expect(e).toBe(tok.value)
          })
          ex.ordered("end")
  
  
  
          ls.clear()
  
          const ex2 = expect(["start", "end"])
          ex2.ordered("start")
          ls.forEach((e) => {
            ex2.ordered(e)
          })
          ex2.ordered("end")
        })
  
  
        test("iterator", () => {
          expect(ls[Symbol.iterator]).toBeDefined()
          expect(ls[Symbol.iterator] === ls.iterator).toBeTruthy()
  
          const ex = expect(["start", "a", "b", "c", "d", "end"])
          ex.ordered("start")
          const itr = ls.iterator()
          let res = itr.next()
          while (!res.done) {
            ex.ordered(res.value)
            res = itr.next()
          }
          ex.ordered("end")
        })
      })
  
      test('Init with LinkedList', () => {
        const ex = expect(["start", "a", "b", "c", "d", "end"])
        ex.ordered("start")
        for (let e of new LinkedList(ls)) {
          ex.ordered(e)
        }
        ex.ordered("end")
      })
  
  
      describe("getter", () => {
  
        test("first", () => {
          expect(ls.first).toBe("a")
        })
  
        test("last", () => {
          expect(ls.last).toBe("d")
        })
  
  
        test("toArray", () => {
          expect(ls.toArray()).toEqual(["a", "b", "c", "d"])
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
  
      
      
  
  
      
  
      describe("mutate", () => {
  
        describe("insert", () => {
  
          test('push val', () => {
            ls.push("e")
    
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("e")
            expect(["a", "b", "c", "d", "e"]).toEqual(ls.toArray())
          })
  
  
          test('unshift val', () => {
            ls.unshift("9")
    
  
            expect(ls.first).toBe("9")
            expect(ls.last).toBe("d")
            expect(["9", "a", "b", "c", "d"]).toEqual(ls.toArray())
          })
  
  
          test('push single val', () => {
            ls = new LinkedList()
            ls.push("a")
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("a")
            expect(["a"]).toEqual(ls.toArray())
          })
  
          test('unshift single val', () => {
            ls = new LinkedList()
            ls.unshift("a")
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("a")
            expect(["a"]).toEqual(ls.toArray())
          })
  
          test('pushBulk single val', () => {
            ls = new LinkedList()
            ls.pushBulk(["a"])
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("a")
            expect(["a"]).toEqual(ls.toArray())
          })
  
          test('unshiftBulk single val', () => {
            ls = new LinkedList()
            ls.unshiftBulk(["a"])
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("a")
            expect(["a"]).toEqual(ls.toArray())
          })
  
  
          describe("empty", () => {
            const l = new LinkedList("a", "b", "c", "d")
            l.pop()
            expect(l.empty).toBe(false)
            l.pop()
            l.pop()
            expect(l.empty).toBe(false)
            l.pop()
            expect(l.empty).toBe(true)
            const tok = l.push("lel")
            expect(l.empty).toBe(false)
            tok.remove()
            expect(l.empty).toBe(true)
            l.pushToken(tok)
            expect(l.empty).toBe(false)
            l.push("woo")
            l.unshift("qq")
            tok.rm()
            l.shift()
            expect(l.empty).toBe(false)
            l.shift()
            expect(l.empty).toBe(true)
          })
  
  
  
  
    
    
          describe("bulk", () => {
            test('push bulk array', () => {
              ls.pushBulk(["e", "f", "g"])
      
              expect(ls.first).toBe("a")
              expect(ls.last).toBe("g")
              const ex = expect(["a", "b", "c", "d", "e", "f", "g"])
              for (const e of ls) ex.ordered(e)
              expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
            })
            test('push bulk linkedlist', () => {
              ls.pushBulk(new LinkedList("e", "f", "g"))
      
              expect(ls.first).toBe("a")
              expect(ls.last).toBe("g")
              const ex = expect(["a", "b", "c", "d", "e", "f", "g"])
              for (const e of ls) ex.ordered(e)
              expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
            })
            test('push bulk array single', () => {
              ls.pushBulk(["e"])
      
              expect(ls.first).toBe("a")
              expect(ls.last).toBe("e")
              const ex = expect(["a", "b", "c", "d", "e"])
              for (const e of ls) ex.ordered(e)
              expect(["a", "b", "c", "d", "e"]).toEqual(ls.toArray())
            })
            test('push bulk array empty', () => {
              ls.pushBulk([])
      
              expect(ls.first).toBe("a")
              expect(ls.last).toBe("d")
              const ex = expect(["a", "b", "c", "d"])
              for (const e of ls) ex.ordered(e)
              expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
            })
  
  
            test('unshift bulk array', () => {
              ls.unshiftBulk(["7", "8", "9"])
      
              expect(ls.first).toBe("7")
              expect(ls.last).toBe("d")
              const ex = expect(["7", "8", "9", "a", "b", "c", "d"])
              for (const e of ls) ex.ordered(e)
              expect(["7", "8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
            })
            test('unshift bulk linkedlist', () => {
              ls.unshiftBulk(new LinkedList("7", "8", "9"))
      
              expect(ls.first).toBe("7")
              expect(ls.last).toBe("d")
              const ex = expect(["7", "8", "9", "a", "b", "c", "d"])
              for (const e of ls) ex.ordered(e)
              expect(["7", "8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
            })
            test('unshiftBulk bulk array single', () => {
              ls.unshiftBulk(["9"])
      
              expect(ls.first).toBe("9")
              expect(ls.last).toBe("d")
              const ex = expect(["9", "a", "b", "c", "d"])
              for (const e of ls) ex.ordered(e)
              expect(["9", "a", "b", "c", "d"]).toEqual(ls.toArray())
            })
            test('unshiftBulk bulk array empty', () => {
              ls.unshiftBulk([])
      
              expect(ls.first).toBe("a")
              expect(ls.last).toBe("d")
              const ex = expect(["a", "b", "c", "d"])
              for (const e of ls) ex.ordered(e)
              expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
            })
            
            test("Empty prop", () => {
              const l = new LinkedList("a")
              expect(l.empty).toBe(false)
              l.pop()
              expect(l.empty).toBe(true)
              l.pushBulk(["a", "b", "c"])
              expect(l.empty).toBe(false)
              l.pop()
              l.pop()
              expect(l.empty).toBe(false)
              l.shift()
              expect(l.empty).toBe(true)
            })
  
  
            describe("reverse", () => {
              test('push bulk array', () => {
                ls.pushBulk(["g", "f", "e"], true)
  
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
                const ex = expect(["a", "b", "c", "d", "e", "f", "g"])
                for (const e of ls) ex.ordered(e)
                expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
              })
              test('push bulk linkedlist', () => {
                ls.pushBulk(new LinkedList("g", "f", "e"), true)
        
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
                const ex = expect(["a", "b", "c", "d", "e", "f", "g"])
                for (const e of ls) ex.ordered(e)
                expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
              })
    
    
              test('unshift bulk array', () => {
                ls.unshiftBulk(["9", "8", "7"], true)
        
                expect(ls.first).toBe("7")
                expect(ls.last).toBe("d")
                const ex = expect(["7", "8", "9", "a", "b", "c", "d"])
                for (const e of ls) ex.ordered(e)
                expect(["7", "8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
              })
              test('unshift bulk linkedlist', () => {
                ls.unshiftBulk(new LinkedList("9", "8", "7"), true)
        
                expect(ls.first).toBe("7")
                expect(ls.last).toBe("d")
                const ex = expect(["7", "8", "9", "a", "b", "c", "d"])
                for (const e of ls) ex.ordered(e)
                expect(["7", "8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
              })
            })
          })
        })
       
  
        describe("remove", () => {
          test('pop', () => {
            const r = ls.pop()
            expect(r).toBe("d")
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("c")
            const ex = expect(["a", "b", "c"])
            for (const e of ls) ex.ordered(e)
            expect(["a", "b", "c"]).toEqual(ls.toArray())
          })
          test('shift', () => {
            const r = ls.shift()
            expect(r).toBe("a")
            expect(ls.first).toBe("b")
            expect(ls.last).toBe("d")
            const ex = expect(["b", "c", "d"])
            for (const e of ls) ex.ordered(e)
            expect(["b", "c", "d"]).toEqual(ls.toArray())
          })
          test('remove after push', () => {
            const e = ls.push("e")
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("e")
            const ex1 = expect(["a", "b", "c", "d", "e"])
            for (const e of ls) ex1.ordered(e)
            expect(["a", "b", "c", "d", "e"]).toEqual(ls.toArray())
  
  
            expect(e.remove()).toBeTruthy()
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
            const ex2 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex2.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
  
            const e1 = ls.push("e")
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("e")
            const ex3 = expect(["a", "b", "c", "d", "e"])
            for (const e of ls) ex3.ordered(e)
            expect(["a", "b", "c", "d", "e"]).toEqual(ls.toArray())
  
            const e2 = ls.push("f")
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("f")
            const ex4 = expect(["a", "b", "c", "d", "e", "f"])
            for (const e of ls) ex4.ordered(e)
            expect(["a", "b", "c", "d", "e", "f"]).toEqual(ls.toArray())
  
  
            expect(e1.remove()).toBeTruthy()
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("f")
  
            const ex5 = expect(["a", "b", "c", "d", "f"])
            for (const e of ls) ex5.ordered(e)
            expect(["a", "b", "c", "d", "f"]).toEqual(ls.toArray())
  
            expect(e2.remove()).toBeTruthy()
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
  
            const ex6 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex6.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
  
            expect(e.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
            expect(e1.remove()).toBeFalsy()
            expect(e2.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
            const ex7 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex7.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
          })
          test('remove after unshift', () => {
            const e = ls.unshift("9")
  
            expect(ls.first).toBe("9")
            expect(ls.last).toBe("d")
            const ex1 = expect(["9", "a", "b", "c", "d"])
            for (const e of ls) ex1.ordered(e)
            expect(["9", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
            expect(e.remove()).toBeTruthy()
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
            const ex2 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex2.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
  
            const e1 = ls.unshift("9")
  
            expect(ls.first).toBe("9")
            expect(ls.last).toBe("d")
            const ex3 = expect(["9", "a", "b", "c", "d"])
            for (const e of ls) ex3.ordered(e)
            expect(["9", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
            const e2 = ls.unshift("8")
  
            expect(ls.first).toBe("8")
            expect(ls.last).toBe("d")
            const ex4 = expect(["8", "9", "a", "b", "c", "d"])
            for (const e of ls) ex4.ordered(e)
            expect(["8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
            expect(e1.remove()).toBeTruthy()
            expect(ls.first).toBe("8")
            expect(ls.last).toBe("d")
  
            const ex5 = expect(["8", "a", "b", "c", "d"])
            for (const e of ls) ex5.ordered(e)
            expect(["8", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
            expect(e2.remove()).toBeTruthy()
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
  
            const ex6 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex6.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
  
            expect(e.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
            expect(e1.remove()).toBeFalsy()
            expect(e2.remove()).toBeFalsy()
            expect(e.remove()).toBeFalsy()
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("d")
            const ex7 = expect(["a", "b", "c", "d"])
            for (const e of ls) ex7.ordered(e)
            expect(["a", "b", "c", "d"]).toEqual(ls.toArray())
          })
          
  
          describe("bulk", () => {
            describe("formal", () => {
              test("remove after bulk push array", () => {
                const e = ls.pushBulk(["e", "f", "g"])
                expect(e).toBeInstanceOf(Array)
                expect(e.length).toBe(3)
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
              })
    
              test("remove after bulk push linkedlist", () => {
                const e = ls.pushBulk(new LinkedList("e", "f", "g"))
                expect(e).toBeInstanceOf(LinkedList)
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
              })
    
              test("remove after bulk unshift array", () => {
                const e = ls.unshiftBulk(["7", "8", "9"])
                expect(e).toBeInstanceOf(Array)
                expect(e.length).toBe(3)
                expect(ls.first).toBe("7")
                expect(ls.last).toBe("d")
              })
    
              test("remove after bulk unshift linkedlist", () => {
                const e = ls.unshiftBulk(new LinkedList("7", "8", "9"))
                expect(e).toBeInstanceOf(LinkedList)
                expect(ls.first).toBe("7")
                expect(ls.last).toBe("d")
              })
            })
            
  
            describe("remove individual", () => {
              test("remove after bulk push array", () => {
                const e = ls.pushBulk(["e", "f", "g"])
                const ex1 = expect(["a", "b", "c", "d", "e", "f", "g"])
                for (const e of ls) ex1.ordered(e)
                expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
                const e2 = e.pop()
                expect(e2.remove()).toBeTruthy()
                const ex2 = expect(["a", "b", "c", "d", "e", "f"])
                for (const e of ls) ex2.ordered(e)
                expect(["a", "b", "c", "d", "e", "f"]).toEqual(ls.toArray())
  
  
                expect(e2.remove()).toBeFalsy()
                const ex3 = expect(["a", "b", "c", "d", "e", "f"])
                for (const e of ls) ex3.ordered(e)
                expect(["a", "b", "c", "d", "e", "f"]).toEqual(ls.toArray())
  
                const e0 = e.shift()
                expect(e0.remove()).toBeTruthy()
  
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("f")
                
                const ex4 = expect(["a", "b", "c", "d", "f"])
                for (const e of ls) ex4.ordered(e)
                expect(["a", "b", "c", "d", "f"]).toEqual(ls.toArray())
              })
  
              test("remove after bulk push reverse array", () => {
                const e = ls.pushBulk(["g", "f", "e"], true)
                const ex1 = expect(["a", "b", "c", "d", "e", "f", "g"])
                for (const e of ls) ex1.ordered(e)
                expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
                const e2 = e.pop()
                expect(e2.remove()).toBeTruthy()
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
                const ex2 = expect(["a", "b", "c", "d", "f", "g"])
                for (const e of ls) ex2.ordered(e)
                expect(["a", "b", "c", "d", "f", "g"]).toEqual(ls.toArray())
  
  
                expect(e2.remove()).toBeFalsy()
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("g")
                const ex3 = expect(["a", "b", "c", "d", "f", "g"])
                for (const e of ls) ex3.ordered(e)
                expect(["a", "b", "c", "d", "f", "g"]).toEqual(ls.toArray())
  
                const e0 = e.shift()
                expect(e0.remove()).toBeTruthy()
  
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("f")
                const ex4 = expect(["a", "b", "c", "d", "f"])
                for (const e of ls) ex4.ordered(e)
                expect(["a", "b", "c", "d", "f"]).toEqual(ls.toArray())
              })
  
              test("remove after bulk push linkedlist", () => {
                const e = ls.pushBulk(new LinkedList("e", "f", "g"))
                const ex1 = expect(["a", "b", "c", "d", "e", "f", "g"])
                for (const e of ls) ex1.ordered(e)
                expect(["a", "b", "c", "d", "e", "f", "g"]).toEqual(ls.toArray())
                const e2 = e.pop()
                expect(e2.remove()).toBeTruthy()
                const ex2 = expect(["a", "b", "c", "d", "e", "f"])
                for (const e of ls) ex2.ordered(e)
                expect(["a", "b", "c", "d", "e", "f"]).toEqual(ls.toArray())
  
  
                expect(e2.remove()).toBeFalsy()
                const ex3 = expect(["a", "b", "c", "d", "e", "f"])
                for (const e of ls) ex3.ordered(e)
                expect(["a", "b", "c", "d", "e", "f"]).toEqual(ls.toArray())
  
                const e0 = e.shift()
                expect(e0.remove()).toBeTruthy()
  
                expect(ls.first).toBe("a")
                expect(ls.last).toBe("f")
                
                const ex4 = expect(["a", "b", "c", "d", "f"])
                for (const e of ls) ex4.ordered(e)
                expect(["a", "b", "c", "d", "f"]).toEqual(ls.toArray())
              })
  
              test("remove after bulk unshift array", () => {
                const e = ls.unshiftBulk(["7", "8", "9"])
                const ex1 = expect(["7", "8", "9", "a", "b", "c", "d"])
                for (const e of ls) ex1.ordered(e)
                const e2 = e.pop()
                expect(e2.remove()).toBeTruthy()
                const ex2 = expect(["7", "8", "a", "b", "c", "d"])
                for (const e of ls) ex2.ordered(e)
                expect(["7", "8", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
                expect(e2.remove()).toBeFalsy()
                const ex3 = expect(["7", "8", "a", "b", "c", "d"])
                for (const e of ls) ex3.ordered(e)
                expect(["7", "8", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
                const e0 = e.shift()
                expect(e0.remove()).toBeTruthy()
  
                expect(ls.first).toBe("8")
                expect(ls.last).toBe("d")
                
                const ex4 = expect(["8", "a", "b", "c", "d"])
                for (const e of ls) ex4.ordered(e)
                expect(["8", "a", "b", "c", "d"]).toEqual(ls.toArray())
              })
  
              test("remove after bulk unshift LinkedList", () => {
                const e = ls.unshiftBulk(new LinkedList("7", "8", "9"))
                const ex1 = expect(["7", "8", "9", "a", "b", "c", "d"])
                for (const e of ls) ex1.ordered(e)
                expect(["7", "8", "9", "a", "b", "c", "d"]).toEqual(ls.toArray())
                const e2 = e.pop()
                expect(e2.remove()).toBeTruthy()
                const ex2 = expect(["7", "8", "a", "b", "c", "d"])
                for (const e of ls) ex2.ordered(e)
                expect(["7", "8", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
  
                expect(e2.remove()).toBeFalsy()
                const ex3 = expect(["7", "8", "a", "b", "c", "d"])
                for (const e of ls) ex3.ordered(e)
                expect(["7", "8", "a", "b", "c", "d"]).toEqual(ls.toArray())
  
                const e0 = e.shift()
                expect(e0.remove()).toBeTruthy()
  
                expect(ls.first).toBe("8")
                expect(ls.last).toBe("d")
                
                const ex4 = expect(["8", "a", "b", "c", "d"])
                for (const e of ls) ex4.ordered(e)
                expect(["8", "a", "b", "c", "d"]).toEqual(ls.toArray())
              })
            })
  
            
  
          })
        })
        describe("Token handeling", () => {
          let ls: _LinkedList<any>
          beforeEach(() => {
            ls = new LinkedList()
          })

          test("From constructor", () => {
            // @ts-ignore
            const tok = new Token("lel", ls)
            expect(tok.value).toBe("lel")
            expect(tok.next).toBe(undefined)
            expect(tok.prev).toBe(undefined)

            const tok2 = ls.pushToken(tok)
            expect(tok2).toBe(tok)
            expect(ls.toArray()).toEqual(["lel"])
            tok2.value = "change"
            expect(tok2.value).toBe("change")
            expect(ls.first).toBe("change")
            expect(ls.toArray()).toEqual(["change"])
          })
          describe("Singlular inherent", () => {
            test("push", () => {
              const tok = new Token("lel")

              const t2 = ls.push(tok)
              expect(ls.first).toBe(tok)
              expect(ls.last).toBe(tok)
              expect(ls.empty).toBe(false)
              expect(ls.firstToken).toBeInstanceOf(Token)
              expect(ls.firstToken).toBe(t2)
              expect(ls.lastToken).toBe(t2)
              expect(ls.firstToken.value).toBe(tok)

              const t3 = ls.push("2")
              expect(ls.last).toBe("2")
              expect(ls.first).toBe(tok)
              expect(ls.lastToken.prev.value).toBe(tok)
              expect(ls.firstToken.next).toBe(t3)
            })
            test("unshift", () => {
              const tok = new Token("lel")

              const t2 = ls.unshift(tok)
              expect(ls.first).toBe(tok)
              expect(ls.last).toBe(tok)
              expect(ls.empty).toBe(false)
              expect(ls.firstToken).toBeInstanceOf(Token)
              expect(ls.firstToken).toBe(t2)
              expect(ls.lastToken).toBe(t2)
              expect(ls.firstToken.value).toBe(tok)

              const t3 = ls.unshift("2")
              expect(ls.first).toBe("2")
              expect(ls.last).toBe(tok)
              expect(ls.lastToken.prev.value).toBe("2")
              expect(ls.firstToken.next).toBe(t2)
            })

            test("Head tail", () => {
              const h = new Head()
              const t = new Tail()
              expect("value" in h).toBe(false)
              expect("value" in t).toBe(false)
              expect(h).toBeInstanceOf(End)
              expect(t).toBeInstanceOf(End)
            })

            test("pop", () => {
              const tok = new Token("lel")
              const t2 = ls.push(tok)
              const t3 = ls.push("2")
              const t4 = ls.push("3")

              expect(ls.last).toBe("3")
              expect(ls.lastToken).toBe(t4)
              expect(ls.lastToken.value).toBe("3")
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBe(t3)

              const v5 = ls.pop()
              expect(v5).toBe(t4.value)
              expect(ls.last).toBe("2")
              expect(ls.lastToken).toBe(t3)
              expect(ls.lastToken.value).toBe("2")
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBe(t2)

              const v6 = ls.pop()
              expect(v6).toBe(t3.value)
              expect(ls.last).toBe(tok)
              expect(ls.lastToken).toBe(t2)
              expect(ls.lastToken.value).toBe(tok)
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBeInstanceOf(End)

              const v7 = ls.pop()
              expect(v7).toBe(t2.value)
              expect(ls.last).toBe(undefined)
              expect(ls.lastToken).toBeInstanceOf(End)
              expect(ls.empty).toBe(true)

              expect(() => ls.pop()).toThrowError()
            })

            test("popToken", () => {
              const tok = new Token("lel")
              const t2 = ls.push(tok)
              const t3 = ls.push("2")
              const t4 = ls.push("3")

              expect(ls.last).toBe("3")
              expect(ls.lastToken).toBe(t4)
              expect(ls.lastToken.value).toBe("3")
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBe(t3)

              const v5 = ls.popToken()
              expect(v5).toBe(t4)
              expect(ls.last).toBe("2")
              expect(ls.lastToken).toBe(t3)
              expect(ls.lastToken.value).toBe("2")
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBe(t2)

              const v6 = ls.popToken()
              expect(v6).toBe(t3)
              expect(ls.last).toBe(tok)
              expect(ls.lastToken).toBe(t2)
              expect(ls.lastToken.value).toBe(tok)
              expect(ls.lastToken.next).toBeInstanceOf(End)
              expect(ls.lastToken.prev).toBeInstanceOf(End)

              const v7 = ls.popToken()
              expect(v7).toBe(t2)
              expect(ls.last).toBe(undefined)
              expect(ls.lastToken).toBeInstanceOf(End)
              expect(ls.empty).toBe(true)

              expect(() => ls.popToken()).toThrowError()
            })

            test("shift", () => {
              const tok = new Token("lel")
              const t2 = ls.push(tok)
              const t3 = ls.push("2")
              const t4 = ls.push("3")

              expect(ls.first).toBe(tok)
              expect(ls.firstToken).toBe(t2)
              expect(ls.firstToken.value).toBe(tok)
              expect(ls.firstToken.next).toBe(t3)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v5 = ls.shift()
              expect(v5).toBe(t2.value)
              expect(ls.first).toBe("2")
              expect(ls.firstToken).toBe(t3)
              expect(ls.firstToken.value).toBe("2")
              expect(ls.firstToken.next).toBe(t4)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v6 = ls.shift()
              expect(v6).toBe(t3.value)
              expect(ls.first).toBe("3")
              expect(ls.firstToken).toBe(t4)
              expect(ls.firstToken.value).toBe("3")
              expect(ls.firstToken.next).toBeInstanceOf(End)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v7 = ls.shift()
              expect(v7).toBe(t4.value)
              expect(ls.first).toBe(undefined)
              expect(ls.firstToken).toBeInstanceOf(End)
              expect(ls.empty).toBe(true)

              expect(() => ls.shift()).toThrowError()
            })

            test("shiftToken", () => {
              const tok = new Token("lel")
              const t2 = ls.push(tok)
              const t3 = ls.push("2")
              const t4 = ls.push("3")

              expect(ls.first).toBe(tok)
              expect(ls.firstToken).toBe(t2)
              expect(ls.firstToken.value).toBe(tok)
              expect(ls.firstToken.next).toBe(t3)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v5 = ls.shiftToken()
              expect(v5).toBe(t2)
              expect(ls.first).toBe("2")
              expect(ls.firstToken).toBe(t3)
              expect(ls.firstToken.value).toBe("2")
              expect(ls.firstToken.next).toBe(t4)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v6 = ls.shiftToken()
              expect(v6).toBe(t3)
              expect(ls.first).toBe("3")
              expect(ls.firstToken).toBe(t4)
              expect(ls.firstToken.value).toBe("3")
              expect(ls.firstToken.next).toBeInstanceOf(End)
              expect(ls.firstToken.prev).toBeInstanceOf(End)

              const v7 = ls.shiftToken()
              expect(v7).toBe(t4)
              expect(ls.first).toBe(undefined)
              expect(ls.firstToken).toBeInstanceOf(End)
              expect(ls.empty).toBe(true)

              expect(() => ls.shiftToken()).toThrowError()
            })




            describe("bulk", () => {
              test("push bulk", () => {
                // @ts-ignore
                const tok = new Token("lel", ls)
                // @ts-ignore
                const tok2 = new Token("lel2", ls)
                // @ts-ignore
                const tok3 = new Token("lel3", ls)
                // @ts-ignore
                const tok4 = new Token("lel4", ls)

                const ret = ls.pushTokenBulk([tok, tok2, tok3, tok4])
                expect(ls.first).toBe(tok.value)
                expect(ls.last).toBe(tok4.value)
                expect(ls.firstToken).toBeInstanceOf(Token)
                expect(ls.firstToken).toBe(tok)
                expect(ls.lastToken).toBeInstanceOf(Token)
                expect(ls.lastToken).toBe(tok4)
                expect(ls.firstToken.next).toBeInstanceOf(Token)
                expect(ls.firstToken.next).toBe(tok2)
                
                expect(ret).toBeInstanceOf(Array)
                expect(ret.length).toBe(4)
                expect(ret[0]).toBe(tok)
                expect(ret[1]).toBe(tok2)
                expect(ret[2]).toBe(tok3)
                expect(ret[3]).toBe(tok4)

                expect(ls.toArray()).toEqual([tok.value, tok2.value, tok3.value, tok4.value])
            })

            test("unshift bulk", () => {
              // @ts-ignore
              const tok = new Token("lel", ls)
              // @ts-ignore
              const tok2 = new Token("lel2", ls)
              // @ts-ignore
              const tok3 = new Token("lel3", ls)
              // @ts-ignore
              const tok4 = new Token("lel4", ls)

              const ret = ls.unshiftTokenBulk([tok, tok2, tok3, tok4])
              expect(ls.first).toBe(tok.value)
              expect(ls.last).toBe(tok4.value)
              expect(ls.firstToken).toBeInstanceOf(Token)
              expect(ls.firstToken).toBe(tok)
              expect(ls.lastToken).toBeInstanceOf(Token)
              expect(ls.lastToken).toBe(tok4)
              expect(ls.firstToken.next).toBeInstanceOf(Token)
              expect(ls.firstToken.next).toBe(tok2)
              
              expect(ret).toBeInstanceOf(Array)
              expect(ret.length).toBe(4)
              expect(ret[0]).toBe(tok)
              expect(ret[1]).toBe(tok2)
              expect(ret[2]).toBe(tok3)
              expect(ret[3]).toBe(tok4)

              expect(ls.toArray()).toEqual([tok.value, tok2.value, tok3.value, tok4.value])
          })
          describe("remove", () => {
            test("remove api", () => {
              const tok = ls.push("lel")
              expect(tok.remove()).toBeTruthy()
              expect(ls.empty).toBeTruthy()
              expect(tok.remove()).toBeFalsy()
              expect(ls.empty).toBeTruthy()

              const tok2 = ls.push("lel")
              const tok3 = ls.push("lel2")
              expect(tok2.remove()).toBeTruthy()
              expect(ls.empty).toBeFalsy()
              expect(tok2.remove()).toBeFalsy()
              expect(ls.empty).toBeFalsy()
              expect(tok3.remove()).toBeTruthy()
              expect(ls.empty).toBeTruthy()
              expect(tok3.remove()).toBeFalsy()
              expect(ls.empty).toBeTruthy()

              const tok4 = ls.push("lel")
              const tok5 = ls.push("lel2")
              
              expect(tok4.rm()).toBe(tok4)
              expect(ls.empty).toBeFalsy()
              expect(tok4.rm()).toBe(tok4)
              expect(ls.empty).toBeFalsy()
              expect(tok5.rm()).toBe(tok5)
              expect(ls.empty).toBeTruthy()
              expect(tok5.rm()).toBe(tok5)
              expect(ls.empty).toBeTruthy()
            })

            test("Remove unsets next prev props", () => {
              const tok = ls.push("lel")
              expect(tok.remove()).toBeTruthy()
              expect(ls.empty).toBeTruthy()
              expect(tok.remove()).toBeFalsy()
              expect(ls.empty).toBeTruthy()

              const tok2 = ls.push("lel")
              const tok3 = ls.push("lel2")
              expect(tok2.remove()).toBeTruthy()
              expect(ls.empty).toBeFalsy()
              expect(tok2.remove()).toBeFalsy()

              expect(tok2.next).toBe(undefined)
              expect(tok2.prev).toBe(undefined)
              expect(tok2.value).toBe("lel")

              tok3.rm()

              expect(tok3.next).toBe(undefined)
              expect(tok3.prev).toBe(undefined)
              expect(tok3.value).toBe("lel2")
            })

            describe("proper removal before add", () => {
              test("push", () => {
                const tok = ls.push("lel")
                const tok2 = ls.push("lel2")
                
                const list2 = new LinkedList()

                list2.push(tok)
                expect(ls.first).toBe("lel")
                expect(ls.last).toBe("lel2")
                list2.pushToken(tok)
                expect(ls.first).toBe("lel2")
                expect(ls.last).toBe("lel2")

                list2.pushToken(tok2)
                expect(ls.first).toBe(undefined)
                expect(ls.last).toBe(undefined)
                expect(ls.empty).toBe(true)
              })

              test("unshift", () => {
                const tok = ls.push("lel")
                const tok2 = ls.push("lel2")
                
                const list2 = new LinkedList()

                list2.unshift(tok)
                expect(ls.first).toBe("lel")
                expect(ls.last).toBe("lel2")
                list2.unshiftToken(tok)
                expect(ls.first).toBe("lel2")
                expect(ls.last).toBe("lel2")

                list2.unshiftToken(tok2)
                expect(ls.first).toBe(undefined)
                expect(ls.last).toBe(undefined)
                expect(ls.empty).toBe(true)
              })

              describe("bulk", () => {
                test("push bulk", () => {
                  const tok1 = ls.push("lel")
                  const tok2 = ls.push("lel2")
                  const tok3 = ls.push("lel3")

                  const list2 = new LinkedList()

                  list2.pushTokenBulk([tok1, tok2, tok3])
                  expect(ls.empty).toBe(true)
                  expect(list2.empty).toBe(false)

                  ls.pushTokenBulk([tok1, tok2, tok3])
                  expect(list2.empty).toBe(true)
                  expect(ls.empty).toBe(false)
                })

                test("unshift bulk", () => {
                  const tok1 = ls.push("lel")
                  const tok2 = ls.push("lel2")
                  const tok3 = ls.push("lel3")

                  const list2 = new LinkedList()

                  list2.unshiftTokenBulk([tok1, tok2, tok3])
                  expect(ls.empty).toBe(true)
                  expect(list2.empty).toBe(false)

                  ls.unshiftTokenBulk([tok1, tok2, tok3])
                  expect(list2.empty).toBe(true)
                  expect(ls.empty).toBe(false)
                })
              })
              

            })
          })
          
        })
      })
    })

    describe("Reverse", () => {
      
      
      test("Return val", () => {
        const ls = new LinkedList()
        const ls2 = ls.reverse()
        expect(ls2).toBe(ls)
      })

      describe("Static", () => {
        let ls: _LinkedList<string>
        beforeEach(() => {
          ls = new LinkedList("a", "b", "c")
          ls.reverse()
        })
        test("To Array", () => {
          expect(ls.toArray()).toEqual(["c", "b", "a"])
        })
        test("For Each", () => {
          const arr: string[] = []
          ls.forEach((val) => arr.push(val))
          expect(arr).toEqual(["c", "b", "a"])
        })
        test("forof", () => {
          const arr: string[] = []
          for (const val of ls) {
            arr.push(val)
          }
          expect(arr).toEqual(["c", "b", "a"])
        })
        test("Map", () => {
          let i = 0
          const arr = ls.map((val) => val + i++).toArray()
          expect(arr).toEqual(["c0", "b1", "a2"])
        })

        test("Double reverse", () => {
          ls.reverse()
          expect(ls.toArray()).toEqual(["a", "b", "c"])
        })
      })

      describe("Mutate", () => {
        let ls: _LinkedList<string>
        beforeEach(() => {
          ls = new LinkedList("a", "b", "c")
          ls.reverse()
        })
        test("Push", () => {
          ls.push("d")
          expect(ls.toArray()).toEqual(["c", "b", "a", "d"])
        })
        test("Unshift", () => {
          ls.unshift("d")
          expect(ls.toArray()).toEqual(["d", "c", "b", "a"])
        })
        test("Pop", () => {
          expect(ls.pop()).toBe("a")
          expect(ls.toArray()).toEqual(["c", "b"])
        })
        test("Shift", () => {
          expect(ls.shift()).toBe("c")
          expect(ls.toArray()).toEqual(["b", "a"])
        })
        
        test("pushBulk", () => {
          ls.pushBulk(["d", "e"])
          expect(ls.toArray()).toEqual(["c", "b", "a", "d", "e"])
        })
        test("unshiftBulk", () => {
          ls.unshiftBulk(["d", "e"])
          expect(ls.toArray()).toEqual(["d", "e", "c", "b", "a"])
        })
        test("pushBulk reverse", () => {
          ls.pushBulk(["d", "e"], true)
          expect(ls.toArray()).toEqual(["c", "b", "a", "e", "d"])
        })
        test("unshiftBulk reverse", () => {
          ls.unshiftBulk(["d", "e"], true)
          expect(ls.toArray()).toEqual(["e", "d", "c", "b", "a"])
        })
        test("double reverse", () => {
          ls.unshiftBulk(["d", "e"], true)
          expect(ls.reverse().toArray()).toEqual(["a", "b", "c", "d", "e"])
        })
      })
      

      
    })
  })
})
})
  
}
