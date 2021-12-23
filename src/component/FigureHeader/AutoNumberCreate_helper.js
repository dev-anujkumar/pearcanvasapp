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
import { containerElements, autoNumberElementsAllowed } from './AutoNumberConstants';

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


/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const handleAutonumberingForElementsInContainers = (bodyMatter, figureObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, slateFigures, dispatch) => {
    let mediaElementsInContainer = findMediaElementsInContainer(bodyMatter[figureObj.indexPos[0]], []);
    let figureObjInContainer = mediaElementsInContainer.find(x => x.contentUrn === createdElementData.contentUrn);
    if (mediaElementsInContainer.length && figureObjInContainer.index > 0) {
        let indexPos = figureObjInContainer.index;
        figureObjInContainer = {
            ...figureObjInContainer,
            indexPos: indexPos
        }
        let nearestElementObj = findNearestMediaElement(mediaElementsInContainer, figureObjInContainer, 'Figure');
        if (nearestElementObj) {
            if ((Object.keys(elementsList).length > 0) && slateAncestorData?.ancestor?.entityUrn && (Object.keys(elementsList).indexOf(slateAncestorData?.ancestor?.entityUrn) >-1)) {
                let index = elementsList[slateAncestorData.ancestor.entityUrn].findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
                elementsList[slateAncestorData.ancestor.entityUrn].splice(index + 1, 0, createdElementData);
            } else {
                elementsList = {
                    ...elementsList,
                    [slateAncestorData.ancestor.entityUrn]: []
                }
                elementsList[slateAncestorData.ancestor.entityUrn].push(createdElementData);
            }
            updateCreatedElementInAutonumberList('imagesList', elementsList, autoNumberedElementsObj, dispatch);
        } else {
            let nearestElementObj = findNearestMediaElement(slateFigures, figureObjInContainer, 'Figure');
            if (nearestElementObj) {
                let index = elementsList[slateAncestorData.ancestor.entityUrn].findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
                elementsList[slateAncestorData.ancestor.entityUrn].splice(index + 1, 0, createdElementData);
                updateCreatedElementInAutonumberList('imagesList', elementsList, autoNumberedElementsObj, dispatch);
            } else {
                elementsList[slateAncestorData.ancestor.entityUrn].splice(figureObj.index, 0, createdElementData);
                updateCreatedElementInAutonumberList('imagesList', elementsList, autoNumberedElementsObj, dispatch);
            }
        }
    } else if (figureObjInContainer.index == 0) {
        figureObjInContainer = {
            ...figureObjInContainer,
            indexPos: figureObj.indexPos[0]
        }
        let nearestElementObj = findNearestMediaElement(slateFigures, figureObjInContainer, 'image');
        if (nearestElementObj) {
            let index = elementsList[slateAncestorData.ancestor.entityUrn]?.findIndex(x => x.contentUrn === nearestElementObj.contentUrn);
            elementsList[slateAncestorData.ancestor.entityUrn]?.splice(index + 1, 0, createdElementData);
            updateCreatedElementInAutonumberList('imagesList', elementsList, autoNumberedElementsObj, dispatch);
        } else {
            elementsList[slateAncestorData.ancestor.entityUrn]?.splice(0, 0, createdElementData);
            updateCreatedElementInAutonumberList('imagesList', elementsList, autoNumberedElementsObj, dispatch);
        }
    }
}