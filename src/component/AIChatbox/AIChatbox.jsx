import React from 'react'
import { connect } from 'react-redux';
import { Close } from '@mui/icons-material'
import './AIChatbox.css'
import { toggleAIChatbox } from './chatboxAIActions';
import { makeStyles } from '@mui/styles';
import Conversation from './Conversation.jsx';
import PromptBox from './PromptBox.jsx';

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: '1 !important',
        marginTop: '6px !important',
        position: 'relative !important',
        overflow: 'hidden !important'
    },
}))

const AIChatbox = (props) => {
   
    const classes = useStyle();
  return (
      <div className="chatbox-wrapper">
          <div className='wrapper-container'>
              <div className="chatbox-header">
                  <span className="header-label">Generate Text</span>
                  <span className="chatbox-close-icon"><Close onClick={() => props?.toggleAIChatbox(false)} /></span>
              </div>
              <div className={classes.root}>
                  <Conversation />
                  <PromptBox />
              </div>
          </div>
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapActionToProps = {
    toggleAIChatbox:toggleAIChatbox
}

export default connect(mapStateToProps, mapActionToProps)(AIChatbox);