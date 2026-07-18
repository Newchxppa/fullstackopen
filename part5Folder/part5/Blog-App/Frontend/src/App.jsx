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
import Togglable from './components/Togglable.jsx'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useMatch } from 'react-router-dom'

function App() {
  const [blogs, setBlogs] = useState([])
  const [votes, setVotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMessage, setErrMessage] = useState(null)

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
        setErrMessage(`Add: ${blogObject.title} by ${blogObject.author} has been added`)
        navigate('/')
        setTimeout(() => {
          setErrMessage(null)
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

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value)
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
      setErrMessage('wrong credentials')
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('blogAppUser')
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

  // const noteForm = () => (
  //   <Togglable buttonLabel="create new blog" closeLabel="close">
  //     <BlogForm createBlog={addBlog}/>
  //   </Togglable>
  // )

  const padding = {
    padding: 5
  }
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <div>
      <h1 className="app-Title">Blog Saver</h1>
      <h3 className="app-SubTitle">Save your favorite blogs!</h3>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/create'>new blog</Link>
        {!user && (
          <Link style={padding} to='/login'>login</Link>
        )}
        {user && (
          <button onClick={() => handleLogout()}>logout</button>
        )}
      </div>
      <Notification message={errMessage} />

      <Routes>
        <Route path='/blogs/:id' element={
          <Blog blog={blog} user={user} deleteBlog={deleteBlog} displayLike={displayBlogLikes} upVoteBlog={upvoteBlog} />
        } />
        <Route path='/create' element={
          <>
            {!user && (<p>Login to save blogs</p>)}
            {user && <BlogForm createBlog={addBlog} />}
          </>
        }/>
        <Route path='/login' element={
          <LoginForm addLogin={handleLogin} password={password} handlePassword={handlePassword} handleUsername={handleUsername} username={username} />
        }/>
        <Route path='/' element={
          <DisplayBlogs blogs={blogs} upvoteBlog={upvoteBlog} votes={votes} user={user} displayLike={displayBlogLikes} deleteBlog={deleteBlog} />
        }/>

      </Routes>
      {/* <Notification message={errMessage} />

      {!user && (<LoginForm addLogin={handleLogin} password={password} handlePassword={handlePassword} handleUsername={handleUsername} username={username} />)}
      {user && (
        <div>
          <button className="logout-Button" onClick={() => {handleLogout()}}>Log Out</button>
        </div>
      )}
      {user && noteForm()}
      {user && <DisplayBlogs blogs={blogs} upVoteBlog={upvoteBlog} votes={votes} user={user} displayLike={displayBlogLikes} deleteBlog={deleteBlog} />} */}


    </div>
  )
}

export default App
