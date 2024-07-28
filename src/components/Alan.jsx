import React,{useContext,useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {selectGenreOrCategory,searchMovie} from '../features/currentgenreOrCategory'
import { ColorModeContext } from '../utils/ToggleColorMode'
import { fetchToken } from '../utils'
const useAlan = () => {
    const { setMode } = useContext(ColorModeContext)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  useEffect(() => {
   alanBtn({
     key: 'ea5a4bc7112ddc82bb3190d289e59dff2e956eca572e1d8b807a3e2338fdd0dc/stage',
     onCommand: ({ command, mode, genres, genreOrCategory ,query}) => {
       if (command === 'chooseGenre') {
         const foundGenre = genres.find(
           g => g.name.toLowerCase() == genreOrCategory.toLowerCase()
         )
         if (foundGenre) {
           navigate('/')
           dispatch(selectGenreOrCategory(foundGenre.id))
         } else {
           const category = genreOrCategory.startWith('top') ? 'top_rated' : genreOrCategory
           navigate('/')
           dispatch(selectGenreOrCategory(category))
         }
       } else if (command === 'changeMode') {
         if (mode === 'light') {
           setMode('light')
         } else {
           setMode('dark')
         }
       } else if (command === 'login') {
         fetchToken()
       } else if (command === 'logout') {
         localStorage.clear()
         window.location.href = '/'
       } else if (command === 'search') {
         navigate('/')
         dispatch(searchMovie(query))
       }
     },
   })
 }, [])
}

export default useAlan