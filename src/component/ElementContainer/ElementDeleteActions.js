/**
 * 
 * @param {*} elementId 
 * @param {*} type 
 * @param {*} parentUrn 
 * @param {*} index 
 * @param {*} eleIndex 
 * @param {*} parentId 
 * @param {*} cb 
 * @param {*} parentElement 
 * @param {*} parentElementIndex 
 * @returns 
 */
export const deleteShowHideUnit = (elementId, type, parentUrn, index,eleIndex, parentId, cb, parentElement, parentElementIndex) => (dispatch, getState) => {
    let _requestData = {
        projectUrn : config.projectUrn,
        entityUrn : parentUrn,
        workUrn : elementId,
        index : index.toString(),
        elementParentEntityUrn: parentUrn,
        sectionType: type
        // slateEntity : config.slateEntityURN
    }
    const { asideData ,showHideObj } = getState().appStore
    const parentElementUrn = getState().appStore.parentUrn
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(async (response)=>{
        let newIndex = eleIndex.split("-")
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];

        /** [PCAT-8699] ---------------------------- TCM Snapshot Data handling ------------------------------*/

        const deleteData = {
            deleteElemData: response.data,
            deleteParentData: newParentData,
            index: showHideObj.index,
            showHideObj,
            type: showHideObj.currentElement.type,
            parentUrn: parentElementUrn,
            asideData,
            contentUrn: showHideObj.currentElement.contentUrn
        }

        const { prepareTCMSnapshotsForDelete } = (await import("./ElementContainerDelete_helpers.js"))
        if (currentSlateData.status === 'approved') {
            await prepareTCMSnapshotsForDelete(deleteData);
        }
        else {
            prepareTCMSnapshotsForDelete(deleteData);
        }

        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }
        let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
        let condition;
        if (newIndex.length == 4) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
            if (condition.versionUrn == parentId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].interactivedata[type].splice(index, 1)
            }
        } else if (newIndex.length == 5) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
            if (condition.versionUrn == parentId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]].interactivedata[type].splice(index, 1)
            }
        }else if (newIndex.length == 6) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]];
            if (condition.versionUrn == parentId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].interactivedata[type].splice(index, 1)
            }
        } else if (newIndex.length == 7) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
            if (condition.versionUrn == parentId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]].interactivedata[type].splice(index, 1)
            }
        }else{
            condition =  newBodymatter[newIndex[0]]
            if(condition.versionUrn == parentId){
                newBodymatter[newIndex[0]].interactivedata[type].splice(index,1)
               
            }
        }
        if(parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)

        if (config.tcmStatus) {
            const { prepareTCMforDelete } = (await import("./ElementContainerDelete_helpers.js"))
            prepareTCMforDelete(elementId, dispatch, getState);
        }

        if(cb){
            cb("delete",eleIndex);
        } 
        dispatch({
            type: DELETE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newParentData,
            }
        })
  
    }).catch(error => {
        showError(error, dispatch, "error while creating element")
    })
}


const updateStorePostDelete = (deleteParams) => {
    const { 
        newParentData
    } = deleteParams
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    let element;
    if (newIndex.length == 4) {
        condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
        if (condition.versionUrn == parentId) {
            newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].interactivedata[type].splice(index, 1)
        }
    } else if (newIndex.length == 5) {
        condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
        if (condition.versionUrn == parentId) {
            newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]].interactivedata[type].splice(index, 1)
        }
    } else if (newIndex.length == 6) {
        condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]];
        if (condition.versionUrn == parentId) {
            newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].interactivedata[type].splice(index, 1)
        }
    } else if (newIndex.length == 7) {
        condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
        if (condition.versionUrn == parentId) {
            newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]].interactivedata[type].splice(index, 1)
        }
    } else {
        condition = newBodymatter[newIndex[0]]
        if (condition.versionUrn == parentId) {
            newBodymatter[newIndex[0]].interactivedata[type].splice(index, 1)

        }
    }
    if (parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)
}