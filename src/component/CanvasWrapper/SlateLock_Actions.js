import axios from 'axios'
import config from '../../config/config';
import { SET_SLATE_LOCK_STATUS } from '../../constants/Action_Constants'

const WRAPPER_URL = config.WRAPPER_URL

const BASE_URL = config.LOCK_API_BASE_URL
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
            })
        })
        .catch((err) => {
            console.log("Slate lock info fetch failed:", err)
        })
} 

export const setSlateLock = (projectUrn, slateId, lockDuration, cb) => (dispatch, getState) => {
    let url =`locks/typ/setlock`

    let data = {
        projectUrn,
        slateId,
        lockDuration
    }
    return axiosInstance.post(url, data)
        .then((res) => {
            cb(res.data)
            // stopLoader()
            dispatch({
                type: SET_SLATE_LOCK_STATUS,
                payload: res.data
            })
        })
        .catch((err) => {
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
            cb(res.data)
        })
        .catch((err) => {
            console.log("error from set slate>>>>",err)
            if(cb){
                cb(err)
            }
        })
}
