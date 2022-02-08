import { getContainerEntityUrn } from './AutoNumber_helperFunctions';
import { autoNumber_KeyMapperElements, autoNumber_ElementTypeKey } from './AutoNumberConstants';
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
        isAutoNumberingEnabled,
        asideData
    } = params
    const slateAncestors = getState().appStore.currentSlateAncestorData;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const containerElements = ['popup', 'showhide', 'groupedcontent', 'element-aside'];
    if (isAutoNumberingEnabled) {
        if (containerElements.includes(type)) {
            //reset auto-numbering
            updateAutoNumberSequenceOnDeleteInContainers(figureParentEntityUrn, contentUrn, getState, dispatch)
        }
        else if (type == 'figure') {
            //reset auto-numbering
            const autoNumberedElements = getState().autoNumberReducer.autoNumberedElements;
            dispatch(updateAutoNumberSequenceOnDelete(figureParentEntityUrn, contentUrn, autoNumberedElements))
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
export const updateAutoNumberSequenceOnDeleteInContainers = (parentIndex, contentUrn, getState, dispatch) => {
    const {autoNumberedElements, slateFigureList} = getState().autoNumberReducer;
    if (autoNumberedElements) {
        for (let labelType in autoNumberedElements) {
            if (autoNumberedElements[labelType]?.hasOwnProperty(parentIndex) && autoNumberedElements[labelType][parentIndex]) {
                let elementData = autoNumberedElements[labelType][parentIndex];
                let data = [];
                for(let element of elementData){
                    slateFigureList?.map(figure =>{
                        if(figure.contentUrn === element.contentUrn && !figure.parentDetails.includes(contentUrn)) {
                            data.push(figure);
                        }
                    });
                }
                autoNumberedElements[labelType][parentIndex] = data
            }
        }
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            numberedElements: autoNumberedElements
        }
    });
    getAutoNumberSequence(autoNumberedElements, dispatch)
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
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData
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
                const labelType = autoNumber_KeyMapperElements[swappedElementData.displayedlabel]
                if (figureParentEntityUrn && numberedElements) {
                    numberedElements[labelType][figureParentEntityUrn] = numberedElements[labelType][figureParentEntityUrn]?.filter(ele => ele.contentUrn !== swappedElementData.contentUrn)
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
export const updateAutoNumberSequenceOnSwappingContainers = (params) => {
    const {
        dispatch,
        slateFigures,
        slateAncestors,
        numberedElements,
        swappedElementData
    } = params;

    let refElementObj = {}
    let swappedElementsUrn = [];
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    let swappedElementIterated = false;
    let swappedElementList = [];
    let reNumberingRequired = false;

    for(let i in slateFigures){
        let element = slateFigures[i];
        if(element?.parentDetails?.includes(swappedElementData?.contentUrn)){
            swappedElementsUrn.push(element.contentUrn);
            swappedElementIterated = true;
        } else {
            reNumberingRequired = true;
            if(swappedElementIterated) break;
            refElementObj[autoNumber_ElementTypeKey[element.displayedlabel]] = element.contentUrn;
        }
    }

    if(reNumberingRequired){
        Object.values(autoNumber_ElementTypeKey).forEach(label => {
            let elementArray = numberedElements[label][figureParentEntityUrn];
            swappedElementList = [];
            let prevElementURN = ""
            if(elementArray && elementArray.length > 0){
                elementArray.forEach((element, i) => {
                    if(element?.slateEntityUrn === swappedElementData.slateEntityUrn && swappedElementsUrn.includes(element?.contentUrn)){
                        swappedElementList.push(element);
                        prevElementURN = i > 0 ? elementArray[i-1]?.contentUrn : ""
                        elementArray.splice(i,1);
                    }
                });
                if(refElementObj[label]){
                    const findRefIndex = (element) => element.contentUrn === refElementObj[label]
                    const refElementIndex = elementArray?.findIndex(findRefIndex);
                    elementArray.splice(refElementIndex+1, 0, ...swappedElementList);
                } else {
                    const findRefIndexInCurrentSlate = (element) => element.slateEntityUrn === swappedElementData.slateEntityUrn;
                    const refIndexInCurrentSlate = elementArray?.findIndex(findRefIndexInCurrentSlate);
                    if(refIndexInCurrentSlate < 0){
                        const findPrevElementIndex = (element) => element.contentUrn === prevElementURN;
                        const prevElementIndex = elementArray?.findIndex(findPrevElementIndex);
                        elementArray.splice(prevElementIndex+1, 0, ...swappedElementList);
                    } else {
                        elementArray.splice(refIndexInCurrentSlate, 0, ...swappedElementList);
                    }
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
}