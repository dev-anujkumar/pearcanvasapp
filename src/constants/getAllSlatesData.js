import { sendDataToIframe } from './utility'
import config from '../config/config';
import {GET_ALL_SLATES_DATA,GET_CURRENT_SLATE_DATA} from './Action_Constants';

export const fetchAllSlatesData = () => {
    sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} });
}

export const getAllSlateData = (allSlateData) => dispatch => {
    dispatch(prepareAllSlateData(allSlateData))
}

export const prepareContainerData = (matterContent) => {
    let matterData = [];
    matterContent && matterContent.forEach((item) => {
        matterData.push({
            containerUrn: item.containerUrn,
            entityUrn: item.entityUrn,
            type: item.label,
            title: item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : ""
        })
    })
    return matterData
}

export const prepareContents = (data) => {
    let newContents=[];
    for(let key in data){
        newContents=newContents.concat(prepareContainerData(data[key]))
    }  
    return newContents
}


export const prepareAllSlateData = (allSlatesData) => dispatch => {
    let parentData = allSlatesData['parentData'],
        childrenData = allSlatesData['childrenData'];
    let allSlateData = [], allProjectData = {}


    if (parentData) {
        for (let matterType in parentData) {
            if (matterType == "frontmatter" || matterType == "backmatter") {
                allProjectData[matterType] = prepareContainerData(parentData[matterType])
            }
        }
    }

    if (parentData.bodymatter) {
        parentData && parentData.bodymatter && parentData.bodymatter.forEach((container) => {
            for (let key in childrenData) {
                if (key == container.entityUrn) {
                    allSlateData.push({
                        entityUrn: container.entityUrn,
                        containerUrn: container.containerUrn,
                        type: container.label,
                        title: container.unformattedTitle && container.unformattedTitle.en ? container.unformattedTitle.en : "",
                        contents: prepareContents(childrenData[key])
                    })
                }

            }
        })
    }
    if (allSlateData != []) {
        allSlateData.forEach((container) => {
            for (let key in childrenData) {
                if (container && container.contents) {
                    container.contents.forEach((data) => {
                        if (key == data.entityUrn) {  
                            data['contents'] = prepareContents(childrenData[key])
                        }
                    })
                }
            }
        })
    }
    if (allSlateData != []) {
        allSlateData.forEach((container) => {
            for (let key in childrenData) {
                if (container && container.contents) {
                    container.contents.forEach((innerContainer) => {
                        if (innerContainer && innerContainer.contents) {
                            innerContainer.contents.forEach((data) => {
                                if (key == data.entityUrn && data.type!='section') {
                                    data['contents'] = prepareContents(childrenData[key])
                                }
                            })
                        }
                    })
                }
            }
        })
    }


    allProjectData['bodymatter'] = allSlateData
    dispatch({
        type: GET_ALL_SLATES_DATA,
        payload: { allSlateData: allProjectData }
    })

}



export const getCurrentSlateData = () => (dispatch,getState)=>{
    let allSlatesData = getState().appStore.allSlateData
    let currentSlateData = {}
    for (let matterType in allSlatesData) {
        if (matterType == "frontmatter" || matterType == "backmatter") {
            allSlateData[matterType].forEach((slate) => {
                if (slate.containerUrn == config.slateManifestURN) {
                    currentSlateData = {
                        versionUrn: slate.containerUrn,
                        entityUrn: slate.entityUrn,
                        title: slate.title,
                        type: slate.type,
                        matterType: matterType
                    }
                }
            })
        } else {
            let bodymatter = allSlatesData['bodymatter']
            bodymatter && bodymatter.forEach((container) => {
                if (container.contents && container.contents.length) {
                    container.contents.forEach((innerContainer1) => {
                        if (innerContainer1.contents && innerContainer1.contents.length) {
                            innerContainer1.contents.forEach((innerContainer2) => {
                                if (innerContainer2.contents && innerContainer2.contents.length) {
                                    innerContainer2.contents.forEach((slate) => {
                                        if (slate.containerUrn == config.slateManifestURN) {
                                            currentSlateData = Object.assign({}, setItemDetails(slate), {
                                                matterType:"bodymatter",
                                                ancestor: Object.assign({}, setItemDetails(innerContainer2), {
                                                    ancestor: Object.assign({}, setItemDetails(innerContainer1), {
                                                        ancestor: Object.assign({}, setItemDetails(container), {
                                                            ancestor: Object.assign({}, setItemDetails())
                                                        })
                                                    })
                                                })
                                            })
                                        }
                                    })
                                }
                                else {
                                    if (innerContainer2.containerUrn == config.slateManifestURN) {
                                        currentSlateData = Object.assign({}, setItemDetails(innerContainer2), {
                                            matterType:"bodymatter",
                                            ancestor: Object.assign({}, setItemDetails(innerContainer1), {
                                                ancestor: Object.assign({}, setItemDetails(container), {
                                                    ancestor: Object.assign({}, setItemDetails())
                                                })
                                            })
                                        })
                                    }
                                }
                            })
                        } else if(innerContainer1.type !=undefined && innerContainer1.containerUrn == config.slateManifestURN ){
                            currentSlateData = Object.assign({}, setItemDetails(innerContainer1), {
                                matterType:"bodymatter",
                                ancestor: Object.assign({}, setItemDetails(container), {
                                    ancestor: Object.assign({}, setItemDetails())
                                })
                            })
                        } 
                        else if (container.containerUrn == config.slateManifestURN) {
                            currentSlateData = Object.assign({}, setItemDetails(container), {
                                matterType:"bodymatter",
                                ancestor: Object.assign({}, setItemDetails())
                            })
                        }
                    })
                } else if(container.containerUrn == config.slateManifestURN) {
                    currentSlateData = Object.assign({}, setItemDetails(container), {
                        matterType:"bodymatter",
                        ancestor: Object.assign({}, setItemDetails())
                    })
                }
            })
        }
    }
    return   dispatch({
        type: GET_CURRENT_SLATE_DATA,
        payload: {
            currentSlateData: currentSlateData
        }
    })

}

export const getContents = (bodymatter, currentSlateData = {}) => {
    bodymatter.forEach((container) => {
        if (container.containerUrn == config.slateManifestURN) {
            return currentSlateData = setItemDetails(container)

        } else {
            return () => {
                currentSlateData.ancestor = setItemDetails(container)
                getContents(container, currentSlateData)
            }
        }
    })
}





export const setItemDetails = (item) => {
    if (item && item.type != 'project') {
        return {
            versionUrn: item.containerUrn,
            entityUrn: item.entityUrn,
            title: item.title,
            type: item.type,
        }
    } else {
        return {
            versionUrn: config.projectUrn,
            entityUrn: config.projectEntityUrn,
            title: config.book_title,
            type: 'project'
        }

    }

}