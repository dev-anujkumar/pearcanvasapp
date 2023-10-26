
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

export const handleCommonEvents = (deletedElmKey, addEvent) => {
    if (addEvent) {
        const deletedElm = document.querySelector(`[innerElementID="${deletedElmKey}"]`);
        deletedElm?.classList?.add("hideElement");
        const sapratorElm = document.querySelector(`[sepratorID="${deletedElmKey}"]`);
        sapratorElm?.classList?.add("hideElement");
        document.getElementById('previous-slate-button')?.classList?.add('stop-event')
        document.getElementById('next-slate-button')?.classList?.add('stop-event')
        const multipleElement = document.querySelectorAll('.power-paste-icon,.split-icon, .delete-icon,.popup-button,.element-label')
        for (const elm of multipleElement) {
            elm.classList.add('stop-event')
        }
    }
    else {
        const deletedElm = document.querySelector(`[innerElementID="${deletedElmKey}"]`);
        deletedElm?.classList?.remove("hideElement");
        const sapratorElm = document.querySelector(`[sepratorID="${deletedElmKey}"]`)
        sapratorElm?.classList?.remove("hideElement");
        document.getElementById('previous-slate-button')?.classList?.remove('stop-event')
        document.getElementById('next-slate-button')?.classList?.remove('stop-event')
        const multipleElement = document.querySelectorAll('.power-paste-icon,.split-icon, .delete-icon,.popup-button,.element-label')
        for (const elm of multipleElement) {
            elm.classList.remove('stop-event')
        }
    }
}
