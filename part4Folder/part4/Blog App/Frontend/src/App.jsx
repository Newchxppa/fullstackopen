import { useState } from "react"
import BlogForm from "./components/BlogForm"
import DisplayBlogs from "./components/DisplayBlogs"
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [votes, setVotes] = useState([])


  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      link: url,
    }
    setVotes(votes.concat(0))
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setURL('')
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

  const upvoteBlog = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
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
