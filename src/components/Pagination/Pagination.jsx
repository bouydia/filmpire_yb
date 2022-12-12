import React from 'react' 
import { Typography,Button } from '@mui/material'
import useStyle from './style'
const Pagination = ({currentPage,setPage,totalPages}) => {
    const classes = useStyle()
    const handlePrev = () => {
        if (currentPage != 1) {
            setPage(prev=>prev - 1)
        }
    }
    const handleNext = () => {
         if (currentPage != totalPages) {
           setPage(prev => prev + 1)
         }
    }
  return (
    <div className={classes.container}>
      <Button
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        next
      </Button>
    </div>
  )
}

export default Pagination