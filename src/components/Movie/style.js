import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    movie: {
        padding:'10px'
    },
    title: {
        color: theme.palette.text.primary,
        textOverflow:'ellipsis'
    }
}))
