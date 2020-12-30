/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnote/Asset_Popover/Slate_Link
 */
/**************************Import Modules**************************/
import config from '../../config/config.js';
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
    AP_TYPE,
    ASIDE,
    WORKED_EXAMPLE,
    FIGURE,
    MULTI_COLUMN
}
    = TcmConstants;

/**
 * @function setSemanticsSnapshots
 * @description-This function is to set the snapshots for semantics in an element
 * @param {String} status - status of the action performed
 * @param {Object} element - wipData for element
 * @returns {Object} All snapshots for Glossary/Footnote/Asset_Popover for given element
*/
export const setSemanticsSnapshots = async (element,actionStatus,index) => {
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
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList,index,actionStatus,element)
            break;

        case ELEMENT_LIST:
        case POETRY_STANZA:
            let listData = element.type === ELEMENT_LIST ? element.elementdata.listitems: element.poetrylines
            glossarySnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, GLOSSARY, glossaryHtmlList,index);
            footnoteSnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, FOOTNOTE, footnoteHtmlList,index);
            assetPopoverSnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, ASSET_POPOVER,undefined,index);
            break;

        case BLOCKFEATURE:
            glossarySnap = [];
            footnoteWipList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(actionStatus, footnoteWipList,footnoteHtmlList)
            assetPopoverList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.internallinks ? element.elementdata.authoredtext.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList,index,actionStatus)
            break;
        case FIGURE:
            glossarySnap = []
            assetPopoverSnap = []
            footnoteWipList = { 
                subtitle: element.subtitle ? element.subtitle.footnotes : [], 
                caption: element.captions ? element.captions.footnotes : [], 
                credit: element.credits ? element.credits.footnotes : []
            }

           if(element.figuretype == "authoredtext"){
                footnoteWipList.metadata = element.figuredata.elementdata.footnotes ? element.figuredata.elementdata.footnotes : []
           }
            footnoteSnap = prepareFigureFootnoteSnapshotContent(actionStatus, footnoteWipList, footnoteHtmlList)
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
 * @function prepareFigureFootnoteSnapshotContent
 * @description-This function is to prepare snapshot content for each Glossary entry
 * @param {String} status - status of the action performed
 * @param {Array} footnoteList - List of Footnote entries
 * @returns {Array} All Footnote Snapshots for given element 
*/
const prepareFigureFootnoteSnapshotContent = (actionStatus, footnoteWipList, footnoteHtmlList) => {
    return [
            ...prepareFootnoteSnapshotContent(actionStatus, footnoteWipList.subtitle, footnoteHtmlList),
            ...prepareFootnoteSnapshotContent(actionStatus, footnoteWipList.caption, footnoteHtmlList),
            ...prepareFootnoteSnapshotContent(actionStatus, footnoteWipList.credit, footnoteHtmlList),
            ...prepareFootnoteSnapshotContent(actionStatus, footnoteWipList.metadata, footnoteHtmlList)
        ]
}

/** 
 * @function setSnapshotsInListAndPoetry
 * @description This is a recursive function to prepare snapshot content for each Glossary/Footnote/AssetPopover entry 
 *              in a List and Poetry element
 * @param {String} status - status of the action performed
 * @param {Array} elementList - List of Glossary/Footnote/Asset_Popover entries in a List/Poetry element
 * @returns {Array} All snapshots for given semantic - Glossary/Footnote/Asset_Popover for List and Poetry element  
*/
const setSnapshotsInListAndPoetry = async (actionStatus, elementList, semanticType,glossaryFootnoteHtmlList,index) => {
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
                let assetSnapList = assetLists.length != 0 ? await prepareAssetPopoverSnapshotContent(assetLists,index,actionStatus) : [];
                snapshotsList = snapshotsList.concat(assetSnapList);
            }
        } else if (item.listitems && item.listitems.length > 0) { // for nested lists
            snapshotsList = snapshotsList.concat(await setSnapshotsInListAndPoetry(actionStatus, item.listitems, semanticType,glossaryFootnoteHtmlList,index));
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
        let dataID = glossaryItem.itemid;
        let glossaryHtml = JSON.parse(glossaryHtmlList[dataID])
        if (glossaryItem.glossaryentry && glossaryItem.glossaryentry[0] ) {
            let glossaryData = {
                changeStatus: actionStatus.status.charAt(0).toUpperCase() + actionStatus.status.slice(1),
                changeType: actionStatus.action.charAt(0).toUpperCase() + actionStatus.action.slice(1),
                charAt: glossaryItem.charAt,
                glossaryId: glossaryItem.itemid
            }
            if(glossaryItem.glossaryentry[0].narrativeform && ((glossaryHtml && isEmpty(glossaryHtml)) ||!glossaryHtml )){
                glossaryData.glossaryTerm = `<p>${glossaryItem.glossaryentry[0].narrativeform.text}</p>`
                glossaryData.glossaryDefinition =  '<p></p>'
            }else {
                glossaryData.glossaryTerm = glossaryHtml.term ? glossaryHtml.term : '<p></p>'
                glossaryData.glossaryDefinition = glossaryHtml.definition ? glossaryHtml.definition : '<p></p>'
                if (glossaryItem.glossaryentry[0].narrativeform) {
                    glossaryData.glossaryNarrative = `<p>${glossaryItem.glossaryentry[0].narrativeform.text}</p>`
                }
            }
            glossarySnap.push(glossaryData)
        }
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
            changeType: actionStatus.action.charAt(0).toUpperCase() + actionStatus.action.slice(1),
            charAt: footnoteItem.charAt,
            footnoteId: footnoteItem.footnoteid
        };
        let footnoteText = "";
        if (footnoteItem.footnotecontent && footnoteItem.footnotecontent[0] && footnoteItem.footnotecontent[0].elementdata) {
            let dataID = footnoteItem.footnotecontent[0].id;
            footnoteText = footnoteHtmlList[dataID];
            footnoteText = footnoteText ? footnoteText.replace(/(<p.*?>)/g, "").replace(/(<\/p>)/g, "").replace(/<br>/g, "") : "";
        }
        footnoteData.footnote = config.isCreateFootnote ? "" :`<p class="paragraphNumeroUno">${footnoteText}</p>`
        config.isCreateFootnote=false;
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
export const prepareAssetPopoverSnapshotContent = async (assetsList, indexes, actionStatus, element=null) => {
    let assetPopoverSnap = [];
    if (Array.isArray(assetsList) && assetsList.length > 0) {
        let tempIndex = indexes && Array.isArray(indexes) ? indexes : (typeof indexes === "number") ? [indexes.toString()] : indexes.split("-");
        let assetEleIndex = tempIndex && tempIndex.length > 1 ? tempIndex && tempIndex.join('-') : tempIndex;
        let elementAP = document.querySelector(`div#cypress-${assetEleIndex}`)
        if (element) {
            let dom = document.createElement('div');
            dom.innerHTML = element.html.text;
            elementAP = dom;
        }
        if (assetsList && assetsList.length) {
            await Promise.all(assetsList.map(async (assetsItem, index) => {
                let assetIdAll = assetsItem && assetsItem.linkid && elementAP && elementAP.querySelectorAll('abbr[data-uri="' + assetsItem.linkid + '"]');
                let assetId = assetIdAll && assetIdAll[0] && assetIdAll[0].getAttribute('asset-id') ? assetIdAll[0].getAttribute('asset-id') : actionStatus.assetRemoveidForSnapshot ? actionStatus.assetRemoveidForSnapshot: ""
                let data = {
                    assetid: assetId,
                    type: assetsItem && assetsItem.internallinktype === SLATE ? SLATE_LINK : AP_TYPE
                }
                if (assetsItem && assetsItem.internallinktype === SLATE) { /** Slate-Link Snapshot Data */
                    let slateLink = await slateLinkDetails(assetsItem.linkid);
                    data.linkID = slateLink && slateLink.containerUrn ? slateLink.containerUrn : ""
                    data.label = slateLink && slateLink.unformattedTitle && slateLink.unformattedTitle.en ? slateLink.unformattedTitle.en : ""
                }
                else {                                                    /** Asset Popover Snapshot Data */
                    await getCurrentlyLinkedImage(assetsItem.linkid, (resCurrentlyLinkedImageData) => {
                        data.linkID = resCurrentlyLinkedImageData.id ? resCurrentlyLinkedImageData.id : ""
                        data.label = resCurrentlyLinkedImageData.title ? resCurrentlyLinkedImageData.title : ""
                    })
                }
                assetPopoverSnap.push(data)
            }))
        }
    }
    return assetPopoverSnap
}

/**
 * @function fetchElementsTag
 * @description-This function is to set the lael text of element
 * @param {Object} element - element details
 * @returns {String} Element Tags for elementType key in Snapshots
*/
export const fetchElementsTag = (element,metadataField) => {
    let labelText, eleTag, eleType, eleSubType;
    eleType = element && element.type ? element.type :  element.elementType;
    eleType = metadataField ? setMetadataType[element.type][metadataField] : eleType;
    switch (eleType) {
        case AUTHORED_TEXT:
            eleSubType = (element.elementdata && element.elementdata.headers) ? HEADING + element.elementdata.headers[0].level : PARAGRAPH;
            break;
        case ELEMENT_ASIDE:
            eleSubType = element.subtype === WORKED_EXAMPLE ? WORKED_EXAMPLE : ASIDE;
            break;
        case ELEMENT_LIST:
            eleSubType = element.subtype ? element.subtype : element.elementdata && element.elementdata.subtype ? element.elementdata.subtype : "disc"
            break;
        case BLOCKFEATURE:
            eleSubType = element.elementdata.type
            break;
        case FIGURE:
            eleSubType = element.figuretype
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
 * @function isEmpty
 * @description This function is to check if an object is empty
 * @param {Object} obj - object to be checked
 * @returns {Boolean}
*/
const isEmpty = (obj) => {
    if ((Object.keys(obj).length === 0 && obj.constructor === Object)) {
        return true;
    }
    return false;
}

/**
 * @Object setElementTag | Used to map elementTags based on type and subtype
*/
const setElementTag = {
    "element-blockfeature": {
        subtype: {
            'pullquote': {
                parentTag: "PQ",
                // childTag: 'pullquote',
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
    "groupedcontent": {
        parentTag: "2C"
    },
    "manifest": {
        parentTag: "WE"
    },
    "popup": {
        parentTag: "POP"
    },
    "popup_cta": {
        parentTag: "CTA"
    },
    "popup_label": {
        parentTag: "LB"
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
    "figure": {
        subtype: {
            'image': {
                parentTag: "Fg"
            },
            'table': {
                parentTag: "TB"
            },
            'mathImage': {
                parentTag: "EQ"
            },
            'audio': {
                parentTag: "AUD" 
            },
            'video': {
                parentTag: "VID" 
            },
            "codelisting":{
                parentTag: "BCE" 
            },
            "authoredtext":{
                parentTag: "MML" 
            }
        }
    }
}

const setMetadataType = {
    "popup": {
        'postertextobject': 'popup_cta',
        'formattedTitle': 'popup_label',
        'formattedSubtitle': 'popup_label',
        'formattedTitleOnly': 'popup_label'
    }
}

/**
 * Generates WIP data for figure
 * @param {*} bodymatter Slate bodymatter data
 * @param {*} index index of the element
 */
export const generateWipDataForFigure = (bodymatter, index) => {
    const eleIndex =  index.split("-");
    let wipData
    switch(eleIndex.length){
        case 2:
            if(bodymatter[eleIndex[0]].type === FIGURE) {
                wipData = bodymatter[eleIndex[0]]
            }
            else if (bodymatter[eleIndex[0]].type === ELEMENT_ASIDE) {
                wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]]
            }
            break;
        case 3:
            if(bodymatter[eleIndex[0]].type === FIGURE) {
                wipData = bodymatter[eleIndex[0]]
            }
            else if (bodymatter[eleIndex[0]].type === ELEMENT_ASIDE) { /** Aside and WE */
                if (bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].type === FIGURE) { /**Aside or WE-head */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]]
                }
                else { /** WE body section */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]]
                }
            }
            else if (bodymatter[eleIndex[0]].type === MULTI_COLUMN) { /** Multi-column */
                wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]]
            }
            break;
        case 4:
            if (bodymatter[eleIndex[0]].type === ELEMENT_ASIDE) { /** WE */
                wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]]
            }
            else if (bodymatter[eleIndex[0]].type === MULTI_COLUMN) { /** Multi-column */
                wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]]
            }
            break;
    }
    return wipData
}