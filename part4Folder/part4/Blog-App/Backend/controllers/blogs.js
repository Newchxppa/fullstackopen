const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/info', (request, response) => {
  Blog.countDocuments({}).then(result => {
    response.send(`
      <h1>Blog Backend</h1>
      <p>This blog contains ${result} blogs so far</p>
    `)
  })
})

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blog => {
      response.json(blog)
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

blogRouter.get('/:id', (request, response, next) => {
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

blogRouter.put('/:id', (request, response, next) => {
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

blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    link: body.link,
    id: body.id,
    likes: 0,
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = blogRouter