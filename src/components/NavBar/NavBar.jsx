import React, { useState, useEffect, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material'
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'
import { Link } from 'react-router-dom'
import useStyle from './style'
import { fetchToken, createSessionId ,movieApi} from '../../utils'
import { Search, SideBar } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userSelector } from '../../features/auth'
import { ColorModeContext } from '../../utils/ToggleColorMode'
const NavBar = () => {
  const colorMode=useContext(ColorModeContext)
  const {user,isAuthenticated}=useSelector(userSelector)
  const classes = useStyle()
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()
  const [mobileOpen,setMobileOpen]=useState(false)
  const dispatch=useDispatch()
  const token=localStorage.getItem('request_token')
  const sessionIdFromLocalStorage=localStorage.getItem('session_id')
  
  console.log(user)
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                  dispatch(setUser(userData))

        } 
        else {
          const sessionId = await createSessionId()
          const { data: userData } = await movieApi.get(
          `/account?session_id=${sessionId}`
          )
          dispatch(setUser(userData))
        }
      }
    };
    loginUser()
  }, [token])
  
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen(prev => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => colorMode.toggleColorMode()}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movie &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="peofile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              anchor="right"
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(prev => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
}

export default NavBar
