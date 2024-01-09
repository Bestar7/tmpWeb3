import axios from 'axios'
const baseUrl = 'http://localhost:3000/phonebook'
// TODO handle error

const getAll = async () => {
  return await axios
    .get(baseUrl)
    .then(res => res.data)
    .catch(err => {
      console.error("fail get phonebook")
      throw err
      //return []
    })
}

const create = async newObject => {
  return await axios
    .post(baseUrl, newObject)
    .then(res => res.data)
    .catch(err => {
      console.error("fail create phonebook entry")
      throw err
    })
}

const update = async (id, newObject) => {
  return await axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(res => res.data)
    .catch(err => {
      console.error("fail update phonebook entry")
      throw err
    })
}

const deleteById = async (id) => {
  return await axios
    .delete(`${baseUrl}/${id}`)
    .then(res => res)
    .catch(err => {
      console.error("fail update phonebook entry")
      throw err
    })
}

export default { getAll, create, update, deleteById }