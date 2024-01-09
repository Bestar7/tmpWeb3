const express = require('express');
const router = express.Router();

router.post("/phonebook", (request, response) => {
  const personPayload = request.body
  const newId = Math.floor(Math.random() * 1e9)
  const newPerson = {
    ...personPayload,
    id: newId,
  }

  const errorMessages = []
  if (!personPayload.name) errorMessages.push("name must be present")
  if (!personPayload.number) errorMessages.push("number must be present")
  const nameExists = allPersons.some(person => person.name === newPerson.name)
  if (nameExists) errorMessages.push("name must be unique")

  if (errorMessages.length > 0) {
    response
      .status(422)
      .json({
        errorMessages,
      })
    return
  }

  // push not concat here. We want to mutate the array.
  allPersons.push(newPerson)
  response.json(newPerson)
})

router.get("/phonebook", (request, response) => {
  response.json(allPersons)
})

router.get("/aphonebook/:id", (request, response) => {
  const idParam = request.params.id
  const id = Number(idParam)
  const person = allPersons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

router.delete("/phonebook/:id", (request, response) => {
  const idParam = request.params.id
  const id = Number(idParam)
  const personIndex = allPersons.findIndex(person => person.id === id)
  if (personIndex > -1) {
    allPersons.splice(personIndex, 1) // We do NOT use delete because it creates a sparse array with a wrong length
  }
  response.status(204).end()
})