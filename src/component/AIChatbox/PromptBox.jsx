import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';
import { handleSendMessageAPI, updateChatHistory } from './chatboxAIActions';

const useStyle = makeStyles((theme) => ({
    textboxWrapper: {
        position: 'fixed !important',
        bottom: '0 !important',
    },
    textField: {
        height: '125px !important',
        width: '100% !important',
        display: 'flex !important',
        alignItems: 'flex-start !important',
        '& .MuiInputBase-root': {
            fontSize: "16px !important",
            padding: '12px !important'
        }
    },
    sendButton: {
        position: 'absolute !important',
        bottom: '0 !important',
        right: '6px !important',
        marginBottom: '6px !important',
        cursor: 'pointer !important'
    },
}))


export const PromptBox = (props) => {
    const classes = useStyle()
    const inputRef = useRef(null)

    const handleSendMessage = async () => {
        const inputText = inputRef.current.value
        if (inputText) {
            props.updateChatHistory({ sender: 'user', message: inputText })
            inputRef.current.value = null
            await handleSendMessageAPI(inputText)
        }
    }
    const handleOnEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSendMessage()
        }
    }
  return (
      <div className={classes.textboxWrapper}>
          <TextField
              placeholder='Enter Your text Prompt here...'
              variant='outlined'
              multiline
              rows={4}
              inputRef={inputRef}
              className={classes.textField}
              onKeyDown={handleOnEnterPress}
              fullWidth
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <SendIcon className={classes.sendButton} onClick={handleSendMessage} />
                      </InputAdornment>
                  ),
              }}
          />
      </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    updateChatHistory: updateChatHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptBox)