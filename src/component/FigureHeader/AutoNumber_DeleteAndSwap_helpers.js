import { getContainerEntityUrn, getAutoNumberedElement } from './AutoNumber_helperFunctions';
import { autoNumber_KeyMapper } from './AutoNumberConstants';
import { getImagesInsideSlates } from './slateLevelMediaMapper';
import {
    SLATE_FIGURE_ELEMENTS,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

/**
 * Handle AUTO-NUMBERING on Delete
 * @param {*} params 
 */
export const handleAutoNumberingOnDelete = (params) => {
    const {
        type,
        contentUrn,
        getState,
        dispatch,
        isAutoNumberingEnabled
    } = params
    const slateAncestors = getState().appStore.currentSlateAncestorData
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const containerElements = ['popup','showhide','groupedcontent','element-aside' ]
    if (isAutoNumberingEnabled) {
        if (containerElements.indexOf(type) > -1) {
            //reset auto-numbering
            updateAutoNumberSequenceOnDeleteInContainers(figureParentEntityUrn, contentUrn, getState, dispatch)
        }
        else if (type == 'figure') {
            //reset auto-numbering
            const autoNumberedElements = getState().autonumberElements.autoNumberedElements
            updateAutoNumberSequenceOnDelete(figureParentEntityUrn, contentUrn, autoNumberedElements, dispatch)
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
 export const updateAutoNumberSequenceOnDelete = (parentIndex, contentUrn, numberedElements, dispatch) => {

    if (parentIndex && contentUrn && numberedElements) {
        for (let labelType in numberedElements) {
            if (numberedElements[labelType]?.hasOwnProperty(parentIndex) && numberedElements[labelType][parentIndex]) {
                if(numberedElements[labelType][parentIndex]?.indexOf(contentUrn)>-1){
                    delete numberedElements[labelType][parentIndex][contentUrn]
                }
                break;
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
export const updateAutoNumberSequenceOnDeleteInContainers = (parentIndex,contentUrn, getState, dispatch) => {
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const numberedElements = getState().autonumberElements.autoNumberedElements
    if (contentUrn && numberedElements) {
        for (let labelType in numberedElements) {
            if (numberedElements[labelType]?.hasOwnProperty(parentIndex) && numberedElements[labelType][parentIndex]) {
                numberedElements[labelType][parentIndex] = numberedElements[labelType][parentIndex]?.filter(ele => ((!ele.containerData) || (ele.containerData?.length < 1) || ele?.containerData?.indexOf(contentUrn) < 0))
                break;
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
 * Handle AUTO-NUMBERING on Swapping
 * @param {*} params 
 */
export const handleAutoNumberingOnSwapping = (isAutoNumberingEnabled, params) => {
    const {
        getState,
        dispatch,
        currentSlateData,
        swappedElementData
    } = params
    const numberedElements = getState().autoNumberReducer.autoNumberedElements;
    const slateAncestors = getState().appStore.currentSlateAncestorData
    const containerElements = ['popup', 'showhide', 'groupedcontent', 'element-aside']
    if (isAutoNumberingEnabled) {
        //reset indexes of images on a slate after swap
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
        if (containerElements.indexOf(swappedElementData?.type) > -1) {
            updateAutoNumberSequenceOnSwappingContainers({ getState, dispatch, swappedElementData, numberedElements, slateFigures, slateAncestors })
        }
        else if (swappedElementData?.type === 'figure') {
            updateAutoNumberSequenceOnSwappingElements({ getState, dispatch, swappedElementData, numberedElements, slateFigures, slateAncestors })
        }


    }
}



/**
 * This function resets sequence after DELETE when figure is swapped
 * @param {*} params 
 */
export const updateAutoNumberSequenceOnSwappingElements = (params) => {
    const {
        // getState,
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData
    } = params
    if (swappedElementData?.type === 'figure' && swappedElementData?.hasOwnProperty('displayedlabel')) {
        if (slateFigures || slateFigures?.length > 0) {
            const activeLabelFigures = slateFigures?.filter(img => img.displayedlabel === swappedElementData.displayedlabel)
            const figureIndexOnSlate = activeLabelFigures.indexOf(ele => ele.contentUrn === swappedElementData.contentUrn)
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
                const labelType = autoNumber_KeyMapper[swappedElementData.displayedlabel]
                if (figureParentEntityUrn && numberedElements) {
                    numberedElements[labelType][figureParentEntityUrn] = numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.contentUrn !== swappedElementData.contentUrn)
                }
                if (referenceFigure) {
                    const refImageIndex = numberedElements[labelType][figureParentEntityUrn].indexOf(ele => ele.contentUrn === referenceFigure)
                    numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex, 0, swappedElementData)
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
export const updateAutoNumberSequenceOnSwappingContainers = (params) => {
    const {
        getState,
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData
    } = params;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const labelType = autoNumber_KeyMapper[swappedElementData.displayedlabel]
    if (slateFigures || slateFigures?.length > 1) {
        const elementsToSwap = numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.containerData.indexOf(swappedElementData.contentUrn) > -1)
        console.log('elementsToSwap>>>', elementsToSwap)
        const noOfElementsToSwap = elementsToSwap?.length
        if (noOfElementsToSwap > 0) {
            const elementUrnToSearch = elementsToSwap[noOfElementsToSwap - 1].contentUrn

            Object.values(DISPLAYED_LABELS).forEach(label => {
                const activeLabelElements = slateFigures?.filter(ele => ele.displayedlabel === label)
                const indexToSearch = activeLabelElements?.indexOf(ele => ele.contentUrn === elementUrnToSearch)
                if (indexToSearch == (activeLabelElements?.length - 1)) {
                    const newUrnToSearch = elementsToSwap[0].contentUrn
                    const indexToSearch2 = activeLabelElements?.indexOf(ele => ele.contentUrn === newUrnToSearch)
                    const prevElement = activeLabelElements[indexToSearch2 - 1]?.contentUrn
                    if (prevElement) {
                        //delete old places
                        numberedElements[labelType][figureParentEntityUrn]?.splice(indexToSearch, noOfElementsToSwap)
                        const refImageIndex = numberedElements[labelType][figureParentEntityUrn].indexOf(ele => ele.contentUrn === nextElement)
                        numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex + 1, 0, elementsToSwap)
                        dispatch({
                            type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                            payload: {
                                numberedElements
                            }
                        });
                        getAutoNumberSequence(numberedElements, dispatch)
                    }

                } else {
                    const nextElement = activeLabelElements[elementToSearch + 1]?.contentUrn
                    if (nextElement) {
                        //delete old places
                        numberedElements[labelType][figureParentEntityUrn]?.splice(indexToSearch, noOfElementsToSwap)
                        const refImageIndex = numberedElements[labelType][figureParentEntityUrn].indexOf(ele => ele.contentUrn === nextElement)
                        numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex, 0, elementsToSwap)
                        dispatch({
                            type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                            payload: {
                                numberedElements
                            }
                        });
                        getAutoNumberSequence(numberedElements, dispatch)
                    }
                }
            })
        }
    }
}