const mongoose = require('mongoose')


if(process.argv.length < 5 && process.argv.length !== 3){
  console.log('Include person name and phone number after password in order to save info. Ex: node mongo.js <password> Ada 402-234-2345')
  process.exit(1)
}

const password = process.argv[2]

const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://kinnegebregiorgis_db_user:${password}@cluster1.h3kwhmt.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster1
`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family : 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}
else if(process.argv.length === 5){
  const person = new Person({
    name: String(personName),
    number: String(personNumber),
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}