/*eslint-disable no-unused-vars*/
import { useState } from "react"






function App() {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setURL] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      link: url,
    }

    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setURL('')
  }

  const handleTitle = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleURl = (event) => {
    console.log(event.target.value);
    setURL(event.target.value)
  }

  return (
    <div>
      <h1>Save your favorite blogs!</h1>
      <form onSubmit={addBlog}>
        <div>
          Enter Title <input value={blogTitle} onChange={handleTitle}/>
          <br/>
          Enter Author <input value={blogAuthor} onChange={handleAuthor}/>
          <br/>
          Enter URL <input value={url} onChange={handleURl} />
          <br/>
          <button>Submit</button>
        </div>
      </form>
      <h2>Saved Blogs</h2>
      <div>
        {blogs.map((blog, i) => 
          <div key={i}>
            <p>Title: {blog.title}</p>
            <p>Author: {blog.author}</p>
            <p>Link: {blog.link}</p>
            <button>upvote</button>
            <br/>
          </div>
        )}
      </div>
    
    </div>
  )
}

export default App
