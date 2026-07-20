const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { usersExtractor } = require('../utils/middleware')

blogRouter.get('/info', async (request, response) => {
  const blogCount = await Blog.countDocuments({})
  response.send(`
      <h1>Blog Backend</h1>
      <p>This blog contains ${blogCount} blogs so far</p>
    `)
})

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
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

blogRouter.post('/', usersExtractor ,async (request, response) => {
  const body = request.body
  const user = request.user

  if(!user){
    return response.status(401).json({
      error: 'userId missing or not valid'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    link: body.link,
    id: body.id,
    likes: body.likes ||  0,
    user: user._id
  })

  const savedBlog = await blog.save()
  const populateBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(populateBlog._id)
  await user.save()

  response.status(201).json(populateBlog)
})

blogRouter.delete('/:id', usersExtractor, async (request, response) => {
  const user = request.user
  if(!user){
    return response.status(401).json({
      error: 'userId missing or not valid'
    })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter