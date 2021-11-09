
import config from "../../config/config.js";
import ElementConstants from '../ElementContainer/ElementConstants';

export const createPSDataForUpdateAPI = (_props, newPSData) => {
    if (config.elementStatus?.[newPSData.id] === "approved") {
        config.savingInProgress = true;
        /* After versioning, if PS inside Showhide then add sectionType in update call body */
        if(_props?.asideData?.type === ElementConstants.SHOW_HIDE) {
            newPSData.sectionType = _props?.asideData?.sectionType;
        }
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
