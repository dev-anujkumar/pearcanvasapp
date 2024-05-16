import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import './AIChatbox.css'
import { makeStyles } from '@mui/styles';
import { pastePostProcess } from '../PowerPasteElement/PowerPasteElement.jsx';

const useStyle = makeStyles((theme) => ({
    addSlateButton: {
        border: '1px solid #367ABF !important',
        fontSize: '14px !important',
        fontWeight: '600 !important',
        fontFamily: 'Open Sans !important',
        color: '#0D61A4 !important',
        textTransform: 'none !important',
        margin: '0px 12px 12px 52px !important',
        // color: 'rgba(25, 28, 30, 0.50)',
        '&:hover': {
            // border: 'none !important',
            background: '#EAF1FF !important',
        }
    },
}))


export const AIMessage = (props) => {
    const classes = useStyle();
    const divRef = useRef()

    const handleAddToSlate = () => {
        const parser = new DOMParser();
        const doc = parser?.parseFromString(props.value, "text/html")
        const innerBody = doc.body
        const elements = innerBody?.children ?? []
        if (!elements?.length) { return }
        pastePostProcess(elements, { createPowerPasteElements: props.createPowerPasteElements }, 'aiGeneratedText')
    }

    useEffect(() => {
        if(props?.value && divRef?.current)
            divRef.current.innerHTML = props.value
    }, [])

    return (
        <div className="ai-message-wrapper">
        <div ref={divRef} className="ai-message" ></div>
            <Button variant='outlined' onClick={handleAddToSlate} className={classes.addSlateButton} startIcon={<AddIcon />} >Add To Slate</Button>
        </div>
        

    //   <TextField
    //       variant='outlined'
    //       multiline
    //       fullWidth
    //       className={classes.textField}
    //       value={content}
    //       inputProps={{
    //           readOnly:true,
    //       }}
    //       InputProps={{
    //           endAdornment: (
    //               <InputAdornment position="start">
    //                   <Button variant="outlined" onClick={handleAddToSlate} className={classes.addSlateButton} startIcon={<AddIcon />} fullWidth>Add to Slate</Button>
    //               </InputAdornment>
    //           ),
    //       }}
    //   />
  )
}
