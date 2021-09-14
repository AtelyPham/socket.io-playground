export interface TimerInterface {
  intervalId: NodeJS.Timer
  count: number
  maxCount: number
  message: string
  setMessage(msg: string): void
}

export type TimerType = {
  [key: string]: TimerInterface
}

export class TimerClass implements TimerInterface {
  intervalId: NodeJS.Timer
  message: string
  count: number
  maxCount: number
  constructor(message: string, count: number = 10, delay: number = 500) {
    this.message = message
    this.count = 1
    this.maxCount = count
    this.intervalId = setInterval(() => {
      console.log(`${this.count} => ${this.message}`)
      if (this.count === this.maxCount) {
        clearInterval(this.intervalId)
      }
      this.count += 1
    }, delay)
  }

  setMessage(msg: string) {
    this.message = msg
  }
}
