import { getContainerEntityUrn } from './AutoNumber_helperFunctions';
import { autoNumber_KeyMapperElements, autoNumber_ElementTypeKey, containerElementTypes, containerElements, displayLabelsForAutonumbering } from './AutoNumberConstants';
import { getImagesInsideSlates } from './slateLevelMediaMapper';
import { containerBodyMatter } from './slateLevelMediaMapper';
import { findElementsInContainer } from './AutoNumberCreate_helper';
import {
    SLATE_FIGURE_ELEMENTS,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { getAutoNumberSequence } from './AutoNumberActions';
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export const getElementsInContainer = async (element, numberedElements = [], elementType) => {
    switch (element.type) {
        case containerElements.SHOW_HIDE:
            getElementsInShowhide(element, numberedElements, elementType);
            break;
        case containerElements.MULTI_COLUMN:
            getElementsInMultiColumn(element, numberedElements, elementType);
            break;
        case containerElements.POPUP:
            const popupContent = await getSlateLevelData(element.versionUrn, element.contentUrn)
            await getElementsInPopup(popupContent, numberedElements, elementType);
            break;
        case containerElements.ASIDE:
            getElementsInAsideWE(element, numberedElements, elementType);
            break;
        case containerElements.MANIFEST:
            getElementsInManifest(element, numberedElements, elementType);
            break;
    }
    return numberedElements;
}


export const getElementsInPopup = (containerData, numberedElements, elementType) => {
    containerData = {...containerData, indexPos: []}
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData?.indexPos.push(index)
            if (element.type === elementType) {
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

const getElementsInAsideWE = (containerData, numberedElements, elementType) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            if (element.type === elementType) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
            } else if ((element.type === 'manifest' && element.contents.bodymatter) || (element.type === 'showhide')) {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, elementType);
            }
        })
    }
}

const getElementsInManifest = (containerData, numberedElements, elementType) => {
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            if (element.type === elementType) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element?.displayedlabel, figuretype: element.figuretype });
                count++;
            } else if (element.type === 'showhide') {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, elementType);
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
const getElementsInShowhide = (containerData, numberedElements, elementType) => {
    const showHideContent = containerBodyMatter(containerData);
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            if (element.type === elementType) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype });
                count++;
            } else if (element.type === 'element-aside') {
                getImagesInsideElement(containerBodyMatter(element), numberedElements, elementType);
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
 const getElementsInMultiColumn = (containerData, numberedElements, elementType) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach(colData => {
            if (colData?.groupdata?.bodymatter?.length > 0) {
                colData?.groupdata?.bodymatter.forEach((element, index) => {
                    element.parentDetails = containerData.parentDetails  || []
                    element.parentDetails.push(containerData.contentUrn) //multi-column id
                    element.parentDetails.push(colData.contentUrn) //column -id
                    if (element.type === elementType) {
                        let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                        numberedElements.push({ contentUrn: element.contentUrn, indexPos: count, displayedlabel: element.displayedlabel || 'Figure', figuretype: element.figuretype, parentDetails: element?.parentDetails, interactivedata: element?.interactivedata, elementdata: element?.elementdata });
                    } else if (element.type === 'showhide' || element.type === 'element-aside') {
                        element.parentDetails.push(element.contentUrn)
                        getImagesInsideElement(containerBodyMatter(element), numberedElements, elementType);
                    }
                })
            }
        })
    }
}

export const getImagesInsideElement = (bodyMatter, numberedElements = [], elementType) => {
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach((element, index) => {
            if (element.type === elementType) {
                let count = numberedElements.length > 0 ? numberedElements[numberedElements.length - 1].indexPos + 1 : 0;
                numberedElements.push({ contentUrn: element.contentUrn, index: index, indexPos: count, displayedlabel: element.displayedlabel, figuretype: element.figuretype });
                count++;
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        getElementsInShowhide(element, numberedElements, elementType)
                        break;
                    case containerElements.MULTI_COLUMN:
                        getElementsInMultiColumn(element, numberedElements, elementType)
                        break;
                    case containerElements.POPUP:
                        getElementsInPopup(element, numberedElements, elementType);
                        break;
                    case containerElements.ASIDE:
                        getElementsInAsideWE(element, numberedElements, elementType)
                        break;
                    case containerElements.MANIFEST:
                        getImagesInsideElement(element?.contents?.bodymatter, numberedElements, elementType);
                        break;
                }
            }
        })
    }
    return numberedElements
}

/**
 * Handle AUTO-NUMBERING on Delete
 * @param {*} params 
 */
export const handleAutoNumberingOnDelete = (params) => {
    const {
        element,
        type,
        contentUrn,
        getState,
        dispatch,
        isAutoNumberingEnabled,
        asideData
    } = params
    const slateAncestors = getState().appStore.currentSlateAncestorData;
    const figureParentEntityUrn = getContainerEntityUrn(slateAncestors);
    const autoNumberedElements = getState().autoNumberReducer.autoNumberedElements;
    if (isAutoNumberingEnabled) {
        if (containerElementTypes.includes(type)) {
            //reset auto-numbering
            dispatch(updateAutoNumberSequenceOnDelete(figureParentEntityUrn, contentUrn, autoNumberedElements));
            updateAutoNumberSequenceOnDeleteInContainers(element, figureParentEntityUrn, contentUrn, autoNumberedElements, dispatch);
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
export const updateAutoNumberSequenceOnDeleteInContainers = (deleteElemData, parentIndex, contentUrn, autoNumberedElements, dispatch) => {
    let childContainerElements = [];
    let childNonContainerElements = [];
    const type = 'figure';
    switch (deleteElemData.type) {
        case containerElements.MULTI_COLUMN:
        case containerElements.SHOW_HIDE:
        case containerElements.POPUP:
            let elements = getElementsInContainer(deleteElemData, childContainerElements, containerElements.ASIDE);
            elements.then( () => {
                for (const label of displayLabelsForAutonumbering) {
                    let elementsInContainer = [];
                    elementsInContainer = findElementsInContainer(deleteElemData, [], { displayedlabel: label });
                    childNonContainerElements = elementsInContainer.length > 0 ? childNonContainerElements.concat(elementsInContainer) : childNonContainerElements;
                }
            })
        case containerElements.ASIDE:
            for (const label of displayLabelsForAutonumbering) {
                let elementsInContainer = [];
                elementsInContainer = findElementsInContainer(deleteElemData, [], { displayedlabel: label });
                childNonContainerElements = elementsInContainer.length > 0 ? childNonContainerElements.concat(elementsInContainer) : childNonContainerElements;
            }
            break;
    }
    
    if (childContainerElements.length > 0 || childNonContainerElements.length > 0) {
        if (childContainerElements.length > 0) {
            for (const element of childContainerElements) {
                deleteElementByLabelFromStore(autoNumberedElements, element, parentIndex);
            }
        }
        if (childNonContainerElements.length > 0) {
            for (const element of childNonContainerElements) {
                deleteElementByLabelFromStore(autoNumberedElements, element, parentIndex);
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
        // for (let labelType in autoNumberedElements) {
        //     if (autoNumberedElements[labelType]?.hasOwnProperty(parentIndex) && autoNumberedElements[labelType][parentIndex].length > 0) {
        //         let elementData = autoNumberedElements[labelType][parentIndex];
        //         let data = [];
        //         for(let element of elementData){
        //             slateFigureList?.map(figure =>{
        //                 if(figure.contentUrn === element.contentUrn && !figure.parentDetails.includes(contentUrn)) {
        //                     data.push(figure);
        //                 }
        //             });
        //         }
        //         autoNumberedElements[labelType][parentIndex] = data
        //     }
        // }
}

export const deleteElementByLabelFromStore = (numberedElements, element, parentIndex) => {
    if (numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]]?.hasOwnProperty(parentIndex) && numberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][parentIndex].length > 0) {
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

    for (let i in slateFigures) {
        let element = slateFigures[i];
        if (element?.parentDetails?.includes(swappedElementData?.contentUrn)) {
            swappedElementsUrn.push(element.contentUrn);
            swappedElementIterated = true;
        } else {
            reNumberingRequired = true;
            if (swappedElementIterated) break;
            refElementObj[autoNumber_ElementTypeKey[element.displayedlabel]] = element.contentUrn;
        }
    }

    if (reNumberingRequired) {
        Object.values(autoNumber_ElementTypeKey).forEach(label => {
            let elementArray = numberedElements[label][figureParentEntityUrn];
            swappedElementList = [];
            let prevElementURN = ""
            if (elementArray && elementArray.length > 0) {
                elementArray.forEach((element, i) => {
                    if (element?.slateEntityUrn === swappedElementData.slateEntityUrn && swappedElementsUrn.includes(element?.contentUrn)) {
                        swappedElementList.push(element);
                        prevElementURN = i > 0 ? elementArray[i - 1]?.contentUrn : ""
                        elementArray.splice(i, 1);
                    }
                });
                if (refElementObj[label]) {
                    const findRefIndex = (element) => element.contentUrn === refElementObj[label]
                    const refElementIndex = elementArray?.findIndex(findRefIndex);
                    elementArray.splice(refElementIndex + 1, 0, ...swappedElementList);
                } else {
                    const findRefIndexInCurrentSlate = (element) => element.slateEntityUrn === swappedElementData.slateEntityUrn;
                    const refIndexInCurrentSlate = elementArray?.findIndex(findRefIndexInCurrentSlate);
                    if (refIndexInCurrentSlate < 0) {
                        const findPrevElementIndex = (element) => element.contentUrn === prevElementURN;
                        const prevElementIndex = elementArray?.findIndex(findPrevElementIndex);
                        elementArray.splice(prevElementIndex + 1, 0, ...swappedElementList);
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