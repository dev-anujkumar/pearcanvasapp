import config from '../../config/config';
import {
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
    UPDATE_POPUP_PARENT_SLATE
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
import { containerBodyMatter } from './slateLevelMediaMapper';
import { containerElements, autoNumberElementsAllowed, autoNumber_ElementTypeToStoreKeysMapper, autoNumber_ElementTypeKey } from './AutoNumberConstants';
import { getContainerEntityUrn, getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { getImagesInsideSlates, getAsideElementsWrtKey } from '../FigureHeader/slateLevelMediaMapper';
import { getAutoNumberedElementsOnSlate } from './NestedFigureDataMapper';

export const updateCreatedElementInAutonumberList = (mediaType, mediaList, autoNumberedElementsObj, dispatch) => {
    dispatch({
        type: UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
        payload: {
            mediaType: mediaType,
            mediaList: mediaList
        }
    });
    autoNumberedElementsObj = {
        ...autoNumberedElementsObj,
        [mediaType]: mediaList
    }
    getAutoNumberSequence(autoNumberedElementsObj, dispatch)
}

export const findNearestElement = (elementsArr, elementObj, elementType, index = undefined) => {
    let objToReturn = {};
    let mainIndex = index !== undefined ? index : elementObj.indexPos;
    if (mainIndex > 0) {
        if (mainIndex > elementsArr.length) mainIndex = elementsArr.length;
        for (let i = mainIndex - 1; i > -1; i--) {
            if (elementsArr[i]?.displayedlabel === elementType) {
                objToReturn = {
                    key: 'above',
                    obj: elementsArr[i]
                }
                return objToReturn;
            }
        }
    }
    if (objToReturn === undefined || Object.keys(objToReturn).length === 0) {
        for (let i = mainIndex + 1; i < elementsArr.length; i++) {
            if (elementsArr[i]?.displayedlabel === elementType) {
                objToReturn = {
                    key: 'below',
                    obj: elementsArr[i]
                }
                return objToReturn;
            }
        }   
    }
    return objToReturn;
}

export const findElementsInContainer = (element, numberedElements = [], createdElementData) => {
    switch (element.type) {
        case containerElements.SHOW_HIDE:
            getAllElementsInShowhide(element, numberedElements, createdElementData);
            break;
        case containerElements.MULTI_COLUMN:
            getAllElementsInMultiColumn(element, numberedElements, createdElementData);
            break;
        case containerElements.POPUP:
            getAllElementsInPopup(element, numberedElements, createdElementData);
            break;
        case containerElements.ASIDE:
            getAllElementsInAsideWE(element, numberedElements, createdElementData);
            break;
        case containerElements.MANIFEST:
            getAllElementsInManifest(element, numberedElements, createdElementData);
            break;
    }
    return numberedElements;
}

export const getAllElementsInPopup = (containerData, numberedElements, createdElementData) => {
    containerData = {...containerData, indexPos: []}
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData?.indexPos.push(index)
            if (element.displayedlabel === createdElementData.displayedlabel) {
                containerData?.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData?.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos])
            }
        })
    }
    return numberedElements
}

const getAllElementsInAsideWE = (containerData, numberedElements, createdElementData) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
            } else if ((element.type === 'manifest' && element.contents.bodymatter) || (element.type === 'showhide')) {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, createdElementData);
            }
        })
    }
}

const getAllElementsInManifest = (containerData, numberedElements, createdElementData) => {
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
            } else if (element.type === 'showhide') {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, createdElementData);
            }
        })
    }
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} numberedElements 
 * @returns 
 */
const getAllElementsInShowhide = (containerData, numberedElements, createdElementData) => {
    const showHideContent = containerBodyMatter(containerData);
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype });
                count++;
            } else if (element.type === 'element-aside') {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, createdElementData);
            }
        })
    }
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} numberedElements 
 * @returns 
 */
 const getAllElementsInMultiColumn = (containerData, numberedElements, createdElementData) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach(colData => {
            if (colData?.groupdata?.bodymatter?.length > 0) {
                colData?.groupdata?.bodymatter.forEach((element, index) => {
                    element.parentDetails = containerData.parentDetails  || []
                    element.parentDetails.push(containerData.contentUrn) //multi-column id
                    element.parentDetails.push(colData.contentUrn) //column -id
                    if (element.displayedlabel === createdElementData.displayedlabel) {
                        let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                        numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype, parentDetails: element?.parentDetails });
                    } else if (element.type === 'showhide' || element.type === 'element-aside') {
                        element.parentDetails.push(element.contentUrn)
                        getImagesInsideElement(containerBodyMatter(element), numberedElements, createdElementData);
                    }
                })
            }
        })
    }
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const getImagesInsideElement = (bodyMatter, numberedElements = [], createdElementData) => {
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach((element, index) => {
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, index: index, indexPos: count, displayedlabel: element.displayedlabel, figuretype: element.figuretype });
                count++;
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        getAllElementsInShowhide(element, numberedElements, createdElementData)
                        break;
                    case containerElements.MULTI_COLUMN:
                        getAllElementsInMultiColumn(element, numberedElements, createdElementData)
                        break;
                    case containerElements.POPUP:
                        getAllElementsInPopup(element, numberedElements, createdElementData);
                        break;
                    case containerElements.ASIDE:
                        getAllElementsInAsideWE(element, numberedElements, createdElementData)
                        break;
                    case containerElements.MANIFEST:
                        getImagesInsideElement(element?.contents?.bodymatter, numberedElements, createdElementData);
                        break;
                }
            }
        })
    }
    return numberedElements
}


export const handleAutonumberingOnCreate = (type, createdElementData) => async (dispatch, getState) => {
    const listType = autoNumber_ElementTypeToStoreKeysMapper[type];
    const labelType = createdElementData.displayedlabel;
    let autoNumberedElementsObj = getState().autoNumberReducer.autoNumberedElements;
    let slateAncestorData = getState().appStore.currentSlateAncestorData;
    let bodyMatter = getState().appStore.slateLevelData[config?.slateManifestURN]?.contents?.bodymatter;
    let slateElements;
    switch (type) {
        case 'IMAGE':
        case 'VIDEO':
            slateElements = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[config?.slateManifestURN], { dispatch });
            break;
        case 'CONTAINER':
        case 'WORKED_EXAMPLE':
            slateElements = await getAsideElementsWrtKey(bodyMatter, 'element-aside', slateElements);
            break;
        default:
            slateElements = [];
    }

    let elementObj = slateElements.find(element => element.contentUrn === createdElementData.contentUrn);
    let elementsList = autoNumberedElementsObj[listType];
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    const activeLabelElements = slateElements?.filter(img => img.displayedlabel === createdElementData.displayedlabel);
    const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
    if (popupParentSlateData?.isPopupSlate) {
        addElementInPopupSlate(createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, listType, labelType, getState, dispatch);
    } else {
        if (elementObj.indexPos == 0 && activeLabelElements.length > 1) {
            let count = 0;
            slateElements.forEach(item => {
                item.indexPos = count;
                count++;
            });
            if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length > 0)) {
                let nearestElementObj = findNearestElement(slateElements, elementObj, labelType);
    
                if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                    let index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                    index = nearestElementObj?.key === 'above' ? index + 1 : index;
                    elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                }
            } else if (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1 && Object.keys(elementsList[slateEntityForAutonumber]).length === 0) {
                elementsList = {
                    ...elementsList,
                    [slateEntityForAutonumber]: []
                }
                elementsList[slateEntityForAutonumber].push(createdElementData);
            } else {
                elementsList = {
                    ...elementsList,
                    [slateEntityForAutonumber]: []
                }
                elementsList[slateEntityForAutonumber].push(createdElementData);
            }
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        } else if (elementObj.indexPos > 0 && activeLabelElements.length > 1) {
            let count = 0;
            slateElements.forEach(item => {
                item.indexPos = count;
                count++;
            });
            let nearestElementObj = findNearestElement(slateElements, elementObj, labelType);
    
            if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                let index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                index = nearestElementObj?.key === 'above' ? index + 1 : index;
                elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
            } else if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1)) {
                elementsList[slateEntityForAutonumber]?.splice(elementObj.indexPos, 0, createdElementData);
            } else {
                elementsList = {
                    ...elementsList,
                    [slateEntityForAutonumber]: []
                }
                elementsList[slateEntityForAutonumber].push(createdElementData);
            }
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        } else if (Array.isArray(elementObj.indexPos)) {
            handleAutonumberingForElementsInContainers(bodyMatter, elementObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, slateElements, listType, labelType, getState, dispatch);
        } else if (activeLabelElements.length === 1) {
            checkElementExistenceInOtherSlates(createdElementData, config.slateEntityURN, getState, dispatch);
        }
    }
}


/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const handleAutonumberingForElementsInContainers = (bodyMatter, elementObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, slateElements, listType, labelType, getState, dispatch) => {
    let elementsInContainer = findElementsInContainer(bodyMatter[elementObj.indexPos[0]], [], createdElementData);
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    let activeLabelElementsInSlate = slateElements?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
    if (elementsInContainer.length > 1) {
        appendElementToList(elementsInContainer, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (elementsInContainer.length == 1 && activeLabelElementsInSlate.length > 1) {
        let count = 0;
        activeLabelElementsInSlate?.forEach(item => { item.indexPos = count; count++; });
        appendElementToList(activeLabelElementsInSlate, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (elementsInContainer.length == 1 && activeLabelElementsInSlate.length == 1) {
        checkElementExistenceInOtherSlates(createdElementData, config.slateEntityURN, getState, dispatch);
    }
}

export const addElementInPopupSlate = async (createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, listType, labelType, getState, dispatch) => {
    let popupSlateFigures = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[config.slateManifestURN], { dispatch });
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    let activeLabelElements = popupSlateFigures?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
    const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
    let nearestElementObj = {};
    let index;
    if (activeLabelElements.length > 1) {
        let count = 0;
        popupSlateFigures.forEach(item => {
            item.indexPos = count;
            count++;
        });
        appendElementToList(popupSlateFigures, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (activeLabelElements.length == 1 && popupParentSlateData?.isPopupSlate) {
        let popupIndex = popupParentSlateData?.index;
        let popupParentSlateBodymatter = getState().appStore.slateLevelData[popupParentSlateData?.parentSlateId]?.contents?.bodymatter;
        let popupParentSlateEntityUrn = getState().appStore.slateLevelData[popupParentSlateData?.parentSlateId]?.contentUrn;
        let elementsInContainer = [];
        let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
        let slateElements = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[popupParentSlateData?.parentSlateId], { dispatch });
        let activeElements = slateElements?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
        if (typeof (popupIndex) == 'number') {
            if (activeElements.length > 1) {
                if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length > 0)) {
                    nearestElementObj = findNearestElement(activeElements, {}, labelType, popupIndex);
                    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                        index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                        index = nearestElementObj?.key === 'above' ? index + 1 : index;
                        elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                    }
                } else if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length === 0)) {
                    elementsList[slateEntityForAutonumber]?.push(createdElementData);
                } else {
                    elementsList = {
                        ...elementsList,
                        [slateEntityForAutonumber]: []
                    }
                    elementsList[slateEntityForAutonumber].push(createdElementData);
                }
                updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
            } else if (activeElements.length == 1) {
                checkElementExistenceInOtherSlates(createdElementData, popupParentSlateEntityUrn, getState, dispatch);
            }
        } else {
            let indexes = popupIndex.split('-');
            if ((indexes.length === 2 || indexes.length === 3) && popupParentSlateBodymatter[indexes[0]].type === containerElements.ASIDE) {
                getImagesInsideElement(containerBodyMatter(popupParentSlateBodymatter[indexes[0]]), elementsInContainer, createdElementData);
                if (elementsInContainer.length > 0 && indexes.length === 2) {
                    nearestElementObj = findNearestElement(elementsInContainer, createdElementData, labelType);
                    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
                            index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
                            index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 1]) ? index + 1 : index;
                            elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    }
                } else if (elementsInContainer.length > 0 && indexes.length === 3) {
                    let elementsInManifest = [];
                    getImagesInsideElement(containerBodyMatter(popupParentSlateBodymatter[indexes[0]].elementdata.bodymatter[popupParentSlateBodymatter[indexes[0]].elementdata.bodymatter.length - 1]), elementsInManifest, createdElementData);
                    if (elementsInManifest.length == 1) {
                        nearestElementObj = {
                            obj: elementsInManifest[0]
                        }
                    } else if (elementsInManifest.length > 1) {
                        nearestElementObj = findNearestElement(elementsInManifest, createdElementData, labelType);
                    } else {
                        nearestElementObj = {
                            obj: elementsInContainer[elementsInContainer.length - 1]
                        }
                    }
                    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
                            index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
                            if (elementsInManifest.length) {
                                index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 1]) ? index + 1 : index;
                            } else {
                                index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 2]) ? index + 1 : index;
                            }
                            elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    }
                } else if (elementsInContainer.length == 0 && activeElements.length > 0) {
                    if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length > 0)) {
                        nearestElementObj = findNearestElement(activeElements, {}, labelType, parseInt(indexes[0]));
                        if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                            index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                            index = nearestElementObj?.key === 'above' ? index + 1 : index;
                            elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                        }
                    } else if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length === 0)) {
                        elementsList[slateEntityForAutonumber]?.splice(figureObj.indexPos, 0, createdElementData);
                    } else {
                        elementsList = {
                            ...elementsList,
                            [slateEntityForAutonumber]: []
                        }
                        elementsList[slateEntityForAutonumber].push(createdElementData);
                    }
                    updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                } else if (elementsInContainer.length == 0 && activeElements.length == 0) {
                    checkElementExistenceInOtherSlates(createdElementData, popupParentSlateEntityUrn, getState, dispatch);
                }
            } else if ((indexes.length === 4 || indexes.length === 5) && popupParentSlateBodymatter[indexes[0]].type === containerElements.MULTI_COLUMN) {
                let elementsInInnerContainer = [];
                getImagesInsideElement(containerBodyMatter(popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter[indexes[1]].groupdata?.bodymatter[indexes[2]]), elementsInInnerContainer, createdElementData);
                if (elementsInInnerContainer.length > 0 && indexes.length === 4) {
                    nearestElementObj = findNearestElement(elementsInInnerContainer, createdElementData, labelType);
                    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
                            index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
                            index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 1]) ? index + 1 : index;
                            elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    }
                } else if (elementsInInnerContainer.length > 0 && indexes.length === 5) {
                    let elementsInManifest = [];
                    getImagesInsideElement(containerBodyMatter(popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter[indexes[1]].groupdata?.bodymatter[indexes[2]].elementdata.bodymatter[popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter[indexes[1]].groupdata?.bodymatter[indexes[2]].elementdata.bodymatter.length - 1]), elementsInManifest, createdElementData);
                    if (elementsInManifest.length == 1) {
                        nearestElementObj = {
                            obj: elementsInManifest[0]
                        }
                    } else if (elementsInManifest.length > 1) {
                        nearestElementObj = findNearestElement(elementsInManifest, createdElementData, labelType);
                    } else {
                        nearestElementObj = {
                            obj: elementsInInnerContainer[elementsInInnerContainer.length - 1]
                        }
                    }
                    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
                            index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
                            if (elementsInManifest.length) {
                                index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 1]) ? index + 1 : index;
                            } else {
                                index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 2]) ? index + 1 : index;
                            }
                            elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    }
                } else if (elementsInInnerContainer.length == 0 && (indexes.length === 4 || indexes.length === 5)) {
                    let elementsInOuterContainer = findElementsInContainer(popupParentSlateBodymatter[indexes[0]], [], createdElementData);
                    let elementsInCurrentColumn = [];
                    getImagesInsideElement(containerBodyMatter(popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter[indexes[1]]), elementsInCurrentColumn, createdElementData);
                    if (elementsInCurrentColumn.length > 0) {
                        nearestElementObj = findNearestElement(elementsInCurrentColumn, {}, labelType, parseInt(indexes[indexes.length - 2]));  // index of inner container
                        if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                            if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
                                let index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
                                index = nearestElementObj?.obj?.index < parseInt(indexes[indexes.length - 2]) ? index + 1 : index;
                                elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
                            } else {
                                elementsList = {
                                    ...elementsList,
                                    [slateEntityForAutonumber]: []
                                }
                                elementsList[slateEntityForAutonumber].push(createdElementData);
                            }
                            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                        }
                    } else if (elementsInCurrentColumn.length == 0 && elementsInOuterContainer.length > 0) {
                        let multiColumnLength = popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter.length;
                        if (indexes[1] === 0) {
                            nearestElementObj = {
                                key: 'below',
                                obj: elementsInOuterContainer[0]
                            }
                        } else if (multiColumnLength === (indexes[1] + 1)) {
                            nearestElementObj = {
                                key: 'above',
                                obj: elementsInOuterContainer[elementsInOuterContainer.length - 1]
                            }
                        } else {
                            let firstColumnElements = [];
                            let firstColumnId = popupParentSlateBodymatter[indexes[0]].groupeddata?.bodymatter[0].contentUrn;
                            firstColumnElements = elementsInOuterContainer.filter(function (data) {
                                return data.parentDetails && data.parentDetails.includes(firstColumnId)
                            })
                            if (firstColumnElements.length) {
                                nearestElementObj = {
                                    key: 'above',
                                    obj: firstColumnElements[firstColumnElements.length - 1]
                                }
                            } else {
                                nearestElementObj = {
                                    key: 'below',
                                    obj: elementsInOuterContainer[0]
                                }
                            }
                        }
                        if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                            index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                            index = nearestElementObj?.key === 'above' ? index + 1 : index;
                            elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                        } else if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1)) {
                            elementsList[slateEntityForAutonumber]?.splice(figureObj.indexPos, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    } else if (elementsInOuterContainer.length == 0 && activeElements.length > 0) {
                        if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length > 0)) {
                            nearestElementObj = findNearestElement(activeElements, {}, labelType, parseInt(indexes[0]));
                            if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                                index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                                index = nearestElementObj?.key === 'above' ? index + 1 : index;
                                elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                            }
                        } else if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length === 0)) {
                            elementsList[slateEntityForAutonumber]?.splice(figureObj.indexPos, 0, createdElementData);
                        } else {
                            elementsList = {
                                ...elementsList,
                                [slateEntityForAutonumber]: []
                            }
                            elementsList[slateEntityForAutonumber].push(createdElementData);
                        }
                        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
                    } else if (elementsInOuterContainer.length == 0 && activeElements.length == 0) {
                        checkElementExistenceInOtherSlates(createdElementData, popupParentSlateEntityUrn, getState, dispatch);
                    }
                } 
            }
        }
    }
}


export const appendElementToList = (elementsArr, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch) => {
    let elementObjInContainer = elementsArr.find(element => element.contentUrn === createdElementData.contentUrn);
    let indexPos = elementObjInContainer?.indexPos;
    elementObjInContainer = {
        ...elementObjInContainer,
        indexPos: indexPos
    }
    let nearestElementObj = findNearestElement(elementsArr, elementObjInContainer, labelType);
    if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && elementsList[slateEntityForAutonumber].length > 0) {
            let index = elementsList[slateEntityForAutonumber].findIndex(ele => ele.contentUrn === nearestElementObj?.obj?.contentUrn);
            index = nearestElementObj?.key === 'above' ? index + 1 : index;
            elementsList[slateEntityForAutonumber].splice(index, 0, createdElementData);
        } else {
            elementsList = {
                ...elementsList,
                [slateEntityForAutonumber]: []
            }
            elementsList[slateEntityForAutonumber].push(createdElementData);
        }
        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
    }
}

/**
 * Returns all slates inside FM/BM/Chapter
 * @param {*} inputArr 
 * @param {*} slatesArr 
 * @returns 
 */
export const getAllSlatesListInsideParent = (inputArr, slatesArr) => {
    inputArr.forEach(innerObj => {
        if (innerObj.label === 'module' || innerObj.label === 'appendix') {
            innerObj.contents.forEach(slateData => {
                slatesArr.push(slateData);
            })
        } else {
            slatesArr.push(innerObj);
        }
    })
}

/**
 * Checks nearest same type element in diff slates
 * @param {*} createdElementData 
 * @param {*} slateEntityURN 
 * @returns 
 */
export const checkElementExistenceInOtherSlates = (createdElementData, slateEntityURN, getState, dispatch) => {
    const allSlateData = getState().appStore?.allSlateData;
    const slateAncestorData = getState().appStore?.currentSlateAncestorData;
    const parentUrn = getContainerEntityUrn(slateAncestorData);
    let autoNumberedElements = getState().autoNumberReducer?.autoNumberedElements;
    const listType = autoNumber_ElementTypeKey[createdElementData?.displayedlabel];
    let elementsList = autoNumberedElements[listType];
    let parentEntityObject = {};
    let slateKey = '';
    let slatesArr = [];
    let slateIndex;
    let elementIndex = -1;
    if (parentUrn && allSlateData) {

        if (parentUrn === 'frontMatter' || parentUrn === 'backMatter') {
            parentEntityObject = allSlateData[parentUrn.toLowerCase()];
            getAllSlatesListInsideParent(parentEntityObject, slatesArr);
        } else {
            for (let matterType in allSlateData) {
                if (allSlateData[matterType] && allSlateData[matterType].length > 0) {
                    let index = allSlateData[matterType].findIndex(parentEntity => parentEntity.entityUrn === parentUrn);
                    if (index > -1) {
                        parentEntityObject = allSlateData[matterType][index];
                        getAllSlatesListInsideParent(parentEntityObject.contents, slatesArr);
                        break;
                    }
                }
            }
        }

        if (slatesArr.length > 1) {
            slateIndex = slatesArr.findIndex(slate => slate.entityUrn === slateEntityURN);
            if (slateIndex === (slatesArr.length - 1)) {
                slateKey = 'above';
            } else {
                slateKey = 'below';
            }
        }
        if (slateKey) {
            if ((elementsList && Object.keys(elementsList).length > 0) && parentUrn && (Object.keys(elementsList).indexOf(parentUrn) > -1)) {
                if (slateKey === 'below') {
                    elementIndex = findElementInNextSlates(slatesArr, slateIndex, elementsList, parentUrn, createdElementData?.displayedlabel);
                    if (elementIndex > -1 && (elementsList && Object.keys(elementsList).length > 0) && parentUrn && (Object.keys(elementsList[parentUrn]).length > 0)) {
                        elementsList[parentUrn].splice(elementIndex, 0, createdElementData);
                    }
                    if (elementIndex == -1) {
                        elementIndex = findElementInLastSlates(slatesArr, slateIndex, elementsList, parentUrn, createdElementData?.displayedlabel);
                        if (elementIndex > -1 && (elementsList && Object.keys(elementsList).length > 0) && parentUrn && (Object.keys(elementsList[parentUrn]).length > 0)) {
                            elementsList[parentUrn].splice(elementIndex + 1, 0, createdElementData);
                        }
                    }
                } else if (slateKey === 'above') {
                    elementIndex = findElementInLastSlates(slatesArr, slateIndex, elementsList, parentUrn, createdElementData?.displayedlabel);
                    if (elementIndex > -1 && (elementsList && Object.keys(elementsList).length > 0) && parentUrn && (Object.keys(elementsList[parentUrn]).length > 0)) {
                        elementsList[parentUrn].splice(elementIndex + 1, 0, createdElementData);
                    }
                }
            }
        }
        if (elementIndex === -1 || (!(elementsList.hasOwnProperty(parentUrn))) || (Object.keys(elementsList[parentUrn]).length === 0)) {
            elementsList = {
                ...elementsList,
                [parentUrn]: []
            }
            elementsList[parentUrn].push(createdElementData);
        }
        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElements, dispatch);
    }
}

export const findElementInLastSlates = (slatesArr, slateIndex, elementsList, parentUrn, elementLabel) => {
    let index;
    for (let i = slateIndex - 1; i > -1; i--) {
        let refrenceSlateEntityURN = slatesArr[i].entityUrn;
        let initialIndex = elementsList[parentUrn].slice().reverse().findIndex(element => (element.slateEntityUrn === refrenceSlateEntityURN && element.displayedlabel === elementLabel));
        index = initialIndex >= 0 ? (elementsList[parentUrn].length - 1) - initialIndex : initialIndex;
        if (index > -1) {
            return index;
        }
    }
    return index;
}

export const findElementInNextSlates = (slatesArr, slateIndex, elementsList, parentUrn, elementLabel) => {
    let index;
    for (let i = slateIndex + 1; i < slatesArr.length; i++) {
        let refrenceSlateEntityURN = slatesArr[i].entityUrn;
        index = elementsList[parentUrn].findIndex(element => (element.slateEntityUrn === refrenceSlateEntityURN && element.displayedlabel === elementLabel));
        if (index > -1) {
            return index;
        }
    }
    return index;
}

export const savePopupParentSlateData = (popupParentSlateData) => (dispatch) => {
    dispatch({
        type: UPDATE_POPUP_PARENT_SLATE,
        payload: popupParentSlateData
    });
}