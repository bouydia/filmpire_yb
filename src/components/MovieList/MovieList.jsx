import React from 'react'
import { Grid } from '@mui/material'
import useStyles from './style'
import {Movie} from '..'
const MovieListe = ({ movies, numberOfMovie ,excludeFirst}) => {
  const classes = useStyles()
  const startFrom=excludeFirst?1:0
  return (
    <Grid container className={classes.movieContainer}>
      {movies?.results.slice(startFrom,numberOfMovie)
        .map((movie, i) => <Movie key={i} i={i} movie={movie} />)
        .slice(0, numberOfMovie)}
    </Grid>
  )
}

export default MovieListe