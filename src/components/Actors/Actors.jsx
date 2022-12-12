import React,{useState} from 'react'
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material'
import useStyle from './styles'
import { useGetActorQuery } from '../../services/TMDB'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { useGetMovieByActorQuery } from '../../services/TMDB'
import { MovieList,Pagination} from '..'

const Actors = () => {
  const [page, setPage] = useState(1)
  const {id} = useParams()
  const { data } = useGetActorQuery(id)
  const { data:movies, isFetching ,error} = useGetMovieByActorQuery({id,page})

  const classes=useStyle()
  const navigate = useNavigate()
  
   if (isFetching) {
     return (
       <Box display="flex" justifyContent="center" alignItems="center">
         <CircularProgress />
       </Box>
     )
   }
   if (error) {
     return (
       <Box display="flex" justifyContent="center" alignItems="center">
         <Button>Somthing has gone wrong , go back</Button>
       </Box>
     )
   }
  console.log("Actor => ",data);
  
  return (
    <>
      <Grid container>
        <Grid item lg={4} xs={12}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
            className={classes.profile}
          />
        </Grid>
        <Grid item lg={7} xs={12} position="column">
          <Typography variant="h3" align="center" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph gutterBottom>
            Born: {data?.biography}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            style={{ margin: '2rem 0' }}
          >
            <Button variant="contained" size="small" href="">
              IMDB
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="text"
              size="small"
              startIcon={<ArrowBack />}
            >
              BACK
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop='2rem' width="100%">
        <Typography variant='h3' textAlign='center' gutterBottom>Movies</Typography>
        <MovieList movies={movies} numberOfMovie={12} />
        <Pagination currentPage={page} setPage={setPage} totalPages={movies.total_pages} />
      </Box>
    </>
  )
}

export default Actors
