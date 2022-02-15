import { getContainerEntityUrn, getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { autoNumber_KeyMapperElements } from './AutoNumberConstants';
import { getImagesInsideSlates } from './slateLevelMediaMapper';
import {
    SLATE_FIGURE_ELEMENTS,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';

/**
 * Handle AUTO-NUMBERING on Delete
 * @param {*} params 
 */
export const handleAutoNumberingOnCopyPaste = (params) => {
    const {
        getState,
        dispatch,
        operationType,
        selectedElement,
        isAutoNumberingEnabled,
        currentSlateData,
        oldSlateFigureList,
        tocContainerSlateList
    } = params
    const numberedElements = getState().autoNumberReducer.autoNumberedElements;
    const slateAncestors = getState().appStore.currentSlateAncestorData
    const containerElements = ['popup', 'showhide', 'groupedcontent', 'element-aside']
    if (isAutoNumberingEnabled) {
        //reset indexes of images on a slate after cut/copy operation
        const bodyMatter = currentSlateData.contents.bodymatter
        const slateFigures = getImagesInsideSlates(bodyMatter)
        if (slateFigures) {
            dispatch({
                type: SLATE_FIGURE_ELEMENTS,
                payload: {
                    slateFigures
                }
            });
        }
        if (operationType == 'copy' || operationType == 'cut') {
            if (containerElements.indexOf(selectedElement?.type) > -1) {
                updateAutoNumberSequenceOnCutCopyContainers({ operationType, getState, dispatch, selectedElement, numberedElements, prevSelectedAutoNumberElements: oldSlateFigureList, updatedSlateAutoNumberedElements : slateFigures, slateAncestors, tocContainerSlateList })
            }
            else if (selectedElement?.type === 'figure') {
                updateAutoNumberSequenceOnCopyElements({ operationType, getState, dispatch, selectedElement, numberedElements, slateFigures, slateAncestors })
            }
        }

    }
}

/**
 * This function resets sequence after DELETE when figure is swapped
 * @param {*} params
 */
export const updateAutoNumberSequenceOnCopyElements = (params) => {
    const {
        // getState,
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        selectedElement,
        operationType
    } = params
    if (slateFigures || slateFigures?.length > 0) {
        const activeLabelFigures = slateFigures?.filter(img => img.displayedlabel === selectedElement.displayedlabel)
        const figureIndexOnSlate = activeLabelFigures.findIndex(ele => ele.contentUrn === selectedElement.contentUrn)
        if (activeLabelFigures?.length > 1) {
            let refIndex = "", indexPos = ""
            if (figureIndexOnSlate == activeLabelFigures.length - 1) {
                refIndex = figureIndexOnSlate - 1
                indexPos = 'above'
            }
            else {
                refIndex = figureIndexOnSlate + 1
                indexPos = 'below'
            }
            //find the closest image now and then add the new img at that index
            const referenceFigure = activeLabelFigures[refIndex].contentUrn
            const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
            const labelType = autoNumber_KeyMapperElements[selectedElement.displayedlabel]
            if (operationType == 'cut') {
                if (figureParentEntityUrn && numberedElements) {
                    numberedElements[labelType][figureParentEntityUrn] = numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.contentUrn !== selectedElement.contentUrn)
                }
            }

            if (referenceFigure) {
                const refImageIndex = numberedElements[labelType][figureParentEntityUrn].findIndex(ele => ele.contentUrn === referenceFigure)
                if (indexPos === 'above') {
                    numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex + 1, 0, selectedElement)
                } else {
                    numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex, 0, selectedElement)
                }
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


/**
 *  This function resets sequence after CUT/COPY Operation 
 * for a container having autonumbered elements
 * @param {*} params
 */

export const updateAutoNumberSequenceOnCutCopyContainers = (params) => {
    const {
        dispatch,
        slateAncestors,
        numberedElements,
        prevSelectedAutoNumberElements,
        tocContainerSlateList,
        updatedSlateAutoNumberedElements
    } = params;
    let oldNumberedElements = { ...numberedElements }
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    /* get numberedElements with Object Values as Arrays for easy iteration 
    where is array of elements is corr to current figureParentEntityUrn ONLY */
    Object.keys(oldNumberedElements).forEach(labelType => {
        if ((Array.isArray(oldNumberedElements[labelType]) && oldNumberedElements[labelType]?.length === 0) || (Object.keys(oldNumberedElements[labelType])?.length < 0)) {
            oldNumberedElements[labelType] = []
        } else {
            const currentParentIndex = Object.keys(oldNumberedElements[labelType])?.indexOf(figureParentEntityUrn)
            if (figureParentEntityUrn && currentParentIndex > -1) {
                oldNumberedElements[labelType] = Object.values(oldNumberedElements[labelType])?.[currentParentIndex] || []
            } else {
                oldNumberedElements[labelType] = []
            }
        }
    })
    /** Iterate over NumberedElements ->
     * For each label - autonumberd elements list corr to a given slateEntityUrn is updated
     */
    Object.keys(oldNumberedElements).forEach(elementLabel => {
        const eleLabel = getKeyByValue(autoNumber_KeyMapperElements, elementLabel)
        if (oldNumberedElements[elementLabel]?.length > 0) { //when elements of same label in the container exist
            const oldLabelElements = prevSelectedAutoNumberElements?.filter(ele => ele.displayedlabel === eleLabel)
            const activeLabelElements = updatedSlateAutoNumberedElements?.filter(ele => ele.displayedlabel === eleLabel)
            const activeNumberedElements = activeLabelElements.map(setElementDetails)
            const currentSlateEntityUrn = getSlateEntityUrn()
            if (oldLabelElements?.length > 0) { //when given slate has atleast one element of same label
                const currentSlateStartIndex = oldNumberedElements[elementLabel]?.findIndex(ele => ele.slateEntityUrn === currentSlateEntityUrn)
                //replace entire list of same label elements for this slate in the main autonumbered sequence
                numberedElements[elementLabel][figureParentEntityUrn].splice(currentSlateStartIndex, oldLabelElements.length, ...activeNumberedElements)
            } else {// when no element of same label on given slate 
                if (tocContainerSlateList?.indexOf(currentSlateEntityUrn) === 0) { // when inserting on the first slate on the container
                    //insert at beginning of list
                    numberedElements[elementLabel][figureParentEntityUrn].splice(0, 0, ...activeNumberedElements)
                } else { // when same label elements are in container but not on current slate
                    const elementCount = getSlateElementCount(tocContainerSlateList, oldNumberedElements[elementLabel])
                    const refImageSlateUrn = getReferenceSlateUrn(tocContainerSlateList, elementCount, currentSlateEntityUrn)
                    const refImageSlateLastIndex = numberedElements[elementLabel][figureParentEntityUrn].findLastIndex(ele => ele.slateEntityUrn === refImageSlateUrn)
                    numberedElements[elementLabel][figureParentEntityUrn].splice(refImageSlateLastIndex +1, 0, ...activeNumberedElements)
                }
            }
        } else { //when no element of same label in the container exists
            const activeLabelElements = updatedSlateAutoNumberedElements?.filter(ele => ele.displayedlabel === eleLabel)
            const activeNumberedElements = activeLabelElements.map(setElementDetails)
            numberedElements[elementLabel] = { [figureParentEntityUrn]: activeNumberedElements }
        }
    })
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            numberedElements
        }
    });
    getAutoNumberSequence(numberedElements, dispatch)
}

/** Returns the object with keys as slateUrns and value as [index of slate in container, no fo elements of given label]  */
export const getSlateElementCount = (listOfSlates, currentLabelElements) => {
    return listOfSlates.reduce((obj, item,index) => {
        obj[item] = [index,currentLabelElements?.filter(item1 => item1.slateEntityUrn === item).length]
        return obj
    }, {})
}

/** Returns the slate preceeding the current slate that has atleast one element of same label  */
export const getReferenceSlateUrn = (tocContainerSlateList, elementCount, currentSlateId) => {
    const preceedingSlateCount = tocContainerSlateList?.indexOf(currentSlateId)
    let referenceSlate = currentSlateId
    for (let i = 0; i <= preceedingSlateCount; i++) {
        if (elementCount && tocContainerSlateList && elementCount[tocContainerSlateList[i]][0] === i &&  elementCount[tocContainerSlateList[i]][1] > 0) {
            referenceSlate = tocContainerSlateList[i]
        }
    }
    return referenceSlate
}


/** Returns the key for the given value in the object */
export const getKeyByValue = (object, value)  => {
    return Object.keys(object).find(key => object[key] === value);
}


/**
 *  Prepare the element with only the keys required
 */
const setElementDetails = (element) => {
    if (element) {
        const elementToReturn = {
            entityUrn: element.contentUrn
        }
        Object.keys(elementIdMapper).forEach(prop => {
            if (element.hasOwnProperty(prop)) {
                elementToReturn[elementIdMapper[prop]] = element[prop]
            }
        })
        return elementToReturn
    }
    return {}
}

const elementIdMapper = {
    'type': 'type',
    'title': 'title',
    'subtype': 'subType',
    'figuretype': 'figureType',
    'versionUrn': 'versionUrn',
    'contentUrn': 'contentUrn',
    'slateEntityUrn': 'slateEntityUrn',
    'manualoverride': 'manualoverride',
    'displayedlabel': 'displayedlabel',
    'numberedandlabel': 'numberedandlabel'
}