import { getContainerEntityUrn } from './AutoNumber_helperFunctions';
import { autoNumber_KeyMapper } from './AutoNumberConstants';
import { getImagesInsideSlates } from './slateLevelMediaMapper';
import {
    SLATE_FIGURE_ELEMENTS,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
export const handleAutoNumberingOnDelete = (params) => {
    const {
        contentUrn,
        getState,
        dispatch,
        isAutoNumberingEnabled,
        type
    } = params
    const slateAncestors = getState().appStore.currentSlateAncestorData;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const containerElements = ['popup','showhide','groupedcontent','element-aside' ]
    if(isAutoNumberingEnabled){
        if (containerElements.indexOf(type) > -1) {
            //reset auto-numbering
            updateAutoNumberSequenceOnDeleteInContainers(figureParentEntityUrn, contentUrn, slateAncestors, getState, dispatch)
        }
        else if (type == 'figure') {
            //reset auto-numbering
            const autoNumberedElements = getState().autoNumberReducer.autoNumberedElements;
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
                let index = numberedElements[labelType][parentIndex].findIndex(x => x.contentUrn === contentUrn);
                if (index > -1) {
                    console.log("we are in if");
                    numberedElements[labelType][parentIndex].splice(index, 1);
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
export const updateAutoNumberSequenceOnDeleteInContainers = (parentIndex, contentUrn, slateAncestors, getState, dispatch) => {
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const numberedElements = getState().autoNumberReducer.autoNumberedElements;
    if (contentUrn && numberedElements) {
        for (let labelType in numberedElements) {
            if (numberedElements[labelType]?.hasOwnProperty(parentIndex) && numberedElements[labelType][parentIndex]) {
                numberedElements[labelType][parentIndex] = numberedElements[labelType][parentIndex]?.filter(ele => ((!ele.parentDetails) || (ele.parentDetails?.length < 1) || ele?.parentDetails?.indexOf(contentUrn) < 0))
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


export const handleAutoNumberingOnSwapping = (isAutoNumberingEnabled, params) => {
    const {
        getState,
        dispatch,
        currentSlateData,
        swappedElementData
    } = params
    const numberedElements = getState().autoNumberReducer.autoNumberedElements;
    const slateAncestors = getState().appStore.currentSlateAncestorData
    if (isAutoNumberingEnabled) {
        //reset indexes of images on a slate after swap
        const bodyMatter = currentSlateData.contents.bodymatter
        const slateFigures = getImagesInsideSlates(bodyMatter)
        if (slateFigures) {
            dispatch({
                type: SLATE_FIGURE_ELEMENTS,
                payload: {
                    slateFigures //2,3 - contentUrn
                }
            });
        }
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
}