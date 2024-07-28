import React,{useEffect} from 'react'
import { List, Divider,ListItem, ListItemText, Box, CircularProgress, ListItemIcon ,ListSubheader} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import useStyles from './style'
import { useGetGenresQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres'
import { useSelector, useDispatch } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentgenreOrCategory.js'

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
] 
  const redLogo ='https://fontmeme.com/permalink/230122/5aa252e997469c5f1c6f3fca85df8164.png'
    
  const blueLogo =
    'https://fontmeme.com/permalink/230122/f79425b2a7fd6b266df4bbb76639cf23.png'
    
const SideBar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    state => state.currentgenreOrCategory
  )
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()
  const { data, isFetching } = useGetGenresQuery()
  
  useEffect(() => {
    setMobileOpen(false)
  }, [genreIdOrCategoryName])
  

    
  
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode == 'light' ? redLogo : blueLogo}
          alt="logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader> Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />

      <List>
        <ListSubheader> Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                    width={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  )
}

export default SideBar