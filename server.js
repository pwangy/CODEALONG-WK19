import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoURL = process.env.MONGO_URL || "mongodb://localhost/notes"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true})
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

app.post('/notes', async (req, res => {
  console.log(req.body)
  res.send('Hello')
}))

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
