import axios from 'axios';
import { OPEN_MARKED_INDEX, OPEN_MARKED_INDEX_ON_GLOSSARY, UPDATE_CROSS_REFERENCE_VALUES  } from '../../constants/Action_Constants';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { onGlossaryFnUpdateSuccessInShowHide } from '../ShowHide/ShowHide_Helper.js';
import { UpdateElementWorkId } from '../GlossaryFootnotePopup/GlossaryFootnote_Actions';

/**
 * This function acts as an action creator which will update the marked index store when marked index icon
 * is clicked from the tinyMCE toolbar
 * @param {*} status, Status of the marked index pop-up (it is a boolean value)
 * @param {*} popupType, This variable will contain 'Markedindex' value
 * @param {*} markIndexid, This will contain URN id for indexed text  
 * @param {*} elementWorkId This will contain Work URN of the container element
 * @param {*} elementType This will contain element type e.g element authored text
 * @param {*} index This will contain index of the container element in the slate data
 * @param {*} elementSubType 
 * @param {*} markIndexText This will contain the text which is going to be indexed
 * @param {*} typeWithPopup 
 * @param {*} poetryField 
 */
export const markedIndexPopup = (status, popupType, markIndexid, elementWorkId, elementType, index, elementSubType, markIndexText, typeWithPopup, poetryField, isNewIndex) => async (dispatch) => {
    let markedIndexValue = {
        type: popupType,
        popUpStatus: status,
        elementWorkId,
        elementType,
        markIndexid,
        elementSubType,
        markIndexText,
        typeWithPopup: typeWithPopup ? typeWithPopup : undefined,
        poetryField: poetryField ? poetryField : undefined,
        isNewIndex
    }

    if (status === true) {
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[slateId];
        const showHideElement = store.getState().appStore?.showHideObj;

        if (currentSlateData.type === "popup" && currentSlateData.status === "approved") {
            return false;
        }
        let newBodymatter = currentSlateData.contents.bodymatter;
        var markedIndexTextFirstLvl, markedIndexTextSecondLvl, markedIndexElem = {}, tempMarkedIndexContentText;
        let tempIndex = index && typeof (index) !== 'number' && index.split('-');
        const asideParent = store.getState().appStore?.asideData
        if (showHideElement || asideParent?.type === 'showhide') { /** markedIndex inside Show-Hide */

            markedIndexElem = onGlossaryFnUpdateSuccessInShowHide("GetElementWithFnGlry_SH", newBodymatter, elementType, asideParent?.sectionType, tempIndex)
        }
        else {
            if (typeof (index) == 'number') {
                if (newBodymatter[index].versionUrn == elementWorkId) {
                    markedIndexElem = newBodymatter[index]
                }
            } else {
                let indexes = index.split('-');
                let indexesLen = indexes.length, condition;
                if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == elementWorkId) {
                        markedIndexElem = condition
                    }
                } else if (indexesLen == 3) {
                    if (elementType === 'stanza') {
                        condition = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]
                    } else if (newBodymatter[indexes[0]].type === "groupedcontent") { //All elements inside multi-column except figure
                        condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    } else {
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    }
                    if (condition.versionUrn == elementWorkId) {
                        markedIndexElem = condition
                    }
                }
                else if ((indexesLen == 4 || indexesLen == 5) && newBodymatter[tempIndex[0]].type === "showhide" && asideParent?.parent?.showHideType) {  // to support markedIndex in text elements inside WE/AS of S/H
                    markedIndexElem = newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]];
                    if (indexesLen == 5 && markedIndexElem.type === 'manifest') {
                        markedIndexElem = markedIndexElem.contents.bodymatter[indexes[4]];
                    }
                }
                else if (indexesLen == 4) {  // to support markedIndex in text elements inside WE/AS of MultiColumn
                    markedIndexElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];

                } else if (indexesLen == 5) { // to support markedIndex in section break inside WE of MultiColumn
                    markedIndexElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]]
                }

            }
        }

        tempMarkedIndexContentText = markedIndexElem && markedIndexElem.html['indexEntries'] && markedIndexElem.html['indexEntries'][markIndexid];
        markedIndexTextFirstLvl = tempMarkedIndexContentText && JSON.parse(tempMarkedIndexContentText).firstLevelEntry || markIndexText;
        markedIndexTextSecondLvl = tempMarkedIndexContentText && JSON.parse(tempMarkedIndexContentText).secondLevelEntry;
    }

    return await dispatch({
        type: OPEN_MARKED_INDEX,
        payload: {
            markedIndexValue: markedIndexValue,
            markedIndexCurrentValue: {
                firstLevel: markedIndexTextFirstLvl,
                secondLevel: markedIndexTextSecondLvl
            },
            markedIndexGlossary:{},
            elementIndex: index
        }
    });
}

/**
 * This function acts as an action creator which will update the marked index store when index is created
 * along with glossary
 * @param {*} status, Status of the marked index pop-up over glossary
 * @param {*} indexEntry, Value of Index entry field in the marked index pop-up
 * @param {*} subEntry, Value of sub entry field in the marked index pop-up 
 * @param {*} markedIndexEntryURN, URN of indexed text 
 */
export const markedIndexPopupOverGlossary = (status, indexEntry = "", subEntry = "", markedIndexEntryURN = "", differenceValue) => (dispatch) => {
    let indexEntries = {};
    let currentValue = {};
    if(indexEntry && markedIndexEntryURN){
        indexEntries[markedIndexEntryURN] = JSON.stringify({
          firstLevelEntry: indexEntry,
          secondLevelEntry: subEntry
        });
        currentValue = {
            firstLevel: indexEntry,
            secondLevel: subEntry
        }
    } else {
        const {markedIndexGlossary, markedIndexCurrentValue} = store.getState().markedIndexReducer;
        if(markedIndexGlossary.markedIndexEntryURN){
            indexEntries =  markedIndexGlossary.indexEntries;
            markedIndexEntryURN = markedIndexGlossary.markedIndexEntryURN;
        }
        currentValue = markedIndexCurrentValue;
    }

    /**
     * After versioning, This condition will check for new elementWorkId when marked index is updated inside glossary
     */
    if(!status){
        UpdateElementWorkId();
    }

    return dispatch({
        type: OPEN_MARKED_INDEX_ON_GLOSSARY,
        payload:{
            markedIndexGlossary:{
                popUpStatus: status,
                indexEntries,
                markedIndexEntryURN,
                isDifference: differenceValue
            },
            markedIndexCurrentValue:{
                firstLevel: currentValue.firstLevel,
                secondLevel: currentValue.secondLevel
            }
        }
    })
}

/**
 * This will updated the store for marked index values which is associated with this glossary.
 * @param {*} glossaryContentText This will contain the text on which is going to be indexed
 * @param {*} glossaryFootElem This will contain html object which contains the glossary data.
 * @param {*} glossaaryFootnoteValue This object will contain all the glossry data.
 * @param {*} index This will contain index of the container element in the slate data.
 * @returns 
 */
export const updateMarkedIndexStore = (glossaryContentText, glossaryFootElem, glossaaryFootnoteValue, index) => {
    let markedIndexFirstLevel = "", markedIndexSecondLevel = "", markedIndexEntryURN = "", indexEntries = {};
    if(glossaryContentText && glossaryContentText.includes('mark-index-id')){
        markedIndexEntryURN = glossaryContentText.slice(glossaryContentText.indexOf('mark-index-id')).split("\"")[1];
        let oldIndexEntries = glossaryFootElem && glossaryFootElem.html.indexEntries[markedIndexEntryURN];
        indexEntries[markedIndexEntryURN] = oldIndexEntries;
        let {firstLevelEntry, secondLevelEntry} = JSON.parse(oldIndexEntries);

        markedIndexFirstLevel = firstLevelEntry;
        markedIndexSecondLevel = secondLevelEntry;
    } else {
        markedIndexFirstLevel = glossaryContentText;
    }

    return {
        type: OPEN_MARKED_INDEX,
        payload: {
            markedIndexValue:{
                type: 'Markedindex',
                popUpStatus: false,
                elementWorkId: glossaaryFootnoteValue.elementWorkId,
                elementType: glossaaryFootnoteValue.elementType,
                markIndexid: markedIndexEntryURN,
                elementSubType: glossaaryFootnoteValue.elementSubType,
                markIndexText: glossaaryFootnoteValue.glossaryTermText,
                typeWithPopup: glossaaryFootnoteValue.typeWithPopup ? glossaaryFootnoteValue.typeWithPopup : undefined,
                poetryField: glossaaryFootnoteValue.poetryField ? glossaaryFootnoteValue.poetryField : undefined
            },
            markedIndexCurrentValue: {
                firstLevel: markedIndexFirstLevel,
                secondLevel: markedIndexSecondLevel
            },
            markedIndexGlossary: {
                popUpStatus: false,  
                indexEntries, 
                markedIndexEntryURN 
            },
            elementIndex: index
        }
    };
}

/**
 * This function makes a call to the content-api and get the drop-down values for the 
 * cross-reference and after re-formatting the data in the required format, update the
 * redux store
 */
export const getCrossReferenceValues = () => async (dispatch) => {
    let url = `${config.ASSET_POPOVER_ENDPOINT}v1/${config.projectUrn}/indexes`;
    try{
        const result = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        });

        let crossRefValues = [];
        if(result?.data?.items && result.data.items.length > 0){
            const items = result.data.items;

            items.forEach(indexObj => {

                if(indexObj?.firstlevelentry){
                    let firstLvlObj = indexObj.firstlevelentry;
                    if(firstLvlObj?.firstlevelentry){
                        crossRefValues.push(firstLvlObj.firstlevelentry.text);
                    }

                    if(firstLvlObj?.secondlevelentries && firstLvlObj.secondlevelentries.length > 0) {
                        let secondLvlObj = firstLvlObj.secondlevelentries[0];
                        if(secondLvlObj?.secondlevelentry){
                            crossRefValues.push(secondLvlObj.secondlevelentry.text);
                        }
                    }
                }
            })
        }

        dispatch({
            type: UPDATE_CROSS_REFERENCE_VALUES,
            payload:{
                crossReferenceValues: crossRefValues
            }
        });
    } catch(error){
        dispatch({
            type: UPDATE_CROSS_REFERENCE_VALUES,
            payload:{
                crossReferenceValues: []
            }
        });
    }
}