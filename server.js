import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/post-codealong"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Create model for mongo db
const Person = mongoose.model('Person', {
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500
  }, 
  height: {
    type: Number,
    required: true,
    min: 5
  }, 
  birthdate: {
    type: Date,
    default: Date.now
  }
})

new Person({name: "Peggy", height: 150}).save()

// Defines the port the app will run on. Defaults to 8080.
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('peggy, get to work')
})

app.post('/people', async (req, res) => {
  // // Promises
  // new Person(req.body).save()
  // .then((person) => {
  //   res.status(200).json(person)
  // })
  // .catch((err) => {
  //   res.status(400).json({message:'Could not save person', errors: err.errors})
  // })

  // Try catch form
  try {
    // 200: success

    // const person = new Person(req.body)
    // const savedPerson = await person.save()
    // the two lines above can be shorted 
    const person = await new Person(req.body).save()
    // res.json(savedPerson)
    res.status(200).json(person)
  
  } catch (err) {
    // 400: bad request
    res.status(400).json({message:'Could not save person', errors: err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})