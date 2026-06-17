const express = require('express')
const app = express()
//HAVE TO INCLUDE THIS MIDDLEWARE IN ORDER TO CREATE POST REQUESTS
app.use(express.json())
app.use(express.static('dist'))

let blogs =  [
    {
      "title": "The Art of Minimalist Code",
      "author": "Elena Rostova",
      "link": "https://dev-bytes.io/blog/art-of-minimalist-code",
      "likes": 1,
      "id": "LDuxj2MzVnI"
    },
    {
      "title": "State Management in 2026: Beyond the Hype",
      "author": "Marcus Vance",
      "link": "https://techstack-chronicles.com/state-management-2026",
      "likes": 0,
      "id": "3xna83n0cTw"
    },
    {
      "title": "7 ways AI is transforming healthcare",
      "author": "Madeleine North",
      "link": "https://www.weforum.org/stories/2025/08/ai-transforming-global-health/",
      "likes": 0,
      "id": "J6HT0lou5UI"
    }
]

app.get('/', (request, response) => {
  const blogAmount = blogs.length
  response.send(`
    <h1>Blog Backend</h1>
    <p>This blog contains ${blogAmount} blogs so far</p>
    `)
})

app.get('/api/blogs', (request, response) => {
  response.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
  const iD = request.params.id
  const blog = blogs.find(blog => blog.id === iD)
  if(blog)
    response.json(blog)
  else{
    response.status(404).end()
  }
})

app.put('/api/blogs/:id', (request, response) => {
  const  id  = request.params.id;
  const foundBlog = blogs.find(blog => blog.id === id)
  if(foundBlog){
    foundBlog.likes += 1;
    response.json(foundBlog)
  }
  else{
    console.log('Blog not found');
    response.status(404).end()
  }
}) 

function generateID() {
  const randNum = Math.random(999999999);
  return String(randNum);
}

app.post('/api/blogs', (request, response) => {
  const body = request.body
  console.log(body);

  if(!body.title || !body.author || !body.link){
    return response.status(400).json({ error: 'Please provide all details!'} )
  }

  let updatedBlog = { ...body, id: generateID()}
  blogs = blogs.concat(updatedBlog)
  response.json(updatedBlog) 
})




const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
