import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import PageNote from '../Components/PageNote'
import Page404 from '../Components/Page404'
import PageHome from '../Components/PageHome'
import PageOneNote from '../Components/PageOneNote'
import Footer from '../Components/Footer'

const padding = { padding: 5}
//<Route path="/notes/:id" element={<Note note={note} />} />
const Navbar = () => {
  return (
    <>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/404">erreur 404</Link>
        </div>

        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/notes" element={<PageNote />} />
          <Route path="/notes/:id" element={<PageOneNote />} />
          <Route path="/404" element={<Page404 />} />
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default Navbar