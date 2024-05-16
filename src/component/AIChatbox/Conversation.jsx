import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import './AIChatbox.css'
import { Box, Container, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AIMessage } from './AIMessage.jsx';
import DefaultMessage from './DefaultMessage.jsx';
import sparkAnimation from './SparkAnimation.gif'
import { createPowerPasteElements } from '../SlateWrapper/SlateWrapper_Actions.js';
const useStyle = makeStyles((theme) => ({
    chatBoxBody: {
        display: 'flex !important',
        flexDirection: 'column !important',
        height: '53%',
        width: '100% !important',
        overflowY: 'auto !important',
        overflowX: 'hidden !important',
        // paddingRight: '4px !important',
        // paddingLeft: '0px !important',
        padding: '0px 6px 0px 16px !important',
        margin: '0px 0px 6px 0px !important',
    },
    userMessage: {
        display: 'flex !important',
        width: '100% !important',
        padding: '4px 8px !important',
        alignItems: 'center !important',
        fontSize: '14px !important',
        fontFamily: 'Open Sans !important',
        fontWeight: '400 !important' ,
        borderRadius: '8px 0px 8px 8px !important',
        background: '#FFF!important',
        border: '1px solid rgba(25, 28, 30, 0.12) !important',
        color: '#081E27 !important',
        height: 'auto !important',
        '& .MuiChip-label': {
            display: 'block !important',
            whiteSpace: 'normal !important',
            textAlign: 'right !important',
            paddingRight: '0 !important',
            paddingLeft: '0 !important',
        },
        // margin:'0px 6px 6px 6px'
    }
}))

export const Conversation = (props) => {
    const messageContainerRef = useRef()
    const classes = useStyle();

    useEffect(() => {
        // const lastElement = props.chatHistory.slice(-1)
        // console.log('lastElement', lastElement)
        // if (lastElement.length && lastElement[0].sender === "user") 
        if(props?.chatHistory?.length)
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        
    },[props?.chatHistory])

  return (
      <Container className={`${classes.chatBoxBody} ${props.isHeaderCollapsed ? 'chatbox-without-header' : ''} ${(props.isBannerVisible && !props.isHeaderCollapsed) ? 'chatbox-with-banner' : ''}`} ref={messageContainerRef}>
          
          {props?.chatHistory?.length ?
              <Box>
              {props.chatHistory.map((chat, index) => {
                  if (chat.sender === "user") {
                      return <Chip label={chat.message}
                          className={classes.userMessage}
                          variant={'filled'}
                          key={index}
                      />
                  } else {
                      return (
                          <AIMessage value={chat.message} key={index} createPowerPasteElements={props.createPowerPasteElements} />
                      )
                  }
              })}
                  <img src={sparkAnimation} />
              </Box>
              : <DefaultMessage />}
      </Container>
  )
}


const mapStateToProps = (state) => ({
    chatHistory: state.chatboxAIReducer.chatHistory,
    isBannerVisible: state.projectInfo.isBannerVisible,
    isHeaderCollapsed: state.projectInfo.isHeaderCollapsed
})

const mapDispatchToProps = {
    createPowerPasteElements
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)