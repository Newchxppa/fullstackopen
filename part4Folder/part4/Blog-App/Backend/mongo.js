const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kinnegebregiorgis_db_user:${password}@blog.w2ar709.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Blog`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Connected to mongooose');
  })

const blogSchema = new mongoose.Schema({
  title: String, 
  author: String, 
  link: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//   title: "The Art of Minimalist Code",
//   author: "Elena Rostova",
//   link: "https://dev-bytes.io/blog/art-of-minimalist-code",
//   likes: 0
// })

// blog.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})