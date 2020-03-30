import { sendDataToIframe } from '../constants/utility'
import config from '../config/config';
import { GET_ALL_SLATES_DATA, SET_CURRENT_SLATE_DATA } from '../constants/Action_Constants';
let containerType = ['project', 'part', 'chapter', 'module']

/**
 * @function fetchAllSlatesData
 * @description-This function is to send message to TOC to fetch data for all slates in the current project
 * */
export const fetchAllSlatesData = () => dispatch => {
    sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} });
}

/**
 * @function getAllSlatesData
 * @description-This function is to send data from TOC as allSlateData to the appStore
 * @param {Object} allSlateData  
*/
export const getAllSlatesData = (allSlateData) => dispatch => {
    dispatch(prepareAllSlateData(allSlateData))
}

/**
 * @function setItemDetails
 * @description-This function is to prepare details for an item
 * @param {Object} item
 * @returns {Object}  
*/
const setItemDetails = (item) => {
    if (item && item.type != 'project') {
        return {
            containerUrn: item.containerUrn,
            entityUrn: item.entityUrn,
            title: item.title ? item.title : item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",
            type: item.label ? item.label : item.type ? item.type : "",
        }
    }
}

/**
 * @function prepareContainerData
 * @description-This function is to prepare structured data for a given  matterContent
 * @param {Array} matterContent  
 * @param {String} matterType
 * @returns {Array}  
*/
const prepareContainerData = (matterContent, matterType) => {
    let matterData = [];
    matterContent && matterContent.forEach((item) => {
        if (matterType) {
            matterData.push(
                Object.assign({}, setItemDetails(item), {
                    matterType: matterType,
                })
            )
        }
        else {
            matterData.push(
                Object.assign({}, setItemDetails(item))
            )
        }
    })
    return matterData
}

/**
 * @function prepareContents
 * @description-This function is to prepare structured data for a given  matterContent
 * @param {Object} data  
 * @returns {Array}
*/
const prepareContents = (data) => {
    let newContents = [];
    for (let key in data) {
        newContents = newContents.concat(prepareContainerData(data[key]))
    }
    return newContents
}

/**
 * @function prepareAllSlateData
 * @description-This function is to prepare structured data for the parentData and childData recevied from TOC
 * @param {object} allSlatesData  
*/
export const prepareAllSlateData = (allSlatesData) => dispatch => {
    let parentData = allSlatesData && allSlatesData['parentData'] ? allSlatesData['parentData'] : {},
        childrenData = allSlatesData && allSlatesData['childrenData'] ? allSlatesData['childrenData'] :{};
    let allProjectData = {},
        allBodyMatterData = []

    if (parentData) {
        for (let matterType in parentData) {
            allProjectData[matterType] = prepareContainerData(parentData[matterType], matterType)
        }
    }
    allBodyMatterData = allProjectData['bodymatter']

    if (allProjectData['bodymatter'] != [] && childrenData !={}) {

        allBodyMatterData.forEach((container) => {
            container = setChildContents(container, childrenData)
        })

        allBodyMatterData.forEach((container) => {
            if (container.contents) {
                container.contents.forEach((data) => {
                    data = setChildContents(data, childrenData)
                })
            }
        })

        allBodyMatterData.forEach((container) => {
            if (container.contents) {
                container.contents.forEach((item) => {
                    if (item.contents) {
                        item.contents.forEach((data) => {
                            data = setChildContents(data, childrenData)
                        })
                    }
                })
            }
        })
    }

    allProjectData['bodymatter'] = allBodyMatterData
    dispatch({
        type: GET_ALL_SLATES_DATA,
        payload: { allSlateData: allProjectData }
    })

}

/**
 * @function setChildContents
 * @description-This function is to set Contents for Current Container 
 * @param {Object} container  
 * @param {Object} childrenData  
 * @returns {Object}
*/
const setChildContents = (container, childrenData) => {
    for (let key in childrenData) {
        if (key == container.entityUrn && containerType.includes(container.type)) {
            container['contents'] = prepareContents(childrenData[key])
            break;
        }
    }
    return container
}
/**
 * @function setCurrentSlate
 * @description-This function is to set details for Current Slate from AllSlatesData
 * @param {Object} allSlatesData  
*/
export const setCurrentSlate = (allSlateData) => dispatch => {

    let ancestor = {
        containerUrn: config.projectUrn,
        entityUrn: config.projectEntityUrn,
        title: config.book_title,
        type: 'project'
    },
        currentSlateData = {},
        matterType = "",
        matterTypeData = [];

    switch (config.parentEntityUrn) {
        case 'Front Matter':
            matterType = 'FrontMatter';
            matterTypeData = allSlateData && allSlateData.frontmatter ? allSlateData.frontmatter : [];
            break;
        case 'Back Matter':
            matterType = 'BackMatter';
            matterTypeData = allSlateData && allSlateData.backmatter ? allSlateData.backmatter : [];
            break;
        default:
            matterType = 'BodyMatter';
            matterTypeData = allSlateData && allSlateData.bodymatter ? allSlateData.bodymatter : [];
    }

    currentSlateData = setCurrentSlateDetails(matterTypeData, ancestor, matterType)

    return dispatch({
        type: SET_CURRENT_SLATE_DATA,
        payload: {
            currentSlateData: currentSlateData
        }
    })
}

/**
 * @function setCurrentSlateDetails
 * @description-This is a recursive function to prepare structured data for the current Slate based and set its ancestors
 * @param {Array} matterTypeData  
 * @param {Object} ancestor
 * @param {String} matterType
 * @returns {Object}
*/
const setCurrentSlateDetails = (matterTypeData, ancestor, matterType) => {
    if (matterTypeData && matterTypeData.length > 0 && JSON.stringify(matterTypeData).includes(config.slateManifestURN)) {
        for (let key in matterTypeData) {
            if (matterTypeData[key].containerUrn == config.slateManifestURN) {
                ancestor = Object.assign({},
                    setItemDetails(matterTypeData[key]),
                    {
                        matterType: matterType,
                        ancestor: ancestor
                    })
                return ancestor;
            }
            else if (matterTypeData[key].contents && JSON.stringify(matterTypeData[key].contents).includes(config.slateManifestURN)) {
                ancestor = Object.assign({},
                    setItemDetails(matterTypeData[key]),
                    {
                        ancestor: ancestor
                    })
                return setCurrentSlateDetails(matterTypeData[key].contents, ancestor, matterType)
            }
            else {
                // return ancestor = Object.assign({}, setItemDetails(matterTypeData[key]), { ancestor: ancestor })
                continue;
            }
        }
    }
    else{
        return ancestor
    }
}
