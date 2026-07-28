import { create } from 'zustand'

const useNotiStore = create(set => ({
  text: '',
  actions: {
    setText: value => set({ text: value })
  }
}))

export const useNotiText = () => useNotiStore(state => state.text)
export const useNotiAction = () => useNotiStore(state => state.actions)