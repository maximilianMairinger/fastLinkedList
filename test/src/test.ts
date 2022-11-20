import _LinkedList, {LengthLinkedList, Token as _Token, LengthToken} from "../../app/src/fastLinkedList"
import "./extend"


describe("LinkedList", () => {
  go(_LinkedList, _Token)
})
describe("LengthLinkedList", () => {
  go(LengthLinkedList, LengthToken as any)
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
            ls.pop()
  
            expect(ls.first).toBe("a")
            expect(ls.last).toBe("c")
            const ex = expect(["a", "b", "c"])
            for (const e of ls) ex.ordered(e)
            expect(["a", "b", "c"]).toEqual(ls.toArray())
          })
          test('shift', () => {
            ls.shift()
  
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
      })
    })
  })
  
  
}
