import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useAncedotesActions } from './components/store'
import { useEffect } from 'react'
const App = () => {
  const { initialize } = useAncedotesActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}


export default App
