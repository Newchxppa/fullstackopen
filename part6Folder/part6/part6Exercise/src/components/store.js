import { create } from 'zustand'
import ancedoteService from '../services/ancedotes'


const useAncedoteStore = create((set, get) => ({
  ancedote: [],
  filter: '',
  actions: {
    upVote: async (id) => {
      const ancedote = get().ancedote.find(n => n.id === id)
      const updatedAncedote = await ancedoteService.updateAncedote(
        id, { ...ancedote, votes: ancedote.votes + 1 }
      )
      set(state => ({
        ancedote: state.ancedote.map(item =>
          item.id === id ? updatedAncedote : item
        ) })
      )},
    add: async (content) => {
      const newAnecdote = await ancedoteService.createAncedote(content)
      set(state => ({ ancedote: state.ancedote.concat(newAnecdote) }))
    },
    remove: async (item) => {
      if(window.confirm(`Are you sure you want to delete '${item.content}'`)){
        const deletedItem = await ancedoteService.remove(item.id)
        set(state => ({ ancedote: state.ancedote.filter(ancedote => deletedItem.id !== ancedote.id) }))
      }
    },
    setFilter: value => set({ filter: value }),
    initialize: async () => {
      const ancedotes = await ancedoteService.getAll()
      set(({ ancedote: ancedotes }))
    }
  }
}))

export const useAncedotes = () => {
  const ancedotes = useAncedoteStore(state => state.ancedote)
  const filter = useAncedoteStore(state => state.filter)
  if (filter === '')
    return ancedotes.sort((a,b) => b.votes - a.votes)
  return ancedotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
}
export const useAncedotesActions = () => useAncedoteStore(state => state.actions)

export default useAncedoteStore