import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/notes"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const Note = mongoose.model('Note', {
  text: String, 
  createdAt: {
    type: Date, 
    default: () => new Date()
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/notes', async (req, res) => {
  const note = new Note({ text: req.body.text })
  // if you have many lines as 35 you may destructure like this:
  // const { text } = req.body
  // const note = new Note({ text })
  await note.save()
  res.json(note)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})