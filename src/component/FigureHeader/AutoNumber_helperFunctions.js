import config from '../../config/config'
import { moduleTypes, slateTypes, MATTER_TYPES, CONTAINER_LABELS, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, AUTO_NUMBER_PROPERTIES, autoNumber_KeyMapper, autoNumber_ElementTypeKey, autoNumber_FigureTypeKeyMapper, autoNumber_ElementTypeToStoreKeysMapper,
        autoNumber_response_ElementType_mapper, displayLabelsForImage } from './AutoNumberConstants';
import {
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import {getAutoNumberSequence} from './AutoNumberActions';
import { findNearestElement } from './AutoNumberCreate_helper';
import { getAutoNumberedElementsOnSlate } from './NestedFigureDataMapper';
import { checkElementExistenceInOtherSlates } from './AutoNumberCreate_helper';
import { IMAGE, TABLE, MATH_IMAGE, AUDIO, VIDEO, INTERACTIVE } from '../../constants/Element_Constants';
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
        if (Obj[Key] === '' || Obj[Key] === undefined || Obj[Key] === null || Obj[Key] === NaN) {
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
                numberedandlabel : false
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
        case INTERACTIVE:
            label = 'Interactive';
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
export const getLabelNumberPreview = (element, { imgLabelValue, imgNumberValue, parentNumber, currentLabelValue, labelNumberSetting, currentNumberValue }) => {
    let labelValue = imgLabelValue
    let numberValue = imgNumberValue
    if (labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) {
        labelValue = currentLabelValue
    }
    if (labelNumberSetting === AUTO_NUMBER_SETTING_RESUME_NUMBER || labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER || labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_NUMBER) {
        numberValue = currentNumberValue
    }
    if (parentNumber && element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        return `${labelValue} ${parentNumber}.${numberValue}`
    } else if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
        return `${labelValue} ${numberValue}`
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
export const getLabelNumberFieldValue = (element, figureLabelValue, settingsOption) => {
    let elementLabel = figureLabelValue || element?.displayedlabel;
    if (element?.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == false) {
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
    if(settingsOption !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER){
        elementLabel = element?.displayedlabel;
        elementLabel = !element.hasOwnProperty('displayedlabel') ? getValueOfLabel(element?.figuretype) : elementLabel;
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
        if (element.hasOwnProperty(NUMBERED_AND_LABEL) && element[NUMBERED_AND_LABEL] == true) {
            if (element.hasOwnProperty(MANUAL_OVERRIDE) && element[MANUAL_OVERRIDE] !== undefined && (Object.keys(element[MANUAL_OVERRIDE])?.length > 0) && element[MANUAL_OVERRIDE].hasOwnProperty(OVERRIDE_NUMBER_VALUE)) {
                return element[MANUAL_OVERRIDE][OVERRIDE_NUMBER_VALUE];
            }
        }
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
        let index = autoNumberedElements[labelType][figureParentEntityUrn]?.findIndex(ele => ele.contentUrn === element.contentUrn);
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

export const updateAutonumberingOnElementTypeUpdate = (newElement, element, autoNumberedElements, currentSlateAncestorData, slateLevelData) => async (dispatch, getState) => {
    let slateElements = await getAutoNumberedElementsOnSlate(slateLevelData[config?.slateManifestURN], { dispatch });
    const activeLabelElements = slateElements?.filter(elem => elem.displayedlabel === newElement?.displayedlabel);
    let elementSlateIndex = slateElements?.findIndex(ele => ele.contentUrn === element.contentUrn);
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    if (autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn]) {
        let index = autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn]?.findIndex(ele => ele.contentUrn === element.contentUrn);
        if (index > -1) {
            autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn].splice(index, 1);
        }
        dispatch({
            type: GET_ALL_AUTO_NUMBER_ELEMENTS,
            payload: autoNumberedElements
        });
        getAutoNumberSequence(autoNumberedElements, dispatch);
    }
    if (autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]][figureParentEntityUrn].length > 0 && activeLabelElements.length > 1) {
        let nearestElementObj = findNearestElement(slateElements, element, newElement?.displayedlabel, elementSlateIndex);
        if (nearestElementObj && Object.keys(nearestElementObj)?.length > 0 && nearestElementObj?.obj && Object.keys(nearestElementObj.obj)?.length > 0) {
            let storeIndex = autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]][figureParentEntityUrn]?.findIndex(element => element.contentUrn === nearestElementObj?.obj?.contentUrn);
            storeIndex = nearestElementObj?.key === 'above' ? storeIndex + 1 : storeIndex;
            autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]][figureParentEntityUrn].splice(storeIndex, 0, newElement);
        } else {
            autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]][figureParentEntityUrn].splice(0, 0, newElement);
        }
        dispatch({
            type: GET_ALL_AUTO_NUMBER_ELEMENTS,
            payload: autoNumberedElements
        });
        getAutoNumberSequence(autoNumberedElements, dispatch);
    } else if (activeLabelElements.length === 1) {
        checkElementExistenceInOtherSlates(newElement, config?.slateEntityURN, getState, dispatch);
    } 
}

export const updateAutonumberingKeysInStore = (updatedData, autoNumberedElements, currentSlateAncestorData) => (dispatch) => {
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    if (updatedData?.displayedlabel && figureParentEntityUrn && updatedData?.contentUrn && autoNumberedElements) {
        if (autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn]) {
            let index = autoNumberedElements[autoNumber_ElementTypeKey[updatedData?.displayedlabel]][figureParentEntityUrn]?.findIndex(element => element.contentUrn === updatedData.contentUrn);
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
                dispatch({
                    type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                    payload: {
                        autoNumberedElements
                    }
                });
                getAutoNumberSequence(autoNumberedElements, dispatch);
            }
        }
    }
}

/**
 * This function prepares the data, from response of the numbered API, in the desired format 
 * @param {*} data 
 * @param {*} matterType 
 * @returns 
 */
export const getNumberedElements = (data, matterType) => {
    let numberedElements = {};

    for(let matter in data){
        numberedElements[autoNumber_response_ElementType_mapper[matter]] = {
           [matterType]: data[matter].length > 0 ? data[matter] : []
        }
    }

    return numberedElements;
}
/**
 * This function will validate the label & number for make the saving call
 * @param {*} props 
 * @param {*} previousElementData 
 * @param {*} removeClassesFromHtml 
 * @param {*} titleHTML 
 * @param {*} numberHTML 
 * @param {*} subtitleHTML 
 * @param {*} captionHTML 
 * @param {*} creditsHTML 
 * @param {*} oldImage 
 * @param {*} podwidth 
 * @param {*} smartlinkContexts
 * @param {*} index
 * @param {*} changeInPodwidth
 * @returns Boolean value
 */
export const validateLabelNumberSetting = (props, previousElementData, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth) => {
    // Not selecting remove label and number
    if (props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
        let isValidValues = setAutonumberingValuesForPayload(props.autoNumberOption.option, titleHTML, numberHTML, true);
        if (!isValidValues) return false;
    }
    // Selecting default case 
    if ((previousElementData?.hasOwnProperty('manualoverride') || (previousElementData?.hasOwnProperty('numberedandlabel') && !previousElementData?.numberedandlabel)) && props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_DEFAULT) {
        return true;
    }
    let isNumberDifferent = false;
    let imgNumberValue = '';
    let overridedNumber = getOverridedNumberValue(previousElementData);
    let isOverridedLabelDifferent = false;
    if (overridedNumber && overridedNumber !== '') {
        isNumberDifferent = overridedNumber?.toString() !== numberHTML?.toString();
    } else {
        const figIndexParent = getContainerEntityUrn(props.currentSlateAncestorData);
        imgNumberValue = getNumberData(figIndexParent, previousElementData, props.autoNumberElementsIndex || {});
        isNumberDifferent = imgNumberValue?.toString() !== numberHTML?.toString();
    }
    if (previousElementData.hasOwnProperty('manualoverride') && previousElementData?.manualoverride.hasOwnProperty('overridelabelvalue')) {
        isOverridedLabelDifferent = previousElementData?.manualoverride?.overridelabelvalue !== titleHTML;
    }
    subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
    if (!titleHTML || titleHTML === '' || !(displayLabelsForImage.includes(titleHTML))) {
        titleHTML = previousElementData.displayedlabel;
    }

    let newInteractiveid = previousElementData?.figuredata?.interactiveid || "";
    let result = (
        titleHTML !== previousElementData.displayedlabel ||
        removeClassesFromHtml(subtitleHTML) !== removeClassesFromHtml(previousElementData.html.title) ||
        isNumberDifferent ||
        isOverridedLabelDifferent ||
        captionHTML !== removeClassesFromHtml(previousElementData.html.captions) ||
        creditsHTML !== removeClassesFromHtml(previousElementData.html.credits) ||
        oldImage !== newInteractiveid
    );

    if (smartlinkContexts.includes(previousElementData.figuredata.interactivetype)) {
        let pdfPosterTextDOM = document.getElementById(`cypress-${index}-3`)
        let posterTextHTML = pdfPosterTextDOM ? pdfPosterTextDOM.innerHTML : ""
        posterTextHTML = posterTextHTML.match(/(<p.*?>.*?<\/p>)/g) ? posterTextHTML : `<p>${posterTextHTML}</p>`

        let oldPosterText = previousElementData.html && previousElementData.html.postertext ? previousElementData.html.postertext.match(/(<p.*?>.*?<\/p>)/g) ?
            previousElementData.html.postertext : `<p>${previousElementData.html.postertext}</p>` :
            "<p></p>";
        return (
            result ||
            removeClassesFromHtml(posterTextHTML) !== removeClassesFromHtml(oldPosterText) ||
            changeInPodwidth(podwidth, previousElementData?.figuredata?.posterimage?.podwidth)
        );
    }
    
    return result;
}