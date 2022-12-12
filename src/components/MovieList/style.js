import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  movieContainer: {
    diplay: 'flex',
    justifyContent:'space-between',
    flexWrap: 'Wrap',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent:'center'
    }
  }
}))
