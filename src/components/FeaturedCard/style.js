import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cardRoot: {
    position: 'relative',
  },
  cardMedia: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100 %',
    height: '100%',
    background: 'rgba(0,0,0,05)',
    backgroundBlendMode: 'darken',
  },
    cardContent: {
        color: '#fff',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
        }
    },
    cardContentRoot: {
        position: 'relative',
        background:'transparent'
  },
}))
