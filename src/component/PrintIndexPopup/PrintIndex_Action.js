import { OPEN_MARKED_INDEX } from '../../constants/Action_Constants';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { onGlossaryFnUpdateSuccessInShowHide } from '../ShowHide/ShowHide_Helper.js';

export const markedIndexPopup = (status, popupType, markIndexid, elementWorkId, elementType, index, elementSubType, markIndexText, typeWithPopup, poetryField) => async (dispatch) => {
    let markedIndexValue = {
        type: popupType,
        popUpStatus: status,
        elementWorkId,
        elementType,
        markIndexid,
        elementSubType,
        markIndexText,
        typeWithPopup: typeWithPopup ? typeWithPopup : undefined,
        poetryField: poetryField ? poetryField : undefined
    }

    if (status === true) {
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[slateId];
        const showHideElement = store.getState().appStore?.showHideObj;

        if (currentSlateData.type === "popup" && currentSlateData.status === "approved" && (config.isCreateFootnote || config.isCreateGlossary)) {
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

                else if (indexesLen == 4) {  // to support glossary in text elements inside WE/AS of MultiColumn
                    markedIndexElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];

                } else if (indexesLen == 5) { // to support glossary in section break inside WE of MultiColumn
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
            elementIndex: index
        }
    });
}