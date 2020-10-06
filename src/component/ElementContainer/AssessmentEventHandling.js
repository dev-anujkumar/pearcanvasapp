// // IMPORT - Plugins //
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store'
import { checkAssessmentStatus } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';

export const handleElmPortalEvents = () => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    // if (!checkSlateLock(slateLockInfo)) {
    let checkup = false;
    let elmAssessmentUpdate = async (event) => {
        try {
            const { data } = event;
            if (data) {
                window.addEventListener('load', (event) => {
                    if (event.currentTarget.opener) {
                        const { location: { origin } } = window;
                        console.log('load event fired', origin);
                        event.currentTarget.opener.postMessage('ready', origin);
                    }
                }, false);
                if (event.origin == 'https://127.0.0.1:3001' || event.origin == config.ELM_PORTAL_URL) {
                    console.log('Expected behavior!!!!!');
                    store.dispatch(checkAssessmentStatus('fromElmPortal'))
                }
            } else {
                console.log('Unexpected behavior!!!!!');
            }
        } catch (err) {
            console.log('Unexpected behavior', err);
        }
    }
    window.addEventListener('message', elmAssessmentUpdate, false);
    // }
}
