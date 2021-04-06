
import config from "../../config/config.js";

export const createPSDataForUpdateAPI = (_props, newPSData) => {
    if (config.elementStatus?.[newPSData.id] === "approved") {
        config.savingInProgress = true
    }
    const slateEntityUrn = _props.parentUrn?.contentUrn || _props.asideData?.contentUrn || config.slateEntityURN
    return {
        ...newPSData,
        slateVersionUrn: config.slateManifestURN,
        elementParentEntityUrn: slateEntityUrn,
        inputType: "ELEMENT_DIALOGUE",
        inputSubType: "NA",
        index: _props.index.toString().split('-')[_props.index.toString().split('-').length - 1]
    }
}
