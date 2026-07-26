import { useAncedotesActions } from './store'

const AnecdoteForm = () => {
  const { add } = useAncedotesActions()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    add(content)
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