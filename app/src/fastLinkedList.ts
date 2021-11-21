export class LinkedList<T> {
  public tail?: Token<T>
  public head?: Token<T>
  public length = 0
  constructor(...initValues: T[]) {
    for (let value of initValues) {
      this.push(value)
    }
  }
  push(value: T | Token<T>) {
    const token = value instanceof Token ? (() => {
      value.remove()
      return value
    })() : new Token(value)

    this.length++
    
    const tail = this.tail
    if (tail) {
      token.prev = tail
      if (tail.prev) tail.prev.next = token
    }
    return this.tail = token
  }
  pop() {
    if (this.tail) {
      this.length--
      const curTail = this.tail
      delete curTail.prev.next
      this.tail = curTail.prev
      delete curTail.prev
      return curTail.value
    }
  }
  unshift(value: T | Token<T>) {
    const token = value instanceof Token ? (() => {
      value.remove()
      return value
    })() : new Token(value)

    this.length++

    const head = this.head
    if (head) {
      token.next = head
      if (head.next) head.next.prev = token
    }
    return this.head = token
  }
  shift() {
    if (this.head) {
      this.length--
      const curHead = this.head
      delete curHead.next.prev
      this.head = curHead.next
      delete curHead.next
      return curHead.value
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
  get first() {
    return this.head.value
  }
  get last() {
    return this.tail.value
  }
  iterator?(): Iterator<T, T, unknown>;
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
