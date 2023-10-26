import config from '../../config/config'
import { moduleTypes, slateTypes, MATTER_TYPES, CONTAINER_LABELS, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, AUTO_NUMBER_PROPERTIES, autoNumber_FigureTypeKeyMapper,
    displayLabelsForAutonumbering, displayLabelsForContainer, SIDEBAR, TACTIC, WORKED_EXAMPLE, ELEMENT_TYPES } from './AutoNumberConstants';
import {
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import {getAutoNumberSequence} from './AutoNumberActions';
import { findNearestElement, checkElementExistenceInOtherSlates } from './AutoNumberCreate_helper';
import { getAutoNumberedElementsOnSlate, getAsideElementsWrtKey } from './slateLevelMediaMapper';
import { IMAGE, TABLE, MATH_IMAGE, AUDIO, VIDEO, INTERACTIVE, TABLE_AS_MARKUP, AUTHORED_TEXT, CODELISTING } from '../../constants/Element_Constants';
import store from '../../appstore/store'
const {
    MANUAL_OVERRIDE,
    NUMBERED_AND_LABEL,
    RESUME_NUMBER_VALUE,
    OVERRIDE_LABEL_VALUE,
    OVERRIDE_NUMBER_VALUE
} = AUTO_NUMBER_PROPERTIES;

export const { 
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
        if (Obj[Key] === '' || Obj[Key] === undefined || Obj[Key] === null || Number.isNaN(Obj[Key])) {
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
        case SIDEBAR:
        case TACTIC:
            label = 'Aside';
            break;
        case WORKED_EXAMPLE:
            label = 'Worked Example';
            break;
        case TABLE_AS_MARKUP:
            label = 'Table';
            break;
        case AUTHORED_TEXT:
            label = 'Equation';
            break;
        case CODELISTING:
            label = 'Exhibit';
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
    if (labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && imgLabelValue === currentLabelValue) {
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
            if (autoNumberingDetails?.volumeOrderList?.hasOwnProperty(containerEntityUrn)) {
                const volumeNumber = autoNumberingDetails?.volumeOrderList[containerEntityUrn]
                return volumeNumber ? `V${volumeNumber}` : 'V'
            }
            else if (autoNumberingDetails?.partOrderList?.hasOwnProperty(containerEntityUrn)) {
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
        const matterType = slateAncestors?.matterType === MATTER_TYPES.FRONTMATTER ? CONTAINER_LABELS.FRONTMATTER : slateAncestors?.matterType === MATTER_TYPES.BACKMATTER ? CONTAINER_LABELS.BACKMATTER : ""
        return matterType
    }
    else if (slateTypes.includes(slateAncestors?.label)) {
        if ((slateAncestors?.label === CONTAINER_LABELS.CONTAINER_INTRO) && (slateAncestors?.ancestor?.label === CONTAINER_LABELS.VOLUME)) {
            return slateAncestors?.ancestor?.entityUrn
        }
        else if ((slateAncestors?.label === CONTAINER_LABELS.CONTAINER_INTRO) && (slateAncestors?.ancestor?.label === CONTAINER_LABELS.PART)) {
            return slateAncestors?.ancestor?.entityUrn
        }
        else if ((slateAncestors?.label === CONTAINER_LABELS.CONTAINER_INTRO) && (slateAncestors?.ancestor?.label === CONTAINER_LABELS.MODULE)) {
            return slateAncestors?.ancestor?.ancestor?.entityUrn;
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
    if (settingsOption !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) {
        elementLabel = element?.displayedlabel;
        elementLabel = !element.hasOwnProperty('displayedlabel') ? getValueOfLabel(element?.type === 'figure' ? element?.figuretype : element?.subtype) : elementLabel;
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
        imagesList[key] = Array.isArray(imagesList[key]) && imagesList[key]?.map((item) => item.contentUrn);
    });
    /** Get the number value for the Fig-Element based on aut-numbering wip values*/
    //can be replaced with the logic for getNodeIndex from toc
    Object.keys(imagesList).forEach((key) => {
        let count = 0
        imagesList[key] = Array.isArray(imagesList[key]) && imagesList[key]?.reduce(function (result, item, index, array) {
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
    const autoNumber_KeyMapper = store.getState()?.autoNumberReducer?.autoNumber_KeyMapper
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

export const updateAutonumberingOnElementTypeUpdate = (newElement, element, autoNumberedElements, currentSlateAncestorData, slateLevelData) => async (dispatch, getState) => {
    try{
        const autoNumber_ElementTypeKey = getState()?.autoNumberReducer.autoNumber_ElementTypeKey;
        const popupParentSlateData = getState().autoNumberReducer.popupParentSlateData;
        const slateManifestUrn = popupParentSlateData?.isPopupSlate ? popupParentSlateData?.parentSlateId : config?.slateManifestURN;
        const slateEntityUrn = popupParentSlateData?.isPopupSlate ? popupParentSlateData?.parentSlateEntityUrn : config?.slateEntityURN;
        let slateElements;
        switch (element.type) {
            case ELEMENT_TYPES.FIGURE:
                slateElements = await getAutoNumberedElementsOnSlate(slateLevelData[slateManifestUrn], { dispatch });
                break;
            case ELEMENT_TYPES.ELEMENT_ASIDE:
                slateElements = await getAsideElementsWrtKey(slateLevelData[slateManifestUrn]?.contents?.bodymatter, ELEMENT_TYPES.ELEMENT_ASIDE, slateElements);
                break;
            default:
                slateElements = [];
        }
        let elementSlateIndex = slateElements?.findIndex(ele => ele.contentUrn === element.contentUrn);
        const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
        if (autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn]) {
            let index = autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn]?.findIndex(ele => ele.contentUrn === element.contentUrn);
            if (index > -1) {
                autoNumberedElements[autoNumber_ElementTypeKey[element.displayedlabel]][figureParentEntityUrn].splice(index, 1);
                slateElements[elementSlateIndex] = newElement;
            }
            dispatch({
                type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                payload: autoNumberedElements
            });
            getAutoNumberSequence(autoNumberedElements, dispatch);
        }
        const activeLabelElements = slateElements?.filter(elem => elem.displayedlabel === newElement?.displayedlabel);
        let elementObj = slateElements?.find(element => element.contentUrn === newElement.contentUrn);
        if (autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]]?.hasOwnProperty(figureParentEntityUrn) && autoNumberedElements[autoNumber_ElementTypeKey[newElement?.displayedlabel]][figureParentEntityUrn].length > 0 && activeLabelElements.length > 1) {
            let count = 0;
            slateElements.forEach(item => { item.indexPos = count; count++; });
            let nearestElementObj = findNearestElement(slateElements, elementObj, newElement?.displayedlabel);
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
            checkElementExistenceInOtherSlates(newElement, slateEntityUrn, getState, dispatch);
        } 
    } catch(error){
        console.error(error)
    }
}

export const updateAutonumberingKeysInStore = (updatedData, autoNumberedElements, currentSlateAncestorData) => (dispatch,getState) => {
    const figureParentEntityUrn = getContainerEntityUrn(currentSlateAncestorData);
    const autoNumber_ElementTypeKey = getState()?.autoNumberReducer.autoNumber_ElementTypeKey
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
    const autoNumber_response_ElementType_mapper = store.getState()?.autoNumberReducer?.autoNumber_response_ElementType_mapper
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
    const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
    if (!titleHTML || titleHTML === '' || (!validDropdownOptions.includes(titleHTML) && (props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) && props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn)) {
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

/**
 *  Returns the Label Dropdown Values based on Figuretype
 * @param {*} previousElementData 
 * @returns 
 */
export const generateDropdownDataForFigures = (previousElementData) => {
    const figureDropdownData = store.getState()?.appStore?.figureDropdownData
    const { image, imageCustom, audio, audioCustom, video, videoCustom, interactive, interactiveCustom, tableasmarkup, tableasmarkupCustom, mathml, mathmlCustom, preformattedtext, preformattedtextCustom } = figureDropdownData
    let validDropdownOptions = displayLabelsForAutonumbering;
    if (previousElementData?.figuretype && figureDropdownData) {
        switch (previousElementData.figuretype) {
            case AUDIO:
                validDropdownOptions = audioCustom ? [...audio, ...audioCustom] : audio
                break;
            case VIDEO:
                validDropdownOptions = videoCustom ? [...video, ...videoCustom] : video
                break;
            case INTERACTIVE:
                validDropdownOptions = interactiveCustom ? [...interactive, ...interactiveCustom] : interactive
                break;
            case IMAGE: case TABLE: case MATH_IMAGE:
                validDropdownOptions = imageCustom ? [...image, ...imageCustom] : image
                break;
            case TABLE_AS_MARKUP:
                validDropdownOptions = tableasmarkupCustom ? [...tableasmarkup, ...tableasmarkupCustom] : tableasmarkup
                break;
            case AUTHORED_TEXT:
                validDropdownOptions = mathmlCustom ? [...mathml, ...mathmlCustom] : mathml
                break;
            case CODELISTING:
                validDropdownOptions = preformattedtextCustom ? [...preformattedtext, ...preformattedtextCustom] : preformattedtext
                break;
            default:
                validDropdownOptions = displayLabelsForAutonumbering
                break;
        }
    }
    return validDropdownOptions
}


/**
 *  Returns the Label Dropdown Values based on subtype
 * @param {*} previousElementData 
 * @returns 
 */
 export const generateDropdownDataForContainers = (previousElementData) => {
    const figureDropdownData = store.getState()?.appStore?.figureDropdownData;
    const { aside, asideCustom, workedexample, workedexampleCustom } = figureDropdownData;
    let validDropdownOptions = displayLabelsForContainer;
    if (previousElementData?.subtype && figureDropdownData) {
        switch (previousElementData.subtype) {
            case SIDEBAR:
                validDropdownOptions = asideCustom ? [...aside, ...asideCustom] : aside;
                break;
            case WORKED_EXAMPLE:
                validDropdownOptions = workedexampleCustom ? [...workedexample, ...workedexampleCustom] : workedexample;
                break;
            default:
                validDropdownOptions = displayLabelsForContainer;
                break;
        }
    }
    return validDropdownOptions;
}
