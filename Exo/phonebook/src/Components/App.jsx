import Phonebook from "/src/Components/Phonebook"
import AddPhonebookEntry from '/src/Components/AddPhonebookEntry'
import FilterPhonebook from '/src/Components/FilterPhonebook'

function App() {
  return (
    <>
      <h1>Phonebook</h1>
      <FilterPhonebook />
      <Phonebook />
      <AddPhonebookEntry />
    </>
  )
}

export default App