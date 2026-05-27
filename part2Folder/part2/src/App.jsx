import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addInfo = (event) => {
    event.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    const list = persons.filter(person => {
      return person.name === personToAdd.name
    })
    if(list.length != 0){
      alert(`${newName} is already added to the phonebook`);
    }
    else{
      setPersons(persons.concat(personToAdd))
      setNewName('')
      setNewNumber('')
    }    
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    setSearchName(event.target.value);
  }
  const [searchName, setSearchName] = useState('');

  const ListofNames = ( { name } ) => {
    let list = persons.filter((person) => {
      return person.name.toLowerCase() === name
    })
    return (
     <div>
      {list.map((person) =>
        <p>{person.name} {person.number}</p>
      )}
     </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={filterName} /> 
        <ListofNames name={searchName} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input placeholder='Write name here' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input placeholder="Write number here" value={newNumber} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => 
        <p key={i}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App