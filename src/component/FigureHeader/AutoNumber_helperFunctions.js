import config from '../../config/config'

export const AUTO_NUMBER_SETTING_DEFAULT = 'Default Auto-number'
export const AUTO_NUMBER_SETTING_RESUME_NUMBER = 'Resume numbernig with'
export const AUTO_NUMBER_SETTING_REMOVE_NUMBER = 'Remove lable & number'
export const AUTO_NUMBER_SETTING_OVERRIDE_NUMBER = 'Override lable & number'
export const AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER = 'Override number only'

export const setAutoNumberSettingValue = (element) => {
    if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
        return AUTO_NUMBER_SETTING_REMOVE_NUMBER
    }
    else if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
        if (element.hasOwnProperty('manualoverride') && Object.keys(element.manualoverride)?.length > 0) {
            if (element.manualoverride.hasOwnProperty('overridenumbervalue') && element.manualoverride.hasOwnProperty('overridelabelvalue')) {
                return AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            } else if (element.manualoverride.hasOwnProperty('overridenumbervalue')) {
                return AUTO_NUMBER_SETTING_OVERRIDE_NUMBER
            } else if (element.manualoverride.hasOwnProperty('resumenumbervalue')) {
                return AUTO_NUMBER_SETTING_RESUME_NUMBER
            }
        }
        return AUTO_NUMBER_SETTING_DEFAULT
    }
    return AUTO_NUMBER_SETTING_DEFAULT
}


export const getLabelNumberPreview = (element, { containerNumber, imgLabelValue, imgNumberValue }, autoNumberSetting) => {
    if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
        return ""
    }
    else if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
        return `${imgLabelValue} ${containerNumber}.${imgNumberValue}`
    }
    return ""
}

export const getContainerNumber = (slateAncestors) => {
    const containerEntityUrn = getContainerEntityUrn(slateAncestors)
    switch (containerEntityUrn) {
        case 'FrontMatter':
            return 'F'
        case 'BackMatter':
            return 'B'
        case 'Part':
            return 'P'
        default:
            return config?.autoNumberingDetails?.chapterOrderList[containerEntityUrn] || '1'
    }
}

export const getContainerEntityUrn = (slateAncestors) =>{
    const moduleTypes = ['module', 'appendix']
    const slateTypes = ["section", "assessment-slate", "cover", 'titlepage', 'copyright', 'listofcontents', 'appendixslate', 'pdfslate']
    if (slateAncestors?.matterType !== 'BodyMatter') {
        return slateAncestors.matterType
    }
    else if (slateTypes.includes(slateAncestors?.label)) {//"container-introduction", 
        if ((slateAncestors?.label === "container-introduction") || (slateAncestors?.ancestors?.label === 'part')) {
            return 'Part'
        }
        else if ((slateAncestors?.label === "container-introduction") || (slateAncestors?.ancestors?.label === 'chapter')) {
            return slateAncestors?.ancestors?.contentUrn
        }
        else if (moduleTypes.includes(slateAncestors?.ancestors?.label)) {
            if (slateAncestors?.ancestors?.ancestors?.label === 'chapter') {
                return slateAncestors?.ancestors?.ancestors?.contentUrn
            }
        }
    }
    return slateAncestors.contentUrn
}
