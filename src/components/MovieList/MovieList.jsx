import React from 'react'
import { Grid } from '@mui/material'
import useStyles from './style'
import {Movie} from '..'
const MovieListe = ({movie}) => {
  const classes=useStyles()
  return (
    <Grid container className={classes.movieContainer}>
      {movie.results.map((movie, i) => (
        <Movie key={i} i={i} movie={movie}/>
      ))}
    </Grid>
  )
}

export default MovieListe