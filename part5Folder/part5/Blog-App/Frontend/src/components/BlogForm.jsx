const BlogForm = ({ formSubmit, blogTitle, handleTitle, blogAuthor, handleAuthor, blogUrl, handleUrl }) => {
  return (
    <div className="form-Div">
      <form className="blog-Form" onSubmit={formSubmit}>

        <div className="input-Div">
          Enter Title <input className="title-Input" value={blogTitle}  onChange={handleTitle} />
        </div>

        <div className="input-Div">
          Enter Author <input className="author-Input" value={blogAuthor} onChange={handleAuthor} />
        </div>

        <div className="input-Div">
          Enter URL <input className="url-Input" value={blogUrl} onChange={handleUrl} />
        </div>

        <button className="form-Submit-Button">Submit</button>
      </form>
    </div>
  )
}

export default BlogForm