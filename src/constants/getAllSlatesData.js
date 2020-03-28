import { sendDataToIframe } from './utility'
import config from '../config/config';
import { GET_ALL_SLATES_DATA, SET_CURRENT_SLATE_DATA } from './Action_Constants';
let containerType = ['project', 'part', 'chapter', 'module']

export const fetchAllSlatesData = () => {
    sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} });
}

export const getAllSlateData = (allSlateData) => dispatch => {
    dispatch(prepareAllSlateData(allSlateData))
}

export const setItemDetails = (item) => {
    if (item && item.type != 'project') {
        return {
            containerUrn: item.containerUrn,
            entityUrn: item.entityUrn,
            title: item.title ? item.title : item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",
            type: item.label ? item.label : item.type ? item.type : "",
        }
    }
}

export const prepareContainerData = (matterContent, matterType) => {
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

export const prepareContents = (data) => {
    let newContents = [];
    for (let key in data) {
        newContents = newContents.concat(prepareContainerData(data[key]))
    }
    return newContents
}


export const prepareAllSlateData = (allSlatesData) => dispatch => {
    let parentData = allSlatesData['parentData'],
        childrenData = allSlatesData['childrenData'];
    let allSlateData = [], allProjectData = {}
    if (parentData) {
        for (let matterType in parentData) {
            allProjectData[matterType] = prepareContainerData(parentData[matterType], matterType)
        }
    }
    console.log("allProjectData", allProjectData)

    /**    allSlateData.forEach((container) => {
            for (let key in childrenData) {
                if (container && container.contents) {
                    container.contents.forEach((innerContainer) => {
                        if (innerContainer && innerContainer.contents) {
                            innerContainer.contents.forEach((data) => {
                                if (key == data.entityUrn && data.type != 'section') {
                                    data['contents'] = prepareContents(childrenData[key])
                                }
                            })
                        }
                    })
                }
            }
        })
     
   */
    let data = [], allSlates = []

    if (allProjectData && allProjectData['bodymatter'] != []) {
        data = allProjectData['bodymatter']
        childrenData && Object.keys(childrenData).forEach((key) => {
            allSlateData = getChildContents(data, childrenData, key)
        })

    }

    allSlateData.forEach((container) => {
        for (let key in childrenData) {
            if (container && container.contents) {
                container.contents.forEach((innerContainer) => {
                    if (innerContainer && innerContainer.contents) {
                        innerContainer.contents.forEach((data) => {
                            if (key == data.entityUrn && containerType.includes(data.type)) {
                                data['contents'] = prepareContents(childrenData[key])
                            }
                        })
                    } else if (key == innerContainer.entityUrn && containerType.includes(innerContainer.type)) {
                        innerContainer['contents'] = prepareContents(childrenData[key])
                    }
                })
            }
        }
    })
    // console.log("allSlates:", allSlates)
    allProjectData['bodymatter'] = allSlateData
    dispatch({
        type: GET_ALL_SLATES_DATA,
        payload: { allSlateData: allProjectData }
    })

}


export const getChildContents = (data, childrenData, key = "") => {

    data && data.forEach((item, index) => {
        if (item.entityUrn == key && containerType.includes(item.type)) {
            item['contents'] = prepareContents(childrenData[key])
        }
        else if (item && item.contents && item.contents.length > 0) {
            getChildContents(item.contents, childrenData, key)
        }
    })
    //  console.log("data", data)
    return data


}



//parent-set current slate data
export const setCurrentSlate = (allSlateData) => dispatch => {

    let ancestor = {
        containerUrn: config.projectUrn,
        entityUrn: config.projectEntityUrn,
        title: config.book_title,
        type: 'project'
    }
    let currentSlateData = {}
    switch (config.parentEntityUrn) {
        case 'Front Matter':
            currentSlateData = setCurrentSlateDetails(allSlateData.frontmatter, ancestor)
            break;
        case 'Back Matter':
            currentSlateData = setCurrentSlateDetails(allSlateData.backmatter, ancestor)
            break;
        default:
            currentSlateData = setCurrentSlateDetails(allSlateData.bodymatter, ancestor)
    }


    return dispatch({
        type: SET_CURRENT_SLATE_DATA,
        payload: {
            currentSlateData: currentSlateData
        }
    })
}
//recursive
export const setCurrentSlateDetails = (bodymatter, ancestor) => {
    let data = JSON.stringify(bodymatter)
    if (bodymatter && bodymatter.length > 0 && data.includes(config.slateManifestURN)) {
        for (let key in bodymatter) {
            if (bodymatter[key].containerUrn == config.slateManifestURN) {
                ancestor = Object.assign({}, setItemDetails(bodymatter[key]), { ancestor: ancestor })
                return ancestor;
            }
            else if (bodymatter[key].contents && JSON.stringify(bodymatter[key].contents).includes(config.slateManifestURN)) {
                ancestor = Object.assign({}, setItemDetails(bodymatter[key]), { ancestor: ancestor })
                return setCurrentSlateDetails(bodymatter[key].contents, ancestor)
            }
            else {
                // return ancestor = Object.assign({}, setItemDetails(bodymatter[key]), { ancestor: ancestor })//check
                continue;
            }
        }
    }
    else {
        return ancestor = Object.assign({}, setItemDetails(bodymatter), { ancestor: ancestor })//check
    }
}



