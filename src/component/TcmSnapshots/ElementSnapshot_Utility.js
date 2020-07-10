/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnoete/Asset_Popover
 */

/**************************Import Modules**************************/
import { getCurrentlyLinkedImage } from '../AssetPopover/AssetPopover_Actions.js';

/**
 * @function setSemanticsSnapshots
 * @description-This function is to set the snapshots for semantics in an element
 * @param {String} status - status of the action performed
 * @param {Object} element - wipData for element
 * @returns {Object}
*/
export const setSemanticsSnapshots = async (status, element) => {
    let glossarySnap, footnoteSnap, assetPopoverSnap, glossaryList, footnoteList, assetPopoverList;
    let semanticSnapshots = {};
    switch (element.type) {
        case 'element-authoredtext':
            glossaryList = element.elementdata && element.elementdata.glossaryentries && !element.elementdata.headers ? element.elementdata.glossaryentries : [];
            glossarySnap = prepareGlossarySnapshotContent(status, glossaryList);
            footnoteList = element.elementdata && element.elementdata.footnotes ? element.elementdata.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(status, footnoteList);
            assetPopoverList = element.elementdata && element.elementdata.internallinks ? element.elementdata.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case 'element-list':
            glossarySnap = await setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'glossary');
            footnoteSnap = await setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'footnote');
            assetPopoverSnap = await setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'assetpopover');
            break;

        case 'element-blockfeature':
            glossarySnap = [];
            footnoteList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(status, footnoteList)
            assetPopoverList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.internallinks ? element.elementdata.authoredtext.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case 'stanza':
            glossarySnap = await setSnapshotsInListAndPoetry(status, element.poetrylines, 'glossary');
            footnoteSnap = await setSnapshotsInListAndPoetry(status, element.poetrylines, 'footnote');
            assetPopoverSnap = await setSnapshotsInListAndPoetry(status, element.poetrylines, 'assetpopover');
            break;

        default:
            glossarySnap = [];
            footnoteSnap = [];
            assetPopoverSnap = [];
            break;
    }

    semanticSnapshots = {
        glossarySnapshot: JSON.stringify(glossarySnap),
        footnoteSnapshot: footnoteSnap,
        assetPopoverSnapshot: assetPopoverSnap
    }

    return JSON.stringify(semanticSnapshots)
}

/** 
 * @function setSnapshotsInListAndPoetry
 * @description-This is a recursive function to prepare snapshot content for each Glossary/Footnote/AssetPopover entry 
 *              in a List and Poetry element
 * @param {String} status - status of the action performed
 * @param {Array} elementList - List of Glossary entries in a list element
 * @returns {Array}  
*/
const setSnapshotsInListAndPoetry = async (status, elementList, semanticType) => {
    let snapshotsList = []
    for (let item of elementList) {
        if ((item.type == "paragraph" || item.type == "line") && item.authoredtext) {
            if (semanticType === 'glossary') {
                let glossaryArray = item.authoredtext.glossaryentries ? item.authoredtext.glossaryentries : [];
                snapshotsList = snapshotsList.concat(prepareGlossarySnapshotContent(status, glossaryArray));
            } else if (semanticType === 'footnote') {
                let footnoteArray = item.authoredtext.footnotes ? item.authoredtext.footnotes : [];
                snapshotsList = snapshotsList.concat(prepareFootnoteSnapshotContent(status, footnoteArray));
            } else if (semanticType === 'assetpopover') {
                let assetLists = item.authoredtext.internallinks ? item.authoredtext.internallinks : [];
                snapshotsList = snapshotsList.concat(await prepareAssetPopoverSnapshotContent(assetLists));
            }
        } else if (item.listitems && item.listitems.length > 0) { // for nested lists
            snapshotsList = snapshotsList.concat(setSnapshotsInListAndPoetry(status, item.listitems, semanticType))
        }
    }
    return snapshotsList
}

/**
 * @function prepareGlossarySnapshotContent
 * @description-This function is to prepare snapshot content for each Glossary entry
 * @param {String} status - status of the action performed
 * @param {Array} glossaryList - List of Glossary entries
 * @returns {Array}  
*/
const prepareGlossarySnapshotContent = (status, glossaryList) => {
    let glossarySnap = []
    glossaryList && glossaryList.length && glossaryList.map(glossaryItem => {
        let glossaryData = {
            changeStatus: status,
            changeType: "Update",
            charAt: glossaryItem.charAt,
            glossaryId: glossaryItem.itemid
        }
        if (glossaryItem.glossaryentry && glossaryItem.glossaryentry[0]) {
            glossaryData.glossaryTerm = `<p>${glossaryItem.glossaryentry[0].term.text}</p>`
            glossaryData.glossaryDefinition = `<p>${glossaryItem.glossaryentry[0].definition.text}</p>`
            if (glossaryItem.glossaryentry[0].narrativeform) {
                glossaryData.glossaryNarrative = `<p>${glossaryItem.glossaryentry[0].narrativeform.text}</p>`
            }
        }
        glossarySnap.push(glossaryData)
    })
    return glossarySnap
}

/**
 * @function prepareFootnoteSnapshotContent
 * @description-This function is to prepare snapshot content for each Glossary entry
 * @param {String} status - status of the action performed
 * @param {Array} footnoteList - List of Footnote entries
 * @returns {Array}  
*/
const prepareFootnoteSnapshotContent = (status, footnoteList) => {
    let footnoteSnap = []
    footnoteList && footnoteList.length && footnoteList.map(footnoteItem => {
        let footnoteData = {
            changeStatus: status,//Accepted/Pending
            changeType: "Update",
            charAt: footnoteItem.charAt,
            footnoteid: footnoteItem.footnoteid
        }
        if (footnoteItem.footnotecontent && footnoteItem.footnotecontent[0] && footnoteItem.footnotecontent[0].elementdata) {
            let footnoteText = footnoteItem.footnotecontent[0].elementdata.text ? footnoteItem.footnotecontent[0].elementdata.text : "";
            footnoteData.footnote = `<p class="paragraphNumeroUno">${footnoteText}</p>`
        }
        footnoteSnap.push(footnoteData)
    })
    return footnoteSnap
}

/**
 * @function prepareAssetPopoverSnapshotContent
 * @description-This function is to prepare snapshot content for each Asset Popover entry
 * @param {String} status - status of the action performed
 * @param {Array} assetsList - List of Asset Popover entries
 * @returns {Array}  
*/
const prepareAssetPopoverSnapshotContent = async (assetsList) => {
    let assetPopoverSnap = []
    let elementASLinkID = []
    assetsList && assetsList.length && assetsList.map(assetsItem => {
        let assetId = document.querySelector('abbr[data-uri="' + assetsItem.linkid + '"').getAttribute("asset-id");
        elementASLinkID.push({
            assetid: assetId,
            linkID: assetsItem.linkid
        })
    })
    await prepareASContentSnapshot(elementASLinkID, assetPopoverSnap)
    return assetPopoverSnap
}
/**
 * @function prepareASContentSnapshot
 * @description-This function is to prepare snapshot content for each Asset Popover entry
 * @param {String} elementASLinkID - linkId of assetPopover
 * @param {Array} assetPopoverSnap - List of Asset Popover snapshots
 * @returns {Array}  
*/
export const prepareASContentSnapshot = async (elementASLinkID, assetPopoverSnap) => {
    for (let i = 0; i < elementASLinkID.length; i++) {
        await getCurrentlyLinkedImage(elementASLinkID[i].linkID, (resCurrentlyLinkedImageData) => {
            assetPopoverSnap.push({
                assetid: elementASLinkID[i].assetid,
                linkID: resCurrentlyLinkedImageData.id,
                label: resCurrentlyLinkedImageData.title
            })
        })
    }
    return assetPopoverSnap
}


/**
 * @function fetchElementsTag
 * @description-This function is to set the lael text of element
 * @param {Object} element - element details 
*/
export const fetchElementsTag = (element) => {
    let labelText = "P", eleTag, eleType, eleSubType;
    eleType = element.type ? element.type :  element.elementType;
    switch (eleType) {
        case 'element-authoredtext':
            eleSubType = (element.elementdata && element.elementdata.headers) ? "heading" + element.elementdata.headers[0].level : "paragraph";
            break;
        case 'element-aside':
            eleSubType = element.subtype === "workedexample" ? "workedexample" : "aside";
            break;
        case 'element-list':
            eleSubType = element.subtype
            break;
        case 'element-blockfeature':
            eleSubType = element.elementdata.type
            break;
        default:
            eleSubType = ""
            break;
    }
    eleTag = eleSubType.trim() !== "" && setElementTag[eleType] ? setElementTag[eleType].subtype[eleSubType] : setElementTag[eleType]
    labelText = `${eleTag.parentTag}${eleTag.childTag ? '+' + eleTag.childTag : ""}`

    return labelText;
}

/**
 * @function fetchElementWipData
 * @description-This function is to set the lael text of element
 * @param {Object} bodymatter - bodymatter before delete  
 * @param {String/Number} index - index of element deleted
 * @param {String} type - type of element deleted
 * @returns {Object}
*/
export const fetchElementWipData = (bodymatter, index, type, entityUrn) => {
    let eleIndex, wipData;
    if (typeof index === "number" || (Array.isArray(index) && index.length == 1)) {   /** Delete a container or an element at slate level */
        eleIndex = Array.isArray(index) ? index[0] : index;
        wipData = bodymatter[eleIndex]
        if (wipData.subtype === "workedexample") {  /** Delete Section-Break */
            wipData.elementdata.bodymatter.map((item, innerIndex) => {
                if (item.type == "manifest" && entityUrn == item.contentUrn) {
                    wipData = bodymatter[eleIndex].elementdata.bodymatter[innerIndex]
                }
            })
        }
    }
    else if (typeof index === "string") {
        eleIndex = Array.isArray(index) ? index : index.split("-");
        switch (type) {
            case 'element-citation':                 /** Inside Citations */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                break;
            case 'stanza':                           /** Inside Poetry */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 2];
                break;
            case 'element-learningobjectives':
            case 'element-list':
            case 'element-blockfeature':
            case 'element-authoredtext':
                if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 3) {   /** Inside WE-BODY */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                }
                break;
        }
    }
    return wipData;
}

/**
 * @Object setElementTag | Used to map elementTags based on type and subtype
*/
const setElementTag = {
    "element-blockfeature": {
        subtype: {
            'pullquote': {
                parentTag: "BQ",
                childTag: 'pullquote',
            },
            'marginalia': {
                parentTag: "BQ",
                childTag: 'marginalia',
            },
            'blockquote': {
                parentTag: "BQ",
                childTag: 'blockquote',
            }
        }
    },
    "element-list": {
        subtype: {
            'disc': {
                parentTag: "UL",
                childTag: 'disc',
            },
            'decimal': {
                parentTag: "OL",
                childTag: 'decimal',
            },
            'upper-alpha': {
                parentTag: "OL",
                childTag: 'upper-alpha',
            },
            'lower-alpha': {
                parentTag: "OL",
                childTag: 'lower-alpha',
            },
            'upper-roman': {
                parentTag: "OL",
                childTag: 'upper-roman',
            },
            'lower-roman': {
                parentTag: "OL",
                childTag: 'lower-roman',
            },
            'none': {
                parentTag: "OL",
                childTag: 'none',
            },
        }

    },
    "element-learningobjectives": {
        parentTag: "LO"
    },
    "element-citation": {
        parentTag: "CT"
    },
    "citations": {
        parentTag: "CG"
    },
    "poetry": {
        parentTag: "PE"
    },
    "stanza": {
        parentTag: "ST"
    },
    "manifest": {
        parentTag: "WE"
    },
    "element-aside": {
        subtype: {
            'workedexample': {
                parentTag: "WE",
                childTag: ""
            },
            'aside': {
                parentTag: "AS",
                childTag: ""
            }
        }
    },
    "element-authoredtext": {
        subtype: {
            'paragraph': {
                parentTag: "P",
                childTag: ""
            },
            'heading1': {
                parentTag: "H1",
                childTag: ""
            },
            'heading2': {
                parentTag: "H2",
                childTag: ""
            },
            'heading3': {
                parentTag: "H3",
                childTag: ""
            },
            'heading4': {
                parentTag: "H4",
                childTag: ""
            },
            'heading5': {
                parentTag: "H5",
                childTag: ""
            },
            'heading6': {
                parentTag: "H6",
                childTag: ""
            },
        }
    }
}

export const fetchParentData = (bodymatter, indexes) => {
    let parentData;
    parentData = {
        asideData: {
            contentUrn: bodymatter[indexes[0]].contentUrn,
            id: bodymatter[indexes[0]].id,
            subtype: bodymatter[indexes[0]].subtype,
            type: bodymatter[indexes[0]].type,
            element: bodymatter[indexes[0]]
        }
    }
    
    let parentElement = indexes.length == 3 ? bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]] : bodymatter[indexes[0]]

    parentData.parentUrn = {
        manifestUrn: parentElement.id,
        contentUrn: parentElement.contentUrn,
        elementType: parentElement.type
    }

    return parentData;
}
