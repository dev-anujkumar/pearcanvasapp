/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnoete/Asset_Popover
 */

/**************************Import Modules**************************/
import { getCurrentlyLinkedImage } from '../AssetPopover/AssetPopover_Actions.js';
import { getLatestVersion } from '../TcmSnapshots/TcmSnapshot_Actions.js';
import config from '../../config/config';
let elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza'];
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
            assetPopoverSnap = prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case 'element-list':
            glossarySnap = setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'glossary');
            footnoteSnap = setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'footnote');
            assetPopoverSnap = setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'assetpopover');
            break;

        case 'element-blockfeature':
            glossarySnap = [];
            footnoteList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(status, footnoteList)
            assetPopoverList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.internallinks ? element.elementdata.authoredtext.internallinks : [];
            assetPopoverSnap = prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case 'stanza':
            glossarySnap = setSnapshotsInListAndPoetry(status, element.poetrylines, 'glossary');
            footnoteSnap = setSnapshotsInListAndPoetry(status, element.poetrylines, 'footnote');
            assetPopoverSnap = setSnapshotsInListAndPoetry(status, element.poetrylines, 'assetpopover');
            break;

        default:
            glossarySnap = [];
            footnoteSnap = [];
            assetPopoverSnap = [];
            break;
    }

    semanticSnapshots = {
        glossarySnapshot: glossarySnap,
        footnoteSnapshot: footnoteSnap,
        assetPopoverSnapshot: assetPopoverSnap
    }
    return semanticSnapshots
}

/** 
 * @function setSnapshotsInListAndPoetry
 * @description This is a recursive function to prepare snapshot content for each Glossary/Footnote/AssetPopover entry 
 *              in a List and Poetry element
 * @param {String} status - status of the action performed
 * @param {Array} elementList - List of Glossary entries in a list element
 * @returns {Array}  
*/
const setSnapshotsInListAndPoetry = (status, elementList, semanticType) => {
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
                snapshotsList = snapshotsList.concat(prepareAssetPopoverSnapshotContent(assetLists));
            }
        } else if (item.listitems && item.listitems.length > 0) { // for nested lists
            snapshotsList = snapshotsList.concat(setSnapshotsInListAndPoetry(status, item.listitems, semanticType));
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
            changeStatus: status.charAt(0).toUpperCase() + status.slice(1),
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
            changeStatus: status.charAt(0).toUpperCase() + status.slice(1),
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
    let eleIndex,
        data = {};

    if (typeof index === "number" || (Array.isArray(index) && index.length == 1)) {   /** Delete a container or an element at slate level */
        eleIndex = Array.isArray(index) ? index[0] : index;
        data.wipData = bodymatter[eleIndex]
        if (data.wipData.subtype === "workedexample") {  /** Delete Section-Break */
            data.wipData.elementdata.bodymatter.map((item, innerIndex) => {
                if (item.type == "manifest" && entityUrn == item.contentUrn) {
                    data.wipData = bodymatter[eleIndex].elementdata.bodymatter[innerIndex]
                }
            })
        }
    }
    else if (typeof index === "string") {
        eleIndex = Array.isArray(index) ? index : index.split("-");
        /** Check parent element is approved or not */
        if (type && bodymatter[eleIndex[0]].status === "approved") {
            data.parentData = "approved"
        }
        switch (type) {
            case 'stanza':                           /** Inside Poetry */
                data.wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[2]];
                break;
            case 'element-citation':                 /** Inside Citations */
                data.wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                break;
            case 'element-list':
            case 'element-blockfeature':
            case 'element-authoredtext':
            case 'element-learningobjectives':
                if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                    data.wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 3) {   /** Inside WE-BODY */
                    if(bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].status==="approved"){ /** Check SB element is approved or not */
                        data.childData= "approved"
                    }
                    data.wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                }
                break;
        }
    }
    return data;
}

/**
 * @function fetchParentData
 * @description-This function is to set the parentData for the element
 * @param {Object} bodymatter - bodymatter before delete  
 * @param {String/Number} indexes - index of element converted
 * @returns {Object}
*/
export const fetchParentData = (bodymatter, indexes) => {
    let parentData = {};
    
    let tempIndex = Array.isArray(indexes) ? indexes : (typeof indexes === "number") ? indexes.toString() : indexes.split("-");
    let isChildElement = elementType.indexOf(bodymatter[tempIndex[0]].type) === -1 ? true : false

    if (isChildElement == true) {
        parentData.asideData = {
            contentUrn: bodymatter[tempIndex[0]].contentUrn,
            id: bodymatter[tempIndex[0]].id,
            subtype: bodymatter[tempIndex[0]].subtype,
            type: bodymatter[tempIndex[0]].type,
            element: bodymatter[tempIndex[0]]
        }
        if(bodymatter[tempIndex[0]].status === "approved"){
            parentData.parentData = "approved"
        }
        if(tempIndex.length == 3 && bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].status === "approved"){
            parentData.childData = "approved"
        }
        let parentElement = tempIndex.length == 3 && bodymatter[tempIndex[0]].type !== 'poetry' ? bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] : bodymatter[tempIndex[0]];

        parentData.parentUrn = {
            manifestUrn: parentElement.id,
            contentUrn: parentElement.contentUrn,
            elementType: parentElement.type
        }
    }
    return parentData;
}
export const checkContainerElementVersion = async (containerElement, data, currentSlateData) => {
    /** latest version for WE/CE/PE/AS*/
    if (data.parentData === "approved") {
        let contentUrn = containerElement.asideData ? containerElement.asideData.contentUrn : containerElement.poetryData ? containerElement.poetryData.contentUrn : containerElement.parentUrn ? containerElement.parentUrn.contentUrn : ""
        if (contentUrn) {
            let newManifestData = await getLatestVersion(contentUrn);
            if (newManifestData) {
                if (containerElement.poetryData) {
                    containerElement.poetryData.id = newManifestData;
                    containerElement.poetryData.parentUrn = newManifestData;
                }
                else if (containerElement.asideData) {
                    containerElement.asideData.id = newManifestData
                    containerElement.parentUrn.manifestUrn = newManifestData
                }
                else if (containerElement.parentUrn) {
                    containerElement.parentUrn.manifestUrn = newManifestData
                }
            }
        }
    }
    /** latest version for SB*/
    if (data.childData === "approved") {
        let newManifestData = await getLatestVersion(containerElement.parentUrn.contentUrn);
        containerElement.parentUrn.manifestUrn = newManifestData ? newManifestData : containerElement.parentUrn.manifestUrn
    }
    /** latest version for slate*/
    if (currentSlateData.status === 'approved') {
        let newSlateManifest = await getLatestVersion(currentSlateData.contentUrn);
        config.slateManifestURN = newSlateManifest ? newSlateManifest : config.slateManifestURN
    }
    return containerElement;
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
