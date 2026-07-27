import { useAncedotesActions } from './store'
import { useNotiAction } from './notis'

const AnecdoteForm = () => {
  const { add } = useAncedotesActions()
  const { setText } = useNotiAction()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    add(content)

    setText(`You added ${content}`)
    setTimeout(() => {
      setText(null)
    }, 5000)

    event.target.reset()
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='create'></input>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm