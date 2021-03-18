import { sendDataToIframe } from '../constants/utility'
import config from '../config/config';
import { GET_ALL_SLATES_DATA, SET_CURRENT_SLATE_DATA } from '../constants/Action_Constants';
let containerType = ['project', 'part', 'chapter', 'module','appendix']

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
    if (item && item.label != 'project') {
        return {
            containerUrn: item.containerUrn,
            entityUrn: item.entityUrn,
            title: item.title ? item.title : item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",
            label: item.label ? item.label : "",
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
    let allProjectData = {};

    if (parentData) {
        for (let matterType in parentData) {
            allProjectData[matterType] = prepareContainerData(parentData[matterType], matterType)
        }
    }
    allProjectData['bodymatter'] = setAllMatterContent(allProjectData['bodymatter'], childrenData);
    allProjectData['frontmatter'] = setAllMatterContent(allProjectData['frontmatter'], childrenData);
    allProjectData['backmatter'] = setAllMatterContent(allProjectData['backmatter'], childrenData);
    dispatch({
        type: GET_ALL_SLATES_DATA,
        payload: { allSlateData: allProjectData }
    })

}

const setAllMatterContent = (processedData, childrenData) => {
    if (processedData != [] && childrenData != {}) {
        processedData.forEach((container) => {
            container = setChildContents(container, childrenData)
        })
        processedData.forEach((container) => {
            if (container.contents) {
                container.contents.forEach((data) => {
                    data = setChildContents(data, childrenData)
                })
            }
        })
        processedData.forEach((container) => {
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
    return processedData;
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
        if (key == container.entityUrn && containerType.includes(container.label)) {
            container['contents'] = prepareContents(childrenData[key])
            break;
        }
    }
    return container
}
/**
 * @function setCurrentSlateAncestorData
 * @description-This function is to set details for Current Slate from AllSlatesData
 * @param {Object} allSlatesData  
*/
export const setCurrentSlateAncestorData = (allSlateData) => dispatch => {

    let ancestor = {
        containerUrn: config.projectUrn,
        entityUrn: config.projectEntityUrn,
        title: config.book_title,
        label: 'project'
    },
        currentSlateData = {},
        matterType = "",
        matterTypeData = [];
    switch (config.parentOfParentItem) {
        case 'frontmatter':
            matterType = 'FrontMatter';
            matterTypeData = allSlateData && allSlateData.frontmatter ? allSlateData.frontmatter : [];
            break;
        case 'backmatter':
            matterType = 'BackMatter';
            matterTypeData = allSlateData && allSlateData.backmatter ? allSlateData.backmatter : [];
            break;
        default:
            if (config.parentOfParentItem.trim() == "" && (config.parentLabel && (config.parentLabel == "frontmatter" || config.parentLabel == "backmatter"))) {
                matterType = config.parentLabel == "frontmatter" ? 'FrontMatter' : 'BackMatter'
                matterTypeData = allSlateData && allSlateData[config.parentLabel] ? allSlateData[config.parentLabel] : [];
            } else {
                matterType = 'BodyMatter';
                matterTypeData = allSlateData && allSlateData.bodymatter ? allSlateData.bodymatter : [];
            }
            break;
    }

    currentSlateData = setCurrentSlateAncestorDataDetails(matterTypeData, ancestor, matterType)

    return dispatch({
        type: SET_CURRENT_SLATE_DATA,
        payload: {
            currentSlateAncestorData: currentSlateData
        }
    })
}

const checkCurrentSlateUrn = (allSlatesData) => {
    const slateUrns = [config.slateManifestURN, config.slateEntityURN, config.tempSlateManifestURN, config.tempSlateEntityURN]
    for (let index in slateUrns) {
        if (allSlatesData.includes(slateUrns[index])) {
            return true;
        }
    }
    return false;
}

const compareCurrentSlateUrn = (containerUrn, entityUrn) => {
    const slateUrns = [config.slateManifestURN, config.slateEntityURN, config.tempSlateManifestURN, config.tempSlateEntityURN]
    if (slateUrns.includes(containerUrn) || slateUrns.includes(entityUrn)) {
        return true;
    }
    return false;
}

/**
 * @function setCurrentSlateAncestorDataDetails
 * @description-This is a recursive function to prepare structured data for the current Slate based and set its ancestors
 * @param {Array} matterTypeData  
 * @param {Object} ancestor
 * @param {String} matterType
 * @returns {Object}
*/
const setCurrentSlateAncestorDataDetails = (matterTypeData, ancestor, matterType) => {
    if (matterTypeData && matterTypeData.length > 0 && (checkCurrentSlateUrn(JSON.stringify(matterTypeData)))) {
        for (let key in matterTypeData) {
            if (compareCurrentSlateUrn(matterTypeData[key].containerUrn, matterTypeData[key].entityUrn)) {
                ancestor = Object.assign({},
                    setItemDetails(matterTypeData[key]),
                    {
                        matterType: matterType,
                        ancestor: ancestor
                    })
                return ancestor;
            }
            else if (matterTypeData[key].contents && (checkCurrentSlateUrn(JSON.stringify(matterTypeData[key].contents)))) {
                ancestor = Object.assign({},
                    setItemDetails(matterTypeData[key]),
                    {
                        ancestor: ancestor
                    })
                return setCurrentSlateAncestorDataDetails(matterTypeData[key].contents, ancestor, matterType)
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
