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
        fontSize: '18px !important',
        fontFamily: 'Open Sans !important',
        color: '#354A53 !important',
        fontWeight:'400 !important'
    },
    examplePromptList: {
        fontSize: '14px !important',
        fontFamily: 'Open Sans !important',
        color: '#354A53 !important',
        fontWeight: '400 !important',
        listStyle:'inherit !important'
    },
    usageDirection: {
        fontSize: '14px !important',
        fontFamily: 'Open Sans !important',
        color: '#354A53 !important',
        fontWeight: '400 !important',
    }
}))
const DefaultMessage = () => {
    const classes = useStyles()
  return (
      <Box>
          <Typography className={classes.paceAIIntro}>Get started using AI in Cypress</Typography>
          <br/>
          <Typography className={classes.usageDirection}>Provide a prompt and we’ll generate text you can add directly to your Slate.</Typography>  
            <br/>
          <Typography className={classes.usageDirection}>Example prompts:</Typography>
          <ul className={classes.examplePromptList}>
              <li>Summarize the stages of the water cycle and their importance in ecosystems.</li>
              <li>Explain the supply and demand principles in economics.</li>
              <li>Analyze the symbolism in 'The Great Gatsby' by F. Scott Fitzgerald.</li>
          </ul>
    </Box>
  )
}

export default DefaultMessage