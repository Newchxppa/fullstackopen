import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import VisibilityFilter from './components/VisibilityFilter'
const App = () => (
  <div>
    <NoteForm />
    <VisibilityFilter />
    <NoteList />
  </div>
)


export default App
