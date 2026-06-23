const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./testHelper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('id test', () => {
  test('identifier of blogs posts are named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual('id' in blogs[0], true)
  })
})

describe('POST test' , () => {
  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'Deep Dive into Blockchain and Decentralized Finance',
      author: 'Kenji Takahashi',
      link: 'https://www.cryptofocus.net/defi/deep-dive-blockchain-finance/',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsinDB()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('Deep Dive into Blockchain and Decentralized Finance'))
  })
})

describe('Likes test', () => {
  test('if likes is missing, its set to 0', async () => {
    const newBlog = {
      title: 'Deep Dive into Blockchain and Decentralized Finance',
      author: 'Kenji Takahashi',
      link: 'https://www.cryptofocus.net/defi/deep-dive-blockchain-finance/',
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsinDB()
    const lastBlog = blogsAtEnd[2]
    assert.strictEqual(lastBlog.likes, 0)
  })
})

describe('400 Bad request', () => {
  test('if title or url is missing, responds with status code 400', async () => {
    const newBlog = {
      link: 'https://www.cryptofocus.net/defi/deep-dive-blockchain-finance/'
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const newBlog2 = {
      title: 'Deep Dive into Blockchain and Decentralized Finance'
    }

    await api.post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })
})


after(async () => {
  await mongoose.connection.close()
})