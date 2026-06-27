const DisplayBlogs = ({ blogs, upVoteBlog, votes }) => {
  if(blogs.length != 0)
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
            <p className="blog-P">
              <span className="blog-Span">Link:</span> {blog.link}
            </p>
            <span className="votes-Span">{votes[i]} votes</span>
            <button className="votes-Button" onClick={() => upVoteBlog(i, blog)}>upvote</button>
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