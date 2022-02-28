import config from '../../config/config';
import { containerElements, autoNumberElementsAllowed, SHOWHIDE_SECTION, ELEMENT_TYPES } from './AutoNumberConstants';
import { SLATE_FIGURE_ELEMENTS } from "../../constants/Action_Constants";
import { getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { getSlateLevelData, updateChapterPopupData } from './AutoNumberActions';
import store from '../../appstore/store';

export const getAutoNumberedElementsOnSlate = (slateLevelData, params) => {
    const { dispatch } = params
    const bodyMatter = slateLevelData?.contents?.bodymatter || []
    const slateFigures = getImagesInsideSlates(bodyMatter)
    if (slateFigures) {
        dispatch({
            type: SLATE_FIGURE_ELEMENTS,
            payload: {
                slateFigures
            }
        });
    }
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const getImagesInsideSlates = async (bodyMatter, numberedElements = [],parentIndex=[], parentDetails=[], popupElementsList = []) => {
    if (bodyMatter?.length > 0) {
        for(let index in bodyMatter){
            let element = bodyMatter[index];
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                if (parentIndex?.length) {
                    element.indexPos = [...parentIndex]
                    element.indexPos.push(index)
                } else {
                    element.indexPos = index
                }
                if (parentDetails?.length) {
                    element.parentDetails = parentDetails
                } else {
                    element.parentDetails = []
                }
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({ ...element })
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                element.indexPos = [...parentIndex]
                element.indexPos.push(index)
                if (parentIndex?.length) element.parentDetails = parentIndex
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        getMediaElementInShowhide(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MULTI_COLUMN:
                        getMediaElementInMultiColumn(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.POPUP:
                        const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
                        const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
                        let popupContent = {};
                        popupContent = popupElementsData.find( (data) => { return data.versionUrn === element?.versionUrn; })
                        if (popupParentData?.versionUrn === element?.versionUrn || !popupContent) {
                            popupContent = await getSlateLevelData(element.versionUrn, element.contentUrn);
                            if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                            updateChapterPopupData(popupContent, element?.versionUrn);
                        }
                        if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                        getMediaElementInPopup(popupContent, numberedElements)
                        break;
                    case containerElements.ASIDE:
                        getMediaElementInAsideWE(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MANIFEST:
                        getImagesInsideSlates(element?.contents?.bodymatter, numberedElements, [...element.indexPos]);
                        break;
                }
            }
        }
    }
    return numberedElements
}

export const getPopupDataInsideContainer = async (bodyMatter, parentIndex = [], numberedElements, typeKey) => {
    const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
    const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
    let popupContent = {};
    for (let headIndex in bodyMatter) {
        let innerElement = bodyMatter[headIndex];
        if (innerElement.type === containerElements.POPUP) {
            popupContent = popupElementsData.find((data) => { return data.versionUrn === innerElement?.versionUrn; });
            if (popupParentData?.versionUrn === innerElement?.versionUrn || !popupContent) {
                popupContent = await getSlateLevelData(innerElement?.versionUrn, innerElement?.contentUrn);
                if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                updateChapterPopupData(popupContent, innerElement?.versionUrn);
            }
            getContainerInPopup(popupContent, numberedElements, typeKey);
        } else if (innerElement.type === containerElements.MANIFEST) {
            for (let bodyIndex in innerElement?.contents?.bodymatter) {
                let bodyElement = innerElement?.contents?.bodymatter[bodyIndex];
                if (bodyElement.type === containerElements.POPUP) {
                    popupContent = popupElementsData.find((data) => { return data.versionUrn === bodyElement?.versionUrn; })
                    if (popupParentData?.versionUrn === bodyElement?.versionUrn || !popupContent) {
                        popupContent = await getSlateLevelData(bodyElement?.versionUrn, bodyElement?.contentUrn);
                        if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                        updateChapterPopupData(popupContent, bodyElement?.versionUrn);
                    }
                    getContainerInPopup(popupContent, numberedElements, typeKey);
                }
            }
        }
    }
    return numberedElements
}


/**
 * Get List of Aside Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const getAsideElementsWrtKey = async (bodyMatter, typeKey, numberedElements = [], parentIndex = [], parentDetails = [], popupElementsList =[]) => {
    if (bodyMatter?.length > 0 && typeKey) {
        for(let index in bodyMatter){
            let element = bodyMatter[index];
            if (element.type === typeKey) {
                if (parentIndex?.length) {
                    element.indexPos = [...parentIndex]
                    element.indexPos.push(index)
                } else {
                    element.indexPos = index
                }
                if (parentDetails?.length) {
                    element.parentDetails = parentDetails
                } else {
                    element.parentDetails = []
                }
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({ ...element })
                if (typeKey === containerElements.ASIDE) {
                    numberedElements = await getPopupDataInsideContainer(element?.elementdata?.bodymatter, parentIndex, numberedElements, typeKey);
                }
            } else if (Object.values(containerElements).indexOf(element.type) > -1) {
                element.indexPos = [...parentIndex];
                element.indexPos.push(index);
                if (parentIndex?.length) element.parentDetails = parentIndex;
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        getContainerInShowhide(element, numberedElements, typeKey);
                        break;
                    case containerElements.MULTI_COLUMN:
                        await getContainerInMultiColumn(element, numberedElements, [...element.indexPos], typeKey);
                        break;
                    case containerElements.POPUP:
                        const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
                        const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
                        let popupContent = {};
                        popupContent = popupElementsData.find( (data) => { return data.versionUrn === element?.versionUrn; })
                        if (popupParentData?.versionUrn === element?.versionUrn || !popupContent) {
                            popupContent = await getSlateLevelData(element.versionUrn, element.contentUrn);
                            if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                            updateChapterPopupData(popupContent, element?.versionUrn);
                        }
                        if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                        getContainerInPopup(popupContent, numberedElements, typeKey);
                        break;
                }
            }
        }
    }
    return numberedElements
}

export const containerBodyMatter = (container) => {
    let dataToReturn = []
    switch (container.type) {
        case containerElements.SHOW_HIDE:
            let showHideData = []
            if (container?.interactivedata?.hasOwnProperty(SHOWHIDE_SECTION.SHOW)) {
                showHideData = showHideData.concat(container?.interactivedata[SHOWHIDE_SECTION.SHOW])
            }
            if (container?.interactivedata?.hasOwnProperty(SHOWHIDE_SECTION.HIDE)) {
                showHideData = showHideData.concat(container?.interactivedata[SHOWHIDE_SECTION.HIDE])
            }
            dataToReturn = showHideData;
            break;
        case containerElements.GROUP:
            dataToReturn = container?.groupdata?.bodymatter ?? []
            break;
        case containerElements.ASIDE:
            dataToReturn = container?.elementdata?.bodymatter ?? []
            break;
        case containerElements.MANIFEST:
        case containerElements.POPUP:
        default:
            dataToReturn = container?.contents?.bodymatter ?? [];
            break;
    }
    return dataToReturn;
}
export const getMediaElementInPopup = (containerData, numberedElements) => {
    containerData = {...containerData, indexPos: []}
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData?.indexPos?.push(index) || [index]
            element.parentDetails = containerData.parentDetails  || []
            element.parentDetails.push(containerData.contentUrn)//popup id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData?.indexPos?.push(index)
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData?.indexPos?.push(index)
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index]
                element.parentDetails.push(element.contentUrn) //element id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
    return numberedElements
}
/**
 * Prepare list of media elements in Aside/WE
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInAsideWE = (containerData, numberedElements, parentIndex) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            element.parentDetails = containerData.parentDetails   || []
            element.parentDetails.push(containerData.contentUrn) //as|we:head -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.parentDetails.push(element.contentUrn) //we:body | elemen -id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInMultiColumn = (containerData, numberedElements, parentIndex) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach((colData, i) => {
            if (colData.type === containerElements.GROUP) {
                containerData.indexPos = [...parentIndex];
                containerData.indexPos.push(i);
                if (colData?.groupdata?.bodymatter?.length > 0) {
                    colData?.groupdata?.bodymatter.forEach((element, index) => {
                        element.parentDetails = containerData.parentDetails  || []
                        element.parentDetails.push(containerData.contentUrn) //multi-column id
                        element.parentDetails.push(colData.contentUrn) //column -id
                        if (element.type === ELEMENT_TYPES.FIGURE) {
                            containerData.indexPos.push(index)
                            element.indexPos = [...containerData.indexPos]
                            element.slateEntityUrn = getSlateEntityUrn()
                            numberedElements.push({...element})
                        } else if (element.type === 'container'|| (Object.values(containerElements).indexOf(element.type) > -1)) {
                            containerData.indexPos.push(index)
                            element.indexPos = [...containerData.indexPos]
                            element.parentDetails.push(element.contentUrn)  //element -id
                            getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos],element.parentDetails)
                        }
                    })
                }
            }
        })
    }
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInShowhide = (containerData, numberedElements, containerIndex) => {
    const showHideContent = containerBodyMatter(containerData)
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            element.indexPos = [...containerData.indexPos]
            element.parentDetails = containerData.parentDetails || []
            element.parentDetails.push(containerData.contentUrn)  //showhide -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'container'  || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.parentDetails.push(element.contentUrn)  //element -id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
}


export const getContainerInPopup = (containerData, numberedElements, elementType) => {
    containerData = {...containerData, indexPos: []}
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData?.indexPos?.push(index) || [index]
            element.parentDetails = containerData.parentDetails  || []
            element.parentDetails.push(containerData.contentUrn)//popup id
            if (element.type === elementType) {
                containerData?.indexPos?.push(index)
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === containerElements.MULTI_COLUMN || element.type === containerElements.SHOW_HIDE) {
                containerData?.indexPos?.push(index);
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index];
                element.parentDetails.push(element.contentUrn); //element id
                getAsideElementsWrtKey(containerBodyMatter(element), 'element-aside', numberedElements, [...element.indexPos], element.parentDetails);
            }
        })
    }
    return numberedElements
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getContainerInMultiColumn = async (containerData, numberedElements, parentIndex, elementType) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        for (let index in containerData?.groupeddata?.bodymatter) {
            let colData = containerData?.groupeddata?.bodymatter[index];
            if (colData?.type === containerElements.GROUP) {
                containerData.indexPos = [...parentIndex];
                containerData.indexPos.push(index);
                if (colData?.groupdata?.bodymatter?.length > 0) {
                    for (let innerIndex in colData?.groupdata?.bodymatter) {
                        let element = colData?.groupdata?.bodymatter[innerIndex];
                        element.parentDetails = containerData.parentDetails  || []
                        element.parentDetails.push(containerData.contentUrn) //multi-column id
                        element.parentDetails.push(colData.contentUrn) //column -id
                        if (element.type === elementType) {
                            containerData.indexPos.push(innerIndex);
                            element.indexPos = [...containerData.indexPos];
                            element.slateEntityUrn = getSlateEntityUrn();
                            numberedElements.push({...element});
                            if (elementType === containerElements.ASIDE) {
                                numberedElements = await getPopupDataInsideContainer(element?.elementdata?.bodymatter, parentIndex, numberedElements, elementType);
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getContainerInShowhide = (containerData, numberedElements, elementType) => {
    const showHideContent = containerBodyMatter(containerData)
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            element.indexPos = [...containerData.indexPos]
            element.parentDetails = containerData.parentDetails || []
            element.parentDetails.push(containerData.contentUrn)  //showhide -id
            if (element.type === elementType) {
                containerData.indexPos.push(index);
                element.indexPos = [...containerData.indexPos];
                element.slateEntityUrn = getSlateEntityUrn();
                numberedElements.push({...element});
            }
        })
    }
}

