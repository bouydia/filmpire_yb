import React,{useEffect} from 'react'
import { List, Divider,ListItem, ListItemText, Box, CircularProgress, ListItemIcon ,ListSubheader} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import useStyles from './style'
const SideBar = ({ setMobileOpen }) => {
    const theme = useTheme()
    const classes = useStyles()
    const redLogo =
      'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png'
    const blueLogo =
      'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png'

    const demoCategories = [
      { label: 'Comedy', value: 'comedy' },
      { label: 'Action', value: 'action' },
      { label: 'Horror', value: 'horror' },
      { label: 'Animation', value: 'animation' },
    ] 
    const categories = [
      { label: 'Popular', value: 'popular' },
      { label: 'Top Rated', value: 'top_rated' },
      { label: 'Upcoming', value: 'upcoming' },
    ] 
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
            <ListItem onClick={() => setMobileOpen((prev)=>!prev)} button>
              <ListItemIcon>
                <img
                  src={redLogo}
                  alt=""
                  className={classes.genreImage}
                  hieght={30}
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
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => setMobileOpen((prev)=>!prev)} button>
              <ListItemIcon>
                <img
                  src={redLogo}
                  alt=""
                  className={classes.genreImage}
                  hieght={30}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}

export default SideBar