import { useState, useEffect } from "react"
import BlogForm from "./components/BlogForm"
import DisplayBlogs from "./components/DisplayBlogs"
import blogService from './services/blogs.js'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [votes, setVotes] = useState([])


  useEffect(() => {
    blogService.getAll()
    .then((response) => {
      const data = Array(response.length).fill(0)
      response.map((blog, i) => {
        data[i] = blog.likes
      })
      setVotes(data)
      setBlogs(response)
    })
    .catch(error => {
      console.log(error);
    })
  }, [])


  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      link: url,
      likes: 0,
    }
    blogService.create(newBlog)
      .then(blog => {
        setVotes(votes.concat(0))
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setURL('')
      })
    
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleURl = (event) => {
    setURL(event.target.value)
  }

  const upvoteBlog = (index, blog) => {
    
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)

    const updatedBlog = {...blog, likes: copy[index]}
    console.log(updatedBlog);
    blogService.update(blog.id, updatedBlog)
      .then(response => {
        setBlogs(blogs.map(item => (item.id === blog.id ? response : item)))
      })

  }

  return (
    <div>
      <h1 className="app-Title">Blog Saver</h1>
      <h3 className="app-SubTitle">Save your favorite blogs!</h3>

      <BlogForm formSubmit={addBlog} blogTitle={blogTitle} handleTitle={handleTitle} blogAuthor={blogAuthor} handleAuthor={handleAuthor} blogUrl={url} handleUrl={handleURl} />
      <h2>Saved Blogs</h2>
      
      <DisplayBlogs blogs={blogs} upVoteBlog={upvoteBlog} votes={votes} />
    
    </div>
  )
}

export default App
