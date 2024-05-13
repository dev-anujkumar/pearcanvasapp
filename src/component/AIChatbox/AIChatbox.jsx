import React from 'react'
import { connect } from 'react-redux';
import './AIChatbox.css'
import { makeStyles } from '@mui/styles';
import Conversation from './Conversation.jsx';
import PromptBox from './PromptBox.jsx';
import { ChatboxHeader } from './ChatboxHeader.jsx';

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
          {/* <div className='draggable'></div> // add draggable option here and give dynamic width to 'chatbox-wrapper' class*/}
          <div className='wrapper-container'>
                <ChatboxHeader />
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
}

export default connect(mapStateToProps, mapActionToProps)(AIChatbox);