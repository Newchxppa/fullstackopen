/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import BlogForm from "./components/BlogForm"
import DisplayBlogs from "./components/DisplayBlogs"
import blogService from './services/blogs.js'
import './App.css'
import LoginForm from "./components/LoginForm"
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx"

function App() {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [votes, setVotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMessage, setErrMessage] = useState(null)

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

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogAppUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      link: url,
      likes: 0,
    }
    const copy = {...newBlog}
    
    blogService.create(newBlog)
      .then(blog => {
        setErrMessage(`Add: ${newBlog.title} by ${newBlog.author} has been added`)
        setTimeout(() => {
          setErrMessage(null)
        }, 5000)
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
    console.log('hello');
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('blogAppUser')
      location.reload()
    }
  }

  


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
      {user && <BlogForm formSubmit={addBlog} blogTitle={blogTitle} handleTitle={handleTitle} blogAuthor={blogAuthor} handleAuthor={handleAuthor} blogUrl={url} handleUrl={handleURl} />}
      {user && <DisplayBlogs blogs={blogs} upVoteBlog={upvoteBlog} votes={votes} />}

      
    
    </div>
  )
}

export default App
