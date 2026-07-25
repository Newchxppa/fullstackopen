import { useNotes } from '../store'
import Note from './Note.jsx'

const NoteList = () => {
  const notes = useNotes()
  return (
    <div>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  )
}

export default NoteList