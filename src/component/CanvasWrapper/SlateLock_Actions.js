import axios from 'axios'
import config from '../../config/config';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../constants/Action_Constants'
import store from './../../appstore/store';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility';
import { triggerSlateLevelSave } from '../../js/slateLevelSave.js';
import { RELEASE_SLATE_LOCK_ACTION } from '../SlateWrapper/SlateWrapperConstants';

/**
 * Action Creator
 * Retrieves the lock status of a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 */
export const getSlateLockStatus = (projectUrn, slateId) => (dispatch) => {
    if(process.env.NODE_ENV === "development"){
        dispatch({
            type: SET_SLATE_LOCK_STATUS,
            payload: {
                isLocked : false,
                userId : ""
            }
        })
        return false
    }
    if(config.isSlateLockChecked){
        return false;
    }
    let url = `${config.LOCK_API_BASE_URL}/locks?projectUrn=${projectUrn}&slateId=${slateId}`

    // if projectUrn and slateId has values then only call should be triggered
    if (projectUrn && slateId) {
        return axios.get(url)
        .then((res) => {
            config.isSlateLockChecked = res.data.isLocked;
            sendDataToIframe({
                'type': 'updateLockedSlate',
                'message': {lockInfo: {...res.data, slateId: slateId}}
            })
            dispatch({
                type: SET_SLATE_LOCK_STATUS,
                payload: {
                    ...res.data,
                    userFirstName: "",
                    userLastName: ""
                }
            })
        })
        .catch((err) => {
            console.log("%c Slate lock status API failed","background: black; color: white", err)
        })
    }
}

/**
 * This is a normal function which retrieves the lock status of a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 * @param {*} callback Callback method to be executed
 */
 export const getSlateLockStatusWithCallback = (projectUrn, slateId, callback) => {
    if(process.env.NODE_ENV === "development"){
        return callback({isLocked : false, userId : ""})
    }
    let url = `${config.LOCK_API_BASE_URL}/locks?projectUrn=${projectUrn}&slateId=${slateId}`

    return axios.get(url)
        .then((res) => {
            if(callback)
                callback(res.data)
        })
        .catch((err) => {
        })
}

/**
 * Action Creator
 * Set lock on a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 * @param {*} lockDuration Lock duration
 */
export const setSlateLock = (projectUrn, slateId, lockDuration) => (dispatch) => {
    if(process.env.NODE_ENV === "development"){
        return false
    }
    if(hasReviewerRole()) return;
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/setlock`

    let data = {
        projectUrn,
        slateId,
        lockDuration
    }
    return axios.post(url, data)
        .then((res) => {
            config.releaseCallCount = 0
            dispatch({
                type : SET_LOCK_FLAG,
                payload : true
            })
        })
        .catch((err) => {
            console.log("error from set slate>>>>",err)
        })
 }

 /**
  * Action Creator
  * Releases lock on a slate
  * @param {*} projectUrn Project URN
  * @param {*} slateId Slate manifest URN
  */
export const releaseSlateLock = (projectUrn, slateId, releaseLockButton, userRole) => (dispatch) => {
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/releaselock`
    let data = {
       projectUrn,
       slateId
    }
    if(userRole) data.roleId = userRole
    return axios.post(url, data)
       .then((res) => {
            if(releaseLockButton){ // Condition to remove the lockinfo data on Unlock button clicked by Admin
                let lockInfo = {"isLocked":false,"userId":"","timestamp":"","firstName":"","lastName":""}
                dispatch(saveLockDetails(lockInfo))
                const lockDuration = 5400
                dispatch(setSlateLock(projectUrn, slateId, lockDuration))
            }
            dispatch({
                type : SET_LOCK_FLAG,
                payload : false
            })
        })
        .catch((err) => {
            console.log("API error from release slate>>>>",err)
        })
}

/**
 * This is a normal function which releases lock on a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 * @param {*} callback Callback method to be executed
 */
export const releaseSlateLockWithCallback = (projectUrn, slateId, callback) =>{
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/releaselock`
    let data = {
       projectUrn,
       slateId
    }
    return axios.post(url, data)
       .then((res) => {
           store.dispatch({
               type: SET_LOCK_FLAG,
               payload: false
           })
           triggerSlateLevelSave(config.slateEntityURN, RELEASE_SLATE_LOCK_ACTION);
            if(callback){
                callback(res.data)
            }
        })
        .catch((err) => {
            triggerSlateLevelSave(config.slateEntityURN, RELEASE_SLATE_LOCK_ACTION);
            if(callback){
                callback(err)
            }
        })
}

/**
 * Action Creator
 * Sets a flag after slate is locked
 * @param {*} inLockPeriod tells whether the slate is in lock period or not
 */
export const setLockPeriodFlag = (inLockPeriod) => (dispatch) => {
    dispatch({
        type : SET_LOCK_FLAG,
        payload : inLockPeriod
    })
}

/**
 * Action Creator
 * Sets User details on slate from count API response
 * @param {*} lockInfo tells the user details
 */
export const saveLockDetails = (lockInfo) => (dispatch) =>{
    dispatch({
        type: SET_SLATE_LOCK_STATUS,
        payload: {
            ...lockInfo,
            userFirstName: "",
            userLastName: ""
        }
    })
}