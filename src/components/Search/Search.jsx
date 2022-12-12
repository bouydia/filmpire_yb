import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import useStyle from './styles'
import { useLocation } from 'react-router-dom'
import {searchMovie} from '../../features/currentgenreOrCategory'
const Search = () => {
    const dispatch=useDispatch()
    const [query,setQuery]=useState('')
  const classes = useStyle()
  const location=useLocation()
    const handleKeyPress = e => {
      if (e.key === 'Enter') {
        console.log('HERE', query)
        dispatch(searchMovie(query))
         console.log('After', query)
      }
  }
  if (location.pathname != '/') {
    return null
  }
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={e => setQuery(e.target.value)}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </div>
  )
}

export default Search