import { useAncedotesActions } from './store'
const Filter = () => {
  const { setFilter } = useAncedotesActions()

  const handleChange = event => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter