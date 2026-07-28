import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/ancedotes', () => ({
  default: {
    getAll: vi.fn(),
    createAncedote: vi.fn(),
    updateAncedote: vi.fn()
  }
}))

import ancedoteService from './services/ancedotes'
import useAncedoteStore, { useAncedotes, useAncedotesActions } from './components/store'

beforeEach(() => {
  useAncedoteStore.setState({ ancedote: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAncedoteActions', () => {
  it('initialize anecdotes returned by backend', async () => {
    const mockAncedote = [{ id: 1, content: 'testing backend', votes: 0 }]
    ancedoteService.getAll.mockResolvedValue(mockAncedote)

    const { result } = renderHook(() => useAncedotesActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: returnValue } = renderHook(() => useAncedotes())
    expect(returnValue.current).toEqual(mockAncedote)
  })
  it('anecdotes are sorted by votes', async () => {
    const anecdote1 = { id: 1, content: 'Number 3', votes: 0 }
    const anecdote2 = { id: 2, content: 'Number 1', votes: 10 }
    const anecdote3 = { id: 3, content: 'Number 2', votes: 4 }

    ancedoteService.getAll.mockResolvedValue([anecdote1, anecdote2, anecdote3])

    const { result } = renderHook(() => useAncedotesActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: list } = renderHook(() => useAncedotes())

    expect(list.current[0].votes).toBe(10)
    expect(list.current[1].votes).toBe(4)
    expect(list.current[2].votes).toBe(0)
  })
  it('component receives a proper filter list', async () => {
    const anecdote1 = { id: 1, content: 'if it hurts, do it more often', votes: 0 }
    const anecdote2 = { id: 2, content: 'something different', votes: 0 }
    ancedoteService.getAll.mockResolvedValue([anecdote1, anecdote2])

    const { result } = renderHook(() => useAncedotesActions())

    await act(async () => {
      await result.current.initialize()
      await result.current.setFilter('something')
    })

    const { result: returnedList } = renderHook(() => useAncedotes())
    expect(returnedList.current[0].content).toBe('something different')
  })
})

describe('votes functionality', () => {
  const ancedote = [{ id: 1, content: 'for example, nothing', votes: 0 }]
  beforeEach(() => {
    useAncedoteStore.setState({ ancedote })
    vi.clearAllMocks()
  })

  it('voting increments votes by 1', async () => {
    const ancedote = { id: 1, content: 'for example, nothing', votes: 1 }
    ancedoteService.updateAncedote.mockResolvedValue(ancedote)

    const { result } = renderHook(() => useAncedotesActions())
    await act(async () => {
      await result.current.upVote(1)
    })

    const { result: list } = renderHook(() => useAncedotes())

    expect(list.current[0].votes).toBe(1)
  })
})
