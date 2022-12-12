import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  poster: {
    borderRadius: '20px',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    margintRight: '15px',
    width: '40px',
  },
  links: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
}))
