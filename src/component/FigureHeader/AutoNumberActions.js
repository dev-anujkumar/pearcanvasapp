import config from '../../config/config.js';
import axios from 'axios';
/**
 * 
 */

const commonHeaders = {
    "ApiKey": config.STRUCTURE_APIKEY,
    "Content-Type": "application/json",
    "PearsonSSOSession": config.ssoToken
}
/**
 * This API fetches the Learning Framework(s) linked to the project
 */
 export const fetchProjectFigures = () => dispatch => {
    axios.get(`${config.ASSET_POPOVER_ENDPOINT}v4/${config.projectUrn}/images`, {
        headers: commonHeaders
    }).then(response => {
        if (response?.data?.numberOfImages > 0) {
            const projectContent = response.data.contents
            let imagesData = {}
            if (projectContent['frontMatter']?.length > 0) {
                imagesData = getContentInFMandBM(projectContent, 'frontMatter', imagesData)
            }
            if (projectContent['backMatter']?.length > 0) {
                imagesData = getContentInFMandBM(projectContent, 'backMatter', imagesData)
            }
            if(projectContent['bodyMatter']?.length > 0){
                imagesData = {
                    ...imagesData,
                    'bodyMatter' : []
                }
               // const bodyMatterData = getbodyMatterContent(projectContent['bodyMatter'],imagesData)
            }
            console.log('imagesData222',imagesData)
            dispatch({
                type: 'GET_ALL_FIGURE_ELEMENTS',
                payload: {
                    images: imagesData
                }
            });
        } else {
            dispatch({
                type: 'GET_ALL_FIGURE_ELEMENTS',
                payload: {}
            });
        }
    }).catch(error => {
        console.log('Error in fetching list of figures in the project>>>> ', error)
        dispatch({
            type: 'GET_ALL_FIGURE_ELEMENTS',
            payload: {}
        });
    })

};

const getbodyMatterContent  = (bodyMatterContent,imagesData) =>{
    if(bodyMatterContent.contents?.bodyMatter?.length > 0){
        bodyMatterContent.contents?.bodyMatter?.forEach(container=>{
            if(container?.label === 'part'){
                if(container['frontMatter']?.length>0){
                    imagesData[container.contentUrn] = container['frontMatter'].concat(container.contents.bodyMatter)
                }
                if(container['bodyMatter']?.length>0){
                    // container = {
                    //     ...container,
                    //     bodyMatter: bodyMatter
                    // }
                }
            }
            else if(container?.label === 'chapter'){
                const bodyMatter = Object.values(container)?.flat();
                delete container['frontMatter']
                container = {
                    ...container,
                    bodyMatter: bodyMatter
                }
            }
            else if (slateTypes.indexOf(container?.label) > -1) {

            }
        })

    }
}

const getContainerMediaElementsList = (container, imagesData, matterType) => {
    if (container?.contents?.bodyMatter?.length > 0) {
        container?.contents?.bodyMatter?.forEach((innerContainer) => {
            if (slateTypes.indexOf(innerContainer?.label) > -1 && innerContainer?.contents?.bodyMatter?.length > 0) {
                const slateMediaElements = getImagesInsideSlates(innerContainer.contents.bodyMatter) || []
                if (matterType === 'frontMatter' || matterType === 'backMatter') {
                    imagesData[matterType] = [
                        ...imagesData[matterType],
                        ...slateMediaElements
                    ]
                } else {
                    imagesData[container.contentUrn] = [
                        ...imagesData[container.contentUrn],
                        ...slateMediaElements
                    ]
                }
            }
        })
    }
}

const slateTypes = ['container-introduction', 'section', 'appendixslate', 'cover', 'titlepage', 'copyright', 'listofcontents']


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
const getMediaElementInAsideWEPopup = (containerData, imagesList) => {
    if (containerData?.contents?.bodyMatter?.length > 0) {
        containerData?.contents?.bodyMatter.forEach(element => {
            if (element.type === 'figure') {
                imagesList.push(ele)
            } else if (element.type === 'container') {
                getImagesInsideSlates(containerBodyMatter(element), imagesList)
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
                            imagesList.push(ele2)
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