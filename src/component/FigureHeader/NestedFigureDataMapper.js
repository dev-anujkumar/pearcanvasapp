import config from '../../config/config';
import { containerElements, autoNumberElementsAllowed, SHOWHIDE_SECTION, ELEMENT_TYPES } from './AutoNumberConstants';
import { SLATE_FIGURE_ELEMENTS } from "../../constants/Action_Constants";
import { getSlateEntityUrn } from './AutoNumber_helperFunctions';
import { getSlateLevelData } from './AutoNumberActions';
export const getAutoNumberedElementsOnSlate = async (slateLevelData, params) => {
    const { dispatch } = params
    const bodyMatter = slateLevelData?.contents?.bodymatter || []
    const slateFigures = await getImagesInsideSlates(bodyMatter)
    if (slateFigures) {
        dispatch({
            type: SLATE_FIGURE_ELEMENTS,
            payload: {
                slateFigures
            }
        });
        console.log('slateFigures',slateFigures)
        return slateFigures
    }
    return []
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const getImagesInsideSlates = async (bodyMatter, numberedElements = [],parentIndex=[], parentDetails=[]) => {
    if (bodyMatter?.length > 0) {
       await Promise.all(bodyMatter?.map(async (element, index) => {
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                if (parentIndex?.length) {
                    element.indexPos = [...parentIndex]
                    element.indexPos.push(index)
                } else {
                    element.indexPos = index
                }
                if (parentDetails?.length) {
                    element.parentDetails = parentDetails
                } else {
                    element.parentDetails = []
                }
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({ ...element })
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                element.indexPos = [...parentIndex]
                element.indexPos.push(index)
                if (parentIndex?.length) element.parentDetails = parentIndex
                switch (element.type) {
                    case containerElements.SHOW_HIDE:
                        getMediaElementInShowhide(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MULTI_COLUMN:
                        getMediaElementInMultiColumn(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.POPUP:
                        const popupContent = await getSlateLevelData(element.versionUrn, element.contentUrn)
                        if (parentIndex?.length) popupContent.parentDetails = parentIndex
                        await getMediaElementInPopup(popupContent, numberedElements)
                        break;
                    case containerElements.ASIDE:
                        getMediaElementInAsideWE(element, numberedElements, [...element.indexPos])
                        break;
                    case containerElements.MANIFEST:
                        getImagesInsideSlates(element?.contents?.bodymatter, numberedElements, [...element.indexPos]);
                        break;
                }
            }
        }))
    }
    console.log('getImagesInsideSlates::::numberedElements',numberedElements)
    return numberedElements
}

export const containerBodyMatter = (container) => {
    let dataToReturn = []
    switch (container.type) {
        case containerElements.SHOW_HIDE:
            let showHideData = []
            if (container?.interactivedata?.hasOwnProperty(SHOWHIDE_SECTION.SHOW)) {
                showHideData = showHideData.concat(container?.interactivedata[SHOWHIDE_SECTION.SHOW])
            }
            if (container?.interactivedata?.hasOwnProperty(SHOWHIDE_SECTION.HIDE)) {
                showHideData = showHideData.concat(container?.interactivedata[SHOWHIDE_SECTION.HIDE])
            }
            dataToReturn = showHideData;
            break;
        case containerElements.GROUP:
            dataToReturn = container?.groupdata?.bodymatter ?? []
            break;
        case containerElements.ASIDE:
            dataToReturn = container?.elementdata?.bodymatter ?? []
            break;
        case containerElements.MANIFEST:
        case containerElements.POPUP:
        default:
            dataToReturn = container?.contents?.bodymatter ?? [];
            break;
    }
    return dataToReturn;
}
export const getMediaElementInPopup = (containerData, numberedElements) => {
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData?.indexPos?.push(index) || [index]
            element.parentDetails = containerData.parentDetails  || []
            element.parentDetails.push(containerData.contentUrn)//popup id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData?.indexPos?.push(index)
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData?.indexPos?.push(index)
                element.indexPos = containerData?.indexPos ? [...containerData.indexPos] : [index]
                element.parentDetails.push(element.contentUrn) //element id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
    return numberedElements
}
/**
 * Prepare list of media elements in Aside/WE
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInAsideWE = (containerData, numberedElements, parentIndex) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            element.parentDetails = containerData.parentDetails   || []
            element.parentDetails.push(containerData.contentUrn) //as|we:head -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if ((element.type === containerElements.MANIFEST && element.contents.bodymatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.parentDetails.push(element.contentUrn) //we:body | elemen -id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInMultiColumn = (containerData, numberedElements, parentIndex) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach((colData, i) => {
            if (colData.type === containerElements.GROUP) {
                containerData.indexPos = [...parentIndex];
                containerData.indexPos.push(i);
                if (colData?.groupdata?.bodymatter?.length > 0) {
                    colData?.groupdata?.bodymatter.forEach((element, index) => {
                        element.parentDetails = containerData.parentDetails  || []
                        element.parentDetails.push(containerData.contentUrn) //multi-column id
                        element.parentDetails.push(colData.contentUrn) //column -id
                        if (element.type === ELEMENT_TYPES.FIGURE) {
                            containerData.indexPos.push(index)
                            element.indexPos = [...containerData.indexPos]
                            element.slateEntityUrn = getSlateEntityUrn()
                            numberedElements.push({...element})
                        } else if (element.type === 'container'|| (Object.values(containerElements).indexOf(element.type) > -1)) {
                            containerData.indexPos.push(index)
                            element.indexPos = [...containerData.indexPos]
                            element.parentDetails.push(element.contentUrn)  //element -id
                            getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos],element.parentDetails)
                        }
                    })
                }
            }
        })
    }
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
export const getMediaElementInShowhide = (containerData, numberedElements, containerIndex) => {
    const showHideContent = containerBodyMatter(containerData)
    if (showHideContent?.length > 0) {
        showHideContent.forEach((element, index) => {
            element.indexPos = [...containerData.indexPos]
            element.parentDetails = containerData.parentDetails || []
            element.parentDetails.push(containerData.contentUrn)  //showhide -id
            if (element.type === ELEMENT_TYPES.FIGURE) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'container'  || (Object.values(containerElements).indexOf(element.type) > -1)) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.parentDetails.push(element.contentUrn)  //element -id
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos], element.parentDetails)
            }
        })
    }
}
