import { useNotesActions } from '../notestore'

const VisibilityFilter = () => {
  const { setFilter } = useNotesActions()

  return(
    <div>
      <input
        type='radio'
        name='filter'
        onChange={() => setFilter('all')}
      />all
      <input
        type='radio'
        name='filter'
        onChange={() => setFilter('important')}
      />important
      <input
        type='radio'
        name='filter'
        onChange={() => setFilter('nonimportant')}
      />not important
    </div>
  )
}

export default VisibilityFilter