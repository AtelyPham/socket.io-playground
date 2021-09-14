import { TimerType, TimerClass } from "./class"
import express from "express"
import { v4 } from "uuid"

let intervalObj: TimerType = {}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send(`
    <form action="/send-text" method="post">
      <input type="text" name="text" required/>
      <button>Submit</button>
    </form>
  `)
})

app.post("/change-text", (req, res) => {
  const { token, text } = req.body
  const selectedObj = intervalObj[token]
  selectedObj.setMessage(text)

  res.send({ msg: "Okk!" })
})

app.post("/send-text", (req, res) => {
  const { text, count, delay } = req.body
  const newTimer = new TimerClass(text, count, delay)
  const timerId = v4()

  intervalObj[timerId] = newTimer
  res.status(200).send({ msg: "Ok!", token: timerId })
})

const PORT = process.env.PORT || 1717
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
