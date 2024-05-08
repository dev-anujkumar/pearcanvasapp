import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    defaultMessage: {
        display: 'flex !important',
        width: '100% !important',
        padding: '4px 8px !important',
        alignItems: 'center !important',
        fontSize: '14px !important',
        fontFamily: 'Open Sans !important',
        fontWeight: '400 !important',
        borderRadius: '100px !important',
        border:'1px solid #367ABF !important',
        color: '#0D61A4 !important',
        height: 'auto !important',
        '& .MuiChip-label': {
            display: 'block !important',
            whiteSpace: 'normal !important',
            padding:'2px 6px !important'
        },
        margin:'8px 2px 8px 2px !important'
    },
    paceAIIntro: {
        fontSize: '14px !important',
        fontFamily: 'Open Sans !important',
    }
}))
const DefaultMessage = () => {
    const classes = useStyles()
  return (
      <Box>
          <Typography className={classes.paceAIIntro}>Welcome to the PAICE Assistant for content generation. Explore AI-powered tools to enhance your writing experience. Prompt history will be discarded when switching slates.</Typography>
          <Chip
              variant='outlined'
              className={classes.defaultMessage}
              label="Try starting a new paragraph."
              color='primary'
          />
          <Chip
              variant='outlined'
              className={classes.defaultMessage}
              label="Generate ideas for your slate."
              color='primary'
          />
          <Chip
              variant='outlined'
              className={classes.defaultMessage}
              label="Explore AI-generated content for inspiration."
              color='primary'
          />
    </Box>
  )
}

export default DefaultMessage