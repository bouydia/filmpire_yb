import React,{ useState } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery } from '../../services/TMDB'
import {MovieList,Pagination} from '..'
const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    state => state.currentgenreOrCategory
  )
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  })
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'))
  const numberOfMovies=lg?16:18
  if(isFetching){
    return <Box display='flex' justifyContent="center">
      <CircularProgress size='4rem'/>
    </Box>
  }
  if (!data?.results.length){
    return (<Box display='flex' alignItems='center'>
      <Typography variant='h4'>No movie that match that name
        <br />
        Please search for somthing else
      </Typography>
    </Box>)
  }
  if(error) return 'error has occured.'
  console.log(data)
  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  )
}

export default Movies
