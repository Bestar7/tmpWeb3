const mongoose = require('mongoose')

const noteSchema = new mongoose
  .Schema({
    content: String,
    important: Boolean,
  })
  .set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  })

const Note = mongoose.model('Note', noteSchema, 'notes')

module.exports = { Note }