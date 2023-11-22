import { containerElements, autoNumberElementsAllowed, SHOWHIDE_SECTION, ELEMENT_TYPES } from './AutoNumberConstants';
import { SLATE_FIGURE_ELEMENTS } from "../../constants/Action_Constants";
import { getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { getSlateLevelData, updateChapterPopupData } from './AutoNumberActions';
import store from '../../appstore/store';
import ElementConstants from '../ElementContainer/ElementConstants';

export const getAutoNumberedElementsOnSlate = async (slateLevelData, params) => {
    const { dispatch } = params
    const bodyMatter = slateLevelData?.contents?.bodymatter || []
    const slateFigures = await getImagesInsideSlates(bodyMatter)
    if (slateFigures) {
        dispatch({
            type: SLATE_FIGURE_ELEMENTS,
            payload: {
                slateFigures
            }
        });
        return slateFigures;
    }
    return [];
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter
 * @param {*} imagesList
 * @returns
 */
export const getImagesInsideSlates = async (bodyMatter, numberedElements = [], parentIndex = [], parentDetails = [], popupElementsList = []) => {
    if (bodyMatter?.length > 0) {
        for (let index in bodyMatter) {
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
                        await getMediaElementInShowhide(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MULTI_COLUMN:
                        if (element?.subtype === ElementConstants.TAB) {
                            let tabElements = element?.groupeddata?.bodymatter;
                            for (let tab of tabElements) {
                                await getMediaElementInMultiColumn(tab.groupdata.bodymatter[0], numberedElements, [...element.indexPos]);
                            }
                        } else {
                            await getMediaElementInMultiColumn(element, numberedElements, [...element.indexPos]);
                        }
                        break;
                    case containerElements.POPUP:
                        if (popupElementsList.length) {
                            const popupData = popupElementsList.filter(function (data) {
                                return data.id == element.id
                            })
                            if (popupData.length > 0) await getMediaElementInPopup(popupData[0], numberedElements);
                        } else {
                            const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
                            const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
                            let popupContent = {};
                            popupContent = popupElementsData.find((data) => { return data.versionUrn === element?.versionUrn; })
                            if (popupParentData?.versionUrn === element?.versionUrn || !popupContent) {
                                popupContent = await getSlateLevelData(element.versionUrn, element.contentUrn);
                                if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                                updateChapterPopupData(popupContent, element?.versionUrn);
                            }
                            if (parentIndex?.length) popupContent.parentDetails = parentIndex;
                            await getMediaElementInPopup(popupContent, numberedElements);
                        }
                        break;
                    case containerElements.ASIDE:
                        await getMediaElementInAsideWE(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MANIFEST:
                        await getImagesInsideSlates(element?.contents?.bodymatter, numberedElements, [...element.indexPos]);
                        break;
                    case containerElements.GROUP:
                        await getImagesInsideSlates(element?.groupdata?.bodymatter, numberedElements, [...element.indexPos]);
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
export const getAsideElementsWrtKey = async (bodyMatter, typeKey, numberedElements = [], parentIndex = [], parentDetails = []) => {
    if (bodyMatter?.length > 0 && typeKey) {
        for (let index in bodyMatter) {
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
                        await getContainerInShowhide(element, numberedElements, typeKey);
                        break;
                    case containerElements.MULTI_COLUMN:
                        if (element?.subtype === ElementConstants.TAB) {
                            let tabElements = element?.groupeddata?.bodymatter;
                            for (let tab of tabElements) {
                                await getContainerInMultiColumn(tab.groupdata.bodymatter[0], numberedElements, [...element.indexPos], typeKey);
                            }
                        } else {
                            await getContainerInMultiColumn(element, numberedElements, [...element.indexPos], typeKey);
                        }
                        break;
                    case containerElements.POPUP:
                        const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
                        const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
                        let popupContent = {};
                        popupContent = popupElementsData.find((data) => { return data.versionUrn === element?.versionUrn; })
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

export const containerBodyMatter = async (container) => {
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
        case containerElements.MULTI_COLUMN:
            dataToReturn = container?.groupeddata?.bodymatter ?? []
            break;
        case containerElements.ASIDE:
            dataToReturn = container?.elementdata?.bodymatter ?? []
            break;
        case containerElements.POPUP:
            const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
            const popupElementsData = store.getState().autoNumberReducer?.popupElementsData;
            let popupContent = {};
            popupContent = popupElementsData.find((data) => { return data.versionUrn === container?.versionUrn; })
            if (popupParentData?.versionUrn === container?.versionUrn || !popupContent) {
                popupContent = await getSlateLevelData(container?.versionUrn, container?.contentUrn);
                updateChapterPopupData(popupContent, container?.versionUrn);
            }
            dataToReturn = popupContent?.contents?.bodymatter ?? [];
            break;
        case containerElements.MANIFEST:
        default:
            dataToReturn = container?.contents?.bodymatter ?? [];
            break;
    }
    return dataToReturn;
}
export const getMediaElementInPopup = async (containerData, numberedElements) => {
    containerData = {...containerData, indexPos: []}
    if (containerData?.contents?.bodymatter?.length > 0) {
        let bodyMatter = containerData?.contents?.bodymatter;
        for(let index in bodyMatter){
            let element = bodyMatter[index];
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
                await getImagesInsideSlates(await containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        }
    }
    return numberedElements
}
/**
 * Prepare list of media elements in Aside/WE
 * @param {*} containerData
 * @param {*} imagesList
 * @returns
 */
export const getMediaElementInAsideWE = async (containerData, numberedElements, parentIndex) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        let bodyMatter = containerData?.elementdata?.bodymatter;
        for (let index in bodyMatter) {
            let element = bodyMatter[index];
            element.parentDetails = containerData.parentDetails || []
            element.parentDetails.push(containerData.contentUrn) //as|we:head -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({ ...element })
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.parentDetails.push(element.contentUrn) //we:body | elemen -id
                let bodymatter = await containerBodyMatter(element);
                await getImagesInsideSlates(bodymatter, numberedElements, [...element.indexPos], element.parentDetails)
            }
        }
    }
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData
 * @param {*} imagesList
 * @returns
 */
export const getMediaElementInMultiColumn = async (containerData, numberedElements, parentIndex) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        let groupedDataBodyMatter = containerData?.groupeddata?.bodymatter;
        for(let i in groupedDataBodyMatter){
            let colData = groupedDataBodyMatter[i];
            if (colData.type === containerElements.GROUP) {
                containerData.indexPos = [...parentIndex];
                containerData.indexPos.push(i);
                if (colData?.groupdata?.bodymatter?.length > 0) {
                    let bodyMatter = colData?.groupdata?.bodymatter;
                    for(let index in bodyMatter){
                        let element = bodyMatter[index];
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
                            await getImagesInsideSlates(await containerBodyMatter(element), numberedElements, [...element.indexPos],element.parentDetails)
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
export const getMediaElementInShowhide = async (containerData, numberedElements, containerIndex) => {
    const showHideContent = await containerBodyMatter(containerData);
    if (showHideContent?.length > 0) {
        for(let index in showHideContent){
            let element = showHideContent[index];
            element.indexPos = [...containerData.indexPos]
            element.parentDetails = containerData.parentDetails || []
            element.parentDetails.push(containerData.contentUrn)  //showhide -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'container'  || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index);
                element.indexPos = [...containerData.indexPos];
                element.parentDetails.push(element.contentUrn);  //element -id
                await getImagesInsideSlates(await containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails);
            }
        }
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
export const getContainerInShowhide = async (containerData, numberedElements, elementType) => {
    const showHideContent = await containerBodyMatter(containerData)
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

