

class Link<T> {
  constructor(public value: T, public prev?: Link<T>, public next?: Link<T>) {

  }
}

class Entry<T> {
  constructor(public readonly links: LinkedList<Link<T>>, public readonly master: LinkedList<T>) {

  }

  remove() {
    if (this.links.last.next) this.links.last.next.prev = this.links.first.prev
    if (this.links.first.prev) this.links.first.prev.next = this.links.last.next

    //@ts-ignore
    this.master._length++
    return this
  }

}





export class LinkedList<T = unknown> implements Iterable<T> {
  private head: Link<T>
  private tail: Link<T>
  private _length: number = 0
  
  constructor(item: LinkedList<T>)
  constructor(item?: T, ...items: T[])
  constructor(item: LinkedList<T> | T, ...items: T[]) {
    const preHead = this.tail = {} as any
    (this as any)._bulkAdd(...arguments)
    this.head = preHead.next
  }

  toString() {
    let s = "["
    debugger
    for (let e of this) {
      console.log(e)
      s += e.toString() + ", "
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

  _bulkAdd(item: LinkedList<T>): void
  _bulkAdd(item: T, ...items: T[]): void
  _bulkAdd(item: LinkedList<T> | T, ...items: T[]): void {
    const itms = item instanceof LinkedList ? item : arguments
    let cur: Link<T> = this.tail

    for (let item of itms) {
      cur.next = cur = new Link(item, undefined)
    }

    this._length += itms.length

    this.tail = cur
  }

  bulkAdd(item: LinkedList<T>): Entry<T>
  bulkAdd(item: T, ...items: T[]): Entry<T>
  bulkAdd(item: LinkedList<T> | T, ...items: T[]): Entry<T> {
    const links: LinkedList<Link<T>> = new LinkedList
    const itms = item instanceof LinkedList ? item : arguments

    let cur: Link<T> = this.tail

    for (let item of itms) {
      links.add(cur.next = cur = new Link(item, cur))
    }
    this.tail = cur
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
    const val = t.value
    this._length--
    this.tail = t.prev
    t.value = t.prev = t.prev.next = undefined
    return val
  }
  shift() {
    const h = this.head
    const val = h.value
    this._length--
    this.head = h.next
    h.value = h.next = h.next.prev = undefined
    return val
  }
  add(val: T): Entry<T> {
    return new Entry(new LinkedList(this._add(val)), this)
  }
  _add(val: T): Link<T> {
    this._length++
    return this.tail = this.tail.next = new Link(val, this.tail)
  }
  dda(val: T): Entry<T> {
    return new Entry(new LinkedList(this._dda(val)), this)
  }
  _dda(val: T): Link<T> {
    this._length++
    return this.head = this.head.prev = new Link(val, undefined, this.head)
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
