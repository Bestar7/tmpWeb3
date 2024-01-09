const { Note } = require('../models/Note')
const { Phonebook } = require('../models/Phonebook')

const mongooseInput = {
  notes : [
    new Note({
      content: 'HTML is Easy',
      important: false,
    }),
    new Note({
      content: 'HTML is shit',
      important: true,
    }),
    new Note({
      content: 'Note mangoose',
      important: false,
    }),
  ],
  phonebook : [
    new Phonebook({
      name:"Paul",
      phone:"0481"
    }),
    new Phonebook({
      name:"Paulus",
      phone:"0482"
    }),
    new Phonebook({
      name:"Paulier",
      phone:"0483"
    }),
  ]
}

module.exports = { mongooseInput };
