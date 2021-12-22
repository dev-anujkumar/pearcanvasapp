/**
 * Prepare API data to get media elements based on Type
 */

import config from '../../config/config';
import { AUTO_NUMBER_ELEMENTS, slateTypes, SHOWHIDE_SECTION, CONTAINER_LABELS, DISPLAYED_LABELS, ELEMENT_TYPES, containerElements, autoNumberElementsAllowed } from './AutoNumberConstants';
import {getSlateLevelData} from './AutoNumberActions';
/**
 * Common API Data handler for all elements supporting Auto-numbering
 * @param {*} projectContent 
 * @param {*} mediaData 
 * @returns 
 */
export const mediaElementAPI_Handler = async (params, projectContent, numberedElements) => { // projectContent = response.data.contents
    let {
        elementType,
        autoNumberedElements,
        atContainerLevel
    } = params
    config.atContainerLevel = atContainerLevel
    if (projectContent['frontMatter']?.length > 0) {
        numberedElements = await getContentInFMandBM(projectContent, 'frontMatter', numberedElements)
    }
    if (projectContent['backMatter']?.length > 0) {
        numberedElements = await getContentInFMandBM(projectContent, 'backMatter', numberedElements)
    }
    if (projectContent['bodyMatter']?.length > 0) {
        await getContentInBodyMatter(projectContent['bodyMatter'], numberedElements)
    }

    switch (elementType) {
        case AUTO_NUMBER_ELEMENTS.IMAGE:
            autoNumberedElements = {
                ...autoNumberedElements,
                imagesList: numberedElements.imagesList,
                tablesList: numberedElements.tablesList,
                equationsList: numberedElements.equationsList
            }
            break;
        case AUTO_NUMBER_ELEMENTS.AUDIO:
            autoNumberedElements = {
                ...autoNumberedElements,
                audiosList: numberedElements.audiosList
            }
            break;
        case AUTO_NUMBER_ELEMENTS.VIDEO:
            autoNumberedElements = {
                ...autoNumberedElements,
                videosList: numberedElements.videosList
            }
            break;
        default:
            autoNumberedElements = numberedElements
            break;
    }
    return await autoNumberedElements
}

/**
 * Get Media Elements list in the Project BodyMatter
 * @param {*} bodyMatterContent 
 * @param {*} numberedElements 
 * @returns 
 */
export const getContentInBodyMatter = async (bodyMatterContent, numberedElements) => {
    if (bodyMatterContent?.length > 0) {
        await Promise.all(bodyMatterContent?.map(async container => {
            if (container?.label === CONTAINER_LABELS.PART) {
                if (container?.contents['frontMatter']?.length > 0) {
                    /** Get Media Elements on PART-IS */
                    const mediaElementOnPartIS = await getImagesInsideSlates(container.contentUrn,{ isSlate: true, manifestURN: container.versionUrn, entityURN: container.contentUrn }, container.contents['frontMatter'][0].contents.bodyMatter) || []
                    numberedElements = getNumberedElementsList(container.contentUrn, numberedElements, mediaElementOnPartIS)
                }
                if (container?.contents['bodyMatter']?.length > 0) {
                    container.contents['bodyMatter']?.forEach(async (innerContainer) => {
                        numberedElements = await getContentInChapter(innerContainer, '', numberedElements)
                    })
                }
            }
            else if (container?.label === CONTAINER_LABELS.CHAPTER) {
                numberedElements = await getContentInChapter(container, '', numberedElements)
            }
            else if (slateTypes.indexOf(container?.label) > -1) {
                const slateMediaElements = await getImagesInsideSlates(container.contentUrn, { isSlate: true, manifestURN: container.versionUrn, entityURN: container.contentUrn },container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList('bodyMatter', numberedElements, slateMediaElements)
            }
        }))
    }
    return numberedElements
}

/**
 * Prepare the list of media elements inside Chapter
 * @param {*} apiContent 
 * @param {*} matterType 
 * @param {*} numberedElements 
 * @returns 
 */
const getContentInChapter = async (apiContent, matterType, numberedElements) => {
    const bodyMatter = Object.values(apiContent?.contents)?.flat();
    apiContent = {
        ...apiContent,
        contents: { bodyMatter: bodyMatter }
    }
    if (apiContent?.contents['bodyMatter']?.length > 0) {
        await Promise.all(apiContent.contents['bodyMatter']?.map(async (container) => {
            if ((container?.label === CONTAINER_LABELS.MODULE || container?.label === CONTAINER_LABELS.APPENDIX_MOD) && container?.contents?.bodyMatter?.length > 0) {
                await getContainerMediaElementsList(container, 'bodyMatter', numberedElements, apiContent.contentUrn)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = await getImagesInsideSlates(container.contentUrn, { isSlate: true, manifestURN: container.versionUrn, entityURN: container.contentUrn },container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList(apiContent.contentUrn, numberedElements, slateMediaElements)
            }
        }))
    }
    return numberedElements
}

/**
 * Get Media Elements list inside a container
 * @param {*} container 
 * @param {*} numberedElements 
 * @param {*} matterType 
 * @param {*} parentEntityUrn 
 */
const getContainerMediaElementsList = async (container, matterType, numberedElements, parentEntityUrn) => {
    if (container?.contents?.bodyMatter?.length > 0) {
       await Promise.all( container?.contents?.bodyMatter?.map(async (innerContainer) => {
            if (slateTypes.indexOf(innerContainer?.label) > -1 && innerContainer?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = await getImagesInsideSlates(innerContainer.contentUrn, { isSlate: true, manifestURN: innerContainer.versionUrn, entityURN: innerContainer.contentUrn },innerContainer.contents.bodyMatter) || []
                if (matterType === 'frontMatter' || matterType === 'backMatter') {
                    numberedElements = getNumberedElementsList(matterType, numberedElements, slateMediaElements)
                }
                else if (parentEntityUrn) {
                    numberedElements = getNumberedElementsList(parentEntityUrn, numberedElements, slateMediaElements)
                }
                else {
                    numberedElements = getNumberedElementsList(container.contentUrn, numberedElements, slateMediaElements)
                }
            }
        }))
    }
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
const getImagesInsideSlates = async (slateEntityUrn, slateData, bodyMatter, numberedElements = {}, parentDetails = []) => {
    if (Object.keys(numberedElements).length < 1) {
        numberedElements = { tablesList: [], equationsList: [], imagesList: [], audiosList: [], videosList: [] }
    }
    let bodyMatterToIterarte = [...bodyMatter]//&& config.atContainerLevel && bodyMatter?.some(ele => Object.values(containerElements).indexOf(ele.type) > -1)
    if (slateData.isSlate === true  && bodyMatter?.length > 0 ) {
        const { manifestURN, entityURN } = slateData
        const newBodyMatter = await getSlateLevelData(manifestURN, entityURN)
        bodyMatterToIterarte = await (newBodyMatter?.length > 0 ? newBodyMatter : bodyMatter)
    }
    console.log('bodyMatterToIterarte',bodyMatterToIterarte)
    if (bodyMatterToIterarte?.length > 0) {
        bodyMatterToIterarte?.forEach(async element => {
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                if (parentDetails?.length) {
                    element.parentDetails = parentDetails
                }
                numberedElements = prepareElementList(element, numberedElements, slateEntityUrn)
            }
            else if ((element.type === 'container')|| (Object.values(containerElements).indexOf(element.type) > -1)) {
                switch (element.label) {
                    case containerElements.SHOW_HIDE:
                        element.parentDetails = [...parentDetails]
                        element.parentDetails.push(element.contentUrn)
                        numberedElements = await getMediaElementInShowhide(slateEntityUrn, element, numberedElements)
                        break;
                    case containerElements.MULTI_COLUMN:
                        element.parentDetails = [...parentDetails]
                        element.parentDetails.push(element.contentUrn)
                        numberedElements = await getMediaElementInMultiColumn(slateEntityUrn, element, numberedElements)
                        break;
                    case containerElements.POPUP:
                    case containerElements.ASIDE:
                        element.parentDetails = [...parentDetails]
                        element.parentDetails.push(element.contentUrn)
                        numberedElements = await getMediaElementInAsideWEPopup(slateEntityUrn, element, numberedElements)
                        break;
                }
            }
        })
    }
    return numberedElements
}

const prepareElementList = (element, numberedElements = {}, slateEntityUrn) => {
    if (Object.keys(numberedElements).length < 1) {
        numberedElements = { tablesList: [], equationsList: [], imagesList: [], audiosList: [], videosList: [] }
    }
    if (slateEntityUrn?.trim() !== "") {
        element.slateEntityUrn = slateEntityUrn
    }
    if (element.displayedlabel) {
        switch (element.displayedlabel) {
            case DISPLAYED_LABELS.AUDIO:
                numberedElements['audiosList'].push(element)
                break;
            case DISPLAYED_LABELS.VIDEO:
                numberedElements['videosList'].push(element)
                break;
            case DISPLAYED_LABELS.TABLE:
                numberedElements['tablesList'].push(element)
                break;
            case DISPLAYED_LABELS.EQUATIONS:
                numberedElements['equationsList'].push(element)
                break;
            case ELEMENT_TYPES.FIGURE:
            default:
                numberedElements['imagesList'].push(element)
                break;
        }
    }
    else {
        numberedElements['imagesList'].push(element)
    }
    return numberedElements
}
const containerBodyMatter = async (container) => {
    let dataToReturn = []
    const containerProp = container.label ? container.label : container.type
    switch (containerProp) {
        case containerElements.SHOW_HIDE:
            let showHideData = []
            const shProp = container.label ? container?.contents : container?.interactivedata
            if (shProp?.hasOwnProperty(SHOWHIDE_SECTION.SHOW)) {
                showHideData = showHideData.concat(container?.contents[SHOWHIDE_SECTION.SHOW])
            }
            if (shProp?.hasOwnProperty(SHOWHIDE_SECTION.HIDE)) {
                showHideData = showHideData.concat(container?.contents[SHOWHIDE_SECTION.HIDE])
            }
            dataToReturn = showHideData
            break;
        case containerElements.GROUP:
            const groupProp = container.label ? container?.contents : container?.groupdata
            dataToReturn = groupProp?.bodyMatter ?? []
            break;
        case containerElements.POPUP:
            dataToReturn = await getSlateLevelData(container.versionUrn, container.contentUrn)
            break;
        case containerElements.ASIDE:
            const asideProp = container.label ? container?.contents : container?.elementdata
            dataToReturn = asideProp?.bodyMatter ?? []
            break;
        default:
            dataToReturn = container?.contents?.bodyMatter ?? []
            break;
    }
    return dataToReturn
}

/**
 * Prepare list of media elements in Aside/WE
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
const getMediaElementInAsideWEPopup = (slateEntityUrn, containerData, numberedElements) => {
    const containerContent = containerBodyMatter(containerData)
    if (containerContent?.length > 0) {
        containerContent.forEach(element => {
            element.parentDetails = containerData.parentDetails
            if (element.type === ELEMENT_TYPES.FIGURE) {
                numberedElements = prepareElementList(element, numberedElements, slateEntityUrn)
            } else if ((element.type === 'container' && element.contents.bodyMatter) || (Object.values(containerElements).indexOf(element.type) > -1)) {
                element.parentDetails.push(element.contentUrn)
                numberedElements = getImagesInsideSlates(slateEntityUrn, {isSlate:false}, containerBodyMatter(element), numberedElements, element.parentDetails) || numberedElements
            }
        })
    }
    return numberedElements
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
const getMediaElementInMultiColumn = (slateEntityUrn, containerData, numberedElements) => {
    const mulColumnContent = containerBodyMatter(containerData)
    if (mulColumnContent?.length > 0) {
        mulColumnContent.forEach(colData => {
            if (colData.type === 'container') {
                if (colData?.contents?.bodyMatter?.length > 0) {
                    colData?.contents?.bodyMatter.forEach(element => {
                        element.parentDetails = containerData.parentDetails
                        if (element.type === ELEMENT_TYPES.FIGURE) {
                            numberedElements = prepareElementList(element, numberedElements, slateEntityUrn)
                        } else if (element.type === 'container' || (Object.values(containerElements).indexOf(element.type) > -1)) {
                            element.parentDetails.push(element.contentUrn)
                            numberedElements = getImagesInsideSlates(slateEntityUrn, {isSlate:false},containerBodyMatter(element), numberedElements, containerData.parentDetails) || numberedElements
                        }
                    })
                }
            }
        })
    }
    return numberedElements
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
const getMediaElementInShowhide = (slateEntityUrn, containerData, numberedElements) => {
    const showHideContent = containerBodyMatter(containerData);
    if (showHideContent?.length > 0) {
        showHideContent.forEach(element => {
            element.parentDetails = containerData.parentDetails
            if (element.type === ELEMENT_TYPES.FIGURE) {
                numberedElements = prepareElementList(element, numberedElements, slateEntityUrn)
            } else if (element.type === 'container'  || (Object.values(containerElements).indexOf(element.type) > -1)) {
                element.parentDetails.push(element.contentUrn)
                numberedElements = getImagesInsideSlates(slateEntityUrn, {isSlate:false},containerBodyMatter(element), numberedElements, element.parentDetails) || numberedElements
            }
        })
    }
    return numberedElements
}

/**
 * Prepare list of media elements in FrontMatter & BackMatter
 * @param {*} apiContent 
 * @param {*} matterType 
 * @param {*} numberedElements 
 * @returns 
 */
export const getContentInFMandBM = async (apiContent, matterType, numberedElements) => {
    if (apiContent[matterType]?.length > 0) {
        numberedElements = getNumberedElementsList(matterType, numberedElements)
        await Promise.all(apiContent[matterType]?.map(async (container) => {
            if ((container?.label === CONTAINER_LABELS.MODULE || container?.label === CONTAINER_LABELS.APPENDIX_MOD) && container?.contents?.bodyMatter?.length > 0) {
                await getContainerMediaElementsList(container, matterType, numberedElements)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = await getImagesInsideSlates(container.contentUrn, { isSlate: true, manifestURN: container.versionUrn, entityURN: container.contentUrn }, container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList(matterType, numberedElements, slateMediaElements)
            }
        }))
    }
    return numberedElements
}


const getNumberedElementsList = (containerUrn, numberedElements, slateMediaElements = {}) => {
    for (let labelType in numberedElements) {
        if (Object.prototype.hasOwnProperty.call(numberedElements, labelType)) {
            numberedElements[labelType] = {
                ...(numberedElements[labelType] || {}),
                [containerUrn]: [
                    ...(numberedElements[labelType][containerUrn] || []),
                    ...(slateMediaElements?.[labelType] || [])
                ]
            }
        }
    }
    return numberedElements
}
