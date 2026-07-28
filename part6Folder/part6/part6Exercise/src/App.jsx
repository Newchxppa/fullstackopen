import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdote } from './hooks/useAnecdote'
import { useText } from './hooks/useContext'
const App = () => {
  const { setText } = useText()
  const { upVote, anecdotes, isPending } = useAnecdote()

  if(isPending){
    return <div>anecdote service is not available due to problems in server</div>
  }

  const handleUpvote = (anecdote) => {
    upVote(anecdote)
    setText(`anecdote '${anecdote.content}' upvoted`)
    setTimeout(() => {
      setText(null)
    }, 5000)
    console.log(anecdote)
  }

  const style = { border: 'solid', borderWidth: '0.2px', margin: '10px 2px 10px 2px', paddingLeft: '5px', paddingTop: '10px', paddingBottom: '5px' }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification  />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div style={style} key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button style={{ marginLeft: '5px' }} onClick={() => handleUpvote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App