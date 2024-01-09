var express = require('express');
var router = express.Router();
const { Phonebook } = require('../models/Phonebook')

/* CREATE one phonebook entry*/
router.post('/', async (req, res, next) => {
  const error = new Error();
  const newEntry = new Phonebook({
    ...req.body,
  })

  if (!newEntry.name || !newEntry.phone) {
    error.status = 400;
    error.message = "name & phone must be present"
  }

  // TODO regex verif format phone

  const entryExists = await Phonebook.exists({$or: [
    {'name': newEntry.name},
    {'phone': newEntry.phone}
  ]})
  if (entryExists) {
    console.error("name & phone must be unique : ", await Phonebook.findOne({$or: [
      {'name': newEntry.name},
      {'phone': newEntry.phone}
    ]}))
    error.status = 409;
    error.message = "name & phone must be unique"
  }
  if (error.message) return next(error)

  const result = await newEntry.save()
  res.json(result)
})

/* READ all phonebook entries */
router.get('/', async function(req, res, next) {
  const phonebookEntries = await Phonebook.find()
  res.send(phonebookEntries);
});

/* READ one phonebook entry */
router.get('/:id', (req, res, next) => {
  getOneAndDo(req, res, next, async(id) => {return Phonebook.findById(id)}) 
});

/* UPDATE one note */
router.put('/:id', (req, res, next) => {
  const newEntry = {
    ...req.body,
  }

  if (!newEntry.name || !newEntry.phone) {
    const error = new Error();
    error.status = 400;
    error.message = "name & phone must be present"
    return next(error)
  }

  getOneAndDo(req, res, next, async(id) => {return Phonebook.findByIdAndUpdate(id, newEntry)})
});

/* DELETE one phonebook entry */
router.delete('/:id', (req, res, next) => {
  getOneAndDo(req, res, next, async(id) => {return Phonebook.findByIdAndDelete(id)})
});

async function getOneAndDo(req, res, next, action){
  const error = new Error();
  let foundEntry;
  
  try {
    foundEntry = await action(req.params.id)
  } catch (err) {
    error.status = err.statusCode || 400;
    error.message = `Wrong id format ${foundEntry}`
    console.log("Wrong id format :", req.params.id, foundEntry, err)
    return next(error)
  }

  if (!foundEntry) return res.status(404).end()
  res.status(200).send(await foundEntry)  
}

module.exports = router;
