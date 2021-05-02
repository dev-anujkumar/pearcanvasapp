export const createDiscussionForUpdateAPI = (_props, elementDiscussion) => {
    if (config.elementStatus?.[elementDiscussion.id] === "approved") {
        config.savingInProgress = true
    }
    const slateEntityUrn = _props.parentUrn?.contentUrn || _props.asideData?.contentUrn || config.slateEntityURN
    return {
        ...elementDiscussion,
        slateVersionUrn: config.slateManifestURN,
        elementParentEntityUrn: slateEntityUrn,
        inputType: "DISCUSSION",
        inputSubType: "NA",
        index: _props.index.toString().split('-')[_props.index.toString().split('-').length - 1]
    }
}