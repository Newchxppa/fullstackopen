import { Paper, Stack, styled } from '@mui/material'

const DemoPaper = styled(Paper)(({ theme }) => ({
  marginTop: 20,
  // width: 520,
  flex: 1,
  height: 220,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
  wordBreak: 'break-word'
}))

const Blog = ({ blog, user, deleteBlog, displayLike, upVoteBlog }) => {
  // const id = useParams().id
  // // const blog = blogs.find(blog => blog.id === id)
  // // console.log(blog)
  console.log(blog)
  const verifyUser = blog?.user?.username === user?.username ? true : false

  return (
    <Stack direction='row'>
      <DemoPaper square={false}>
        <div>
          <h2>{blog.title}</h2>
          <p className='author-P'>by {blog.author}</p>
          <p className='link-P'><a target='_blank' href={blog.link}>{blog.link}</a></p>
          <p className='user-P'>Added by {blog.user.username}</p>
          <span className='votes-Span'>{displayLike(blog.id)} votes</span>
          {user && (
            <button className='upvote-BlogButton' onClick={() => upVoteBlog(blog)}>UPVOTE</button>
          )}
          {verifyUser && (
            <button onClick={() => deleteBlog(blog)} className="remove-BlogButton">REMOVE</button>
          )}
        </div>
      </DemoPaper>
    </Stack>
  )

}

export default Blog