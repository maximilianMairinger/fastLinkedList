class Link<T> {
  constructor(public val: T, public next?: Link<T>) {

  }

  remove() {
    const next = this.next
    this.next = undefined
    this.val = next.val
    this.next = next.next
  }

  valueof() {
    return this.val
  }
}





export class LinkedList<T> implements Iterable<T> {
  private head: Link<T>
  private tail: Link<T>
  constructor(items: T[] | LinkedList<T> = []) {
    const preHead = this.tail = {} as any
    this.bulkAdd(items)
    this.head = preHead.next
  }
  
  each(cb: (el: T) => void) {
    for (const el of this) {
      cb(el)
    }
  }

  bulkAdd(items: T[] | LinkedList<T> = []) {
    let preCur: Link<T>
    let cur: Link<T> = this.tail
    for (let item of items) {
      preCur = cur
      cur.next = cur = new Link(item)
    }
    this.tail = cur
    cur.next = preCur
  }
  add(val: T) {
    this.tail.next = new Link(val, this.tail)
  }

  first() {
    return this.head.val
  }
  last() {
    return this.tail.val
  }

  length() {
    let count = 0
    for (const e of this) {
      count++
    }
    return count
  }

  *[Symbol.iterator](): Iterator<T, any, unknown> {
    if (this.head) {
      let cur = this.head
      yield cur.val
      while(cur.next.next !== cur) {
        cur = cur.next
        yield cur.val
      }
      yield cur.next.val
    }
    
  }
}



//@ts-ignore
let e = window.e = new LinkedList([2, 3, 4, 5])
console.log(e)

export default LinkedList
