const PersonForm = ( {submit, valueName, changeName, valueNum, changeNum} ) => {
  return(
    <form onSubmit={submit}>
      <div>
        name: <input placeholder='Write name here' value={valueName} onChange={changeName} />
      </div>
      <div>
        number: <input placeholder='Write number here' value={valueNum} onChange={changeNum} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>

    </form>
  )
}

export default PersonForm