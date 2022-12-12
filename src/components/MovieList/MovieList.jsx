import React from 'react'
import { Grid } from '@mui/material'
import useStyles from './style'
import {Movie} from '..'
const MovieListe = ({ movies, numberOfMovie }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.movieContainer}>
      {movies?.results
        .map((movie, i) => <Movie key={i} i={i} movie={movie} />)
        .slice(0, numberOfMovie)}
    </Grid>
  )
}

export default MovieListe