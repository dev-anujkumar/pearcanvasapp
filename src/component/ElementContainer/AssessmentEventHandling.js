/**Import -Plugins */
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store'
import { checkAssessmentStatus } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { checkSlateLock } from '../../js/slateLockUtility';

/**
 * This module deals with the event handling for the Update of Full and Embedded Elm Assessments
 * for the events triggered from the Elm Assessment Portal
*/
export const handleElmPortalEvents = () => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {
        let slateData = store.getState().appStore.slateLevelData;
        let currentSlateData = JSON.parse(JSON.stringify(slateData))[config.slateManifestURN];
        let currentWorkUrn = "";
        if (currentSlateData.contents && currentSlateData.contents.bodymatter && currentSlateData.contents.bodymatter[0] && currentSlateData.contents.bodymatter[0].type == "element-assessment") {
            let currentAssessment = currentSlateData.contents.bodymatter[0];
            currentWorkUrn = currentAssessment && currentAssessment.elementdata.assessmentformat == 'puf' && currentAssessment.elementdata.assessmentid ? currentAssessment.elementdata.assessmentid : "";
        } else {
            currentWorkUrn = "forLaterUse"
        }
        
        console.log('<<<<<<currentWorkUrn>>>>>', currentWorkUrn)
        let elmAssessmentUpdate = async (event) => {
            try {
                const { data } = event;
                console.log('event.origin',event.origin)
                if (data) {//event.origin == config.ELM_PORTAL_URL && event.origin == 'https://127.0.0.1:3001' && 
                    console.log('IF behavior!!!!!',data);
                    currentWorkUrn.trim() != "" &&  store.dispatch(checkAssessmentStatus(currentWorkUrn, 'fromElmPortal'));
                    window.removeEventListener('message', elmAssessmentUpdate, false);
                } else {
                    console.log('else case!!!!!');
                }
            } catch (err) {
                console.log('catch with err', err);
            }
        }
        window.addEventListener('message', elmAssessmentUpdate, false);
    }
}