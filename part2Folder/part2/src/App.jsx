import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



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
      return person.name.toLowerCase() === personToAdd.name.toLowerCase()
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

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={searchName} people={persons} filter={filterName}  />
     
      <h3>Add a new</h3>
      <PersonForm submit={addInfo} valueName={newName} changeName={handleNameChange} valueNum={newNumber} changeNum={handlePhoneChange}/>
      

      <h3>Numbers</h3>
      <Persons persons={persons} />
      
    </div>
  )
}

export default App