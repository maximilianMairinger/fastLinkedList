

class Link<T> {
  constructor(public value: T, public prev?: Link<T>, public next?: Link<T>) {

  }
  setPrev(l: Link<T>) {
    this.prev.next = l
  }
  setNext(l: Link<T>) {
    this.next.prev = l
  }

  // lastify(onSetNext: (l: Link<T>) => void) {
  //   this.setNext = onSetNext
  // }
  // deLastify() {
  //   delete this.setNext
  // }
  // firstify(onSetPrev: (l: Link<T>) => void) {
  //   this.setPrev = onSetPrev
  // }
  // deFirstify() {
  //   delete this.setPrev
  // }
}

class Entry<T> {
  constructor(private readonly links: LinkedList<Link<T>>, private readonly master: LinkedList<T>) {

  }

  remove() {
    const first = this.links.first
    const last = this.links.last;

    (this.master as any)._length -= this.links.length 
    
    first.setPrev(last.next);
    last.setNext(first.prev);
    

    
    return this
  }

}

function proxy<Ob extends {[key in string]: any}, F extends keyof Ob>(ob: Ob, funcProps: F[], preProxy: Function, postProxy: Function) {
  for (let prop of funcProps) {
    const base = ob[prop].bind(ob)
    ob[prop] = ((...a) => {
      preProxy(...a)
      base(...a)
      postProxy(...a)
    }) as any
  }
  return function remove() {
    for (let prop of funcProps) {
      delete ob[prop]
    }
  }
}


const toStringDefault = e => e.toString()
export class LinkedList<T = unknown> implements Iterable<T> {
  private head: Link<T>
  private tail: Link<T>
  private _length: number = 0
  private removeLastOverride: (e: Link<T>) => void;
  private removeFirstOverride: (e: Link<T>) => void;
  
  constructor(item: LinkedList<T>)
  constructor(item?: T, ...items: T[])
  constructor(item: LinkedList<T> | T, ...items: T[]) {
    const removeLastOverride = this.removeLastOverride = (e: Link<T>) => {
      this.tail = e
      e.setNext = this.removeLastOverride
    }

    const isEmptyProxy = () => {
      const preOb: any = {};
      const removeAdd = (() => {
        const preProxy = () => {
          this.tail = preOb
        }
        const postProxy = () => {
          if (this.head = preOb.next) {
            this.head.setPrev = this.removeFirstOverride
            remove()
          }
        }
        return proxy(this, ["_addBulk", "addBulk", "_add"], preProxy, postProxy)
      })();
      
      const removeDda = (() => {
        const preProxy = () => {
          this.head = preOb
        }
        const postProxy = () => {
          if (this.tail = preOb.prev) {
            this.tail.setNext = this.removeLastOverride
            remove()
          }
        }
        return proxy(this, ["_dda"], preProxy, postProxy)
      })();

      const remove = () => {
        removeAdd()
        removeDda()
      }
    }

    const removeFirstOverride = this.removeFirstOverride = (e: Link<T>) => {
      this.head = e
      e.setPrev = this.removeFirstOverride
    }
    
    const firstPPP = this.removeFirstOverride = (e: Link<T>) => {
      if (this.empty) isEmptyProxy()
      else {
        (this.removeFirstOverride = removeFirstOverride)(e)
        this.removeLastOverride = lastPPP
      }
    }

    const lastPPP = (e: Link<T>) => {
      if (this.empty) isEmptyProxy();
      else {
        (this.removeLastOverride = removeLastOverride)(e)
        this.removeFirstOverride = firstPPP
      }
    }
    isEmptyProxy();
    (this as any)._addBulk(...arguments)
  }

  toString(methodForEntries: (s: T) => string = toStringDefault) {
    let s = "["
    for (let e of this) {
      s += methodForEntries(e) + ", "
    }
    return s.substring(0, s.length-2) + "]"
  }
  
  each(cb: (el: T, i: number) => void) {
    let i = 0
    for (const el of this) {
      cb(el, i)
      i++
    }
    return this
  }

  from

  _addBulk(item: LinkedList<T>): void
  _addBulk(item: T, ...items: T[]): void
  _addBulk(item: LinkedList<T> | T, ...items: T[]): void {
    const itms = item instanceof LinkedList ? item : arguments
    let cur: Link<T> = this.tail
    delete cur.setNext

    for (let item of itms) {
      cur.next = cur = new Link(item, cur)
    }

    this._length += itms.length
    cur.setNext = this.removeLastOverride
    this.tail = cur
  }

  addBulk(item: LinkedList<T>): Entry<T>
  addBulk(item: T, ...items: T[]): Entry<T>
  addBulk(item: LinkedList<T> | T, ...items: T[]): Entry<T> {
    const links: LinkedList<Link<T>> = new LinkedList
    const itms = item instanceof LinkedList ? item : arguments

    let cur: Link<T> = this.tail
    delete cur.setNext

    for (let item of itms) {
      links.add(cur.next = cur = new Link(item, cur))
    }
    this.tail = cur
    cur.setNext = this.removeLastOverride

    this._length += itms.length

    return new Entry(links, this)
  }
  call(...params: Parameters<T extends (...a: any) => void ? T : never>) {
    for (let f of this) {
      (f as any)(...params)
    }
    return this
  }
  clear() {
    this.tail = this.head = undefined
    this._length = 0
    return this
  }
  set empty(to: boolean) {
    if (to) this.length = 0
  }
  get empty() {
    return this._length === 0
  }
  pop() {
    const t = this.tail
    this._length--
    t.setNext(t.prev)
    return t.value
  }
  shift() {
    const h = this.head
    this._length--
    h.setPrev(h.next)
    return h.value
  }
  add(val: T): Entry<T> {
    return new Entry(new LinkedList(this._add(val)), this)
  }
  _add(val: T): Link<T> {
    this._length++
    delete this.tail.setNext
    this.tail = this.tail.next = new Link(val, this.tail)
    this.tail.setNext = this.removeLastOverride
    return this.tail
  }
  dda(val: T): Entry<T> {
    return new Entry(new LinkedList(this._dda(val)), this)
  }
  _dda(val: T): Link<T> {
    this._length++
    delete this.tail.setPrev
    this.head = this.head.prev = new Link(val, undefined, this.head)
    this.head.setPrev = this.removeFirstOverride
    return this.head
  }
  eachRev(cb: (value: T, index: number) => void) {
    if (this.tail) {
      let i = 0
      let cur = this.tail
      while (cur.prev) {
        cb(cur.value, i)
        cur = cur.prev
        i++
      } 
      cb(cur.value, i)
    }
    return this
  }
  reverse() {
    const n = new LinkedList()
    for (let e of this) {
      n._dda(e)
    }
    return n
  }

  set first(to: T) {
    this.head.value = to
  }
  set last(to: T) {
    this.tail.value = to
  }


  get first() {
    return this.head.value
  }
  get last() {
    return this.tail.value
  }

  get length() {
    return this._length
  }
  set length(to: number) {
    this.length = Math.round(to)
    
    let i = 1

    this.eachLink((link) => {
      if (i >= to) {
        link.prev = link.prev.next = undefined
        return true
      }
      i++
    })
    
    for (; i < to; i++) {
      this.add(undefined)
    }
  }

  map<NewT>(mapper: (val: T) => NewT): LinkedList<NewT> {
    const n = new LinkedList(this)
    n.eachLink((link) => {
      link.value = mapper(link.value) as any
    })
    return n as any
  }

  private eachLink(cb: (link: Link<T>) => boolean | void) {
    if (this.head) {
      let cur = this.head
      while (cur.next) {
        if (cb(cur)) return
        cur = cur.next
      } 
      cb(cur)
    }
  }



  *[Symbol.iterator](): Iterator<T, T, any> {
    if (this.head) {
      let cur = this.head
      while (cur.next) {
        yield cur.value
        cur = cur.next
      } 
      yield cur.value
      return cur.value
    }
  }
  iterator?(): Iterator<T, T, unknown>;
}


LinkedList.prototype.iterator = LinkedList.prototype[Symbol.iterator]

export default LinkedList
