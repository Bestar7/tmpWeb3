import { useContext } from "react";
import { Context as PhonebookContext } from "/src/Contexts/PhonebookContext";
import phonebookService from '/src/Services/phonebook'

const Phonebook = () => {
  const {shownPhonebook, phonebook, setPhonebook} = useContext(PhonebookContext)
  
  const deleteEntry = (id)=>{
    phonebookService
      .deleteById(id)
      .then(res=>console.log("deleted : ", res))
      .catch(()=>alert("failed to delete phonebook entry"))
      
    setPhonebook(phonebook.filter((entry)=>entry.id != id))
  }

  return (
    <>
      <h2>phonebook entries</h2>
      <table>

        <thead>
          <tr>
            <th>phone</th>
            <th>name</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {shownPhonebook.map(entry =>
            <tr key={entry.id}>
              <td>{entry.phone}</td>
              <td>{entry.name}</td>
              <td><button onClick={()=>deleteEntry(entry.id)}>{'❌'}</button></td>
            </tr>
          )}
        </tbody>

      </table>
    </>
  )
}

export default Phonebook