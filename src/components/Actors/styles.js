import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  profile: {
    width: '70%',
    borderRadius: '30px',
    display:'block',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
    },
  },
}))
