const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/info', async (request, response) => {
  const blogCount = await Blog.countDocuments({})
  response.send(`
      <h1>Blog Backend</h1>
      <p>This blog contains ${blogCount} blogs so far</p>
    `)
})

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog){
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.likes = blog.likes + 1

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    link: body.link,
    id: body.id,
    likes: 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter