/**
 * Prepare API data to get media elements based on Type
 */


const slateTypes = ['container-introduction', 'section', 'appendixslate', 'cover', 'titlepage', 'copyright', 'listofcontents']

/**
 * Get Media Elements list in the Project BodyMatter
 * @param {*} bodyMatterContent 
 * @param {*} imagesData 
 * @returns 
 */
export const getContentInBodyMatter = (bodyMatterContent, imagesData) => {
    if (bodyMatterContent?.length > 0) {
        bodyMatterContent?.forEach(container => {
            if (container?.label === 'part') {
                if (container?.contents['frontMatter']?.length > 0) {
                    /** Get Media Elements on PART-IS */
                    const mediaElementOnPartIS = getImagesInsideSlates(container.contents['frontMatter'][0].contents.bodyMatter) || []
                    imagesData[container.contentUrn] = mediaElementOnPartIS
                }
                if (container?.contents['bodyMatter']?.length > 0) {
                    container.contents['bodyMatter']?.forEach((innerContainer) => {
                        imagesData = getContentInChapter(innerContainer, '', imagesData)
                    })
                }
            }
            else if (container?.label === 'chapter') {
                imagesData = getContentInChapter(container, '', imagesData)
            }
            else if (slateTypes.indexOf(container?.label) > -1) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                imagesData['bodyMatter'] = [
                    ...imagesData['bodyMatter'],
                    ...slateMediaElements
                ]
            }
        })
    }
    return imagesData
}

/**
 * Prepare the list of media elements inside Chapter
 * @param {*} apiContent 
 * @param {*} matterType 
 * @param {*} imagesData 
 * @returns 
 */
const getContentInChapter = (apiContent, matterType, imagesData) => {
    const bodyMatter = Object.values(apiContent?.contents)?.flat();
    apiContent = {
        ...apiContent,
        contents: { bodyMatter: bodyMatter }
    }
    if (apiContent?.contents['bodyMatter']?.length > 0) {
        apiContent.contents['bodyMatter']?.forEach((container) => {
            if ((container?.label === 'module' || container?.label === 'appendix') && container?.contents?.bodyMatter?.length > 0) {
                getContainerMediaElementsList(container, imagesData, 'bodyMatter', apiContent.contentUrn)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                imagesData[apiContent.contentUrn] = [
                    ...(imagesData[apiContent.contentUrn] || []),
                    ...slateMediaElements
                ]
            }
        })
    }
    return imagesData
}

/**
 * Get Media Elements list inside a container
 * @param {*} container 
 * @param {*} imagesData 
 * @param {*} matterType 
 * @param {*} parentEntityUrn 
 */
const getContainerMediaElementsList = (container, imagesData, matterType, parentEntityUrn) => {
    if (container?.contents?.bodyMatter?.length > 0) {
        container?.contents?.bodyMatter?.forEach((innerContainer) => {
            if (slateTypes.indexOf(innerContainer?.label) > -1 && innerContainer?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(innerContainer.contents.bodyMatter) || []
                if (matterType === 'frontMatter' || matterType === 'backMatter') {
                    imagesData[matterType] = [
                        ...imagesData[matterType],
                        ...slateMediaElements
                    ]
                }
                else if (parentEntityUrn) {
                    imagesData[parentEntityUrn] = [
                        ...(imagesData[parentEntityUrn] || []),
                        ...slateMediaElements
                    ]
                }
                else {
                    imagesData[container.contentUrn] = [
                        ...(imagesData[container.contentUrn] || []),
                        ...slateMediaElements
                    ]
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
const getImagesInsideSlates = (bodyMatter, imagesList = []) => {
    if (bodyMatter?.length > 0) {
        bodyMatter?.forEach(element => {
            if (element.type === 'figure') {
                imagesList.push(element)
            } else if (element.type === 'container') {
                switch (element.label) {
                    case 'showhide':
                        imagesList = getMediaElementInShowhide(element, imagesList)
                        break;
                    case 'groupedcontent':
                        imagesList = getMediaElementInMultiColumn(element, imagesList)
                        break;
                    case 'popup':
                    case "element-aside":
                        imagesList = getMediaElementInAsideWEPopup(element, imagesList)
                        break;
                }
            }
        })
    }
    return imagesList
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
const getMediaElementInAsideWEPopup = (containerData, imagesList) => {
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(element => {
            if (element.type === 'figure') {
                imagesList.push(element)
            } else if (element.type === 'container' && element.contents.bodyMatter) {
                getImagesInsideSlates(containerBodyMatter(element), imagesList)
            }
        })
    }
    return imagesList
}

/**
 * Prepare list of media elements in MultiColumn 2C/3C
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
const getMediaElementInMultiColumn = (containerData, imagesList) => {
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(colData => {
            if (colData.type === 'container') {
                if (colData?.contents?.bodyMatter?.length > 0) {
                    colData?.contents?.bodyMatter.forEach(element => {
                        if (element.type === 'figure') {
                            imagesList.push(element)
                        } else if (element.type === 'container') {
                            getImagesInsideSlates(containerBodyMatter(element), imagesList)
                        }
                    })
                }
            }
        })
    }
    return imagesList
}

/**
 * Prepare list of media elements in Showhide
 * @param {*} containerData 
 * @param {*} imagesList 
 * @returns 
 */
const getMediaElementInShowhide = (containerData, imagesList) => {
    const showHideContent = containerBodyMatter(containerData)
    if (showHideContent?.length > 0) {
        showHideContent.forEach(element => {
            if (element.type === 'figure') {
                imagesList.push(element)
            } else if (element.type === 'container') {
                getImagesInsideSlates(containerBodyMatter(element), imagesList)
            }
        })
    }
    return imagesList
}

/**
 * Prepare list of media elements in FrontMatter & BackMatter
 * @param {*} apiContent 
 * @param {*} matterType 
 * @param {*} imagesData 
 * @returns 
 */
export const getContentInFMandBM = (apiContent, matterType, imagesData) => {
    if (apiContent[matterType]?.length > 0) {
        imagesData = {
            ...imagesData,
            [matterType]: []
        }
        apiContent[matterType]?.forEach((container) => {
            if ((container?.label === 'module' || container?.label === 'appendix') && container?.contents?.bodyMatter?.length > 0) {
                getContainerMediaElementsList(container, imagesData, matterType)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                imagesData[matterType] = [
                    ...imagesData[matterType],
                    ...slateMediaElements
                ]
            }
        })
    }
    return imagesData
}
