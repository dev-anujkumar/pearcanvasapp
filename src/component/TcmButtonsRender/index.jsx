import React from 'react';
import TcmCloseIcon from '../../images/CanvasTCMPopup/TcmCloseIcon.png'
import TcmExpandIcon from '../../images/CanvasTCMPopup/TcmExpandIcon.png'
import TcmRefreshIcon from '../../images/CanvasTCMPopup/TcmRefreshIcon.png'
import { connect } from 'react-redux';
import TCMUtiles from '../../component/TcmSnapshots/TCMpopup_Utilty'
import {handleTCM, handleTCMSPALaunch, closeTcmPopup} from '../CanvasWrapper/TCM_Canvas_Popup_Integrations'


class RenderTCMIcons extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const element = {id: this.props.tcmSnapshotData?.eURN}
        let userName = this.props.elementEditor
        let date = this.props.tcmSnapshotData?.originalLastUpdatedTimestamp
        let readableDate = this.props.tcmSnapshotData?.lastUpdatedTimestamp
        let readableTime = TCMUtiles.formatTime(date)
        return (
            <div className="tcmContainer">
            <div className="userNametcmIconContainer">
                <div className="userName">
                    <span>{userName}</span>
                    <span>{readableTime}</span>
                </div>
                <div className="tcmIconContainer">
                    <span className="btn-element tcmIcon">
                        {<img src={TcmRefreshIcon} alt="TcmRefreshIcon" onClick={() => this.props.handleTCM(element)} />}
                    </span>
                    <span className="btn-element tcmIcon" onClick={(e) => this.props.handleTCMSPALaunch(e)}>
                        {<img src={TcmExpandIcon} alt="TcmExpandIcon" />}
                    </span>
                    <span className="btn-element tcmIcon" onClick={() => this.props.closeTcmPopup()}>
                        {<img src={TcmCloseIcon} alt="TcmCloseIcon" />}
                    </span>
                </div>
            </div>
            <div className="tcmdStatusContainer">
                <span>{readableDate}, </span>
                <span>{'Added'}</span>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tcmSnapshotData: state.tcmReducer.tcmSnapshotData,
        elementEditor: state.tcmReducer.elementEditor,
    };
};

export default connect(
    mapStateToProps,
    {
        handleTCM,
        handleTCMSPALaunch,
        closeTcmPopup
    }
)(RenderTCMIcons);