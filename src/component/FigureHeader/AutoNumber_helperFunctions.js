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


export const getLabelNumberPreview = (element, { imgLabelValue, imgNumberValue }, parentNumber) => {
    // if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
    //     return ""
    // } else 
    if (element.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
        return `${imgLabelValue} ${parentNumber}.${imgNumberValue}`
    }
    return ""
}

export const getContainerNumber = (slateAncestors, autoNumberingDetails) => {
    const containerEntityUrn = getContainerEntityUrn(slateAncestors)
    switch (containerEntityUrn) {
        case 'frontMatter':
            return 'F'
        case 'backMatter':
            return 'B'
        // case 'Part':
        // return 'P'
        // const partEntityUrn = containerEntityUrn?.split('-')?.[1]
        // const partNumber = config?.autoNumberingDetails?.partOrderList[partEntityUrn]
        // return partNumber ? `P${partNumber}` : 'P'
        default:
            if (autoNumberingDetails?.partOrderList?.hasOwnProperty(containerEntityUrn)) {
                const partNumber = autoNumberingDetails?.partOrderList[partEntityUrn]
                return partNumber ? `P${partNumber}` : 'P'
            }
            else {
                return autoNumberingDetails?.chapterOrderList[containerEntityUrn] || '1'
            }
    }
}

export const getContainerEntityUrn = (slateAncestors) =>{
    const moduleTypes = ['module', 'appendix']
    const slateTypes = ["section", "assessment-slate", "cover", 'titlepage', 'copyright', 'listofcontents', 'appendixslate', 'pdfslate']
    if (slateAncestors?.matterType !== 'BodyMatter') {
        const matterType = slateAncestors.matterType ==='FrontMatter' ? 'frontMatter' : slateAncestors.matterType ==='BackMatter' ? 'backMatter' :""
        return matterType
    }
    else if (slateTypes.includes(slateAncestors?.label)) {
        if ((slateAncestors?.label === "container-introduction") && (slateAncestors?.ancestor?.label === 'part')) {
            return slateAncestors?.ancestor?.entityUrn
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

export const prepareAutoNumberList = (imagesData) => {
    const imagesList = { ...imagesData };
    /** Destructure the ImageList into an array of Fig-EntityUrns in Order */
    Object.keys(imagesList).forEach((key) => {
        imagesList[key] = imagesList[key]?.map((item) => item.contentUrn);
    });
    /** Get the number value for the Fig-Element based on aut-numbering wip values*/
    //can be replaced with the logic for getNodeIndex from toc
    Object.keys(imagesList).forEach((key) => {
        config.imgCount = 0;
        imagesList[key] = imagesList[key]?.reduce(function (result, item, index, array) {
            const activeItem = imagesData[key].find((img) => img.contentUrn === item);
            let numberValue = config.imgCount;
            if (activeItem) {
                if (activeItem?.numberedandlabel === false) {
                    numberValue = "";
                } else if (activeItem?.manualoverride?.overridenumbervalue) {
                    numberValue = activeItem.manualoverride.overridenumbervalue;
                } else if (activeItem?.manualoverride?.resumenumbervalue) {
                    numberValue = activeItem.manualoverride.resumenumbervalue;
                    config.imgCount = activeItem.manualoverride.resumenumbervalue;
                } else {
                    numberValue = ++config.imgCount;
                }
            }
            //console.log(item, 'numberValue', numberValue)
            result[item] = numberValue; //{index: index +1, numberedandlabel: activeItem?.numberedandlabel};
            return result;
        },
            {});
    });
    //console.log("imagesList", imagesList);
    return imagesList;
};