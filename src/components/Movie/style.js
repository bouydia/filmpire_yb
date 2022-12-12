import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  movie: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
  },
  links: {
    fontWeight: 'bolder',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imgContainer: {
    borderRadius: '20px',
    maxHeight: '300px',
    width:'200px',
    marginBottom: '10px',
    overflow: 'hidden',
   
  },
  cardImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    transition: 'all .3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    objectFit: 'contain',
  },
}))
