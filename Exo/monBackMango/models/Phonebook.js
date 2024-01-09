const mongoose = require('mongoose')

const phonebookEntrySchema = new mongoose
  .Schema({
    name: String,
    phone: String,
    
  })
  .set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

const Phonebook = mongoose.model('Phonebook', phonebookEntrySchema,'phonebook')

module.exports = { Phonebook }