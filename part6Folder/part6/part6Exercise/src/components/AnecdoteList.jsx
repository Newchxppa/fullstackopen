import { useAncedotes, useAncedotesActions } from './store'

const AnecdoteList = () => {
  const ancedotes = useAncedotes()
  const { upVote } = useAncedotesActions()
  ancedotes.sort((a,b) => b.votes - a.votes)
  return(
    <div>
      <h1>Anecdotes</h1>
      {ancedotes.map(item =>
        <div key={item.id}>
          <p>{item.content}</p>
          <p>has {item.votes} <button key={item.id} onClick={() => upVote(item.id)}>vote</button></p>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList