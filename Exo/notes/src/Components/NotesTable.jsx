import { useContext } from 'react'
import { Context as NoteContext } from "/src/Contexts/NoteContext";
import noteService from '/src/Services/notes'
import { useNavigate } from 'react-router-dom';

const NotesTable = () => {
  // <td>{note.important ? '\u2714' : '\u2716'}</td>

  const {notes, setNotes} = useContext(NoteContext)
  const navigate = useNavigate()

  const toggleImportance = (id) => {
    const updatedNote = notes.find(e => e.id == id)
    updatedNote.important = !updatedNote.important
    noteService
      .update(id, updatedNote)
      .then(res => setNotes(notes.map(n => n.id !== id ? n : res)))
      .catch(() => alert("failed to toggle importance"))
  }

  const selectOne = (id) => {
    console.log("todo", id) // TODO
    //setNotes( [notes.find((e)=>e.id = id)] )
    
    navigate(`/notes/${id}`)
  }

  return (
    <table>

      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Important</th>
        </tr>
      </thead>

      <tbody>
        {notes.map(note =>
          <tr key={note.id} onClick={()=>selectOne(note.id)}>
            <td>{note.id}</td>
            <td>{note.content}</td>
            <td><button onClick={()=>toggleImportance(note.id)}>{note.important ? '✔️' : '❌'}</button></td>
          </tr>
        )}
      </tbody>
      
    </table>
  )
}

export default NotesTable