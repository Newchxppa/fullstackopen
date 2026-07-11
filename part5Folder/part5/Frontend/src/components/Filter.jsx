const Filter = ( { value, people, filter } ) => {
  let list = people.filter((person) => {
    for(let i = 0; i < value.length; i++){
      if(person.name.toLowerCase().includes(value.toLowerCase())){
        return person.name
      }
    }
  })
  return (
    <div>
      filter shown with <input value={value} onChange={filter} />
      {list.map((person, index) =>
        <p key={index}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default Filter