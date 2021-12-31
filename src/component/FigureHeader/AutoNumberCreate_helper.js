import config from '../../config/config';
import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
import { containerBodyMatter, getMediaElementInMultiColumn, getMediaElementInPopup } from './slateLevelMediaMapper';
import { containerElements, autoNumberElementsAllowed, autoNumber_ElementTypeToStoreKeysMapper, autoNumber_ElementTypeKey } from './AutoNumberConstants';
import { getContainerEntityUrn } from './AutoNumber_helperFunctions';
import { getImagesInsideSlates } from '../FigureHeader/slateLevelMediaMapper';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from './AutoNumberConstants';
const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

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

export const findNearestMediaElement = (slateFigures, figureObj, elementType, index = '') => {
    let objToReturn = {};
    let mainIndex = figureObj.indexPos || index;
    for (let i = mainIndex - 1; i > -1; i--) {
        if (slateFigures[i].displayedlabel === elementType) {
            objToReturn = slateFigures[i];
            return objToReturn;
        }
    }
    return objToReturn;
}

export const findMediaElementsInContainer = (element, numberedElements = []) => {
    switch (element.type) {
        case 'showhide':
            getAllMediaElementInShowhide(element, numberedElements)
            break;
        case 'groupedcontent':
            getAllMediaElementInMultiColumn(element, numberedElements)
            break;
        case 'popup':
            getMediaElementInPopup(element, numberedElements)
            break;
        case "element-aside":
            getAllMediaElementInAsideWE(element, numberedElements)
            break;
    }
    return numberedElements;
}

const getAllMediaElementInAsideWE = (containerData, numberedElements) => {
    let count = 0;
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            if (element.type === 'figure') {
                numberedElements.push({ contentUrn: element.contentUrn, index: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype })
                count++;
            } else if ((element.type === 'manifest' && element.contents.bodymatter) || (element.type === 'showhide')) {
                getImagesInsideElement(containerBodyMatter(element), numberedElements);
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
const getAllMediaElementInShowhide = (containerData, numberedElements) => {
    const showHideContent = containerBodyMatter(containerData);
    let count = 0;
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            if (element.type === 'figure') {
                numberedElements.push({ contentUrn: element.contentUrn, index: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype });
                count++;
            } else if (element.type === 'element-aside') {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, [...element.indexPos])
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
 const getAllMediaElementInMultiColumn = (containerData, numberedElements) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach(colData => {
            if (colData?.groupdata?.bodymatter?.length > 0) {
                colData?.groupdata?.bodymatter.forEach((element, index) => {
                    if (element.type === 'figure') {
                        let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].index + 1 : 0;
                        numberedElements.push({ contentUrn: element.contentUrn, index: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype });
                    } else if (element.type === 'showhide' || element.type === 'element-aside') {
                        getImagesInsideElement(containerBodyMatter(element), numberedElements, [...element.indexPos]);
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
export const getImagesInsideElement = (bodyMatter, numberedElements = [], parentIndex = []) => {
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach((element, index) => {
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].index + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, index: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype })
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                switch (element.type) {
                    case 'showhide':
                        getMediaElementInShowhide(element, numberedElements, index)
                        break;
                    case 'groupedcontent':
                        getMediaElementInMultiColumn(element, numberedElements)
                        break;
                    case 'popup':
                        getMediaElementInPopup(element, numberedElements)
                        break;
                    case "element-aside":
                        getMediaElementInAsideWE(element, numberedElements)
                        break;
                }
            }
        })
    }
    return numberedElements
}


export const handleAutonumberingOnCreate = (type, createdElementData) => (dispatch, getState) => {
    const listType = autoNumber_ElementTypeToStoreKeysMapper[type];
    const labelType = createdElementData.displayedlabel;
    let autoNumberedElementsObj = getState().autoNumberReducer.autoNumberedElements;
    let slateAncestorData = getState().appStore.currentSlateAncestorData;
    let bodyMatter = getState().appStore.slateLevelData[config?.slateManifestURN]?.contents?.bodymatter;
    let slateFigures = getImagesInsideSlates(bodyMatter);
    let figureObj = slateFigures.find(element => element.contentUrn === createdElementData.contentUrn);
    let elementsList = autoNumberedElementsObj[listType];
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);

    if (figureObj.indexPos == 0) {
        if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1)) {
            elementsList[slateEntityForAutonumber]?.splice(figureObj.indexPos, 0, createdElementData);
        } else {
            elementsList = {
                ...elementsList,
                [slateEntityForAutonumber]: []
            }
            elementsList[slateEntityForAutonumber].push(createdElementData);
        }
        updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
    } else if (figureObj.indexPos > 0) {
        let count = 0;
        slateFigures.forEach(item => {
            item.indexPos = count;
            count++;
        });
        let nearestElementObj = findNearestMediaElement(slateFigures, figureObj, labelType);

        if (nearestElementObj && Object.keys(nearestElementObj).length > 0) {
            let index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj.contentUrn);
            elementsList[slateEntityForAutonumber]?.splice(index + 1, 0, createdElementData);
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
    } else if (Array.isArray(figureObj.indexPos)) {
        handleAutonumberingForElementsInContainers(bodyMatter, figureObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, slateFigures, dispatch)
    }
}


/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const handleAutonumberingForElementsInContainers = (bodyMatter, figureObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, slateFigures, dispatch) => {
    let mediaElementsInContainer = findMediaElementsInContainer(bodyMatter[figureObj.indexPos[0]], []);
    let figureObjInContainer = mediaElementsInContainer.find(x => x.contentUrn === createdElementData.contentUrn);
    const listType = createdElementData?.figuretype === 'video' ? 'videosList' : 'imagesList'
    const labelType = createdElementData?.figuretype === 'video' ? "Video" : "Figure"
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    if (mediaElementsInContainer.length && figureObjInContainer.index > 0) {
        let indexPos = figureObjInContainer.index;
        figureObjInContainer = {
            ...figureObjInContainer,
            indexPos: indexPos
        }
        let nearestElementObj = findNearestMediaElement(mediaElementsInContainer, figureObjInContainer, labelType);
        if (nearestElementObj && Object.keys(nearestElementObj).length > 0) {
            if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1)) {
                let index = elementsList[slateEntityForAutonumber].findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
                elementsList[slateEntityForAutonumber].splice(index + 1, 0, createdElementData);
            } else {
                elementsList = {
                    ...elementsList,
                    [slateEntityForAutonumber]: []
                }
                elementsList[slateEntityForAutonumber].push(createdElementData);
            }
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        } else {
            let nearestElementObj = findNearestMediaElement(slateFigures, figureObjInContainer, labelType);
            if (nearestElementObj && Object.keys(nearestElementObj).length > 0) {
                let index = elementsList[slateEntityForAutonumber].findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
                elementsList[slateEntityForAutonumber].splice(index + 1, 0, createdElementData);
                updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
            } else {
                elementsList[slateEntityForAutonumber].splice(figureObj.index, 0, createdElementData);
                updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
            }
        }
    } else if (figureObjInContainer.index == 0) {
        figureObjInContainer = {
            ...figureObjInContainer,
            indexPos: figureObj.indexPos[0]
        }
        let nearestElementObj = findNearestMediaElement(slateFigures, figureObjInContainer, labelType);
        if (nearestElementObj && Object.keys(nearestElementObj).length > 0) {
            let index = elementsList[slateEntityForAutonumber]?.findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
            elementsList[slateEntityForAutonumber]?.splice(index + 1, 0, createdElementData);
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        } else {
            elementsList[slateEntityForAutonumber]?.splice(0, 0, createdElementData);
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        }
    }
}

export const getAllSlatesListInsideParent = (inputArr, slatesArr) => {
    inputArr.forEach(innerObj => {
        if (innerObj.label === 'module') {
            innerObj.contents.forEach(slateData => {
                slatesArr.push(slateData);
            })
        } else {
            slatesArr.push(innerObj);
        }
    })
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
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
    let elementIndex;
    if (parentUrn && allSlateData) {
        for (let matterType in allSlateData) {
            if (allSlateData[matterType] && allSlateData[matterType].length > 0) {
                let index = allSlateData[matterType].findIndex(parentEntity => parentEntity.entityUrn === parentUrn);
                if (index > -1) {
                    parentEntityObject = allSlateData[matterType][index];
                    getAllSlatesListInsideParent(parentEntityObject.contents, slatesArr);
                    console.log('slatesArr slatesArr', slatesArr);
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
                                if (elementIndex > -1) {
                                    elementsList[parentUrn].splice(elementIndex, 0, createdElementData);
                                }
                                if (elementIndex == -1) {
                                    elementIndex = findElementInLastSlates(slatesArr, slateIndex, elementsList, parentUrn, createdElementData?.displayedlabel);
                                    if (elementIndex > -1) {
                                        elementsList[parentUrn].splice(elementIndex + 1, 0, createdElementData);
                                    }
                                }
                            } else if (slateKey === 'above') {
                                elementIndex = findElementInLastSlates(slatesArr, slateIndex, elementsList, parentUrn, createdElementData?.displayedlabel);
                                if (elementIndex > -1) {
                                    elementsList[parentUrn].splice(elementIndex + 1, 0, createdElementData);
                                }
                            }
                        }
                    }
                    updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElements, dispatch);
                    break;
                }
            }
        }
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