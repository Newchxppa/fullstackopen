import { create } from 'zustand'


const generateId = () => {
  return Math.random(1000000000).toFixed(0)
}

const useAncedoteStore = create(set => ({
  ancedote: [{
    content: 'if it hurts, do it more often',
    votes: 0,
    id: 1,
  },
  {
    content: 'The first 90% of the code accounts for the first 90% of the development time... The remaining 10% of the code accounts for the other 90% of development time',
    votes: 0,
    id: 2,
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
    id: 3,
  },
  {
    content: 'Premature optimization is the root of all evil',
    votes: 0,
    id: 4,
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
    id: 5,
  }
  ],
  filter: '',
  actions: {
    upVote: id => set(
      state => ({
        ancedote: state.ancedote.map(item =>
          item.id === id ? { ...item, votes: item.votes += 1 }  : item
        )
      })
    ),
    add: content => set(
      state => ({ ancedote: state.ancedote.concat({ content: content, votes: 0, id: generateId() }) })
    ),
    setFilter: value => set({ filter: value })
  }
}))

export const useAncedotes = () => {
  const ancedotes = useAncedoteStore(state => state.ancedote)
  const filter = useAncedoteStore(state => state.filter)
  return ancedotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAncedotesActions = () => useAncedoteStore(state => state.actions)