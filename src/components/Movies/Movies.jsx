import React from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery } from '../../services/TMDB'
import {MovieList} from '..'
const Movies = () => {
  const { data, isFetching,error } = useGetMoviesQuery()
  //`https://image.tmdb.org/t/p/${}`
  if(isFetching){
    return <Box display='flex' justifyContent={center}>
      <CircularProgress size='4rem'/>
    </Box>
  }
  if (!data.results.length) {
    return <Box display='flex' alignItems='center'>
      <Typography variant='h4'>No movie that match that name
        <br />
        Please search for somthing else
      </Typography>
    </Box>
  }
  if(error) return 'error has occured.'
  console.log(data)
  return (
    <div>
      <MovieList movies={data} />
  </div>
  )
}

export default Movies
