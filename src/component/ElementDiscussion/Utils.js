import config from "../../config/config"

export const createDiscussionForUpdateAPI = (_props, elementDiscussion) => {
    if (config.elementStatus?.[elementDiscussion.id] === "approved") {
        config.savingInProgress = true
    }
    const index = _props.index.toString().split('-')[1];
    let slateEntityUrn =  _props?.parentElement?.contentUrn || config.slateEntityURN
    if(_props?.parentElement?.type === "groupedcontent"){
        slateEntityUrn = _props?.parentElement?.groupeddata?.bodymatter[index].contentUrn;
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