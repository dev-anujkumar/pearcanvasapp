import config from '../../config/config';
import { containerElements, autoNumberElementsAllowed } from './AutoNumberConstants';

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
export const getImagesInsideSlates = (bodyMatter, numberedElements = [],parentIndex=[]) => {
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach((element,index) => {
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                if (parentIndex?.length) {
                    element.indexPos = [...parentIndex]
                    element.indexPos.push(index)
                } else {
                    element.indexPos = index
                }
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({ ...element })
            }
            else if (Object.values(containerElements).indexOf(element.type) > -1) {
                element.indexPos = [...parentIndex]
                element.indexPos.push(index)
                switch (element.type) {
                    case 'showhide':
                        getMediaElementInShowhide(element, numberedElements,index)
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
    console.log('getImagesInsideSlates',numberedElements)
    return numberedElements
}

export const containerBodyMatter = (container) => {
    let dataToReturn = []
    switch (container.type) {
        case "showhide":
            let showHideData = [];
            if (container?.interactivedata?.hasOwnProperty('show')) {
                showHideData = showHideData.concat(container?.interactivedata['show']);
            }
            if (container?.interactivedata?.hasOwnProperty('hide')) {
                showHideData = showHideData.concat(container?.interactivedata['hide']);
            }
            dataToReturn = showHideData;
            break;
        case "group":
            dataToReturn = container?.groupdata?.bodymatter ?? [];
            break;
        case "element-aside":
            dataToReturn = container?.elementdata?.bodymatter ?? [];
            break;
        case "manifest":
        case "popup":
        default:
            dataToReturn = container?.contents?.bodymatter ?? [];
            break;
    }
    return dataToReturn;
}
export const getMediaElementInPopup = (containerData, numberedElements) => {
    if (containerData?.contents?.bodymatter?.length > 0) {
        containerData?.contents?.bodymatter.forEach((element, index) => {
            element.indexPos = containerData.indexPos.push(index)
            if (element.type === 'figure') {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'manifest' && element.contents.bodymatter) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos])
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
export const getMediaElementInAsideWE = (containerData, numberedElements) => {
    if (containerData?.elementdata?.bodymatter?.length > 0) {
        containerData?.elementdata?.bodymatter.forEach((element, index) => {
            if (element.type === 'figure') {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'manifest' && element.contents.bodymatter || (element.type === 'showhide')) {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos])
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
export const getMediaElementInMultiColumn = (containerData, numberedElements) => {
    if (containerData?.groupeddata?.bodymatter?.length > 0) {
        containerData?.groupeddata?.bodymatter.forEach(colData => {
            if (colData?.groupdata?.bodymatter?.length > 0) {
                colData?.groupdata?.bodymatter.forEach((element, index) => {
                    if (element.type === 'figure') {
                        containerData.indexPos.push(index)
                        element.indexPos = [...containerData.indexPos];
                        element.slateEntityUrn = getSlateEntityUrn();
                        numberedElements.push({...element});
                    } else if (element.type === 'showhide' || element.type === 'element-aside') {
                        containerData.indexPos.push(index)
                        element.indexPos = [...containerData.indexPos]
                        getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos])
                    }
                })
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
            element.indexPos = containerData.parentDetails
            if (element.type === 'figure') {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                element.slateEntityUrn = getSlateEntityUrn()
                numberedElements.push({...element})
            } else if (element.type === 'element-aside') {
                containerData.indexPos.push(index)
                element.indexPos = [...containerData.indexPos]
                getImagesInsideSlates(containerBodyMatter(element), numberedElements, [...element.indexPos])
            }
        })
    }
}

const getSlateEntityUrn = () => {
    return config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN ? config.slateEntityURN : ""
}