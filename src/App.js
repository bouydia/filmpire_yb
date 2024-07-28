import { useRef } from 'react'
import { CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { NavBar, Movies, MovieInformation, Profile, Actors } from './components'
import useAlan from './components/Alan'
import useStyles from './styles'
const App = () => {
  const classes = useStyles()
  const alanBtnContainer=useRef()
  useAlan()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      <main className={classes.content}>
        <div className={ classes.toolbar} />
        <Routes>
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/" element={<Movies />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  )
}

export default App
