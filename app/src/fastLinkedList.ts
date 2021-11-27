const toStringDefault = e => e.toString()

class _LinkedList<T> {
  public tail?: Token<T>
  public head?: Token<T>
  public length = 0

  constructor(ls: LinkedList<T>, reverse: boolean)
  constructor(...initValues: T[])
  constructor(...initValues: any[]) {
    //@ts-ignore
    (this as any as LinkedList<T>).pushBulk(...(initValues[0] instanceof LinkedList ? [initValues[0], initValues[1]] : [initValues]))
  }



  get first() {
    return this.head.value
  }
  get last() {
    return this.tail.value
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
        for (; i > 0; i--) {
          yield values[i]
        }

        return values[i]
      })()
    }
    else return values.iteratorReverse()
  }
  else return values[Symbol.iterator]()
}

const pushOrUnshift = (push: boolean) => {
  const headKey = push ? "head" : "tail"
  const tailKey = push ? "tail" : "head"
  const nextKey = push ? "next" : "prev"
  const prevKey = push ? "prev" : "next"

  function add(value: any) {
    const token = new Token(value)
    this.length = this.length + (push ? 1 : -1)
    
    const end = this[tailKey]
    if (end) {
      token[prevKey] = end
      end[nextKey] = token
    }
    else this[headKey] = token
    return this[tailKey] = token
  }

  

  function addBulk (values: any[] | LinkedList<any>, reverse: boolean = false) {
    const ret = new (values.constructor as any) as Token<any>[] | LinkedList<Token<any>>
    if (values.length < 2) {
      if (values.length === 1) ret.push(this.push(values[Symbol.iterator]().next().value))
      return ret
    }

    this.length = this.length + (push ? values.length : -values.length)
    let end = this[headKey]

    const itr = mkItr(values, reverse)
    let result = itr.next()
    const token = new Token(result.value)
    ret.push(token)
    
    if (end) {
      token[prevKey] = end
      end[nextKey] = token
    }
    else end = this[headKey] = token
    
    result = itr.next()
    do {
      const token = new Token(result.value)
      token[prevKey] = end
      end[nextKey] = token
      end = token
      result = itr.next()
    } while(!result.done)
    
    this[tailKey] = end
    return ret
  }

  function pop() {
    if (this[tailKey]) {
      this.length = this.length + (push ? -1 : 1)
      if (!this.length) delete this[headKey]
      const curTail = this[tailKey]
      delete curTail[prevKey][nextKey]
      this[tailKey] = curTail[prevKey]
      delete curTail[prevKey]
      return curTail.value
    }
  }

  function* itr() {
    if (this[headKey]) {
      let cur = this[headKey]
      while (cur[nextKey]) {
        yield cur.value
        cur = cur[nextKey]
      } 
      yield cur.value
      return cur.value
    }
  }



  return {
    add,
    addBulk,
    pop,
    itr
  }
}

const forw = pushOrUnshift(true)
const revs = pushOrUnshift(false)

const pr = _LinkedList.prototype as any
pr.push = forw.add
pr.pushBulk = forw.addBulk
pr.unshift = revs.add
pr.unshiftBulk = revs.addBulk
pr.pop = forw.pop
pr.shift = revs.pop
pr.iterator = pr[Symbol.iterator] = forw.itr
pr.iteratorReverse = revs.itr

const itrToEachFunc = (itrKey: "iterator" | "iteratorReverse") => {
  return function each(cb: Function) {
    const itr = this[itrKey]()
    let result = itr.next();
    while (!result.done) {
      cb(result.value)
      result = itr.next();
    }
  }
}

pr.forEach = itrToEachFunc("iterator")
pr.forEachReverse = itrToEachFunc("iteratorReverse")


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
  [Symbol.iterator]: (() => Iterator<T, T, unknown>)
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
    if (this.next) {
      //@ts-ignore
      this.next.prev = this.prev
      delete this.next
      suc = true
    }
    if (this.prev) {
      //@ts-ignore
      this.prev.next = this.next
      delete this.prev
      suc = true
    }
    return suc
  }
}
