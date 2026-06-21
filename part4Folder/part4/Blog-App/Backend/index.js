require('dotenv').config()
const express = require('express')
const app = express()
const Blog = require('./models/blog')

app.use(express.json())
app.use(express.static('dist'))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
} 

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:   ', request.path)
  console.log('Body:   ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


app.get('/info', (request, response) => {
  const blogAmount = Blog.countDocuments({}).then(result => {
    response.send(`
    <h1>Blog Backend</h1>
    <p>This blog contains ${result} blogs so far</p>
    `)
  })
  
})

app.get('/api/blogs', (request, response) => {
  Blog.find({})
    .then(blog => {
      response.json(blog)   
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      }
      else{
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      blog.likes = blog.likes + 1

      return blog.save().then(updatedBlog => {
        response.json(updatedBlog)
      })
    })
    .catch(error => {
      next(error)
    })
}) 


app.post('/api/blogs', (request, response) => {
  const body = request.body

  if(!body.title || !body.author || !body.link){
    return response.status(400).json({ error: 'Please provide all details!'} )
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    link: body.link,
    id: body.id,
    likes: 0,
  })

  blog.save().then(savedBlog => {
    response.json(savedBlog)
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
