import { ProviderWrapper as NoteProviderWrapper} from "/src/Contexts/NoteContext"
import NotesTable from "/src/Components/NotesTable"
import FormNote from '/src/Components/FormNote'

const PageNote = () => {
  return (
    <NoteProviderWrapper>
      <h1>Notes</h1>
      <NotesTable />
      <FormNote />
    </NoteProviderWrapper>
  )
}

export default PageNote