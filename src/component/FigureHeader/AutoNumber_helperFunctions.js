import config from '../../config/config'
import { moduleTypes, slateTypes, MATTER_TYPES, CONTAINER_LABELS, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, AUTO_NUMBER_PROPERTIES, autoNumber_KeyMapper, autoNumber_ElementTypeKey, autoNumber_FigureTypeKeyMapper, autoNumber_ElementTypeToStoreKeysMapper } from './AutoNumberConstants';
import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST
} from '../../constants/Action_Constants.js';
import {getAutoNumberSequence} from './AutoNumberActions';
import { findNearestMediaElement } from './AutoNumberCreate_helper';
import { getImagesInsideSlates } from './slateLevelMediaMapper';
import { IMAGE, TABLE, MATH_IMAGE, AUDIO, VIDEO } from '../../constants/Element_Constants';
const {
    MANUAL_OVERRIDE,
    NUMBERED_AND_LABEL,
    RESUME_NUMBER_VALUE,
    OVERRIDE_LABEL_VALUE,
    OVERRIDE_NUMBER_VALUE
} = AUTO_NUMBER_PROPERTIES;

const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

/**
 * This function is responsible for setting the value in "Label&Number Settings" Dropdown
 * @param {*} element 
 * @returns 
 */
export const setAutoNumberSettingValue = (element) => {
    if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) {
        return LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_REMOVE_NUMBER
    }
    else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && element[MANUAL_OVERRIDE] !== undefined && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
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

/**
 * 
 * @param {*} element 
 * @returns 
 */
export const getOverridedNumberValue = (element) => {
    if ((element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false)) {
        return undefined;
    }
    else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && element[MANUAL_OVERRIDE] !== undefined && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
            if (element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE)) {
                return element[MANUAL_OVERRIDE][OVERRIDE_NUMBER_VALUE];
            } else if (element[MANUAL_OVERRIDE].hasOwnProperty(RESUME_NUMBER_VALUE)) {
                return element[MANUAL_OVERRIDE][RESUME_NUMBER_VALUE];
            }
        }
        return undefined;
    }
}

const checkKeysInObj = (Obj) => {
    let check = true;
    for (let Key in Obj) {
        if (Obj[Key] === '' || Obj[Key] === undefined || Obj[Key] === null) {
            check = false;
            break;
        }
    }
    return check;
}

/**
 * Prepare the payload for updating Auto-numbered Element
 * @param {*} autoNumberOption 
 * @param {*} titleHTML 
 * @param {*} numberHTML 
 * @returns 
 */
export const setAutonumberingValuesForPayload = (autoNumberOption, titleHTML, numberHTML, isPayloadValid) => {
    let objToReturn = {};
    let isValid = false;
    switch (autoNumberOption) {
        case AUTO_NUMBER_SETTING_RESUME_NUMBER:
            objToReturn = {
                numberedandlabel : true,
                manualoverride : { "resumenumbervalue": (numberHTML !== '' ? parseInt(numberHTML) : '') }
            }
            isValid = checkKeysInObj(objToReturn.manualoverride);
            break;
        case AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER:
            objToReturn = {
                numberedandlabel : true,
                manualoverride : { "overridelabelvalue": titleHTML, "overridenumbervalue": numberHTML }
            }
            isValid = checkKeysInObj(objToReturn.manualoverride);
            break;
        case AUTO_NUMBER_SETTING_OVERRIDE_NUMBER:
            objToReturn = {
                numberedandlabel : true,
                manualoverride : { "overridenumbervalue": numberHTML }
            }
            isValid = checkKeysInObj(objToReturn.manualoverride);
            break;
        case AUTO_NUMBER_SETTING_REMOVE_NUMBER:
            objToReturn = {
                numberedandlabel : false,
                manualoverride : { }
            }
            isValid = true;
            break;
        case AUTO_NUMBER_SETTING_DEFAULT:
        default:
            objToReturn = {
                numberedandlabel : true
            }
            isValid = true;
            break;
    }
    if (isPayloadValid) {
        return isValid;
    } else {
        return objToReturn;
    }
}

export const getValueOfLabel = (figuretype) => {
    let label = '';
    switch (figuretype) {
        case AUDIO:
            label = 'Audio';
            break;
        case VIDEO:
            label = 'Video';
            break;
        case IMAGE: case TABLE: case MATH_IMAGE:
            label = 'Figure';
            break;
        default:
            label = '';
            break;
    }
    return label;
}

/**
 * This function returns the content to be shown in Preview Div
 * @param {*} element 
 * @param {*} param1 
 * @returns 
 */
export const getLabelNumberPreview = (element, { imgLabelValue, imgNumberValue, parentNumber }) => {
    if (parentNumber && element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        return `${imgLabelValue} ${parentNumber}.${imgNumberValue}`
    } else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        return `${imgLabelValue} ${imgNumberValue}`
    }
    return ""
}

/**
 * This function returns the Number of TOC Container which is prefix for Element's Number Field
 * @param {*} slateAncestors 
 * @param {*} autoNumberingDetails 
 * @returns 
 */
export const getContainerNumber = (slateAncestors, autoNumberingDetails) => {
    const containerEntityUrn = getContainerEntityUrn(slateAncestors)
    switch (containerEntityUrn) {
        case CONTAINER_LABELS.FRONTMATTER:
            return 'F'
        case CONTAINER_LABELS.BACKMATTER:
            return 'B'
        default:
            if (autoNumberingDetails?.partOrderList?.hasOwnProperty(containerEntityUrn)) {
                const partNumber = autoNumberingDetails?.partOrderList[containerEntityUrn]
                return partNumber ? `P${partNumber}` : 'P'
            }
            else {
                if (containerEntityUrn) {
                    return autoNumberingDetails?.chapterOrderList[containerEntityUrn] || ''
                }
                return ""
            }
    }
}

/**
 * This function returns the current slate's TOC Container EntityUrn 
 * whose Number will be prefixed with the auto-numbered element
 * @param {*} slateAncestors 
 * @returns 
 */
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

/**
 * This function returns the Label Field Value for the auto-numbered Element
 * @param {*} element 
 * @param {*} figureLabelValue 
 * @param {*} containerNumber 
 * @returns 
 */
export const getLabelNumberFieldValue = (element, figureLabelValue, containerNumber) => {
    let elementLabel = "" //figureLabelValue || element?.displayedlabel || 
    if (element?.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) {
        // elementLabel = ""
        elementLabel = figureLabelValue;
    }
    else if (element?.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        if (element.hasOwnProperty(MANUAL_OVERRIDE) && element[MANUAL_OVERRIDE] !== undefined && Object.keys(element[MANUAL_OVERRIDE])?.length > 0) {
            if (element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE) && element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_LABEL_VALUE)) {
                elementLabel = element[MANUAL_OVERRIDE].overridelabelvalue
            } else if ((element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE)) || (element[MANUAL_OVERRIDE].hasOwnProperty(RESUME_NUMBER_VALUE))) {
                elementLabel = figureLabelValue
            }
        }
    }
    return elementLabel
}

/**
 * This function prepares the auto-number sequence for Elements
 * @param {*} imagesData 
 * @returns 
 */
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
                    numberValue = activeItem[MANUAL_OVERRIDE][RESUME_NUMBER_VALUE];
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

/**
 * This function returns the Number Field Value for the auto-numbered Element
 * @param {*} parentIndex 
 * @param {*} element 
 * @param {*} autoNumberElementsIndex 
 * @returns 
 */
export const getNumberData = (parentIndex, element, autoNumberElementsIndex) => {
    if (parentIndex && element && autoNumberElementsIndex) {
        let labelType = autoNumber_KeyMapper[element?.displayedlabel || 'Figure']
        // Check added for overrided labels
        if (!(labelType)) {
            labelType = autoNumber_FigureTypeKeyMapper[element?.figuretype];
        }
        if (autoNumberElementsIndex.hasOwnProperty(labelType) && autoNumberElementsIndex[labelType]?.hasOwnProperty(parentIndex)) {
            return autoNumberElementsIndex[labelType][parentIndex]?.[element.contentUrn] || ''
        }
    }
    return ''
}

export const getSlateEntityUrn = () => {
    return config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN ? config.slateEntityURN : ""
}

export const getAutoNumberedElement = (element) =>{
    return{
        ...element,
        slateEntityURN: getSlateEntityUrn()
    }
}

export const updateAutonumberingOnOverridedCase = (elementLabel, element, autoNumberedElements, currentSlateAncestorData) => (dispatch) => {
    const labelType = autoNumber_ElementTypeKey[elementLabel];
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    if (autoNumberedElements[labelType]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[labelType][figureParentEntityUrn] && Object.keys(autoNumberedElements[labelType][figureParentEntityUrn]).length > 0) {
        let index = autoNumberedElements[labelType][figureParentEntityUrn].findIndex(ele => ele.contentUrn === element.contentUrn);
        if (index > -1) {
            autoNumberedElements[labelType][figureParentEntityUrn][index] = element;
        }
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: autoNumberedElements
    });
    getAutoNumberSequence(autoNumberedElements, dispatch);
}

export const updateAutonumberingOnElementTypeUpdate = (newLabel, element, autoNumberedElements, currentSlateAncestorData, slateLevelData) => (dispatch) => {
    let bodyMatter = slateLevelData[config?.slateManifestURN]?.contents?.bodymatter;
    let slateFigures = getImagesInsideSlates(bodyMatter);
    let elementSlateIndex = slateFigures.findIndex(ele => ele.contentUrn === element.contentUrn);
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    if (autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn]) {
        let index = autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn].findIndex(ele => ele.contentUrn === element.contentUrn);
        if (index > -1) {
            autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn].splice(index, 1);
        }
    }
    element = {
        ...element,
        displayedlabel: newLabel
    }
    if (autoNumberedElements[autoNumber_ElementTypeKey[newLabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[newLabel]][figureParentEntityUrn]) {
        let nearestElementObj = findNearestMediaElement(slateFigures, element, newLabel, elementSlateIndex);
        if (nearestElementObj && Object.keys(nearestElementObj.obj).length > 0) {
            let storeIndex = autoNumberedElements[autoNumber_ElementTypeKey[newLabel]][figureParentEntityUrn].findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
            storeIndex = nearestElementObj.key === 'above' ? storeIndex + 1 : storeIndex;
            autoNumberedElements[autoNumber_ElementTypeKey[newLabel]][figureParentEntityUrn].splice(storeIndex, 0, element);
        } else {
            autoNumberedElements[autoNumber_ElementTypeKey[newLabel]][figureParentEntityUrn].splice(0, 0, element);
        }
    } else {
        autoNumberedElements[autoNumber_ElementTypeKey[newLabel]] = {
            [figureParentEntityUrn]: []
        }
        autoNumberedElements[autoNumber_ElementTypeKey[newLabel]][figureParentEntityUrn].push(element);
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: autoNumberedElements
    });
    getAutoNumberSequence(autoNumberedElements, dispatch);
}

export const updateAutonumberingKeysInStore = (updatedData, autoNumberedElements, currentSlateAncestorData) => (dispatch) => {
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    if (figureParentEntityUrn && updatedData?.contentUrn && autoNumberedElements) {
        if (autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn]) {
            let index = autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn].findIndex(element => element.contentUrn === updatedData.contentUrn);
            if (index > -1) {
                let figureObj = autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn][index];
                if (updatedData.hasOwnProperty(MANUAL_OVERRIDE) && updatedData[MANUAL_OVERRIDE] !== undefined && Object.keys(updatedData[MANUAL_OVERRIDE])?.length > 0) {
                    figureObj = {
                        ...figureObj,
                        manualoverride: updatedData[MANUAL_OVERRIDE],
                        numberedandlabel: updatedData[NUMBERED_AND_LABEL]
                    }
                } else {
                    figureObj = {
                        ...figureObj,
                        numberedandlabel: updatedData[NUMBERED_AND_LABEL]
                    }
                }
                autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn][index] = figureObj;
            }
        }
    }
    dispatch({
        type: GET_ALL_AUTO_NUMBER_ELEMENTS,
        payload: {
            autoNumberedElements
        }
    });
    getAutoNumberSequence(autoNumberedElements, dispatch)
}