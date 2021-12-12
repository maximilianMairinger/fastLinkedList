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
    (this.clear() as any).pushBulk(...(initValues[0] instanceof LinkedList ? [initValues[0], initValues[1]] : [initValues]))
  }

  clear(): this {
    this.head.next = this.tail;
    this.tail.prev = this.head;
    return this
  }




  reverse(): this {
    if (this.reversed = !this.reversed) {
      attachFuncs(this, forwInv, revsInv)
    }
    else {
      attachFuncs(this, forw, revs)
    }

    return this
  }
  map<W>(cb: (e: T) => W): LinkedList<W> {
    const n = new LinkedList<W>();
    for (const e of this as any) {
      n.push(cb(e))
    }
    return n
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
    else return values.reverse().iterator()
  }
  else return values[Symbol.iterator]()
}

const pushOrUnshift = (push: boolean, realDir: boolean = push) => {
  const headKey = push ? "head" : "tail"
  const tailKey = push ? "tail" : "head"
  const nextKey = push ? "next" : "prev"
  const prevKey = push ? "prev" : "next"


  function add(token: Token<any>) {  
    const tailElem = this[tailKey]
    const end = tailElem[prevKey]

    token[prevKey] = end
    token[nextKey] = tailElem
    end[nextKey] = token
    return tailElem[prevKey] = token
  }


  
  
  const reverseDefault = !realDir
  function addBulk (values: Token<any>[] | LinkedList<Token<any>>, reverse: boolean = false) {
    const ret = new (values.constructor as any) as Token<any>[] | LinkedList<Token<any>>
    const rev = reverse ? !reverseDefault : reverseDefault
    const itr = mkItr(values, rev)
    let result = itr.next()
    if (result.done) return ret
    const tailElem = this[tailKey]
    let end = tailElem[prevKey]
    
    const token = result.value
    ret.push(token)

    token[prevKey] = end
    end = end[nextKey] = token
    
    
    result = itr.next()
    const pushKey = rev ? "unshift" : "push"
    while(!result.done) {
      const token = result.value
      ret[pushKey](token)
      token[prevKey] = end
      end = end[nextKey] = token
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
    return curTailTok
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
  function forEach(f: (val, token) => void) {
    let cur = this[headKey]
    let curNext = cur[nextKey]
    while (curNext[nextKey]) {
      cur = curNext
      curNext = curNext[nextKey]
      f(cur.value, cur)
    }
  }

  function first() {
    return this[headKey][nextKey]
  }




  return {
    add,
    addBulk,
    pop,
    itr,
    forEach,
    first
  }
}



function attachFuncs(pr: any, forw: ReturnType<typeof pushOrUnshift>, revs: ReturnType<typeof pushOrUnshift>) {
  pr.pushTokenForce = forw.add
  pr.pushTokenBulkForce = forw.addBulk
  pr.unshiftTokenForce = revs.add
  pr.unshiftTokenBulkForce = revs.addBulk
  pr.popToken = forw.pop
  pr.shiftToken = revs.pop
  pr.iterator = pr[Symbol.iterator] = forw.itr
  pr.forEach = forw.forEach
  Object.defineProperty(pr, "firstToken", {get: forw.first, configurable: true})
  Object.defineProperty(pr, "lastToken", {get: revs.first, configurable: true})
}

const forw = pushOrUnshift(true)
const revsInv = pushOrUnshift(true, false)
const revs = pushOrUnshift(false)
const forwInv = pushOrUnshift(false, true)


const pr = _LinkedList.prototype as any
attachFuncs(pr, forw, revs)
pr.forEach = itrToEachFunc("iterator")
pr.pushBulkToken = forcePushBulkToPushTokenBulk("pushTokenBulkForce")
pr.unshiftBulkToken = forcePushBulkToPushTokenBulk("unshiftTokenBulkForce")
pr.pushBulk = forcePushBulkToPushBulk("pushTokenBulkForce")
pr.unshiftBulk = forcePushBulkToPushBulk("unshiftTokenBulkForce")
pr.pop = function() {return this.popToken().value}
pr.shift = function() {return this.shiftToken().value}
pr.push = function(val: any) {return this.pushTokenForce(new Token(val))}
pr.unshift = function(val: any) {return this.unshiftTokenForce(new Token(val))}
pr.pushToken = function(token: Token<any>) {return this.pushTokenForce(token.rm())}
pr.unshiftToken = function(token: Token<any>) {return this.unshiftTokenForce(token.rm())}
Object.defineProperty(pr, "first", {get: function() {return this.firstToken.value}, configurable: true})
Object.defineProperty(pr, "last", {get: function() {return this.lastToken.value}, configurable: true})






function itrToEachFunc(itrKey: string) {
  return function each(cb: Function) {
    const itr = this[itrKey]()
    let result = itr.next();
    while (!result.done) {
      cb(result.value)
      result = itr.next();
    }
  }
}

function forcePushToTokenPush(key: string) {
  return function(token: Token<any>) {
    return this[key](token.rm())
  }
}

function forcePushBulkToPushTokenBulk(key: string) {
  return function(values: Token<any>[] | LinkedList<Token<any>>, reverse?: boolean) {
    for (const tok of values) {
      tok.rm()
    }
    return this[key](values, reverse)
  }
}

function forcePushBulkToPushBulk(key: string) {
  return function(values: any[], reverse?: boolean) {
    return this[key](values.map(val => new Token(val)), reverse)
  }
}






export type LinkedList<T> = _LinkedList<T> & {
  forEach: (cb: (val: T, token: Token<T>) => void) => void,
  pop(): T,
  popToken(): Token<T>,
  shift(): T,
  shiftToken(): Token<T>,

  push: (value: T) => Token<T>,
  pushToken: (value: Token<T>) => Token<T>,
  pushBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>),
  pushTokenBulk: ((values: Token<T>[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<Token<T>>, reverse?: boolean) => LinkedList<Token<T>>),
  
  unshift: (value: T) => Token<T>,
  unshiftToken: (value: Token<T>) => Token<T>,
  unshiftBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>),
  unshiftTokenBulk: ((values: Token<T>[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<Token<T>>, reverse?: boolean) => LinkedList<Token<T>>),
  
  iterator: () => Iterator<T, T, unknown>,
  [Symbol.iterator]: () => Iterator<T, T, unknown>,
  first: T,
  last: T,
  firstToken: Token<T>,
  lastToken: Token<T>
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
  rm() {
    this.remove()
    return this
  }
}
