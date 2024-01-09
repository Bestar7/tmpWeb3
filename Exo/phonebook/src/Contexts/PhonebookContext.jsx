import React, { useState, useEffect } from "react";
import phonebookService from '/src/Services/phonebook'

const Context = React.createContext(null)

const ProviderWrapper = (props) => {
  const [phonebook, setPhonebook] = useState([])
  const [shownPhonebook, setShownPhonebook] = useState(phonebook)

  useEffect(() => { // init phonebook
    phonebookService
      .getAll()
      .then(res=>setPhonebook(res))
      .catch(()=>alert("failed to load phonebook"))
    console.log()
  }, [])

  const exposedValue = {
    phonebook,
    setPhonebook,
    shownPhonebook,
    setShownPhonebook,
  }

  return (
    <Context.Provider value={exposedValue}>
      {props.children}
    </Context.Provider>
  )
}

export {
  Context,
  ProviderWrapper,
}    
