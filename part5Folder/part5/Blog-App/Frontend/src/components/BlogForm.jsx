import { Box, Button, TextField } from '@mui/material'
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
        <Box>
          <div className="input-Div">
            <TextField sx={{ width: '35ch', marginBottom: 1  }} size='small' id='outlined-basic' label="Enter title" variant='outlined' value={blogTitle} onChange={event => setTitle(event.target.value)} />
          </div>

          <div className="input-Div">
            <TextField sx={{ width: '35ch', marginBottom: 1 }} size='small' id='outlined-basic' label="Enter author" variant='outlined' value={blogAuthor} onChange={event => setAuthor(event.target.value)} />
          </div>

          <div className="input-Div">
            <TextField sx={{ width: '35ch', marginBottom: 1 }} size='small' id='outlined-basic' label="Enter link" variant='outlined' value={url} onChange={event => setURL(event.target.value)} />
          </div>
        </Box>
        <Button variant='contained' type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default BlogForm