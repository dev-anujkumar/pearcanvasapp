import React from 'react';
import TcmCloseIcon from '../../images/CanvasTCMPopup/TcmCloseIcon.png'
import TcmExpandIcon from '../../images/CanvasTCMPopup/TcmExpandIcon.png'
import TcmRefreshIcon from '../../images/CanvasTCMPopup/TcmRefreshIcon.png'
import { connect } from 'react-redux';
import TCMUtiles from '../TcmSnapshots/TCM'
import {handleTCM, closeTcmPopup} from '../CanvasWrapper/TCM_Canvas_Popup_Integrations'
import {loadTrackChanges} from '../CanvasWrapper/TCM_Integration_Actions'
import config from '../../config/config'


class RenderTCMIcons extends React.Component {
    constructor(props) {
        super(props);
    }

/**
    * This function Launch TCM SPA w.r.t. current Element
*/
    handleTCMSPALaunch = (e, elementId) =>{
        if (config.isSavingElement) {
            return false
        }
        e.stopPropagation();
        loadTrackChanges(elementId)
    }
    render() {
        const element = {id: this.props.tcmSnapshotData?.eURN}
        let userName = this.props.elementEditor ? this.props.elementEditor : this.props.tcmSnapshotData?.trackChangeApprover
        let date = this.props.tcmSnapshotData?.originalLastUpdatedTimestamp
        let readableDate = this.props.tcmSnapshotData?.lastUpdatedTimestamp
        return (
            <div className="tcmContainer">
            <div className="userNametcmIconContainer">
                <div className="userName">
                    <span>{userName}</span>
                </div>
                <div className="tcmIconContainer">
                    <span className="btn-element tcmIcon refresh">
                        {<img src={TcmRefreshIcon} id={(this.props.spinnerStatus) ? "loading" : ""} alt="TcmRefreshIcon" onClick={() => this.props.handleTCM(element)} />}
                    </span>
                    <span className="btn-element tcmIcon expand" onClick={(e) => this.handleTCMSPALaunch(e, element.id)}>
                        {<img src={TcmExpandIcon} alt="TcmExpandIcon" />}
                    </span>
                    <span id="tcmIcon close" className="btn-element tcmIcon close" onClick={() => this.props.closeTcmPopup()}>
                        {<img src={TcmCloseIcon} alt="TcmCloseIcon" />}
                    </span>
                </div>
            </div>
            <div className="tcmdStatusContainer">
                <span>{readableDate}</span>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tcmSnapshotData: state.tcmReducer.tcmSnapshotData,
        elementEditor: state.tcmReducer.elementEditor,
        spinnerStatus: state.tcmReducer.spinnerStatus
    };
};

export default connect(
    mapStateToProps,
    {
        handleTCM,
        closeTcmPopup
    }
)(RenderTCMIcons);
