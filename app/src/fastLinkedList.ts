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
  constructor(items: T[] | LinkedList<T> = []) {
    const preHead = {} as {next?: any}
    let preCur: Link<T>
    let cur: Link<T> = preHead as any
    for (let item of items) {
      preCur = cur
      cur.next = cur = new Link(item)
    }
    this.head = preHead.next
    cur.next = preCur
  }
  
  each(cb: (el: T) => void) {
    for (const el of this) {
      cb(el)
    }
  }

  protected get [0]() {
    return this.head
  }
  first() {
    return this.head.val
  }

  length() {
    let count = 0
    for (const e of this) {
      console.log(e)
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



console.log("qwe")
//@ts-ignore
let e = window.e = new LinkedList([2, 3, 4, 5])
console.log(e)

export default LinkedList
