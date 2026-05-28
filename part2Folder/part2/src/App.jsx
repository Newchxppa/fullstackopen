import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  

  const addInfo = (event) => {
    event.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    const list = persons.filter(person => {
      return person.name.toLowerCase() === personToAdd.name.toLowerCase()
    })
    if(list.length != 0){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      setPersons(persons.concat(personToAdd))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }
  const filterName = (event) => {
    setSearchName(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchName} people={persons} filter={filterName} />
      
      <h3>Add a new</h3>

      <PersonForm submit={addInfo} valueName={newName} changeName={handleNameChange} valueNum={newNumber} changeNum={handlePhoneChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>

  )

}
export default App