import { CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import {NavBar,Movies,MovieInformation,Profile,Actors} from './components'
const App = () => {
  return (
    <div>
      <CssBaseline />
      <main>
        <Routes>
          <Route path="/movie/:id" element={<MovieInformation/>} />
          <Route path="/actors/:id" element={<Actors/>} />
          <Route path="/" element={<Movies/>} />
          <Route path="/profile/:id" element={<Profile/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
