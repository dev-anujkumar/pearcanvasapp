import config from '../../config/config';
import {
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
    UPDATE_POPUP_PARENT_SLATE
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
import { containerElements, autoNumber_ElementTypeToStoreKeysMapper, displayLabelsForContainer, convertToDefaultNumberType } from './AutoNumberConstants';
import { getContainerEntityUrn, getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { getImagesInsideSlates, getAutoNumberedElementsOnSlate, getAsideElementsWrtKey, getPopupDataInsideContainer, containerBodyMatter } from './slateLevelMediaMapper';
import ElementConstants from '../ElementContainer/ElementConstants';

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
    let mainIndex = index !== undefined ? index : elementObj?.indexPos;
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

export const findElementsInContainer = async (element, numberedElements = [], createdElementData) => {
    switch (element.type) {
        case containerElements.SHOW_HIDE:
            await getAllElementsInShowhide(element, numberedElements, createdElementData);
            break;
        case containerElements.MULTI_COLUMN:
            if (element?.subtype === ElementConstants.TAB) {
                let tabElements = element?.groupeddata?.bodymatter;
                for (let tab of tabElements) {
                    await getAllElementsInMultiColumn(tab.groupdata.bodymatter[0], numberedElements, createdElementData);
                }
            } else {
                await getAllElementsInMultiColumn(element, numberedElements, createdElementData);
            }
            break;
        case containerElements.POPUP:
            getAllElementsInPopup(element, numberedElements, createdElementData);
            break;
        case containerElements.ASIDE:
            await getAllElementsInAsideWE(element, numberedElements, createdElementData);
            break;
        case containerElements.MANIFEST:
            await getAllElementsInManifest(element, numberedElements, createdElementData);
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

const getAllElementsInAsideWE = async (containerData, numberedElements, createdElementData) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        for (let index in containerData?.elementdata?.bodymatter) {
            let element = containerData?.elementdata?.bodymatter[index];
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
                if (createdElementData.type === containerElements.ASIDE) {
                    numberedElements = await getPopupDataInsideContainer(element?.elementdata?.bodymatter, [], numberedElements, containerElements.ASIDE);
                }
            } else if ((element.type === 'manifest' && element.contents.bodymatter) || (element.type === 'showhide')) {
                await getSameElementsInsideElement(await containerBodyMatter(element), numberedElements, createdElementData);
            }
        }
    }
}

const getAllElementsInManifest = async (containerData, numberedElements, createdElementData) => {
    if (containerData?.contents?.bodymatter?.length > 0) {
        for (let index in containerData?.contents?.bodymatter) {
            let element = containerData?.contents?.bodymatter[index];
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
                if (createdElementData.type === containerElements.ASIDE) {
                    numberedElements = await getPopupDataInsideContainer(element?.elementdata?.bodymatter, [], numberedElements, containerElements.ASIDE);
                }
            } else if (element.type === 'showhide') {
                await getSameElementsInsideElement(await containerBodyMatter(element), numberedElements, createdElementData);
            }
        }
    }
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData
 * @param {*} numberedElements
 * @returns
 */
const getAllElementsInShowhide = async (containerData, numberedElements, createdElementData) => {
    const showHideContent = await containerBodyMatter(containerData);
    if (showHideContent?.length > 0) {
        for (let index in showHideContent) {
            let element = showHideContent[index];
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype });
                count++;
            } else if (element.type === 'element-aside') {
                await getSameElementsInsideElement(await containerBodyMatter(element), numberedElements, createdElementData);
            }
        }
    }
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData
 * @param {*} numberedElements
 * @returns
 */
 const getAllElementsInMultiColumn = async (containerData, numberedElements, createdElementData) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        for (let index in containerData?.groupeddata?.bodymatter) {
            let colData = containerData?.groupeddata?.bodymatter[index];
            if (colData?.groupdata?.bodymatter?.length > 0) {
                for (let innerIndex in colData?.groupdata?.bodymatter) {
                    let element = colData?.groupdata?.bodymatter[innerIndex];
                    element.parentDetails = containerData.parentDetails  || []
                    element.parentDetails.push(containerData.contentUrn) //multi-column id
                    element.parentDetails.push(colData.contentUrn) //column -id
                    if (element.displayedlabel === createdElementData.displayedlabel) {
                        let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                        numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel ||
                        'Figure', figuretype: element.figuretype, parentDetails: element?.parentDetails });
                    } else if (element.type === 'showhide' || element.type === 'element-aside') {
                        element.parentDetails.push(element.contentUrn)
                        await getSameElementsInsideElement(await containerBodyMatter(element), numberedElements, createdElementData);
                    }
                }
            }
        }
    }
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter
 * @param {*} imagesList
 * @returns
 */
export const getSameElementsInsideElement = async (bodyMatter, numberedElements = [], createdElementData) => {
    if (bodyMatter?.length > 0) {
        for (let index in bodyMatter) {
            let element = bodyMatter[index];
            if (element.displayedlabel === createdElementData.displayedlabel) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, index: index, indexPos: count, displayedlabel: element.displayedlabel, figuretype: element.figuretype });
                count++;
                if (createdElementData.type === containerElements.ASIDE) {
                    numberedElements = await getPopupDataInsideContainer(element?.elementdata?.bodymatter, [], numberedElements, containerElements.ASIDE);
                }
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        await getAllElementsInShowhide(element, numberedElements, createdElementData)
                        break;
                    case containerElements.MULTI_COLUMN:
                        if (element?.subtype === ElementConstants.TAB) {
                            let tabElements = element?.groupeddata?.bodymatter;
                            for (let tab of tabElements) {
                                await getAllElementsInMultiColumn(tab.groupdata.bodymatter[0], numberedElements, createdElementData);
                            }
                        } else {
                            await getAllElementsInMultiColumn(element, numberedElements, createdElementData);
                        }
                        break;
                    case containerElements.POPUP:
                        getAllElementsInPopup(element, numberedElements, createdElementData);
                        break;
                    case containerElements.ASIDE:
                        await getAllElementsInAsideWE(element, numberedElements, createdElementData)
                        break;
                    case containerElements.MANIFEST:
                        await getSameElementsInsideElement(element?.contents?.bodymatter, numberedElements, createdElementData);
                        break;
                }
            }
        }
    }
    return numberedElements
}


export const handleAutonumberingOnCreate = (type, createdElementData) => async (dispatch, getState) => {
    type = convertToDefaultNumberType.includes(type) ? 'IMAGE' : type;
    const listType = autoNumber_ElementTypeToStoreKeysMapper[type];
    const labelType = createdElementData.displayedlabel;
    let autoNumberedElementsObj = getState().autoNumberReducer.autoNumberedElements;
    let slateAncestorData = getState()?.appStore.currentSlateAncestorData;
    const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
    const slateManifestUrn = popupParentSlateData?.isPopupSlate ? popupParentSlateData?.parentSlateId : config.slateManifestURN;
    let bodyMatter = getState().appStore.slateLevelData[slateManifestUrn]?.contents?.bodymatter;
    let elementsList = autoNumberedElementsObj[listType];

    if (popupParentSlateData?.isPopupSlate) {
        addElementInPopupSlate(createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, listType, labelType, getState, dispatch);
    } else {
        let slateElements;
        switch (type) {
            case 'IMAGE':
            case 'VIDEO':
            case 'INTERACTIVE':
            case 'SMART_LINK':
            case 'MMI_ELM':
            case 'TABLE_EDITOR':
            case 'TABLEASMARKUP':
            case 'MATH_ML_CHEM_EDITOR':
            case 'AUTHOREDTEXT':
            case 'BLOCK_CODE_EDITOR':
            case 'CODELISTING':
            case 'AUDIO':
                slateElements = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[slateManifestUrn], { dispatch });
                break;
            case 'CONTAINER':
            case 'WORKED_EXAMPLE':
                slateElements = await getAsideElementsWrtKey(bodyMatter, containerElements.ASIDE, slateElements);
                break;
            default:
                slateElements = [];
        }

        let nearestElementObj = {};
        let elementObj = slateElements?.find(element => element.contentUrn === createdElementData.contentUrn);
        let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
        const activeLabelElements = slateElements?.filter(img => img.displayedlabel === createdElementData.displayedlabel);
        if (elementObj?.indexPos == 0 && activeLabelElements.length > 1) {
            let count = 0;
            slateElements.forEach(item => {
                item.indexPos = count;
                count++;
            });
            if ((elementsList && Object.keys(elementsList).length > 0) && slateEntityForAutonumber &&
            (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) && (Object.keys(elementsList[slateEntityForAutonumber]).length > 0)) {
                let nearestElementObj = findNearestElement(slateElements, elementObj, labelType);

                if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
                    let index = elementsList[slateEntityForAutonumber]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
                    index = nearestElementObj?.key === 'above' ? index + 1 : index;
                    elementsList[slateEntityForAutonumber]?.splice(index, 0, createdElementData);
                }
            } else {
                elementsList = {
                    ...elementsList,
                    [slateEntityForAutonumber]: []
                }
                elementsList[slateEntityForAutonumber].push(createdElementData);
            }
            updateCreatedElementInAutonumberList(listType, elementsList, autoNumberedElementsObj, dispatch);
        } else if (elementObj?.indexPos > 0 && activeLabelElements?.length > 1) {
            let count = 0;
            slateElements.forEach(item => {
                item.indexPos = count;
                count++;
            });
            nearestElementObj = findNearestElement(slateElements, elementObj, labelType);
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
        } else if (Array.isArray(elementObj?.indexPos)) {
            handleAutonumberingForElementsInContainers(bodyMatter, elementObj, createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj,
            slateElements, listType, labelType, getState, dispatch);
        } else if (activeLabelElements?.length === 1) {
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
export const handleAutonumberingForElementsInContainers = async (bodyMatter, elementObj, createdElementData, elementsList, slateAncestorData,
    autoNumberedElementsObj, slateElements, listType, labelType, getState, dispatch) => {
    let elementsInContainer = await findElementsInContainer(bodyMatter[elementObj.indexPos[0]], [], createdElementData);
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    let activeLabelElementsInSlate = slateElements?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
    if (elementsInContainer?.length > 1) {
        appendElementToList(elementsInContainer, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (elementsInContainer?.length == 1 && activeLabelElementsInSlate?.length > 1) {
        let count = 0;
        activeLabelElementsInSlate?.forEach(item => { item.indexPos = count; count++; });
        appendElementToList(activeLabelElementsInSlate, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (elementsInContainer?.length == 1 && activeLabelElementsInSlate?.length == 1) {
        checkElementExistenceInOtherSlates(createdElementData, config.slateEntityURN, getState, dispatch);
    }
}

export const addElementInPopupSlate = async (createdElementData, elementsList, slateAncestorData, autoNumberedElementsObj, listType, labelType, getState, dispatch) => {
    const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
    let popupSlateElements = [];
    let slateElements = [];
    if (displayLabelsForContainer.includes(createdElementData?.displayedlabel)) {
        popupSlateElements = await getAsideElementsWrtKey(getState().appStore.slateLevelData[config.slateManifestURN]?.contents?.bodymatter,
        containerElements.ASIDE, popupSlateElements);
        slateElements = await getAsideElementsWrtKey(getState().appStore.slateLevelData[popupParentSlateData?.parentSlateId]?.contents?.bodymatter,
        containerElements.ASIDE, slateElements);
    } else {
        popupSlateElements = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[config.slateManifestURN], { dispatch });
        slateElements = await getAutoNumberedElementsOnSlate(getState().appStore.slateLevelData[popupParentSlateData?.parentSlateId], { dispatch });
    }
    let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
    let activeLabelElements = popupSlateElements?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
    if (activeLabelElements?.length > 1) {
        let count = 0;
        popupSlateElements.forEach(item => {
            item.indexPos = count;
            count++;
        });
        appendElementToList(popupSlateElements, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
    } else if (activeLabelElements?.length == 1 && popupParentSlateData?.isPopupSlate) {
        let slateEntityForAutonumber = getContainerEntityUrn(slateAncestorData);
        let activeElements = slateElements?.filter(elem => elem.displayedlabel === createdElementData.displayedlabel);
        /* if active elements are there then modify indexPos key bcoz elements may be exist in containers */
        if (activeElements?.length > 0) {
            let count = 0;
            activeElements?.forEach(item => { item.indexPos = count; count++; });
        }
        if (activeElements?.length > 1) {
            appendElementToList(activeElements, createdElementData, labelType, elementsList, slateEntityForAutonumber, listType, autoNumberedElementsObj, dispatch);
        } else if (activeElements?.length == 1) {
            checkElementExistenceInOtherSlates(createdElementData, popupParentSlateData?.parentSlateEntityUrn, getState, dispatch);
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
        if ((Object.keys(elementsList).length > 0) && slateEntityForAutonumber && (Object.keys(elementsList).indexOf(slateEntityForAutonumber) > -1) &&
            elementsList[slateEntityForAutonumber].length > 0) {
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
    inputArr?.forEach(innerObj => {
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
 * Checks for chapters inside part/volume
 * @param {*} inputArr
 * @param {*} slatesArr
 * @returns
 */
export const updateSlateData = (allSlateData, chaptersArr) => {
    allSlateData.forEach(innerObj => {
        if (innerObj.label === 'volume') {
            updateSlateData(innerObj?.contents, chaptersArr);
        } else if (innerObj.label === 'part') {
            updateSlateData(innerObj?.contents, chaptersArr);
        } else if (innerObj.label === 'chapter') {
            chaptersArr.push(innerObj);
        }
    })
    return chaptersArr;
}

/**
 * Checks nearest same type element in diff slates
 * @param {*} createdElementData
 * @param {*} slateEntityURN
 * @returns
 */
export const checkElementExistenceInOtherSlates = (createdElementData, slateEntityURN, getState, dispatch) => {
    let allSlateData = getState()?.appStore?.allSlateData;
    const slateAncestorData = getState()?.appStore?.currentSlateAncestorData;
    const parentUrn = getContainerEntityUrn(slateAncestorData);
    const autoNumber_ElementTypeKey = getState()?.autoNumberReducer?.autoNumber_ElementTypeKey
    let autoNumberedElements = getState()?.autoNumberReducer?.autoNumberedElements;
    const listType = autoNumber_ElementTypeKey && autoNumber_ElementTypeKey[createdElementData?.displayedlabel];
    let elementsList = autoNumberedElements?.[listType];
    let parentEntityObject = {};
    let slateKey = '';
    let slatesArr = [];
    let chaptersArr = [];
    let slateIndex;
    let elementIndex = -1;
    if (parentUrn && allSlateData) {

        if (parentUrn === 'frontMatter' || parentUrn === 'backMatter') {
            parentEntityObject = allSlateData[parentUrn.toLowerCase()];
            getAllSlatesListInsideParent(parentEntityObject, slatesArr);
        } else {
            chaptersArr = updateSlateData(allSlateData['bodymatter'], chaptersArr);
            allSlateData['bodymatter'] = chaptersArr;
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

        if (slatesArr?.length > 1) {
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
        let initialIndex = elementsList[parentUrn].slice().reverse().findIndex(element => (element.slateEntityUrn === refrenceSlateEntityURN &&
                        element.displayedlabel === elementLabel));
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
