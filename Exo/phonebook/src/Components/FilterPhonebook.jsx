import { useState, useContext, useEffect } from 'react'
import { Context as PhonebookContext } from "/src/Contexts/PhonebookContext";

const FilterPhonebook = () => {
  const {setShownPhonebook, phonebook} = useContext(PhonebookContext)
  const [searchName, setSearchName] = useState("")

  function getRegex(input){
    const searchRegex = input.split("").map(char=>"["+char+char.toUpperCase()+"]").join("")
    return `.*${searchRegex}.*`
  }

  function handleOnChange(e){
    const input = e.target.value
    setSearchName(input)
  }

  useEffect(() => { // view regex'd entries
    setShownPhonebook([...phonebook.filter(entry => entry.name.match(getRegex(searchName)))])
  }, [searchName])

  return (
    <>
      <h2>Filter entries</h2>
      <input type="text"
        value={searchName}
        onChange={(e) => handleOnChange(e)}
      />
    </>
  )
}

export default FilterPhonebook