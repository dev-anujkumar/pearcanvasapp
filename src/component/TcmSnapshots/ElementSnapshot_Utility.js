/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnote/Asset_Popover/Slate_Link
 */
/**************************Import Modules**************************/
import {slateLinkDetails} from '../TcmSnapshots/TcmSnapshot_Actions.js'
import { getCurrentlyLinkedImage } from '../AssetPopover/AssetPopover_Actions.js';
/*************************Import Constants*************************/
import TcmConstants from './TcmConstants.js';
const {
    AUTHORED_TEXT,
    BLOCKFEATURE,
    ELEMENT_LIST,
    HEADING,
    PARAGRAPH,
    SLATE,
    ELEMENT_ASIDE,
    POETRY_STANZA,
    POETRY_LINE,
    GLOSSARY,
    FOOTNOTE,
    ASSET_POPOVER,
    SLATE_LINK,
    AP_TYPE
}
    = TcmConstants;

/**
 * @function setSemanticsSnapshots
 * @description-This function is to set the snapshots for semantics in an element
 * @param {String} status - status of the action performed
 * @param {Object} element - wipData for element
 * @returns {Object} All snapshots for Glossary/Footnote/Asset_Popover for given element
*/
export const setSemanticsSnapshots = async (element,actionStatus) => {
    let glossarySnap, footnoteSnap, assetPopoverSnap, glossaryWipList, footnoteWipList, assetPopoverList;
    let semanticSnapshots = {};
    let glossaryHtmlList= element.html && element.html.glossaryentries ?element.html.glossaryentries:[];
    let footnoteHtmlList = element.html && element.html.footnotes ? element.html.footnotes : [];
    switch (element.type) {
        case AUTHORED_TEXT:
            glossaryWipList = element.elementdata && element.elementdata.glossaryentries ? element.elementdata.glossaryentries : [];
            glossarySnap = prepareGlossarySnapshotContent(actionStatus, glossaryWipList,glossaryHtmlList);
            footnoteWipList = element.elementdata && element.elementdata.footnotes ? element.elementdata.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(actionStatus, footnoteWipList,footnoteHtmlList);
            assetPopoverList = element.elementdata && element.elementdata.internallinks ? element.elementdata.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case ELEMENT_LIST:
        case POETRY_STANZA:
            let listData = element.type === ELEMENT_LIST ? element.elementdata.listitems: element.poetrylines
            glossarySnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, GLOSSARY, glossaryHtmlList);
            footnoteSnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, FOOTNOTE, footnoteHtmlList);
            assetPopoverSnap =  await setSnapshotsInListAndPoetry("", listData, ASSET_POPOVER);
            break;

        case BLOCKFEATURE:
            glossarySnap = [];
            footnoteWipList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(actionStatus, footnoteWipList,footnoteHtmlList)
            assetPopoverList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.internallinks ? element.elementdata.authoredtext.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList)
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
 * @param {Array} elementList - List of Glossary/Footnote/Asset_Popover entries in a List/Poetry element
 * @returns {Array} All snapshots for given semantic - Glossary/Footnote/Asset_Popover for List and Poetry element  
*/
const setSnapshotsInListAndPoetry = async (actionStatus, elementList, semanticType,glossaryFootnoteHtmlList) => {
    let snapshotsList = []
    await Promise.all(elementList.map( async item => {
        if ((item.type == PARAGRAPH || item.type == POETRY_LINE) && item.authoredtext) {
            if (semanticType === GLOSSARY) {
                let glossaryArray = item.authoredtext.glossaryentries ? item.authoredtext.glossaryentries : [];
                snapshotsList = snapshotsList.concat(prepareGlossarySnapshotContent(actionStatus, glossaryArray,glossaryFootnoteHtmlList));
            } else if (semanticType === FOOTNOTE) {
                let footnoteArray = item.authoredtext.footnotes ? item.authoredtext.footnotes : [];
                snapshotsList = snapshotsList.concat(prepareFootnoteSnapshotContent(actionStatus, footnoteArray,glossaryFootnoteHtmlList));
            } else if (semanticType === ASSET_POPOVER) {
                let assetLists = item.authoredtext.internallinks ? item.authoredtext.internallinks : [];
                let assetSnapList = assetLists.length != 0 ? await prepareAssetPopoverSnapshotContent(assetLists) : [];
                snapshotsList = snapshotsList.concat(assetSnapList);
            }
        } else if (item.listitems && item.listitems.length > 0) { // for nested lists
            snapshotsList = snapshotsList.concat(await setSnapshotsInListAndPoetry(actionStatus, item.listitems, semanticType,glossaryFootnoteHtmlList));
        }
    }))
    return snapshotsList
}

/**
 * @function prepareGlossarySnapshotContent
 * @description-This function is to prepare snapshot content for each Glossary entry
 * @param {String} status - status of the action performed
 * @param {Array} glossaryList - List of Glossary entries
 * @returns {Array} All  Glossary Snapshots for given element 
*/
const prepareGlossarySnapshotContent = (actionStatus, glossaryList, glossaryHtmlList) => {
    let glossarySnap = []
    glossaryList && glossaryList.length && glossaryList.map(glossaryItem => {
        let glossaryData = {
            changeStatus: actionStatus.status.charAt(0).toUpperCase() + actionStatus.status.slice(1),
            changeType: actionStatus.action,
            charAt: glossaryItem.charAt,
            glossaryId: glossaryItem.itemid
        }
        if (glossaryItem.glossaryentry && glossaryItem.glossaryentry[0]) {
            let dataID = glossaryItem.itemid;
            glossaryData.glossaryTerm = JSON.parse(glossaryHtmlList[dataID]).term
            glossaryData.glossaryDefinition =  JSON.parse(glossaryHtmlList[dataID]).definition
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
 * @returns {Array} All Footnote Snapshots for given element 
*/
const prepareFootnoteSnapshotContent = (actionStatus, footnoteWipList, footnoteHtmlList) => {
    let footnoteSnap = []
    footnoteWipList && footnoteWipList.length && footnoteWipList.map(footnoteItem => {
        let footnoteData = {
            changeStatus: actionStatus.status.charAt(0).toUpperCase() + actionStatus.status.slice(1),
            changeType: actionStatus.action,
            charAt: footnoteItem.charAt,
            footnoteId: footnoteItem.footnoteid
        };
        let footnoteText = "";
        if (footnoteItem.footnotecontent && footnoteItem.footnotecontent[0] && footnoteItem.footnotecontent[0].elementdata) {
            let dataID = footnoteItem.footnotecontent[0].id;
            footnoteText = footnoteHtmlList[dataID];
        }
        footnoteData.footnote = `<p class="paragraphNumeroUno">${footnoteText}</p>`
        footnoteSnap.push(footnoteData);
    })
    return footnoteSnap
}

/**
 * @function prepareAssetPopoverSnapshotContent
 * @description-This function is to prepare snapshot content for each Asset Popover entry
 * @param {Array} assetsList - List of Asset Popover entries
 * @returns {Array} All AssetPopover Snapshots for given element 
*/
export const prepareAssetPopoverSnapshotContent = async (assetsList) => {
    let assetPopoverSnap = []
    if (assetsList && assetsList.length) {
        await Promise.all(assetsList.map(async assetsItem => {
            let assetId = document.querySelector('abbr[data-uri="' + assetsItem.linkid + '"').getAttribute("asset-id");
            let data = {
                assetid: assetId,
                type: assetsItem.internallinktype === SLATE ? SLATE_LINK : AP_TYPE
            }
            if (assetsItem.internallinktype === SLATE) {
                let slateLink = await slateLinkDetails(assetsItem.linkid);
                data.linkID = slateLink && slateLink.containerUrn ? slateLink.containerUrn : ""
                data.label = slateLink && slateLink.unformattedTitle && slateLink.unformattedTitle.en ? slateLink.unformattedTitle.en : ""
            }
            else {
                await getCurrentlyLinkedImage(assetsItem.linkid, (resCurrentlyLinkedImageData) => {
                    data.linkID = resCurrentlyLinkedImageData.id ? resCurrentlyLinkedImageData.id : ""
                    data.label = resCurrentlyLinkedImageData.title ? resCurrentlyLinkedImageData.title : ""
                })
            }
            assetPopoverSnap.push(data)
        }))
    }
    return assetPopoverSnap
}

/**
 * @function fetchElementsTag
 * @description-This function is to set the lael text of element
 * @param {Object} element - element details
 * @returns {String} Element Tags for elementType key in Snapshots
*/
export const fetchElementsTag = (element) => {
    let labelText, eleTag, eleType, eleSubType;
    eleType = element.type ? element.type :  element.elementType;
    switch (eleType) {
        case AUTHORED_TEXT:
            eleSubType = (element.elementdata && element.elementdata.headers) ? HEADING + element.elementdata.headers[0].level : PARAGRAPH;
            break;
        case ELEMENT_ASIDE:
            eleSubType = element.subtype === WORKED_EXAMPLE ? WORKED_EXAMPLE : ASIDE;
            break;
        case ELEMENT_LIST:
            eleSubType = element.subtype
            break;
        case BLOCKFEATURE:
            eleSubType = element.elementdata.type
            break;
        default:
            eleSubType = ""
            break;
    }
    
    eleTag = eleSubType && eleSubType.trim() !== "" && setElementTag[eleType] ? setElementTag[eleType].subtype[eleSubType] : setElementTag[eleType]
    labelText = eleTag ? `${eleTag.parentTag}${eleTag.childTag ? '+' + eleTag.childTag : ""}`:"P"

    return labelText;
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
    },
    "groupedcontent": {
        parentTag: "2C"
    },
}
