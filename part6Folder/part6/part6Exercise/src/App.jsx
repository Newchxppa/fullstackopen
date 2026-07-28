import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdote } from './hooks/useAnecdote'

const App = () => {
  const { upVote, anecdotes, isPending } = useAnecdote()

  if(isPending){
    return <div>anecdote service is not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App