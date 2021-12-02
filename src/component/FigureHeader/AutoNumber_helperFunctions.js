import config from '../../config/config'

export const AUTO_NUMBER_SETTING_DEFAULT = 'Default Auto-number'
export const AUTO_NUMBER_SETTING_RESUME_NUMBER = 'Resume numbernig with'
export const AUTO_NUMBER_SETTING_REMOVE_NUMBER = 'Remove lable & number'
export const AUTO_NUMBER_SETTING_OVERRIDE_NUMBER = 'Override number only'
export const AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER = 'Override lable & number'

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


export const getLabelNumberPreview = (element, { imgLabelValue, imgNumberValue }) => {
    if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
        return ""
    }
    else if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
        return `${imgLabelValue} ${imgNumberValue}`
    }
    return ""
}

export const getContainerNumber = (slateAncestors) => {
    const containerEntityUrn = getContainerEntityUrn(slateAncestors)
    console.log('containerEntityUrn',containerEntityUrn)
    switch (containerEntityUrn) {
        case 'FrontMatter':
            return 'F'
        case 'BackMatter':
            return 'B'
        case 'Part':
            const partEntityUrn = containerEntityUrn?.split('-')?.[1]
            const partNumber = config?.autoNumberingDetails?.partOrderList[partEntityUrn]
            return partNumber ? `P.${partNumber}` : 'P'
        default:
            return config?.autoNumberingDetails?.chapterOrderList[containerEntityUrn] || '1'
    }
}

export const getContainerEntityUrn = (slateAncestors) =>{
    const moduleTypes = ['module', 'appendix']
    const slateTypes = ["section", "assessment-slate", "cover", 'titlepage', 'copyright', 'listofcontents', 'appendixslate', 'pdfslate']
    console.log('slateAncestors',slateAncestors,slateAncestors?.matterType)
    if (slateAncestors?.matterType !== 'BodyMatter') {
        return slateAncestors.matterType
    }
    else if (slateTypes.includes(slateAncestors?.label)) {//"container-introduction", 
        if ((slateAncestors?.label === "container-introduction") && (slateAncestors?.ancestor?.label === 'part')) {
            return `Part-${slateAncestors?.ancestor?.entityUrn}`
        }
        else if ((slateAncestors?.label === "container-introduction") || (slateAncestors?.ancestor?.label === 'chapter')) {
            return slateAncestors?.ancestor?.entityUrn
        }
        else if (moduleTypes.includes(slateAncestors?.ancestor?.label)) {
            if (slateAncestors?.ancestor?.ancestor?.label === 'chapter') {
                return slateAncestors?.ancestor?.ancestor?.entityUrn
            }
        }
    }
    return slateAncestors.contentUrn
}

export const getLabelNumberFieldValue = (element, figureLabelValue, containerNumber) => {
    if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
        return {
            label: "",
            number: ""
        }
    }
    else if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
        if (element.hasOwnProperty('manualoverride') && Object.keys(element.manualoverride)?.length > 0) {
            if (element.manualoverride.hasOwnProperty('overridenumbervalue') && element.manualoverride.hasOwnProperty('overridelabelvalue')) {
                return {
                    label: element.manualoverride.overridelabelvalue,
                    number: `${containerNumber}.${element.manualoverride.overridenumbervalue}`
                }
            } else if (element.manualoverride.hasOwnProperty('overridenumbervalue')) {
                return {
                    label: figureLabelValue,
                    number: `${containerNumber}.${element.manualoverride.overridenumbervalue}`
                }
            } else if (element.manualoverride.hasOwnProperty('resumenumbervalue')) {
                return {
                    label: figureLabelValue,
                    number: `${containerNumber}.${element.manualoverride.resumenumbervalue}`
                }
            }
        }
        return {
            label: figureLabelValue,
            number: `${containerNumber}.100`
        }
    }
}