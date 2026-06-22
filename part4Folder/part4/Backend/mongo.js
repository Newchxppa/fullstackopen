require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./models/note')

mongoose.connect(process.env.TEST_MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB:', process.env.TEST_MONGODB_URI)
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error)
  })

const note = new Note({
  content: 'Test Upload 2',
  important: true
})


note.save().then(() => {
  console.log('note saved')
  mongoose.connection.close()
})

