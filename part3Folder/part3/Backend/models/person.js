const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url);
mongoose.connect(url, { family : 4 })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message);
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    minLength: [3, 'Name must be at least 3 characters long'],
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(v){
        return /^\d{3}-\d{5,}|\d{2}-\d{6,}$/.test(v);
      },
      message: "Number must match the format xx-xxxxxx(6 or more digits after the hypen) or xxx-xxxxxxx(5 or more digits after the hypen)"
    },
    minLength: [8, 'Phone number must be at least 8 digits long'],
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);