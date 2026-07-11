/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import DisplayBlogs from './components/DisplayBlogs'
import blogService from './services/blogs.js'
import './App.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

function App() {
  const [blogs, setBlogs] = useState([])
  const [votes, setVotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMessage, setErrMessage] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then((response) => {
        console.log(response)
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
        setTimeout(() => {
          setErrMessage(null)
        }, 5000)
        setVotes(votes.concat({ likes: blog.likes, id: blog.id }))
        setBlogs(blogs.concat(blog))
      })
  }

  const upvoteBlog = (index, blog) => {
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
    }

  }

  const noteForm = () => (
    <Togglable buttonLabel="create new blog" closeLabel="close">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h1 className="app-Title">Blog Saver</h1>
      <h3 className="app-SubTitle">Save your favorite blogs!</h3>
      <Notification message={errMessage} />

      {!user && (<LoginForm addLogin={handleLogin} password={password} handlePassword={handlePassword} handleUsername={handleUsername} username={username} />)}
      {user && (
        <div>
          <button className="logout-Button" onClick={() => {handleLogout()}}>Log Out</button>
        </div>
      )}
      {user && noteForm()}
      {user && <DisplayBlogs blogs={blogs} upVoteBlog={upvoteBlog} votes={votes} user={user} displayLike={displayBlogLikes} deleteBlog={deleteBlog} />}


    </div>
  )
}

export default App
