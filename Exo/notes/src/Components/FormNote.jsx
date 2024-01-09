import { useState, useContext } from 'react'
import { Context as NoteContext } from "/src/Contexts/NoteContext";
import noteService from '/src/Services/notes'
import { Button, Checkbox, Form, Input  } from 'antd';

const FormNote = () => {
  const { notes, setNotes } = useContext(NoteContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const addNote = (title, content) => { //TODO use title
    const newNote = { content: content, important: false }
    noteService
      .create(newNote)
      .then(res => setNotes(notes.concat(res)))
      .catch(() => alert("failed to add a note"))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNote(title, content)
    setTitle("") // TODO only empty if addNote OK
    setContent("")
  }

  /*
  if (false) return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <label> Title :
        <input type="text"
          value={title} 
          onChange={(e)=>setTitle(e.target.value)} 
        />
      </label><br />
      <label> Content :
        <input type="text" 
          value={content} 
          onChange={(e)=>{setContent(e.target.value)}}
        />
      </label><br />
      <button type="submit">save</button>
    </form>
  )
  */


  return (
    <Form 
      name="basic"
    >
      <Form.Item
        name="Titledd :"
        label="Titledd"
        rules={
          [{
            required: true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Contentdd :"
        label="Contentdd"
        rules={
          [{
            required: true,
            message: 'Please input the content!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormNote