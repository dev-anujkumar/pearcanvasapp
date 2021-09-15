import axios from 'axios'
import config from '../../config/config';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../constants/Action_Constants'
import store from './../../appstore/store';

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
    
    return axios.get(url)
        .then((res) => {
            config.isSlateLockChecked = res.data.isLocked;
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
export const releaseSlateLock = (projectUrn, slateId) => (dispatch) => {
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/releaselock`
    const isOwnerKey = localStorage.getItem('hasOwnerEdit');
    let data = {
       projectUrn,
       slateId
    }
    return axios.post(url, data)
       .then((res) => {
            if (isOwnerKey) {
                localStorage.removeItem('hasOwnerEdit');
            }
            dispatch({
                type : SET_LOCK_FLAG,
                payload : false
            })
        })
        .catch((err) => {
            if (isOwnerKey) {
                localStorage.removeItem('hasOwnerEdit');
            }
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
    console.log("Inside releaseslatelockwithcallback");
    let url = `${config.LOCK_API_BASE_URL}/locks/typ/releaselock`
    let isOwnerKey = localStorage.getItem('hasOwnerEdit');
    let data = {
       projectUrn,
       slateId
    }
    return axios.post(url, data)
       .then((res) => {
        console.log("response releaseslatelockwithcallback - isOwnerKey", isOwnerKey);
        if (isOwnerKey) {
            localStorage.removeItem('hasOwnerEdit');
        }
           store.dispatch({
               type: SET_LOCK_FLAG,
               payload: false
           })
            if(callback){
                callback(res.data)
            }
        })
        .catch((err) => {
            console.log("error releaseslatelockwithcallback - isOwnerKey", isOwnerKey);
            if (isOwnerKey) {
                localStorage.removeItem('hasOwnerEdit');
            }
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
