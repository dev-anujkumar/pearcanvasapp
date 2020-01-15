import axios from 'axios'
import config from '../../config/config';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../constants/Action_Constants'

/**
 * Action Creator
 * Retrieves the lock status of a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 */
export const getSlateLockStatus = (projectUrn, slateId) => (dispatch, getState) => { 
    if(config.isSlateLockChecked){
        return false;
    }
    let url = `${config.LOCK_API_BASE_URL}/locks?projectUrn=${projectUrn}&slateId=${slateId}`
    
    return axios.get(url)
        .then((res) => {
            if (!res.data.isLocked)
                config.isSlateLockChecked = true;

            /**
             * [PCAT-5745] - User Name instead of peroot id to be displayed when User Owns a lock on a slate,
             * Get user info based on lockedby userid
             */
            // TO DO : intentionally false condition given
            if (false) { // if (res.data.isLocked) {
                axios.get(`${config.JAVA_API_URL}v2/dashboard/userInfo/users/${res.data.userId}?userName=${res.data.userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "PearsonSSOSession": config.ssoToken
                    }
                }).then((response) => {
                    let userInfo = response.data;
                    dispatch({
                        type: SET_SLATE_LOCK_STATUS,
                        payload: {
                            ...res.data,
                            userFirstName: userInfo.firstName,
                            userLastName: userInfo.lastName
                        }
                    })
                })
                .catch(err => {
                    console.log('axios Error', err);
                })
            }
            else {
                dispatch({
                    type: SET_SLATE_LOCK_STATUS,
                    payload: {
                        ...res.data,
                        userFirstName: "",
                        userLastName: ""
                    }
                })
            }
        })
        .catch((err) => {
            // For local testing purpose
            /* dispatch({
                type: SET_SLATE_LOCK_STATUS,
                payload: {
                    isLocked: true,
                    timestamp: "",
                    userId: "abcd"
                }
            }) */
        })
} 

/**
 * This is a normal function which retrieves the lock status of a slate
 * @param {*} projectUrn Project URN
 * @param {*} slateId Slate manifest URN
 * @param {*} callback Callback method to be executed
 */
 export const getSlateLockStatusWithCallback = (projectUrn, slateId, callback) => { 
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
export const setSlateLock = (projectUrn, slateId, lockDuration) => (dispatch, getState) => {
    let url =`${config.LOCK_API_BASE_URL}/locks/typ/setlock`

    let data = {
        projectUrn,
        slateId,
        lockDuration
    }
    return axios.post(url, data)
        .then((res) => {
            config.releaseCallCount = 0
            console.log("API call successful. Slate lock status>>>>",res.data.slateStatus)
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
export const releaseSlateLock = (projectUrn, slateId) => (dispatch, getState) => {
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/releaselock`
    let data = {
       projectUrn,
       slateId
    }
    return axios.post(url, data)
       .then((res) => {
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
            if(callback){
                callback(res.data)
            }
        })
        .catch((err) => {
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
export const setLockPeriodFlag = (inLockPeriod) => (dispatch, getState) => {
    dispatch({
        type : SET_LOCK_FLAG,
        payload : inLockPeriod
    })
}