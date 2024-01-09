import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Context as NoteContext } from "/src/Contexts/NoteContext";
import noteService from '/src/Services/notes'

const Note = () => {
  const {notes, setNotes} = useContext(NoteContext) // TODO au moment de prendre {notes}, elle est encore vide
  const {id} = useParams()
  let note = notes ? notes.find(e => e.id == id) : null // todo render update important

  const toggleImportance = () => {
    note.important = !note.important
    noteService
      .update(note.id, note)
      .then(res => setNotes(notes.map(n => n.id !== id ? n : res)))
      .catch((err) => console.log("failed to toggle importance", id, note, err))
  }

  if (!notes || notes.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    < >
      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Important</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{note.id}</td>
            <td>{note.content}</td>
            <td><button onClick={() => toggleImportance(note.id)}>{note.important ? '✔️' : '❌'}</button></td>
          </tr>
        </tbody>

      </table>
    </ >
  )
}

export default Note