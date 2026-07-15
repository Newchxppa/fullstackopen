import Togglable from './Togglable'

const VerifyUser = ({ user, blog, deleteBlog }) => {
  const foundBlogUser = blog?.user?.username
  const foundUser = user?.username
  if(!foundBlogUser || !foundUser){
    return null
  }
  if(foundBlogUser === foundUser){
    console.log('IN HERRE BUDDY')
    return (
      <div>
        <button onClick={() => deleteBlog(blog)} className="remove-BlogButton">remove</button>
        <br/>
      </div>
    )
  }
  return
}

const DisplayBlogSavedBy = ({ user, blog, deleteBlog }) => {
  const savedBy = blog?.user?.username || user?.username
  console.log(user, blog)
  if(!savedBy){
    return null
  }
  if(blog.user.username === user.username)
    return (
      <div>
        <p className="blog-P">
          <span className="blog-Span">Saved by:</span> {savedBy}
        </p>
        <button onClick={() => deleteBlog(blog)} className="remove-BlogButton">remove</button>
        <br/>
      </div>
    )
  return (
    <p className="blog-P">
      <span className="blog-Span">Saved by:</span> {savedBy}
    </p>
  )
}


const DisplayBlogs = ({ blogs, upVoteBlog, deleteBlog, user, displayLike }) => {
  blogs.sort((a, b) => b.likes - a.likes)
  if(blogs.length !== 0)
    return(
      <div>
        <h2>Saved Blogs</h2>
        {blogs.map((blog, i) =>
          <div key={i}>
            <p className="blog-P">
              <span className="blog-Span">Title:</span> {blog.title}
            </p>
            <p className="blog-P">
              <span className="blog-Span">Author:</span> {blog.author}
            </p>
            <Togglable buttonLabel="view" closeLabel="hide">
              <p className="blog-P">
                <span className="blog-Span">Link:</span> {blog.link}
              </p>
              <DisplayBlogSavedBy user={user} blog={blog} deleteBlog={deleteBlog} />
              {/* <VerifyUser user={user} blog={blog} deleteBlog={deleteBlog}  /> */}
              <span className="votes-Span">{displayLike(blog.id)} votes</span>
              <button className="votes-Button" onClick={() => upVoteBlog(i, blog)}>upvote</button>
            </Togglable>
          </div>
        )}
      </div>
    )
  else{
    return(
      <div>Nothing saved at the moment...</div>
    )
  }
}

export default DisplayBlogs