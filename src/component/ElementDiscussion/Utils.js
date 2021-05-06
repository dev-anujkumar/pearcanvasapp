import config from "../../config/config"

export const createDiscussionForUpdateAPI = (_props, elementDiscussion) => {
    if (config.elementStatus?.[elementDiscussion.id] === "approved") {
        config.savingInProgress = true
    }
    const index = _props.index.toString().split('-') || [];
    const {type, subtype, elementdata, groupeddata, contentUrn} = _props?.parentElement || {};
    
    let slateEntityUrn =  contentUrn || config.slateEntityURN;
    if(type === "groupedcontent") {
        slateEntityUrn = groupeddata?.bodymatter[index[1]].contentUrn;
    } else if(type === "element-aside" && subtype === "workedexample" && index.length === 3) {
        slateEntityUrn = elementdata?.bodymatter[index[1]].contentUrn;
    }
    return {
        ...elementDiscussion,
        slateVersionUrn: config.slateManifestURN,
        elementParentEntityUrn: slateEntityUrn,
        inputType: "DISCUSSION",
        inputSubType: "NA",
        index: _props.index.toString().split('-')[_props.index.toString().split('-').length - 1]
    }
}