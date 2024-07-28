import React from 'react'
import { Link } from 'react-router-dom'
import { Typography,Box, Card, CardContent, CardMedia } from '@mui/material'
import useStyle from './style'
const FeaturedCard = ({ movie }) => {
    const classes=useStyle()
    return (
      <Box
        component={Link}
        to={`/movie/${movie.id}`}
        className={classes.featuredCardContainer}
      >
        <Card className={classes.card} classes={{ root: classes.cardRoot }}>
          <CardMedia
            component="img"
            alt={movie.title}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            className={classes.cardMedia}
          />
          <Box>
            <CardContent
              className={classes.cardContent}
              classes={{ root: classes.cardContentRoot }}
            >
              <Typography variant="h5" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body2" >
                {movie.overview}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    )
}

export default FeaturedCard