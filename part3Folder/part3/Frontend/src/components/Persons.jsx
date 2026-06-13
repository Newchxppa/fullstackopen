const Persons = ({ persons, deletePerson }) => {
  return(
    <div>
    {persons.map((person, i) =>
      <div key={person.id}>
        {person.name} {person.number}
        <button key={person.id} onClick={() => deletePerson(person)}>delete</button>
      </div>
      )}

    </div>
  )
}

export default Persons