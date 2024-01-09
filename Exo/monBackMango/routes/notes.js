var express = require('express');
var router = express.Router();
const { Note } = require('../models/Note')

/* CREATE one note*/
router.post('/', async (req, res, next) => {
  const newNote = new Note({
    ...req.body,
  })

  const error = new Error();
  if (!newNote.content) {
    error.status = 400;
    error.message = "content must be present"
  }

  const noteExists = await Note.exists({'content': newNote.content})
  if (noteExists) {
    console.error("content must be unique : ", await Note.findOne({'content': newNote.content}))
    error.status = 409;
    error.message = "content must be unique"
  }
  if (error.message) return next(error)

  const result = await newNote.save()
  res.json(result)
})

/* READ all notes */
router.get('/', async function(req, res, next) {
  const notes = await Note.find()
  res.send(notes);
});

/* READ one note */
router.get('/:id', (req, res, next) => {
  getOneAndDo(req, res, next, async(id) => {return Note.findById(id)})
});

/* UPDATE one note */
router.put('/:id', (req, res, next) => {
  const newNote = {
    ...req.body,
  }

  if (!newNote.content) {
    const error = new Error();
    error.status = 400;
    error.message = "content must be present"
    return next(error)
  }

  getOneAndDo(req, res, next, async(id) => {return Note.findByIdAndUpdate(id, newNote)})
});

/* DELETE one note */
router.delete('/:id', (req, res, next) => {
  getOneAndDo(req, res, next, async(id) => {return Note.findByIdAndDelete(id)})
});

async function getOneAndDo(req, res, next, action){
  const error = new Error();
  let foundNote;
  
  try {
    foundNote = await action(req.params.id)
  } catch (err) {
    error.status = err.statusCode || 400;
    error.message = `Wrong id format ${foundNote}`
    console.log("Wrong id format :", req.params.id, foundNote, err)
    return next(error)
  }

  if (!foundNote) return res.status(404).end()
  res.status(200).send(await foundNote)  
}

module.exports = router;
