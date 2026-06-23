const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How Renewable Energy is Shaping Future Cities',
    author: 'Marcus Vance',
    link: 'https://www.ecotimes.com/articles/2026/03/renewable-energy-future-cities/',
  },
  {
    title: 'Understanding the Basics of Quantum Computing',
    author: 'Elena Rostova',
    link: 'https://www.techjournal.org/stories/2026/01/basics-of-quantum-computing/',
  }
]

const nonExistingID = async () => {
  const blog = new Blog({
    title: 'will delete',
    author: 'will delete',
    link:'willdelete.com'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsinDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { nonExistingID, initialBlogs, blogsinDB }
