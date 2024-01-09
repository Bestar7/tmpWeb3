import { ProviderWrapper as NoteProviderWrapper} from "/src/Contexts/NoteContext"
import Note from '/src/Components/Note'

const PageOneNote = () => {

  return (
    <NoteProviderWrapper >
      <h1>Note</h1>
      <Note />
    </NoteProviderWrapper >
  )
}

export default PageOneNote