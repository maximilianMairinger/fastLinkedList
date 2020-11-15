class Link<T> {
  constructor(public val: T, public next?: Link<T>) {

  }

  remove() {
    this.val = this.next.val
    this.next = this.next.next
  }

  valueof() {
    return this.val
  }
}





export class LinkedList<T> implements Iterable<T> {
  private head: Link<T>
  constructor(items: T[] | LinkedList<T> = []) {
    const preHead = {} as {next?: any}
    let cur: Link<T> = preHead as any
    for (let item of items) {
      cur.next = cur = new Link(item)
    }
    this.head = preHead.next
  }
  
  each(cb: (elem: T) => void) {
    
  }

  protected get [0]() {
    return this.head
  }
  first() {
    return this.head.val
  }

  length() {
    let count = 0
    this
    return count
  }

  *[Symbol.iterator](): Iterator<T, any, unknown> {
    let i = 0
    while(i< 10) {
      i++
      yield i as any
    }
  }
}



console.log("qwe")
let e = new LinkedList([2, 3, 4, 5])
console.log(e)

export default LinkedList
