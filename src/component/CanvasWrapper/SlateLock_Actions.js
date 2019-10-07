import axios from 'axios'
import config from '../../config/config';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../constants/Action_Constants'
import { classBody } from '@babel/types';

const WRAPPER_URL = config.WRAPPER_URL

const BASE_URL = config.LOCK_API_BASE_URL
// const BASE_URL = 'http://localhost:3030/'
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true //true if we are deploying on server
})

export const getSlateLockStatus = (projectUrn, slateId) => (dispatch, getState) => { 
    let url = `locks?projectUrn=${projectUrn}&slateId=${slateId}`
    
    return axiosInstance.get(url)
        .then((res) => {
            console.log("Slate lock info fetch success:", res)
            dispatch({
                type: SET_SLATE_LOCK_STATUS,
                payload: res.data
                // payload: {}
            })
        })
        .catch((err) => {
            console.log("Slate lock info fetch failed:", err)
        })
} 

export const getSlateLockStatusWithCallback = (projectUrn, slateId, callback) => { 
    let url = `locks?projectUrn=${projectUrn}&slateId=${slateId}`
    
    return axiosInstance.get(url)
        .then((res) => {
            console.log("Slate lock info fetch success:", res)
            if(callback)
                callback(res.data)
        })
        .catch((err) => {
            console.log("Slate lock info fetch failed:", err)
        })
} 

export const setSlateLock = (projectUrn, slateId, lockDuration) => (dispatch, getState) => {
    let url =`locks/typ/setlock`

    let data = {
        projectUrn,
        slateId,
        lockDuration
    }
    return axiosInstance.post(url, data)
        .then((res) => {
            console.log("API call successful. Slate lock status>>>>",res.data.slateStatus)
            /* dispatch({
                type : SET_LOCK_FLAG,
                payload : true
            }) */
            // stopLoader()
        })
        .catch((err) => {
            /* dispatch({
                type : SET_LOCK_FLAG,
                payload : true
            }) */
            window.parent.postMessage({
                'type': 'headerDisable',
                'message': false 
            }, WRAPPER_URL)
            // stopLoader()
            console.log("error from set slate>>>>",err)
        })
 }

export const releaseSlateLock = (projectUrn, slateId) => (dispatch, getState) => {
    let url = `locks/typ/releaselock`
    let data = {
       projectUrn,
       slateId
    }
    return axiosInstance.post(url, data)
       .then((res) => {
            console.log("Slate release API success>>Slalte release status", res.data)
            dispatch({
                type : SET_LOCK_FLAG,
                payload : false
            })
        })
        .catch((err) => {
            console.log("API error from release slate>>>>",err)
            dispatch({
                type : SET_LOCK_FLAG,
                payload : false
            })
        })
}
export const setLockPeriodFlag = (inLockPeriod) => (dispatch, getState) => {
    dispatch({
        type : SET_LOCK_FLAG,
        payload : inLockPeriod
    })
}