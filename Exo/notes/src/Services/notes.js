import axios from 'axios'
const baseUrl = 'http://localhost:3000/notes'
// TODO handle error

const getAll = async () => {
  return await axios
    .get(baseUrl)
    .then(res => res.data)
    .catch(err => {
      console.error("fail getAll notes")
      throw err
      //return []
    })
}

const create = async newObject => {
  return await axios
    .post(baseUrl, newObject)
    .then(res => res.data)
    .catch(err => {
      console.error("fail create note")
      throw err
    })
}

const update = async (id, newObject) => {
  return await axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(res => res.data)
    .catch(err => {
      console.error("fail update note")
      throw err
    })
}

export default { getAll, create, update }