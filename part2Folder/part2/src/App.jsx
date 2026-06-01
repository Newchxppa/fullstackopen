import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const hook = () => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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
      if(window.confirm(`${personToAdd.name} is already added to phonebook, replace the old number with a new one?`)){
        
      const findPerson = persons.find(person => person.name === personToAdd.name);

      const changeInfo = {...findPerson, number: personToAdd.number}

      const updatePeople = persons.map(person => person.name === personToAdd.name ? changeInfo : person)

      peopleService
        .update(findPerson.id, personToAdd)
        .then(person => {
          setPersons(updatePeople)
          setNewName('')
          setNewNumber('')
        })
      }
      else{
        alert("Please change name.")
      }
    }
    else{
      peopleService
        .create(personToAdd)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
      
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

  const deletePerson = (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}`)){
      peopleService.remove(person.id)
      location.reload();
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchName} people={persons} filter={filterName} />
      
      <h3>Add a new</h3>

      <PersonForm submit={addInfo} valueName={newName} changeName={handleNameChange} valueNum={newNumber} changeNum={handlePhoneChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>

  )

}
export default App