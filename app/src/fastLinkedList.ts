const toStringDefault = e => e.toString()

class End {}

class Head<T> extends End {
  public next?: Token<T> | Tail<T>
}
class Tail<T> extends End {
  public prev?: Token<T> | Head<T>
}

class _LinkedList<T> {
  private tail?: Tail<T> = new Tail()
  private head?: Head<T> = new Head()
  private reversed = false

  constructor(ls: LinkedList<T>, reverse: boolean)
  constructor(...initValues: T[])
  constructor(...initValues: any[]) {
    this.head.next = this.tail;
    this.tail.prev = this.head;

    //@ts-ignore
    (this as any as LinkedList<T>).pushBulk(...(initValues[0] instanceof LinkedList ? [initValues[0], initValues[1]] : [initValues]))
  }


  reverse(): boolean {
    if (this.reversed = !this.reversed) {
      attachFuncs(this, forwInv, revsInv)
    }
    else {
      attachFuncs(this, forw, revs)
    }

    return this.reversed
  }


  toArray() {
    const a = []
    for (const e of this as any as LinkedList<T>) {
      a.push(e)
    }
    return a
  }

  toString(methodForEntries: (s: T) => string = toStringDefault) {
    let s = "["
    for (let e of this as any as LinkedList<T>) {
      s += methodForEntries(e) + ", "
    }
    return s.slice(0, -2) + "]"
  }
}

const mkItr = (values: any[] | LinkedList<any>, reverse: boolean) => {
  if (reverse) {
    if (values instanceof Array) {
      return (function*() {
        let i = values.length-1
        for (; i >= 0; i--) {
          yield values[i]
        }

        return values[i]
      })()
    }
    else return values.iteratorReverse()
  }
  else return values[Symbol.iterator]()
}

const pushOrUnshift = (push: boolean, realDir: boolean = push) => {
  const headKey = push ? "head" : "tail"
  const tailKey = push ? "tail" : "head"
  const nextKey = push ? "next" : "prev"
  const prevKey = push ? "prev" : "next"

  function add(value: any) {
    const token = new Token(value)
    
    const tailElem = this[tailKey]
    const end = tailElem[prevKey]
    if (!(end instanceof End)) {
      token[prevKey] = end
      token[nextKey] = tailElem
      end[nextKey] = token
    }
    else {
      const headElem = this[headKey]
      headElem[nextKey] = token
      end[prevKey] = headElem
    }
    return tailElem[prevKey] = token
  }

  
  const reverseDefault = !realDir
  function addBulk (values: any[] | LinkedList<any>, reverse = false) {
    const ret = new (values.constructor as any) as Token<any>[] | LinkedList<Token<any>>
    const rev = reverse ? !reverseDefault : reverseDefault
    const itr = mkItr(values, rev)
    let result = itr.next()
    if (result.done) return ret
    const tailElem = this[tailKey]
    let end = tailElem[prevKey]
    
    const token = new Token(result.value)
    ret.push(token)
    
    if (!(end instanceof End)) {
      token[prevKey] = end
      end[nextKey] = token
      end = token
    }
    else {
      const headElem = this[headKey]
      end = headElem[nextKey] = token
      end[prevKey] = headElem
    }
    
    result = itr.next()
    const pushKey = rev ? "unshift" : "push"
    while(!result.done) {
      const token = new Token(result.value)
      ret[pushKey](token)
      token[prevKey] = end
      end[nextKey] = token
      end = token
      result = itr.next()
    }
    
    tailElem[prevKey] = end
    end[nextKey] = tailElem
    return ret
  }

  function pop() {
    const tailElem = this[tailKey]
    const curTailTok = tailElem[prevKey]
    tailElem[prevKey] = curTailTok[prevKey]
    curTailTok[prevKey][nextKey] = tailElem
    return curTailTok.value
  }

  function* itr() {
    let cur = this[headKey]
    let curNext = cur[nextKey]
    while (curNext[nextKey]) {
      cur = curNext
      curNext = curNext[nextKey]
      yield cur.value
    } 
    return cur.value
  }

  function first() {
    return this[headKey][nextKey].value
  }




  return {
    add,
    addBulk,
    pop,
    itr,
    first
  }
}



function attachFuncs(pr: any, forw: ReturnType<typeof pushOrUnshift>, revs: ReturnType<typeof pushOrUnshift>) {
  pr.push = forw.add
  pr.pushBulk = forw.addBulk
  pr.unshift = revs.add
  pr.unshiftBulk = revs.addBulk
  pr.pop = forw.pop
  pr.shift = revs.pop
  pr.iterator = pr[Symbol.iterator] = forw.itr
  pr.iteratorReverse = revs.itr
  pr.forEach = itrToEachFunc("iterator")
  pr.forEachReverse = itrToEachFunc("iteratorReverse")
  Object.defineProperty(pr, "first", {get: forw.first, configurable: true})
  Object.defineProperty(pr, "last", {get: revs.first, configurable: true})
}

const forw = pushOrUnshift(true)
const revsInv = pushOrUnshift(true, false)
const revs = pushOrUnshift(false)
const forwInv = pushOrUnshift(false, true)

attachFuncs(_LinkedList.prototype, forw, revs)
const prototypeKeys = Object.keys(_LinkedList.prototype)



function itrToEachFunc(itrKey: "iterator" | "iteratorReverse") {
  return function each(cb: Function) {
    const itr = this[itrKey]()
    let result = itr.next();
    while (!result.done) {
      cb(result.value)
      result = itr.next();
    }
  }
}



export type LinkedList<T> = _LinkedList<T> & {
  forEach: (cb: (val: T) => void) => void,
  forEachReverse: (cb: (value: T) => void) => void,
  pop(): T,
  shift(): T,
  push: (value: T) => Token<T>,
  pushBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>),
  unshift: (value: T) => Token<T>,
  unshiftBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>),
  iterator: () => Iterator<T, T, unknown>,
  iteratorReverse: () => Iterator<T, T, unknown>,
  [Symbol.iterator]: () => Iterator<T, T, unknown>,
  first: Readonly<T>,
  last: Readonly<T>
}
export const LinkedList = _LinkedList as {
  new<T>(ls: LinkedList<T>): LinkedList<T>
  new<T>(...initValues: T[]): LinkedList<T>
}
export default LinkedList









export class Token<T> {
  public next?: Token<T>
  public prev?: Token<T>
  constructor(public value: T) {

  }
  remove() {
    let suc = false
    const next = this.next
    const prev = this.prev
    if (this.next) {
      //@ts-ignore
      next.prev = prev
      this.next = undefined
      suc = true
    }
    if (this.prev) {
      //@ts-ignore
      prev.next = next
      this.prev = undefined
      suc = true
    }
    return suc
  }
}
