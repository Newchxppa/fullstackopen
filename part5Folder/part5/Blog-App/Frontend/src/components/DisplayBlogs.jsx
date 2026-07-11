import Togglable from './Togglable'
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
            <Togglable buttonLabel="view" closeLabel="hide">
              <p className="blog-P">
                <span className="blog-Span">Author:</span> {blog.author}
              </p>
              <p className="blog-P">
                <span className="blog-Span">Link:</span> {blog.link}
              </p>
              <p className="blog-P">
                <span className="blog-Span">Saved by:</span> {user.name}
              </p>
              <button onClick={() => deleteBlog(blog)} className="remove-BlogButton">remove</button>
              <br/>
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