require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')

mongoose.connect(process.env.TEST_MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB: ', process.env.TEST_MONGODB_URI)
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error)
  })

const blog = new Blog({
  title: 'Test3',
  author: 'Test3',
  link: 'TEST3',
  likes: 0,
})

blog.save().then(() => {
  console.log('blog saved', blog)
  mongoose.connection.close()
})