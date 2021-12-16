import config from '../../config/config'
import { moduleTypes, slateTypes, MATTER_TYPES, CONTAINER_LABELS, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, AUTO_NUMBER_PROPERTIES, autoNumber_KeyMapper } from './AutoNumberConstants';

const {
    MANUAL_OVERRIDE,
    NUMBERED_AND_LABEL,
    RESUME_NUMBER_VALUE,
    OVERRIDE_LABEL_VALUE,
    OVERRIDE_NUMBER_VALUE
} = AUTO_NUMBER_PROPERTIES;

export const setAutoNumberSettingValue = (element) => {
    if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) {
        return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_REMOVE_NUMBER
    }
    else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
            if (element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE) && element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_LABEL_VALUE)) {
                return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            } else if (element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE)) {
                return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_OVERRIDE_NUMBER
            } else if (element[MANUAL_OVERRIDE].hasOwnProperty(RESUME_NUMBER_VALUE)) {
                return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_RESUME_NUMBER
            }
        }
        return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_DEFAULT
    }
    return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_DEFAULT
}

export const getOverridedNumberValue = (element) => {
    if ((element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) || (!element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true)) {
        return undefined;
    }
    else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
            if (element.manualoverride.hasOwnProperty(OVERRIDE_NUMBER_VALUE)) {
                return element[MANUAL_OVERRIDE][OVERRIDE_NUMBER_VALUE];
            } else if (element[MANUAL_OVERRIDE].hasOwnProperty()) {
                return element[MANUAL_OVERRIDE][RESUME_NUMBER_VALUE];
            }
        }
        return undefined;
    }
    return undefined;
}


export const getLabelNumberPreview = (element, { imgLabelValue, imgNumberValue, parentNumber }) => {
    if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        return `${imgLabelValue} ${parentNumber}.${imgNumberValue}`
    }
    return ""
}

export const getContainerNumber = (slateAncestors, autoNumberingDetails) => {
    const containerEntityUrn = getContainerEntityUrn(slateAncestors)
    switch (containerEntityUrn) {
        case CONTAINER_LABELS.FRONTMATTER:
            return 'F'
        case CONTAINER_LABELS.BACKMATTER:
            return 'B'
        default:
            if (autoNumberingDetails?.partOrderList?.hasOwnProperty(containerEntityUrn)) {
                const partNumber = autoNumberingDetails?.partOrderList[partEntityUrn]
                return partNumber ? `P${partNumber}` : 'P'
            }
            else {
                if (containerEntityUrn) {
                    return autoNumberingDetails?.chapterOrderList[containerEntityUrn] || '1'
                }
                return "1"
            }
    }
}

export const getContainerEntityUrn = (slateAncestors) =>{

    if (slateAncestors?.matterType !== MATTER_TYPES.BODYMATTER) {
        const matterType = slateAncestors.matterType === MATTER_TYPES.FRONTMATTER ? CONTAINER_LABELS.FRONTMATTER : slateAncestors.matterType === MATTER_TYPES.BACKMATTER ? CONTAINER_LABELS.BACKMATTER : ""
        return matterType
    }
    else if (slateTypes.includes(slateAncestors?.label)) {
        if ((slateAncestors?.label === CONTAINER_LABELS.CONTAINER_INTRO) && (slateAncestors?.ancestor?.label === CONTAINER_LABELS.PART)) {
            return slateAncestors?.ancestor?.entityUrn
        }
        else if ((slateAncestors?.label === CONTAINER_LABELS.CONTAINER_INTRO) || (slateAncestors?.ancestor?.label === CONTAINER_LABELS.CHAPTER)) {
            return slateAncestors?.ancestor?.entityUrn
        }
        else if (moduleTypes.includes(slateAncestors?.ancestor?.label)) {
            if (slateAncestors?.ancestor?.ancestor?.label === CONTAINER_LABELS.CHAPTER) {
                return slateAncestors?.ancestor?.ancestor?.entityUrn
            }
        }
    }
    return slateAncestors?.contentUrn ?? ''
}

export const getLabelNumberFieldValue = (element, figureLabelValue, containerNumber) => {
    let elementLabel = figureLabelValue || element?.displayedlabel || ""
    if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) {
        elementLabel = ""
    }
    else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
            if (element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE) && element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_LABEL_VALUE)) {
                elementLabel = element[MANUAL_OVERRIDE].overridelabelvalue
            } else if ((element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE)) || (element[MANUAL_OVERRIDE].hasOwnProperty(RESUME_NUMBER_VALUE))) {
                elementLabel = figureLabelValue
            }
        }
    }
    return elementLabel
}

export const prepareAutoNumberList = (imagesData) => {
    let imagesList = { ...imagesData };
    /** Destructure the ImageList into an array of Fig-EntityUrns in Order */
    Object.keys(imagesList).forEach((key) => {
        imagesList[key] = imagesList[key]?.map((item) => item.contentUrn);
    });
    /** Get the number value for the Fig-Element based on aut-numbering wip values*/
    //can be replaced with the logic for getNodeIndex from toc
    Object.keys(imagesList).forEach((key) => {
        let count = 0
        imagesList[key] = imagesList[key]?.reduce(function (result, item, index, array) {
            const activeItem = imagesData[key].find((img) => img.contentUrn === item);
            let numberValue = count
            if (activeItem) {
                if (activeItem?.[NUMBERED_AND_LABEL] === false) {
                    numberValue = "";
                } else if (activeItem?.[MANUAL_OVERRIDE]?.[OVERRIDE_NUMBER_VALUE]) {
                    numberValue = activeItem[MANUAL_OVERRIDE][OVERRIDE_NUMBER_VALUE];
                } else if (activeItem?.[MANUAL_OVERRIDE]?.[RESUME_NUMBER_VALUE]) {
                    count = activeItem[MANUAL_OVERRIDE][RESUME_NUMBER_VALUE];
                } else {
                    numberValue = ++count
                }
            }
            result[item] = numberValue;
            return result;
        },
            {});
    });
    return imagesList;
};

export const getNumberData = (parentIndex, element, autoNumberElementsIndex) => {
    if (parentIndex && element && autoNumberElementsIndex) {
        let labelType = autoNumber_KeyMapper[element?.displayedlabel || 'Figure']
        if (autoNumberElementsIndex.hasOwnProperty(labelType) && autoNumberElementsIndex[labelType]?.hasOwnProperty(parentIndex)) {
            return autoNumberElementsIndex[labelType][parentIndex]?.[element.contentUrn] || ''
        }
    }
    return ''
}