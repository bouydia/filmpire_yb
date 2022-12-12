import React from 'react'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material'
import {Link} from 'react-router-dom'
import useStyles from './style'
const Movie = ({movie,i}) => {
    const classes = useStyles()
    
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
        <Grow key={i} in timeout={(i + 1 )* 250}>
          <Link className={classes.links} to={`/movie/${movie.id}`}>
            <div className={classes.imgContainer}>
               <img
              alt={movie.title}
              className={classes.cardImg}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/200/'
              }
            />
           </div>
            <Typography variant="h5" className={classes.title}>
              {movie.title}
            </Typography>
            <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
              <div>
                <Rating
                  value={movie.vote_average / 2}
                  readOnly
                  precision={0.1}
                />
              </div>
            </Tooltip>
          </Link>
        </Grow>
      </Grid>
    )
}

export default Movie