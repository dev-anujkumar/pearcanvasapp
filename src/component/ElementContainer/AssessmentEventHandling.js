/**Import -Plugins */
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store'
// import { checkAssessmentStatus } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { checkSlateLock } from '../../js/slateLockUtility';
import { releaseSlateLockWithCallback, getSlateLockStatus } from '../CanvasWrapper/SlateLock_Actions';
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
/**
 * This module deals with the event handling for the Update of Full and Embedded Elm Assessments
 * for the events triggered from the Elm Assessment Portal
*/
export const handleElmPortalEvents = (action = 'add') => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {

        let elmAssessmentUpdate = async (event) => {
            try {
                const { data } = event;
                if (action == 'add' && data && data.source == 'elm') {
                    console.log('Elm Events(TO BE REMOVED LATER) ONLY ADDED FOR TESTING---->', event.data)
                    if (data.action == 'approve') {
                        window.removeEventListener('message', elmAssessmentUpdate, false);
                    }
                    if (data.type == 'assessment') {
                        handleRefreshSlate(store.dispatch);
                    }
                }
                if (action == 'remove') {
                    window.removeEventListener('message', elmAssessmentUpdate, false);
                }
            } catch (err) {
                console.error('catch with err', err);
            }
        }
        window.addEventListener('message', elmAssessmentUpdate, false);
    }
}

/** This function handles Slate-Refresh when an Elm Event is received */
export const handleRefreshSlate = (dispatch) => {
    localStorage.removeItem('newElement');
    config.slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    config.slateEntityURN = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN
    config.tempSlateManifestURN = null
    config.tempSlateEntityURN = null
    config.isPopupSlate = false
    let id = config.slateManifestURN;
    releaseSlateLockWithCallback(config.projectUrn, config.slateManifestURN, (response) => {
        config.page = 0;
        config.scrolling = true;
        config.totalPageCount = 0;
        config.pageLimit = 0;
        config.fromTOC = false;
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': { slateRefreshStatus: 'Refreshing...' } });
        dispatch(handleSlateRefresh(id, () => {
            config.isSlateLockChecked = false;
            getSlateLockStatus(config.projectUrn, config.slateManifestURN)
        }))
    });
}
export const reloadSlate = () => {
    handleRefreshSlate(store.dispatch);
}
