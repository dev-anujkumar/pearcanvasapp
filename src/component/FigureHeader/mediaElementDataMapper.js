/**
 * 
 */


const slateTypes = ['container-introduction', 'section', 'appendixslate', 'cover', 'titlepage', 'copyright', 'listofcontents']

const getContentInBodyMatter = (bodyMatterContent, imagesData) => {
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

const getContentInChapter = (apiContent, matterType, imagesData) => {
    const bodyMatter = Object.values(apiContent?.contents)?.flat();
    apiContent = {
        ...apiContent,
        contents: { bodyMatter: bodyMatter }
    }
    if (apiContent?.contents['bodyMatter']?.length > 0) {
        console.log(apiContent.label, apiContent.contentUrn)
        apiContent.contents['bodyMatter']?.forEach((container) => {
            if ((container?.label === 'module' || container?.label === 'appendix') && container?.contents?.bodyMatter?.length > 0) {
                getContainerMediaElementsList(container, imagesData, 'bodyMatter', apiContent.contentUrn)
            }
            else if (slateTypes.indexOf(container?.label) > -1 && container?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(container.contents.bodyMatter) || []
                imagesData[container.contentUrn] = [
                    ...(imagesData[container.contentUrn] || []),
                    ...slateMediaElements
                ]
            }
        })
    }
    return imagesData
}

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
            dataToReturn = Object.values(element?.interactivedata)?.flat()
            break;
        case "group":
            dataToReturn = container?.groupdata?.bodyMatter ?? []
            break;
        case "popup":
        case "element-aside":
            dataToReturn = container?.contents?.bodyMatter ?? []
            break;
    }
    return dataToReturn
}

const getMediaElementInAsideWEPopup = (containerData, imagesList) => {
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(element => {
            if (element.type === 'figure') {
                imagesList.push(element)
            } else if (element.type === 'container' && element.contents.bodyMatter) {
                getImagesInsideSlates(containerBodyMatter(element.contents.bodyMatter), imagesList)
            }
        })
    }
    return imagesList
}

const getMediaElementInMultiColumn = (containerData, imagesList) => {
    if (containerData?.groupeddata?.bodyMatter?.length > 0) {
        containerData?.groupeddata?.bodyMatter.forEach(colData => {
            if (colData.type === 'container') {
                if (colData?.groupdata?.bodyMatter?.length > 0) {
                    colData?.groupdata?.bodyMatter.forEach(element => {
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

const getContentInFMandBM = (apiContent, matterType, imagesData) => {
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
