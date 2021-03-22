import { 
    CURRENT_SLATE_LF
} from '../../constants/Action_Constants.js';
export const currentSlateLO = (currentSlateLOData) =>  (dispatch, getState) => {
    return dispatch({
        type: 'CURRENT_SLATE_LO_DATA',
        payload: {
            currentSlateLOData: currentSlateLOData,
        }
    })
}

export const currentSlateLOMath = (currentSlateLODataMath) =>  (dispatch, getState) => {
    return dispatch({
        type: 'CURRENT_SLATE_LO_DATA_MATH',
        payload: {
            currentSlateLODataMath: currentSlateLODataMath,
        }
    })
}

export const isLOExist = (message) =>  (dispatch, getState) => {
    if(message && (((message.loObj && (message.loObj.id|| message.loObj.loUrn))|| message.loUrn) ||
        (message.toastData === "Learning Objectives has been aligned "))) {
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload: true
        })
    }
    // else if (message.toastData === "Learning Objectives has been unlinked ") {
    //     return dispatch({
    //         type: 'SLATE_TAG_ENABLE',
    //         payload:  false
    //     })
    // }
    // else if (message.toastData === "Learning Objectives has been aligned ") {
    //     return dispatch({
    //         type: 'SLATE_TAG_ENABLE',
    //         payload:  true
    //     })
    // }
    else if (message.assessmentResponseMsg){
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  message.assessmentResponseMsg
        })
    }
    else {
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  false
        })
    }
}
export const setCurrentModule = (moduleName) => (dispatch, getState) => {
    dispatch({
        type: 'SHOW_MODULE_NAME',
        payload: moduleName
    })
}
export const showSlateLockPopup = (showPopup) => (dispatch, getState) => {
    dispatch({
        type: 'SHOW_SLATE_LOCK_POPUP',
        payload: showPopup
    })
}
export const reRenderLO = (isRenderLO) => (dispatch, getState) => {
    dispatch({
        type: 'RE_RENDER_META_LO',
        payload: isRenderLO
    })
}

export const currentSlateLOType = (currentSlateLOData) => (dispatch) => {
    let learningFrameWork = '';
    if (currentSlateLOData?.description?.en === 'highereducation') {
        learningFrameWork = 'cypressLF'
    }
    else if (currentSlateLOData?.description) {
        learningFrameWork = 'externalLF'
    }
    return dispatch({
        type: CURRENT_SLATE_LF,
        payload: {
            currentSlateLF: learningFrameWork,
        }
    })
}