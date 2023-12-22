import config from '../../config/config';
import { getContainerEntityUrn, getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { autoNumber_ElementTypeKey, containerElementTypes, containerElements,
         autoNumberFigureTypesAllowed, SHOWHIDE_SECTION, autoNumberContainerTypeForDelete } from './AutoNumberConstants';
import { getImagesInsideSlates, getAsideElementsWrtKey, getAutoNumberedElementsOnSlate } from './slateLevelMediaMapper';
import {
    SLATE_FIGURE_ELEMENTS,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence, getSlateLevelData, updateChapterPopupData } from './AutoNumberActions';
import ElementConstants from '../ElementContainer/ElementConstants';
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

/**
 * Handle AUTO-NUMBERING on Delete
 * @param {*} params
 */
export const handleAutoNumberingOnDelete = async (params) => {
    const {
        type,
        contentUrn,
        getState,
        dispatch,
        isAutoNumberingEnabled    } = params
    const slateAncestors = getState().appStore.currentSlateAncestorData;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const autoNumberedElements = getState()?.autoNumberReducer.autoNumberedElements;
    const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
    if (popupParentSlateData?.isPopupSlate) {
        const popupContent = await getSlateLevelData(popupParentSlateData?.versionUrn, popupParentSlateData.contentUrn);
        updateChapterPopupData(popupContent, popupParentSlateData?.versionUrn);
    }
    if (isAutoNumberingEnabled) {
        if (containerElementTypes.includes(type)) {
            //reset auto-numbering
            updateAutoNumberSequenceOnDeleteInContainers(figureParentEntityUrn, getState, dispatch);
        }
        else if (type == 'figure') {
            //reset auto-numbering
            dispatch(updateAutoNumberSequenceOnDelete(figureParentEntityUrn, contentUrn, autoNumberedElements));
        }
    }
}
/**
 * This function resets sequence after DELETE when figure is deleted
 * @param {*} parentIndex
 * @param {*} contentUrn
 * @param {*} numberedElements
 * @param {*} dispatch
 */
export const updateAutoNumberSequenceOnDelete = (parentIndex, contentUrn, numberedElements) => (dispatch) => {
    if (parentIndex && contentUrn && numberedElements) {
        for (let labelType in numberedElements) {
            if (numberedElements[labelType]?.hasOwnProperty(parentIndex) && numberedElements[labelType][parentIndex]) {
                let index = numberedElements[labelType][parentIndex]?.findIndex(figure => figure.contentUrn === contentUrn);
                if (index > -1) {
                    numberedElements[labelType][parentIndex].splice(index, 1);
                    break;
                }
            }
        }
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            numberedElements
        }
    });
    getAutoNumberSequence(numberedElements, dispatch)
}

/**
 * This function resets sequence after DELETE when a container having figure is deleted
 * @param {*} parentIndex
 * @param {*} contentUrn
 * @param {*} getState
 * @param {*} dispatch
 */
export const updateAutoNumberSequenceOnDeleteInContainers = async (parentIndex, getState, dispatch) => {
    let { autoNumberedElements } = getState().autoNumberReducer;
    if (autoNumberedElements) {
        for (let labelType in autoNumberedElements) {
            let removeValFromIndex = [];
            if (autoNumberedElements[labelType]?.hasOwnProperty(parentIndex) && autoNumberedElements[labelType][parentIndex]?.length > 0) {
                let elementsInTocContainer = autoNumberedElements[labelType][parentIndex];
                let slateElements = [];
                const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
                const slateManifestUrn = popupParentSlateData?.isPopupSlate ? popupParentSlateData?.parentSlateId : config.slateManifestURN;
                if (autoNumberContainerTypeForDelete.includes(autoNumberedElements[labelType][parentIndex][0].type)) {
                    slateElements = await getAsideElementsWrtKey(getState().appStore.slateLevelData[slateManifestUrn]?.contents?.bodymatter,
                                    containerElements.ASIDE, slateElements);
                } else {
                    let slateLevelData = getState().appStore.slateLevelData;
                    slateElements = await getAutoNumberedElementsOnSlate(slateLevelData[slateManifestUrn], { dispatch });
                }
                if (slateElements?.length > 0) {
                    for (let [index, element] of elementsInTocContainer.entries()) {
                        const eleIndex = slateElements?.findIndex(slateElem => (slateElem.contentUrn === element.contentUrn))
                        const condition = element.slateEntityUrn == getSlateEntityUrn() && eleIndex === -1
                        condition && removeValFromIndex.push(index);
                    }

                } else {
                    for (let [index, element] of elementsInTocContainer.entries()) {
                        if (element.slateEntityUrn == getSlateEntityUrn()) {
                            removeValFromIndex.push(index);
                        }
                    }
                }
                if (removeValFromIndex.length) {
                    for (let i = removeValFromIndex.length - 1; i >= 0; i--)
                        autoNumberedElements[labelType][parentIndex].splice(removeValFromIndex[i], 1);
                }
            }
        }
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            numberedElements: autoNumberedElements
        }
    });
    getAutoNumberSequence(autoNumberedElements, dispatch);
}

export const deleteElementByLabelFromStore = (numberedElements, element, parentIndex) => {
    if (numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]]?.hasOwnProperty(parentIndex) &&
        numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][parentIndex].length > 0) {
        let index = numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][parentIndex]?.findIndex(    ele => ele.contentUrn === element.contentUrn);
        if (index > -1) {
            numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][parentIndex].splice(index, 1);
        }
    }
}


/**
 * Handle AUTO-NUMBERING on Swapping
 * @param {*} params
 */
export const handleAutoNumberingOnSwapping = async (isAutoNumberingEnabled, params) => {
    const {
        getState,
        dispatch,
        currentSlateData,
        swappedElementData
    } = params
    const numberedElements = getState().autoNumberReducer.autoNumberedElements;
    const slateAncestors = getState().appStore.currentSlateAncestorData
    const autoNumber_ElementTypeKey = getState()?.autoNumberReducer.autoNumber_ElementTypeKey
    const containerElements = ['popup', 'showhide', 'groupedcontent', 'element-aside', 'group']
    if (isAutoNumberingEnabled) {
        //reset indexes of images on a slate after swap
        const bodyMatter = currentSlateData.contents.bodymatter
        const slateFigures = await getImagesInsideSlates(bodyMatter)
        if (slateFigures) {
            dispatch({
                type: SLATE_FIGURE_ELEMENTS,
                payload: {
                    slateFigures
                }
            });
        }
        if (containerElements.indexOf(swappedElementData?.type) > -1) {
            updateAutoNumberSequenceOnSwappingContainers({ getState, dispatch, swappedElementData, numberedElements,
            slateFigures, slateAncestors, bodyMatter, autoNumber_ElementTypeKey })
        }
        else if (swappedElementData?.type === 'figure') {
            updateAutoNumberSequenceOnSwappingElements({ getState, dispatch, swappedElementData, numberedElements, slateFigures, slateAncestors, autoNumber_ElementTypeKey })
        }
    }
}



/**
 * This function resets sequence after DELETE when figure is swapped
 * @param {*} params
 */
export const updateAutoNumberSequenceOnSwappingElements = (params) => {
    const {
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData,
        autoNumber_ElementTypeKey
    } = params
    if (swappedElementData?.type === 'figure' && swappedElementData?.hasOwnProperty('displayedlabel')) {
        if (slateFigures || slateFigures?.length > 0) {
            const activeLabelFigures = slateFigures?.filter(img => img.displayedlabel === swappedElementData?.displayedlabel)
            const figureIndexOnSlate = activeLabelFigures?.findIndex(ele => ele?.contentUrn === swappedElementData?.contentUrn)
            if (activeLabelFigures?.length > 1) {
                let refIndex = ""
                if (figureIndexOnSlate == activeLabelFigures.length - 1) {
                    refIndex = figureIndexOnSlate
                }
                else {
                    refIndex = figureIndexOnSlate + 1
                }
                //find the closest image now and then add the new img at that index
                const referenceFigure = activeLabelFigures[refIndex].contentUrn
                const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
                const labelType = autoNumber_ElementTypeKey[swappedElementData.displayedlabel]
                if (figureParentEntityUrn && numberedElements) {
                    numberedElements[labelType][figureParentEntityUrn] =
                    numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.contentUrn !== swappedElementData.contentUrn)
                }
                if (referenceFigure) {
                    const refImageIndex = numberedElements[labelType][figureParentEntityUrn]?.findIndex(ele => ele.contentUrn === referenceFigure);
                    const newPosition = refImageIndex < 0 ? numberedElements[labelType][figureParentEntityUrn]?.length : refImageIndex;
                    numberedElements[labelType][figureParentEntityUrn]?.splice(newPosition, 0, swappedElementData)
                    dispatch({
                        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                        payload: {
                            numberedElements
                        }
                    });
                    getAutoNumberSequence(numberedElements, dispatch)
                }
            }
        }
    }
}


/**
 *  This function resets sequence after SWAP when a container having figure is swapped
 * @param {*} params
 */
export const updateAutoNumberSequenceOnSwappingContainers = async (params) => {
    const {
        getState,
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData,
        bodyMatter,
        autoNumber_ElementTypeKey
    } = params;

    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    let swappedElementsUrn = {};
    let nearestElement = {}
    let containerElementsOnSlate = [];
    let popupElementsList = [];

    if(swappedElementData.type === "popup"){
        popupElementsList = await getSlateLevelData(swappedElementData.versionUrn, swappedElementData.contentUrn);
        await getSwappedElementsURN(popupElementsList, swappedElementsUrn);
    } else {
        await getSwappedElementsURN(swappedElementData, swappedElementsUrn);
    }
    let swappedElementDisplaylabled = Object.keys(swappedElementsUrn);

    containerElementsOnSlate = await getAsideElementsWrtKey(bodyMatter, containerElements.ASIDE, containerElementsOnSlate, [], [], [popupElementsList]);
    getNearestElement(swappedElementsUrn, containerElementsOnSlate, slateFigures, nearestElement, getState);
    swappedElementDisplaylabled.forEach(label => {
        let swappedElementList = [];
        let nearestElementIndex;
        if(nearestElement[label]?.urn !== ""){
            let elementArray = numberedElements[autoNumber_ElementTypeKey[label]][figureParentEntityUrn];
            if (elementArray && elementArray?.length > 0) {
                elementArray.forEach((element, i) => {
                    if(swappedElementsUrn[label].includes(element?.contentUrn)){
                        swappedElementList.push(element);
                    }
                });
                elementArray = elementArray.filter(element =>  !swappedElementsUrn[label].includes(element?.contentUrn));
                nearestElementIndex = elementArray.findIndex(element => element?.contentUrn === nearestElement[label]?.urn);

                if(nearestElement[label]?.pos === 'below'){
                    nearestElementIndex += 1;
                }
                elementArray.splice(nearestElementIndex, 0, ...swappedElementList);
                numberedElements[autoNumber_ElementTypeKey[label]][figureParentEntityUrn] = elementArray;
            }
        }
    });
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            numberedElements
        }
    });
    getAutoNumberSequence(numberedElements, dispatch)
}

const storeSwappedUrn = (urn, displayedlabel, data) => {
    if(Array.isArray(data[displayedlabel])){
        data[displayedlabel].push(urn);
    } else {
        data[displayedlabel] = [urn];
    }
}

const getSwappedElementsURN = async (swappedElement, data) => {
    switch (swappedElement.type) {
        case containerElements.SHOW_HIDE:
            await getContentUrnFromShowHide(swappedElement?.interactivedata, data);
            break;
        case containerElements.MULTI_COLUMN:
            if (swappedElement?.subtype === ElementConstants.TAB) {
                let tabElements = swappedElement?.groupeddata?.bodymatter;
                for (let tab of tabElements) {
                    await getContentUrnFromMultiColumn(tab.groupdata.bodymatter[0].groupeddata?.bodymatter, data);
                }
            } else {
                await getContentUrnFromMultiColumn(swappedElement?.groupeddata?.bodymatter, data);
            }
            break;
        case containerElements.GROUP:
            await getContentUrnFromMultiColumn(swappedElement?.groupdata?.bodymatter[0].groupeddata?.bodymatter, data);
            break;
        case containerElements.ASIDE:
            storeSwappedUrn(swappedElement?.contentUrn, swappedElement?.displayedlabel, data);
            await getContentUrnFromAsideWE(swappedElement?.elementdata?.bodymatter, data);
            break;
        case containerElements.MANIFEST:
            await getContentUrnFromAsideWE(swappedElement?.contents?.bodymatter, data);
            break;
        case containerElements.POPUP:
            if(swappedElement?.contents?.bodymatter){
                await getContentUrnFromPopUp(swappedElement?.contents?.bodymatter, data);
            } else {
                let popupElementsList = await getSlateLevelData(swappedElement.versionUrn, swappedElement.contentUrn);
                await getContentUrnFromPopUp(popupElementsList?.contents?.bodymatter, data);
            }
            break
    }
}

const checkForSwappedElement = async (elemData, data) => {
    if(autoNumberFigureTypesAllowed.includes(elemData?.figuretype)){
        storeSwappedUrn(elemData?.contentUrn, elemData?.displayedlabel, data);
    }
    if(containerElementTypes.includes(elemData?.type)){
        await getSwappedElementsURN(elemData, data)
    }
}

const getContentUrnFromMultiColumn = async (bodymatter, data) => {
    if(bodymatter?.length > 0) {
        for(let i in bodymatter){
            let colData = bodymatter[i];
            if(colData?.groupdata?.bodymatter.length > 0){
                let groupBodyMatter = colData?.groupdata?.bodymatter;
                for(let j in groupBodyMatter){
                    await checkForSwappedElement(groupBodyMatter[j], data);
                }
            }
        };
    }
}

const getContentUrnFromAsideWE = async (bodymatter, data) => {
    if(bodymatter?.length > 0){
        for(let i in bodymatter){
            let elemData = bodymatter[i];
            if(autoNumberFigureTypesAllowed.includes(elemData?.figuretype)){
                storeSwappedUrn(elemData?.contentUrn, elemData?.displayedlabel, data);
            }
            if(containerElementTypes.includes(elemData?.type) || containerElements.MANIFEST === elemData?.type){
                await getSwappedElementsURN(elemData, data)
            }
        }
    }
}

const getContentUrnFromShowHide = async (interactivedata, data) => {
    let showHideKeys = Object.values(SHOWHIDE_SECTION);
    for(let i in showHideKeys){
        let section = showHideKeys[i];
        for(let j in interactivedata[section]){
            await checkForSwappedElement(interactivedata[section][j], data);
        }
    }
}

const getContentUrnFromPopUp = async (bodymatter, data) => {
    if(bodymatter?.length > 0){
        for(let i in bodymatter){
            await checkForSwappedElement(bodymatter[i], data);
        }
    }
}

const getNearestElement = (swappedElementsUrn, containerElementsOnSlate, slateFigures, nearestElement, getState) => {
        let status = {}
        let displayLabelList = Object.keys(getState().autoNumberReducer.autoNumber_KeyMapper)
        let swappedElementDisplaylabled = Object.keys(swappedElementsUrn).filter(label => displayLabelList.includes(label))

        swappedElementDisplaylabled.forEach(label => {
            status[label] = false;
            nearestElement[label] = {
                urn: "",
                pos: ""
            }
        });

        addNearestElement(slateFigures, status, nearestElement, swappedElementDisplaylabled, swappedElementsUrn);
        addNearestElement(containerElementsOnSlate, status, nearestElement, swappedElementDisplaylabled, swappedElementsUrn);
}

const addNearestElement = (elementsList, status, nearestElement, swappedElementDisplaylabled, swappedElementsUrn) => {
    if(elementsList?.length > 0){
        elementsList.forEach(element => {
            let label = element?.displayedlabel;
            if(swappedElementDisplaylabled.includes(label)){
                if(swappedElementsUrn[label].includes(element?.contentUrn)){
                    status[label] = true;
                } else if(!status[label] || !nearestElement[label].urn) {
                    nearestElement[label].urn = element?.contentUrn;
                    nearestElement[label].pos = status[label] ? 'above' : 'below';
                }
            }
        });
    }
}
