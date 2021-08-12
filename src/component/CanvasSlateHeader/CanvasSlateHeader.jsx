/**
* Root Component of Header Component.
*/

import React, { Component } from "react";
import '../../styles/CanvasSlateHeader/CanvasSlateHeader.css';
import Button from '../ElementButtons/ElementButton.jsx';
import config from '../../config/config'
import { SlateLockStatus} from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';

/**
* @description - CanvasSlateHeader is a class based component. It is defined simply
* to make a skeleton of the Header of Slate.
*/
 class CanvasSlateHeader extends Component {
    renderSlateLockJSX = (userName = "") => {
        return (
            <div className="canvas-header slate-lock-block">
                <Button type="lock-icon" />
                <span className="locked-slate-title">Locked Slate: {userName} </span><br />
            </div>
        )
    }

     renderSubscribedSlate = () => {
         return (
             <div className="canvas-header slate-lock-block">
                 <span className="locked-slate-title">Subscribed Slate (View only)</span><br />
             </div>
         )
     }
    
    checkSlateLock = (slateLockInfo,projectSharingRole,projectSubscriptionDetails) => {
        if(slateLockInfo){
            // TK-11991 - fixing test cases console errors
            let lockedUserId = slateLockInfo?.userId?.replace(/.*\(|\)/gi, ''); // Retrieve only PROOT id
            if(slateLockInfo.isLocked && config.userId !== lockedUserId){
                sendDataToIframe({ 'type': SlateLockStatus, 'message': { slateLockInfo: slateLockInfo } });
                return this.renderSlateLockJSX(slateLockInfo.userId) // (`${slateLockInfo.userFirstName} ${slateLockInfo.userLastName}`)
            }
            else if(projectSharingRole ==='SUBSCRIBER' && projectSubscriptionDetails){
                return this.renderSubscribedSlate()
            }
            else {
				sendDataToIframe({ 'type': SlateLockStatus, 'message': { slateLockInfo: slateLockInfo } });
                return null
            }
        }  
    }
    
    render() {
        const { slateLockInfo, projectSharingRole, projectSubscriptionDetails } = this.props
        return (
            <div className="slate-title">
                {this.checkSlateLock(slateLockInfo,projectSharingRole,projectSubscriptionDetails)}
            </div>
        )
    }
}
CanvasSlateHeader.displayName = "SlateHeader";
export default  CanvasSlateHeader ;
