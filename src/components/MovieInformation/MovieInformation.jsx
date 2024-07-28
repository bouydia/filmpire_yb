import React,{useState,useEffect} from 'react'
import {Modal,Grid,Box,Typography,Button,ButtonGroup,useMediaQuery,CircularProgress,Rating} from '@mui/material'
import {Movie as MovieIcon,Theaters,Language,PlusOne,Favorite,FavoriteBorderOutlined,Remove,ArrowBack} from '@mui/icons-material'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { selectGenreOrCategory } from '../../features/currentgenreOrCategory.js'
import {Link,useParams} from 'react-router-dom'
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery
} from '../../services/TMDB'
import {MovieList} from '..'
import genreIcons from '../../assets/genres'
import useStyle from './styles'
import { userSelector } from '../../features/auth.js'
const MovieInformation = () => {
  //TODO watchlist and favorite issuse and posterImage
  const {user} =useSelector(userSelector)
  const { id } = useParams()
  const classes = useStyle()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data:favoriteMovies} = useGetListQuery({listName:'favorite/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1})
  const { data: watchlistMovies } = useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    })
  const { data: recommendations, isFetching: recommondationsIsFetching } = useGetRecommendationsQuery({ movie_id: id, list: 'recommendations' })

  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false)
  const [isMovieFavorited, setIsMovieFavorited] = useState(false)
  useEffect(() => {
      setIsMovieFavorited(!!favoriteMovies?.results?.find((movie)=>movie?.id===data?.id))
  },[favoriteMovies,data])
  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find(movie =>movie?.id === data?.id)
    )
  }, [watchlistMovies, data])  
  const addMovieToWatchList = async() => {
    axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    )
    setIsMovieWatchlisted(prev => !prev)
  }
  const addMovieToFavorites = async () => {
    axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      }
    )
    setIsMovieFavorited(prev => !prev)
    
  }
  
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
        <Link to="/">Somthing has gone wrong , go back</Link>
      </Box>
    )
  }
  console.log('Movie Information =>',data);
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{display:'flex',justifyContent:'center',marginBottom:'80px'}}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          className={classes.poster}
        />
      </Grid>
      <Grid item container sm={12} lg={7} direction="column">
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround} gutterBottom>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant="subtitle1">
              {(data?.vote_average).toFixed(1)} /10
            </Typography>
          </Box>
          <Typography variant="h6">{data?.runtime}min | Language {data?.spoken_languages[0].name}</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={i}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt={genre.name}
                className={classes.genreImage}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ marginBottom: '2rem', textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  Imdb
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addMovieToFavorites}
                  endIcon={
                    isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addMovieToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Wachlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary' }}>
                  <Typography component={Link} to="/" color="inherit">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box width="100%" marginTop="2rem">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovie={12} />
        ) : (
          <Box>nothing found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data.videos.results.length > 0 && (
          <iframe
            autoPlay
            frameBorder="0"
            title="Trailer"
            className={classes.video}
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          ></iframe>
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation
