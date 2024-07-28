import React, { useEffect } from 'react'
import { Typography,Grid,Button,Box } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useGetListQuery } from '../../services/TMDB'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userSelector } from '../../features/auth'
import {RatedCards} from '..'
const Profile = () => {
  const { user } = useSelector(userSelector)
  const { data: favoriteMovies,refetch:refetchFavorites } = useGetListQuery({
     listName: 'favorite/movies',
     accountId: user.id,
     sessionId: localStorage.getItem('session_id'),
     page: 1,
   })
   const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery(
     {
       listName: 'watchlist/movies',
       accountId: user.id,
       sessionId: localStorage.getItem('session_id'),
       page: 1,
     }
  )
  useEffect(() => {
    refetchFavorites()
    refetchWatchlisted()
  }, [])
  
  const logout = () => {
    localStorage.clear()
    window.location.href='/'
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movie to see them
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  )
}

export default Profile
