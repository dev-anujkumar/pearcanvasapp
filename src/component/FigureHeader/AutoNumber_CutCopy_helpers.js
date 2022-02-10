import { getContainerEntityUrn, getAutoNumberedElement } from './AutoNumber_helperFunctions';
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
        currentSlateData
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
        console.log('slateFigures',slateFigures)
        if(operationType == 'copy' || operationType == 'cut'){
            // if (containerElements.indexOf(selectedElement?.type) > -1) {
            //     updateAutoNumberSequenceOnCopyContainers({ operationType, getState, dispatch, selectedElement, numberedElements, prevSelectedAutoNumberElements: slateFigures, slateAncestors })
            // }
            // else 
            if (selectedElement?.type === 'figure') {
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
 *  This function resets sequence after SWAP when a container having figure is swapped
 * @param {*} params
 */

export const updateAutoNumberSequenceOnCopyContainers = (params) => {
    const {
        getState,
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        prevFselectedElementigures,
        operationType
    } = params;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const labelType = autoNumber_KeyMapperElements[prevFselectedElementigures.displayedlabel]
    // if (slateFigures || slateFigures?.length > 1) {
    //     const elementsToSwap = numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.containerData.indexOf(prevFselectedElementigures.contentUrn) > -1)
    //     const noOfElementsToSwap = elementsToSwap?.length
    //     if (noOfElementsToSwap > 0) {
    //         const elementUrnToSearch = elementsToSwap[noOfElementsToSwap - 1].contentUrn

    //         Object.values(DISPLAYED_LABELS).forEach(label => {
    //             const activeLabelElements = slateFigures?.filter(ele => ele.displayedlabel === label)
    //             const indexToSearch = activeLabelElements?.indexOf(ele => ele.contentUrn === elementUrnToSearch)
    //             if (indexToSearch == (activeLabelElements?.length - 1)) {
    //                 const newUrnToSearch = elementsToSwap[0].contentUrn
    //                 const indexToSearch2 = activeLabelElements?.indexOf(ele => ele.contentUrn === newUrnToSearch)
    //                 const prevElement = activeLabelElements[indexToSearch2 - 1]?.contentUrn
    //                 if (prevElement) {
    //                     //delete old places
    //                     // numberedElements[labelType][figureParentEntityUrn]?.splice(indexToSearch, noOfElementsToSwap)
    //                     const refImageIndex = numberedElements[labelType][figureParentEntityUrn].indexOf(ele => ele.contentUrn === nextElement)
    //                     numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex + 1, 0, elementsToSwap)
    //                     dispatch({
    //                         type: GET_ALL_AUTO_NUMBER_ELEMENTS,
    //                         payload: {
    //                             numberedElements
    //                         }
    //                     });
    //                     getAutoNumberSequence(numberedElements, dispatch)
    //                 }

    //             } else {
    //                 const nextElement = activeLabelElements[elementToSearch + 1]?.contentUrn
    //                 if (nextElement) {
    //                     //delete old places
    //                     // numberedElements[labelType][figureParentEntityUrn]?.splice(indexToSearch, noOfElementsToSwap)
    //                     const refImageIndex = numberedElements[labelType][figureParentEntityUrn].indexOf(ele => ele.contentUrn === nextElement)
    //                     numberedElements[labelType][figureParentEntityUrn]?.splice(refImageIndex, 0, elementsToSwap)
    //                     dispatch({
    //                         type: GET_ALL_AUTO_NUMBER_ELEMENTS,
    //                         payload: {
    //                             numberedElements
    //                         }
    //                     });
    //                     getAutoNumberSequence(numberedElements, dispatch)
    //                 }
    //             }
    //         })
    //     }
    // }
}


export const getSlateFiguresList = (listOfSlates, currentLabelElements) => {
    return listOfSlates.reduce((obj, item) => {
        obj[item] = currentLabelElements.filter(item1 => item1.slateEntityUrn === item).length
        return obj
    }, {})
}