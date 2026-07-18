import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addForm = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      link: url
    })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div className="form-Div">
      <h3>Create a new blog</h3>
      <form className="blog-Form" onSubmit={addForm}>

        <div className="input-Div">
          Enter Title <input className="title-Input" value={blogTitle} placeholder='Write title here' onChange={event => setTitle(event.target.value)} />
        </div>

        <div className="input-Div">
          Enter Author <input className="author-Input" value={blogAuthor} placeholder='Write author here' onChange={event => setAuthor(event.target.value)} />
        </div>

        <div className="input-Div">
          Enter URL <input className="url-Input" value={url} placeholder='Write link here' onChange={event => setURL(event.target.value)} />
        </div>

        <button className="form-Submit-Button">Submit</button>
      </form>
    </div>
  )
}

export default BlogForm