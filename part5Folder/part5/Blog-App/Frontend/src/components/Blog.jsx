import { useParams } from 'react-router-dom'
const Blog = ({ blog, user, deleteBlog, displayLike, upVoteBlog }) => {
  const id = useParams().id
  // const blog = blogs.find(blog => blog.id === id)
  // console.log(blog)
  const verifyUser = blog?.user?.username === user?.username ? true : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.link}</p>
      <p>Added by {blog.user.username}</p>
      {displayLike(blog.id)} votes
      {user && (
        <button onClick={() => upVoteBlog(blog)}>upvote</button>
      )}
      <br/>
      {verifyUser && (
        <button onClick={() => deleteBlog(blog)} className="remove-BlogButton">remove</button>
      )}
    </div>
  )

}

export default Blog