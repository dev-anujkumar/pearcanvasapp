/**
 * Prepare API data to get media elements based on Type
 */


const slateTypes = ['container-introduction', 'section', 'appendixslate', 'cover', 'titlepage', 'copyright', 'listofcontents']

const autoNumberElementsAllowed = ['figure']
/**
 * Common API Data handler for all elements supporting Auto-numbering
 * @param {*} projectContent 
 * @param {*} mediaData 
 * @returns 
 */
export const mediaElementAPI_Handler = (projectContent, numberedElements) =>{ // projectContent = response.data.contents
    if (projectContent['frontMatter']?.length > 0) {
        numberedElements = getContentInFMandBM(projectContent, 'frontMatter', numberedElements)
    }
    if (projectContent['backMatter']?.length > 0) {
        numberedElements = getContentInFMandBM(projectContent, 'backMatter', numberedElements)
    }
    if (projectContent['bodyMatter']?.length > 0) {
        getContentInBodyMatter(projectContent['bodyMatter'], numberedElements)
    }
    return numberedElements
}

/**
 * Get Media Elements list in the Project BodyMatter
 * @param {*} bodyMatterContent 
 * @param {*} numberedElements 
 * @returns 
 */
export const getContentInBodyMatter = (bodyMatterContent, numberedElements) => {
    if (bodyMatterContent?.length > 0) {
        bodyMatterContent?.forEach(container => {
            if (container?.label === 'part') {
                if (container?.contents['frontMatter']?.length > 0) {
                    /** Get Media Elements on PART-IS */
                    const mediaElementOnPartIS = getImagesInsideSlates(container.contents['frontMatter'][0].contents.bodyMatter) || []
                    numberedElements = getNumberedElementsList(container.contentUrn, numberedElements, mediaElementOnPartIS)
                }
                if (container?.contents['bodyMatter']?.length > 0) {
                    container.contents['bodyMatter']?.forEach((innerContainer) => {
                        numberedElements = getContentInChapter(innerContainer, '', numberedElements)
                    })
                }
            }
            else if (container?.label === 'chapter') {
                numberedElements = getContentInChapter(container, '', numberedElements)
            }
            else if (slateTypes.indexOf(container?.label) > -1) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList('bodyMatter', numberedElements, slateMediaElements)
            }
        })
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
const getContentInChapter = (apiContent, matterType, numberedElements) => {
    const bodyMatter = Object.values(apiContent?.contents)?.flat();
    apiContent = {
        ...apiContent,
        contents: { bodyMatter: bodyMatter }
    }
    if (apiContent?.contents['bodyMatter']?.length > 0) {
        apiContent.contents['bodyMatter']?.forEach((container) => {
            if ((container?.label === 'module' || container?.label === 'appendix') && container?.contents?.bodyMatter?.length > 0) {
                getContainerMediaElementsList(container, 'bodyMatter', numberedElements, apiContent.contentUrn)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList(apiContent.contentUrn, numberedElements, slateMediaElements)
            }
        })
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
const getContainerMediaElementsList = (container, matterType, numberedElements, parentEntityUrn) => {
    if (container?.contents?.bodyMatter?.length > 0) {
        container?.contents?.bodyMatter?.forEach((innerContainer) => {
            if (slateTypes.indexOf(innerContainer?.label) > -1 && innerContainer?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(innerContainer.contents.bodyMatter) || []
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
        })
    }
}

/**
 * Get List of Media Elements on a Slate
 * @param {*} bodyMatter 
 * @param {*} imagesList 
 * @returns 
 */
const getImagesInsideSlates = (bodyMatter, numberedElements = {}, isImageInsideContainer = "",containerDetails=[]) => {
    if (Object.keys(numberedElements).length < 1) {
        numberedElements = { tablesList: [], equationsList: [], imagesList: [],audiosList:[],videosList:[]  }
    }
    if (isImageInsideContainer) {
        containerDetails.push(isImageInsideContainer)
    }
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach(element => {
            if (autoNumberElementsAllowed.indexOf(element.type) > -1) {
                numberedElements = prepareElementList(element, numberedElements,containerDetails)
                containerDetails=[]
            }
            else if (element.type === 'container') {
                switch (element.label) {
                    case 'showhide':
                        numberedElements = getMediaElementInShowhide(element, numberedElements, containerDetails)
                        break;
                    case 'groupedcontent':
                        numberedElements = getMediaElementInMultiColumn(element, numberedElements, containerDetails)
                        break;
                    case 'popup':
                    case "element-aside":
                        numberedElements = getMediaElementInAsideWEPopup(element, numberedElements, containerDetails)
                        break;
                }
            }
        })
    }
    return numberedElements
}

const prepareElementList = (element, numberedElements = {},containerDetails) => {
    if (Object.keys(numberedElements).length < 1) {
        numberedElements = { tablesList: [], equationsList: [], imagesList: [],audiosList:[],videosList:[] }
    }
    if(containerDetails?.length>0){
        element.containerDetails = [...containerDetails]
        containerDetails=[]
    }
    // if (element.figuretype == 'audio') {
    //     element.displayedlabel = 'Audio'
    // }
    // if (element.figuretype == 'video') {
    //     element.displayedlabel = 'Video'
    // }
    if (element.displayedlabel) {
        switch (element.displayedlabel) {
            case 'Audio':
                numberedElements['audiosList'].push(element)
                break;
            case 'Video':
                numberedElements['videosList'].push(element)
                break;
            case 'Table':
                numberedElements['tablesList'].push(element)
                break;
            case 'Equations':
                numberedElements['equationsList'].push(element)
                break;
            case 'Figure':
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
const containerBodyMatter = (container) => {
    let dataToReturn = []
    switch (container.label) {
        case "showhide":
            let showHideData = []
            if (container?.contents?.hasOwnProperty('show')) {
                showHideData = showHideData.concat(container?.contents['show'])
            }
            if (container?.contents?.hasOwnProperty('hide')) {
                showHideData = showHideData.concat(container?.contents['hide'])
            }
            dataToReturn = showHideData
            break;
        case "group":
        case "popup":
        case "element-aside":
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
const getMediaElementInAsideWEPopup = (containerData, numberedElements,containerDetails=[]) => {
   
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(element => {
            if (element.type === 'figure') {
                containerDetails?.push(containerData.contentUrn)
                numberedElements = prepareElementList(element, numberedElements,containerDetails)
                containerDetails=[]
            } else if (element.type === 'container' && element.contents.bodyMatter) {
                numberedElements = getImagesInsideSlates(containerBodyMatter(element), numberedElements, containerData.contentUrn, containerDetails) || numberedElements
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
const getMediaElementInMultiColumn = (containerData, numberedElements,containerDetails=[]) => {
    containerDetails?.push(containerData.contentUrn)
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(colData => {
            if (colData.type === 'container') {
                if (colData?.contents?.bodyMatter?.length > 0) {
                    colData?.contents?.bodyMatter.forEach(element => {
                        if (element.type === 'figure') {
                            numberedElements = prepareElementList(element, numberedElements,containerDetails)
                            containerDetails=[]
                        } else if (element.type === 'container') {
                            numberedElements = getImagesInsideSlates(containerBodyMatter(element), numberedElements, containerData.contentUrn, containerDetails) || numberedElements
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
const getMediaElementInShowhide = (containerData, numberedElements,containerDetails=[]) => {
    containerDetails?.push(containerData.contentUrn)
    const showHideContent = containerBodyMatter(containerData)
    if (showHideContent?.length > 0) {
        showHideContent.forEach(element => {
            if (element.type === 'figure') {
                numberedElements = prepareElementList(element, numberedElements,containerDetails)
                containerDetails=[]
            } else if (element.type === 'container') {
                numberedElements = getImagesInsideSlates(containerBodyMatter(element), numberedElements, containerData.contentUrn, containerDetails) || numberedElements
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
export const getContentInFMandBM = (apiContent, matterType, numberedElements) => {
    if (apiContent[matterType]?.length > 0) {
        numberedElements = getNumberedElementsList(matterType, numberedElements)
        apiContent[matterType]?.forEach((container) => {
            if ((container?.label === 'module' || container?.label === 'appendix') && container?.contents?.bodyMatter?.length > 0) {
                getContainerMediaElementsList(container, matterType, numberedElements)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                numberedElements = getNumberedElementsList(matterType, numberedElements, slateMediaElements)
            }
        })
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
