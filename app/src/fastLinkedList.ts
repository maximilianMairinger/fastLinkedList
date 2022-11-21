const toStringDefault = e => e.toString()

export class End {}

export class Head<T> extends End {
  public next?: Token<T> | Tail<T>
}
export class Tail<T> extends End {
  public prev?: Token<T> | Head<T>
}

class _LinkedList<T> {
  private tail?: Tail<T> = new Tail()
  private head?: Head<T> = new Head()
  private reversed = false

  constructor(ls: LinkedList<T>, reverse: boolean)
  constructor(...initValues: T[])
  constructor(...initValues: any[]) {
    (this.clear() as any).pushBulk(...(initValues[0] instanceof LinkedList ? initValues : [initValues]))
  }

  clear(): this {
    this.head.next = this.tail;
    this.tail.prev = this.head;
    return this
  }


  get empty() {
    return this.head.next === this.tail
  }

  reverse(): this {
    if (this.reversed = !this.reversed) {
      attachPrimitives(this, forwInv, revsInv)
    }
    else {
      attachPrimitives(this, forw, revs)
    }

    return this
  }
  map<W>(cb: (e: T) => W): LinkedList<W> {
    //@ts-ignore 
    const n = new this.constructor();
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
  function each(f: (val, token) => void) {
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
    each,
    first
  }
}




export class Token<T = unknown> {
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
  protected _insertTokenAfter(token: Token<T>) {
    const next = this.next
    this.next = token
    token.prev = this
    token.next = next
    if (next) next.prev = token
  }
  insertAfter(val: T) {
    this._insertTokenAfter(new Token(val))
  }
  insertTokenAfter(token: Token<T>) {
    this._insertTokenAfter(token.rm())
  }

  protected _insertTokenBefore(token: Token<T>) {
    const prev = this.prev
    this.prev = token
    token.next = this
    token.prev = prev
    if (prev) prev.next = token
  }
  insertBefore(val: T) {
    this._insertTokenBefore(new Token(val))
  }
  insertTokenBefore(token: Token<T>) {
    this._insertTokenBefore(token.rm())
  }
  rm() {
    this.remove()
    return this
  }
}

const forcePushBulkToPushBulk = forcePushBulkToPushBulkWithToken(Token)
function forcePushBulkToPushBulkWithToken(Tok: {new<T>(val: T, that?: any): Token<T>}) {
  return function forcePushBulkToPushBulk(funcKey: string) {
    return function(values: any[], reverse?: boolean) {
      return this[funcKey](values.map(val => new Tok(val, this)), reverse)
    }
  }
}

function attachPrimitives(pr: any, forw: ReturnType<typeof pushOrUnshift>, revs: ReturnType<typeof pushOrUnshift>) {
  pr.pushTokenForce = forw.add
  pr.pushTokenBulkForce = forw.addBulk
  pr.unshiftTokenForce = revs.add
  pr.unshiftTokenBulkForce = revs.addBulk
  pr.popToken = forw.pop
  pr.shiftToken = revs.pop
  pr.iterator = pr[Symbol.iterator] = forw.itr
  pr.forEach = forw.each
  Object.defineProperty(pr, "firstToken", {get: forw.first, configurable: true})
  Object.defineProperty(pr, "lastToken", {get: revs.first, configurable: true})
}

const forw = pushOrUnshift(true)
const revsInv = pushOrUnshift(true, false)
const revs = pushOrUnshift(false)
const forwInv = pushOrUnshift(false, true)


const pr = _LinkedList.prototype as any
attachPrimitives(pr, forw, revs)
pr.pushTokenBulk = forcePushBulkToPushTokenBulk("pushTokenBulkForce")
pr.unshiftTokenBulk = forcePushBulkToPushTokenBulk("unshiftTokenBulkForce")
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



function forcePushBulkToPushTokenBulk(key: string) {
  return function(values: Token<any>[] | LinkedList<Token<any>>, reverse?: boolean) {
    for (const tok of values) {
      tok.rm()
    }
    return this[key](values, reverse)
  }
}




declare class __LinkedListType<T> extends _LinkedList<T> {
  protected pushTokenForce(token: Token<T>): Token<T>
  protected pushTokenBulkForce(tokens: Token<T>[], reverse?: boolean): Token<T>
  protected unshiftTokenForce(token: Token<T>): Token<T>
  protected unshiftTokenBulkForce(tokens: Token<T>[], reverse?: boolean): Token<T>

  forEach: (cb: (val: T, token: Token<T>) => void) => void
  pop(): T
  popToken(): Token<T>
  shift(): T
  shiftToken(): Token<T>

  push: (value: T) => Token<T>
  pushToken: (value: Token<T>) => Token<T>
  pushBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>)
  pushTokenBulk: ((values: Token<T>[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<Token<T>>, reverse?: boolean) => LinkedList<Token<T>>)
  
  unshift: (value: T) => Token<T>
  unshiftToken: (value: Token<T>) => Token<T>
  unshiftBulk: ((values: T[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<Token<T>>)
  unshiftTokenBulk: ((values: Token<T>[], reverseValues?: boolean) => Token<T>[]) & ((values: LinkedList<Token<T>>, reverse?: boolean) => LinkedList<Token<T>>)
  
  iterator: () => Iterator<T, T, unknown>
  [Symbol.iterator]: () => Iterator<T, T, unknown>
  first: T
  last: T
  firstToken: Token<T>
  lastToken: Token<T>
}

export type LinkedList<T = unknown> = __LinkedListType<T>

export const LinkedList = _LinkedList as {
  new<T>(ls: LinkedList<T>): LinkedList<T>
  new<T>(...initValues: T[]): LinkedList<T>
}
export default LinkedList






class _LengthLinkedList<T> extends LinkedList<T> {
  private _length: number // will initially be set in super constructor in clear call
  get length() {return this._length}

  constructor(ls: LengthLinkedList<T>, revers?: boolean)
  constructor(...initValues: T[])
  constructor(...initValues: T[]) {
    super(...initValues)
  }
  clear() {
    this._length = 0
    return super.clear()
  }
  reverse() {
    const r = super.reverse()
    attachLengthProxyToPrimitives(this)
    return r
  }
}

const prL = _LengthLinkedList.prototype as any
attachLengthProxyToPrimitives(prL)
function attachLengthProxyToPrimitives(prL: any) {
  for (const funcName of ["unshiftTokenBulkForce", "pushTokenBulkForce"]) {
    const f = prL[funcName]
    prL[funcName] = function(...a) {
      this._length += a[0].length
      return f.apply(this, a)
    }
  }
  
  for (const funcName of ["unshiftTokenForce", "pushTokenForce"]) {
    const f = prL[funcName]
    prL[funcName] = function(...a) {
      this._length++
      return f.apply(this, a)
    }
  }
  
  for (const funcName of ["popToken", "shiftToken"]) {
    const f = prL[funcName]
    prL[funcName] = function(...a) {
      this._length--
      return f.apply(this, a)
    }
  }
}

declare class __LengthLinkedListType<T = unknown> extends _LengthLinkedList<T> {
  protected pushTokenForce(token: LengthToken<T>): LengthToken<T>
  protected pushTokenBulkForce(tokens: LengthToken<T>[], reverse?: boolean): LengthToken<T>
  protected unshiftTokenForce(token: LengthToken<T>): LengthToken<T>
  protected unshiftTokenBulkForce(tokens: LengthToken<T>[], reverse?: boolean): LengthToken<T>

  forEach: (cb: (val: T, token: LengthToken<T>) => void) => void
  pop(): T
  popToken(): LengthToken<T>
  shift(): T
  shiftToken(): LengthToken<T>

  push: (value: T) => LengthToken<T>
  pushToken: (value: LengthToken<T>) => LengthToken<T>
  pushBulk: ((values: T[], reverseValues?: boolean) => LengthToken<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<LengthToken<T>>)
  pushTokenBulk: ((values: LengthToken<T>[], reverseValues?: boolean) => LengthToken<T>[]) & ((values: LinkedList<LengthToken<T>>, reverse?: boolean) => LinkedList<LengthToken<T>>)
  
  unshift: (value: T) => LengthToken<T>
  unshiftToken: (value: LengthToken<T>) => LengthToken<T>
  unshiftBulk: ((values: T[], reverseValues?: boolean) => LengthToken<T>[]) & ((values: LinkedList<T>, reverse?: boolean) => LinkedList<LengthToken<T>>)
  unshiftTokenBulk: ((values: LengthToken<T>[], reverseValues?: boolean) => LengthToken<T>[]) & ((values: LinkedList<LengthToken<T>>, reverse?: boolean) => LinkedList<LengthToken<T>>)
  
  iterator: () => Iterator<T, T, unknown>
  [Symbol.iterator]: () => Iterator<T, T, unknown>
  first: T
  last: T
  firstToken: LengthToken<T>
  lastToken: LengthToken<T>
}

export type LengthLinkedList<T = unknown> = __LengthLinkedListType<T>


export const LengthLinkedList = _LengthLinkedList as {
  new<T>(ls: LinkedList<T>): LengthLinkedList<T>
  new<T>(...initValues: T[]): LengthLinkedList<T>
}

export class LengthToken<T = unknown> extends Token<T> {
  constructor(val: T, protected that: LinkedList<T>) {
    super(val);
  }
  insertAfter(val: T) {
    this._insertTokenAfter(new LengthToken(val, this.that))
  }
  insertBefore(val: T) {
    this._insertTokenBefore(new LengthToken(val, this.that))
  }
  protected _insertTokenBefore(token: LengthToken<T>) {
    (this.that as any)._length++
    return super._insertTokenBefore(token)
  }
  protected _insertTokenAfter(token: LengthToken<T>): void {
    (this.that as any)._length++
    return super._insertTokenBefore(token)
  }
  remove() {
    const r = super.remove()
    if (r) (this.that as any)._length--
    return r
  }
}


prL.push = function(val: any) {return this.pushTokenForce(new LengthToken(val, this))}
prL.unshift = function(val: any) {return this.unshiftTokenForce(new LengthToken(val, this))}

const forcePushBulkToPushBulkLength = forcePushBulkToPushBulkWithToken(LengthToken as any)
prL.pushBulk = forcePushBulkToPushBulkLength("pushTokenBulkForce")
prL.unshiftBulk = forcePushBulkToPushBulkLength("unshiftTokenBulkForce")

