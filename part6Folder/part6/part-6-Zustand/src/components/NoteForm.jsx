import { useNotesActions } from '../notestore'

const NoteForm = () => {
  const { add } = useNotesActions()

  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    await add(content)
    e.target.reset()
  }
  return(
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default NoteForm