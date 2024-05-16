import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { handleSendMessageAPI, updateChatHistory } from './chatboxAIActions';

const useStyle = makeStyles((theme) => ({
    textboxWrapper: {
        // position: 'fixed !important',
        bottom: '60px !important',
        width: "100%",
        marginLeft:'16px !important'
    },
    textField: {
        height: '96px !important',
        width: '100% !important',
        display: 'flex !important',
        alignItems: 'flex-start !important',
        '& .MuiInputBase-root': {
            fontSize: "16px !important",
            padding: '12px !important'
        }
    },
    sendButton: {
        float: 'right',
        margin: '6px 32px 0px 0px !important',
        backgroundColor: '#0D61A4 !important',
        fontSize: '14px !important',
        textTransform:"none !important"
    },
    promptErrorMessage: {
        color: '#A9353D',
        fontFamily: "Open Sans",
        fontSize: '14px',
        fontWeight: '400',
        marginLeft:30
    }
}))


export const PromptBox = (props) => {
    const classes = useStyle()
    const inputRef = useRef(null)
    const [isEmptyPropmt,setIsEmptyPrompt] = useState(false)
    const handleSendMessage = async () => {
        const inputText = inputRef.current.value
        if (inputText) {
            props.updateChatHistory({ sender: 'user', message: inputText })
            inputRef.current.value = null
            await handleSendMessageAPI(inputText)
        } else {
            setIsEmptyPrompt(true)
        }
    }
    const handleOnEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleInputChange = (e) => {
        if (e.target.value && isEmptyPropmt) {
            setIsEmptyPrompt(false)
        }
    }

  return (
      <div className={classes.textboxWrapper}>
          <TextField
              placeholder='Enter Your text Prompt here...'
              variant='outlined'
              multiline
              rows={3}
              inputRef={inputRef}
              className={classes.textField}
              onKeyDown={handleOnEnterPress}
              onChange={handleInputChange}
            //   fullWidth
            //   InputProps={{
            //       endAdornment: (
            //           <InputAdornment position="end">
            //               <SendIcon className={classes.sendButton} onClick={handleSendMessage} />
            //           </InputAdornment>
            //       ),
            //   }}
          />
          {isEmptyPropmt && <span className={classes.promptErrorMessage}>Please enter a prompt</span>}
          <Button
              component="label"
              role={undefined}
              variant="contained"
              className={classes.sendButton}
              onClick={handleSendMessage}
              tabIndex={-1}
              startIcon={<AutoAwesomeOutlinedIcon />}
          >
              Generate Text
          </Button>
      </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    updateChatHistory: updateChatHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptBox)