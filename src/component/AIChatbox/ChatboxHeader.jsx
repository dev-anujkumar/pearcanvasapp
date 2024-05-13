import React from 'react'
import { connect } from 'react-redux'
import { Close } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
import { toggleAIChatbox } from './chatboxAIActions';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    helpIcon: {
        height: '20px !important',
        width: '20px !important',
        margin:'6px !important'
    },
    closeIcon: {
        height: '20px !important',
        width: '20px !important',
        margin: '6px !important'
    },
    tooltip: {
        fontSize: "14px !important",
        fontWeight: '400 !important'
    }
}))

export const ChatboxHeader = (props) => {
    const classes = useStyles();
    return (
        <div className="chatbox-header">
            <div className='header-labels'>
                <span className="header-label">Generate Text</span>
                <span className='beta-version'> Beta</span>
            </div>
            <div className='header-icons'>
                <Tooltip
                    title="Ai Help"
                    placement='bottom'
                    className={classes.tooltip}
                >
                    <HelpOutlineRoundedIcon className={classes.helpIcon} />
                </Tooltip>
                <Close className={classes.closeIcon} onClick={() => props?.toggleAIChatbox(false)} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    toggleAIChatbox: toggleAIChatbox
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatboxHeader)