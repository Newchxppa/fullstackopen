import { useAncedotes, useAncedotesActions } from './store'
import { useNotiAction } from './notis'

const AnecdoteList = () => {
  const ancedotes = useAncedotes()
  const { upVote, remove } = useAncedotesActions()
  const { setText } = useNotiAction()

  ancedotes.sort((a,b) => b.votes - a.votes)

  const handleupVote = (item) => {
    upVote(item.id)
    setText(`You upvoted ${item.content}`)
    setTimeout(() => {
      setText(null)
    }, 5000)
  }

  const style = {
    border: 'solid',
    borderWidth: '0.2px',
    marginBottom: '5px',
    padding: '5px'
  }


  return (
    <div>
      <h1>Anecdotes</h1>
      {ancedotes.map(item =>
        <div style={style} key={item.id}>
          <p style={{ display: 'inline-block' }}>{item.content}</p> {item.votes === 0 && (
            <button onClick={() => remove(item)}>delete</button>
          )}
          <p>has {item.votes} <button key={item.id} onClick={() => handleupVote(item)}>vote</button></p>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList