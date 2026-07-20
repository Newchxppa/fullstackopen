/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog.jsx'
import DisplayBlogs from './components/DisplayBlogs'
import blogService from './services/blogs.js'
import './App.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

function App() {
  const [blogs, setBlogs] = useState([])
  const [votes, setVotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll()
      .then((response) => {
        const data = new Array(response.length)
        response.map((blog, i) => {
          data[i]= { likes: blog.likes, id: blog.id }
        })
        setVotes(data)
        setBlogs(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogAppUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(blog => {
        setNotification({ text: `${blogObject.title} by ${blogObject.author} has been added`, type: 'success' })
        navigate('/')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setVotes(votes.concat({ likes: blog.likes, id: blog.id }))
        setBlogs(blogs.concat(blog))
      })
  }

  const upvoteBlog = (blog) => {
    let copy = [...votes]
    copy = copy.map((item) => {
      if(item.id === blog.id){
        return { ...item, likes: item.likes + 1 }
      }
      return item
    })

    setVotes(copy)

    const updatedBlog = copy.find(item => item.id === blog.id)
    blogService.update(blog.id, updatedBlog)
      .then(response => {
        setBlogs(blogs.map(item => (item.id === blog.id ? response : item)))
      })
  }

  const displayBlogLikes = (id) => {
    let like = blogs.find((blog) => {
      return blog.id === id
    })
    return like.likes
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    }
    catch{
      setNotification({ text: 'wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('blogAppUser')
      navigate('/')
      location.reload()
    }
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Are you sure you want to delete: '${blog.title}' by ${blog.author}?`)){
      blogService.deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs =>
            blogs.filter(item => item.id !== blog.id)
          )
        })
      navigate('/')
    }

  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const style = { '&:hover': { bgcolor: 'rgba(162, 212, 224, 0.3)' } }
  return (
    <div className='blog-Div'>
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>Blog App</Typography>
            <Button color='inherit' component={Link} to="/" sx={style}>blogs</Button>
            {user && (
              <Button color='inherit' component={Link} to="/create" sx={style}>new blog</Button>
            )}
            {!user && (
              <Button color='inherit' component={Link} to="/login" sx={style}>login</Button>
            )}
            {user && (
              <Button onClick={() => handleLogout()} color='inherit' sx={style}>logout</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Notification notification={notification} />
      <Routes>
        <Route path='/blogs/:id' element={
          <Blog blog={blog} user={user} deleteBlog={deleteBlog} displayLike={displayBlogLikes} upVoteBlog={upvoteBlog} />
        } />
        <Route path='/create' element={
          <>
            {user && <BlogForm createBlog={addBlog} />}
          </>
        }/>
        <Route path='/login' element={
          <LoginForm addLogin={handleLogin} password={password} handlePassword={setPassword} handleUsername={setUsername} username={username}  />
        }/>
        <Route path='/' element={
          <DisplayBlogs blogs={blogs} upvoteBlog={upvoteBlog} votes={votes} user={user} displayLike={displayBlogLikes} deleteBlog={deleteBlog} />
        }/>
      </Routes>
    </div>
  )
}

export default App
