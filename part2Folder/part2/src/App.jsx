import { useState, useEffect } from 'react'
import axios from 'axios'



 const Displayitem = ({item}) => {
    if(item){
      if(item.length < 10 && item.length != 1){
        return(
        <div>
          {item.map((place, i) => 
          <div key={i}>
            {place.name.common}            
          </div>
          )}
        </div>
        )
      }
      else if(item.length > 10){
        return(
          <div>
            Too many matches, specify another filter
          </div>
        )
      }
      else if(item.length == 1){
        const languages = Object.values(item[0].languages)
        return (
          <div>
            <h1>{item[0].name.common}</h1>
            Capital {item[0].capital[0]}
            <br />
            Area {item[0].area}
            <h2>Languages</h2>
            <ul>
              {languages.map((lang,i) => 
                <li key={i}>{lang}</li>
              )}
            </ul>
             <img src={item[0].flags.png} /> 
          </div>
        )
      }
    }
    return null

  }

const App = () => {
  const [value, setValue] = useState('')
  //const [country, setCountry] = useState(null)
  const [display, setDisplay] = useState()



  const handleChange = (event) => {
    setValue(event.target.value)
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        let list = []
        for(let i = 0; i < response.data.length; i++){
          if(response.data[i].name.common.toLowerCase().includes(event.target.value.toLowerCase())){
            list.push(response.data[i])
          }
          if(list.length > 10){
            break;
          }
        }
        setDisplay(list)
      })
    
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
       
      </form>
      <Displayitem item={display} />
      
    </div>
  )
}

export default App