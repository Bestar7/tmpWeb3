import React, { useState, useEffect } from "react";
import noteService from '/src/Services/notes'

const Context = React.createContext(null)

const ProviderWrapper = (props) => {
  const [notes, setNotes] = useState([])

  useEffect(() => { // init notes
    noteService
      .getAll()
      .then(res=>setNotes(res))
      .catch(()=>alert("failed to load notes"))
  }, [])

  const exposedValue = {
    notes,
    setNotes,
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
