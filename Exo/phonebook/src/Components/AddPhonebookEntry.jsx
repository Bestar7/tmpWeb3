import { useState, useContext, useEffect } from 'react'
import { Context as PhonebookContext } from "/src/Contexts/PhonebookContext";
import phonebookService from '/src/Services/phonebook'

const AddPhonebookEntry = () => {
  const {setPhonebook, phonebook, setShownPhonebook} = useContext(PhonebookContext)
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")

  useEffect(() => { // view new entries
    setShownPhonebook(phonebook)
  }, [phonebook])

  const onSubmit = (event)=>{
    event.preventDefault()
    addEntry()
  }

  const addEntry = () => {
    const found = phonebook.findIndex(entry =>
      name == entry.name || phone == entry.phone
    )
    if (found != -1){
      alert(`déjà présent : ${phonebook[found].name} ${phonebook[found].phone}`)
      return // TODO handle already found
    }
    const lastId = Math.max(...(phonebook.map((entry)=>entry.id))) // TODO fix NaN
    const newEntry = { id: lastId+1, phone: phone, name: name }
    setPhonebook([...phonebook, newEntry])
    phonebookService.create(newEntry)
    setPhone("")
    setName("")
  }

  return (
    <>
      <h2>Add new entry in the phonebook</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <label> Number 
          <input type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='0484/65.65.65'
          />
        </label>
        <label> Name 
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='jean'
          />
        </label>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default AddPhonebookEntry