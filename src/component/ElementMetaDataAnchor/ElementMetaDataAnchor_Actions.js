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
    if(message && (message.loObj && (message.loObj.id|| message.loObj.loUrn))|| message.loUrn){
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload: true
        })
    }
    else if (message.toastData === "Learning Objectives has been unlinked ") {
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  false
        })
    }
    else if (message.toastData === "Learning Objectives has been aligned ") {
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  true
        })
    }
    else if (assessmentResponseMsg in message){
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  message.assessmentResponseMsg
        })
    }
    else{
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
