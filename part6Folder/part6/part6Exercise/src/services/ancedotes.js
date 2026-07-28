const baseUrl = 'http://localhost:3001/ancedote'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if(!response.ok)
    throw new Error('Failed to fetch notes')

  return await response.json()
}

const createAncedote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok)
    throw new Error('Failed to create ancedote')

  return await response.json()
}

const updateAncedote = async (id, content) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...content })
  }
  const response = await fetch(`${baseUrl}/${id}`, options)

  if(!response.ok)
    throw new Error('Failed to update ancedote')

  return await response.json()
}

const remove = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(`${baseUrl}/${id}`, options )

  if(!response.ok)
    throw new Error('Failed to delete anecdote')

  return await response.json()
}

export default { getAll, createAncedote, updateAncedote, remove }