import { create } from 'zustand'

const useFeedBackStore = create(set => ({
  controls: {
    good: 0,
    neutral: 0,
    bad: 0
  },
  actions: {
    incrementGood: () =>  set(state => ({ controls: { ...state.controls, good: state.controls.good + 1 } })),
    incrementNeutral:() => set(state => ({ controls: { ...state.controls, neutral: state.controls.neutral + 1 } })),
    incrementBad:() => set(state => ({ controls: { ...state.controls, bad: state.controls.bad + 1 } }))
  }
}))

export const useFeedBackActions = () => useFeedBackStore(state => state.actions)
export const useFeedBackControls = () => useFeedBackStore(state => state.controls)
