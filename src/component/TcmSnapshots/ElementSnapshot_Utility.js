/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnote/Asset_Popover
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
 * @returns {Object} All snapshots for Glossary/Footnote/Asset_Popover for given element
*/
export const setSemanticsSnapshots = async (element,actionStatus) => {
    let glossarySnap, footnoteSnap, assetPopoverSnap, glossaryList, footnoteList, assetPopoverList;
    let semanticSnapshots = {};
   
    switch (element.type) {
        
        case 'element-authoredtext':
            console.log(element.elementdata,"kanika",element.type)
            glossaryList = element.elementdata && element.elementdata.glossaryentries && !element.elementdata.headers ? element.elementdata.glossaryentries : [];
            glossarySnap = prepareGlossarySnapshotContent(actionStatus, glossaryList);
           
            footnoteList = element.elementdata && element.elementdata.footnotes ? element.elementdata.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(actionStatus, footnoteList);
            assetPopoverList = element.elementdata && element.elementdata.internallinks ? element.elementdata.internallinks : [];
            assetPopoverSnap = await prepareAssetPopoverSnapshotContent(assetPopoverList)
            break;

        case 'stanza':
        case 'element-list':
            let listData = element.type === "element-list" ? element.elementdata.listitems: element.poetrylines
            glossarySnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, 'glossary');
            footnoteSnap =  await setSnapshotsInListAndPoetry(actionStatus, listData, 'footnote');
            assetPopoverSnap =  await setSnapshotsInListAndPoetry("", listData, 'assetpopover');
            break;

        case 'element-blockfeature':
            glossarySnap = [];
            footnoteList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(actionStatus, footnoteList)
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
const setSnapshotsInListAndPoetry = async (actionStatus, elementList, semanticType) => {
    let snapshotsList = []
    await Promise.all(elementList.map( async item => {
        if ((item.type == "paragraph" || item.type == "line") && item.authoredtext) {
            if (semanticType === 'glossary') {
                let glossaryArray = item.authoredtext.glossaryentries ? item.authoredtext.glossaryentries : [];
                snapshotsList = snapshotsList.concat(prepareGlossarySnapshotContent(actionStatus, glossaryArray));
            } else if (semanticType === 'footnote') {
                let footnoteArray = item.authoredtext.footnotes ? item.authoredtext.footnotes : [];
                snapshotsList = snapshotsList.concat(prepareFootnoteSnapshotContent(actionStatus, footnoteArray));
            } else if (semanticType === 'assetpopover') {
                let assetLists = item.authoredtext.internallinks ? item.authoredtext.internallinks : [];
                let assetSnapList = assetLists.length != 0 ? await prepareAssetPopoverSnapshotContent(assetLists) : [];
                snapshotsList = snapshotsList.concat(assetSnapList);
            }
        } else if (item.listitems && item.listitems.length > 0) { // for nested lists
            snapshotsList = snapshotsList.concat(await setSnapshotsInListAndPoetry(actionStatus, item.listitems, semanticType));
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
const prepareGlossarySnapshotContent = (actionStatus, glossaryList) => {
    let glossarySnap = []
    glossaryList && glossaryList.length && glossaryList.map(glossaryItem => {
        let glossaryData = {
            changeStatus: actionStatus.status.charAt(0).toUpperCase() + actionStatus.status.slice(1),
            changeType: actionStatus.action,
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
 * @returns {Array} All Footnote Snapshots for given element 
*/
const prepareFootnoteSnapshotContent = (actionStatus, footnoteList) => {
    let footnoteSnap = []
    footnoteList && footnoteList.length && footnoteList.map(footnoteItem => {
        let footnoteData = {
            changeStatus: actionStatus.status.charAt(0).toUpperCase() + actionStatus.status.slice(1),
            changeType: actionStatus.action,
            charAt: footnoteItem.charAt,
            footnoteid: footnoteItem.footnoteid
        };
        let footnoteText = "";
        if (footnoteItem.footnotecontent && footnoteItem.footnotecontent[0] && footnoteItem.footnotecontent[0].elementdata) {
            footnoteText = footnoteItem.footnotecontent[0].elementdata.text ? footnoteItem.footnotecontent[0].elementdata.text : "";
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
    if(assetsList && assetsList.length){
        await Promise.all(assetsList.map(async assetsItem => {
            let assetId = document.querySelector('abbr[data-uri="' + assetsItem.linkid + '"').getAttribute("asset-id");
           await getCurrentlyLinkedImage(assetsItem.linkid, (resCurrentlyLinkedImageData) => {
                assetPopoverSnap.push({
                    assetid: assetId,
                    linkID: resCurrentlyLinkedImageData.id,
                    label: resCurrentlyLinkedImageData.title,
                    type:"Asset Popover"
                })
            })
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
    console.log(eleTag,eleType,"arora")
    labelText = `${eleTag.parentTag}${eleTag.childTag ? '+' + eleTag.childTag : ""}`

    return labelText;
}

/**
 * @function fetchElementWipData
 * @description-This function is to set the lael text of element
 * @param {Object} bodymatter - bodymatter before delete  
 * @param {String/Number} index - index of element deleted
 * @param {String} type - type of element deleted
 * @param {String} entityUrn - entityUrn
 * @returns {Object} WipData for element 
*/
export const fetchElementWipData = (bodymatter, index, type, entityUrn) => {
    let eleIndex,
    wipData = {};

    if (typeof index === "number" || (Array.isArray(index) && index.length == 1)) {   /** Delete a container or an element at slate level */
        eleIndex = Array.isArray(index) ? index[0] : index;
        wipData = bodymatter[eleIndex];
        if (wipData.subtype === "workedexample") {  /** Delete Section-Break */
            wipData.elementdata.bodymatter.map((item, innerIndex) => {
                if (item.type == "manifest" && entityUrn == item.contentUrn) {
                    wipData = bodymatter[eleIndex].elementdata.bodymatter[innerIndex]
                }
            })
        }
    }
    else if (typeof index === "string") {
        eleIndex =  index.split("-");
        // eleIndex = Array.isArray(index) ? index : index.split("-");
        switch (type) {
            case 'stanza':                           /** Inside Poetry */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[2]];
                break;
            case 'element-citation':                 /** Inside Citations */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                break;
            case 'element-list':
            case 'element-blockfeature':
            case 'element-authoredtext':
            case 'element-learningobjectives':
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
 * @function fetchParentData
 * @description This function is to set the parentData for the element
 * @param {Object} bodymatter - bodymatter for conversion  
 * @param {String/Number} indexes - index of element converted
 * @returns {Object} ParentData fo given element
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

        let parentElement = tempIndex.length == 3 && bodymatter[tempIndex[0]].type !== 'poetry'  ? bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] : bodymatter[tempIndex[0]];

        parentData.parentUrn = {
            manifestUrn: parentElement.id,
            contentUrn: parentElement.contentUrn,
            elementType: parentElement.type
        }
    }
    return parentData;
}

/**
 * @function checkContainerElementVersion
 * @description This function is to check versioning status for slate and container elements and 
 *              fetch new ManifestUrn based on the status
 * @param {Object} containerElement Object containing all the parent data for elements  
 * @param {Object} versionStatus parent element status for versioning
 * @param {Object} currentSlateData current Slate data 
 * @returns {Object} Updated Container Element with latest Manifest Urns
*/
export const checkContainerElementVersion = async (containerElement, versionStatus, currentSlateData) => {
    /** latest version for WE/CE/PE/AS*/
    if (versionStatus && versionStatus.parentStatus && versionStatus.parentStatus === "approved") {
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
    if (versionStatus && versionStatus.childStatus && versionStatus.childStatus === "approved") {
        let newSectionManifest = await getLatestVersion(containerElement.parentUrn.contentUrn);
        containerElement.parentUrn.manifestUrn = newSectionManifest ? newSectionManifest : containerElement.parentUrn.manifestUrn
    }
    /** latest version for slate*/
    if (currentSlateData && currentSlateData.status && currentSlateData.status === 'approved') {
        let newSlateManifest = await getLatestVersion(currentSlateData.contentUrn);
        config.slateManifestURN = newSlateManifest ? newSlateManifest : config.slateManifestURN
    }
    return containerElement;
}

/**
 * @function fetchManifestStatus
 * @description This function is to get the status for Parent elements
 * @param {Object} bodymatter bodymatter for current slate  
 * @param {Object} parentElement Object containing all the parent data for elements
 * @param {String} type type of element
 * @returns {Object} Parent Elements' status
*/
export const fetchManifestStatus = (bodymatter, parentElement, type) => {
    let parentData = {};
    const { asideData, parentUrn, poetryData } = parentElement;

    if ((asideData || parentUrn || poetryData) && bodymatter.length !== 0) {
        bodymatter.map(element => {
            if (type === 'SECTION_BREAK' && asideData && element.id == asideData.id) {
                parentData.parentStatus = element.status;       /** Create Section-Break */
            }
            else if (parentUrn && element.id == parentUrn.manifestUrn) {
                parentData.parentStatus = element.status;       /** In WE-HEAD | Aside | Citations */
            } else if (asideData && element.type == "element-aside" && element.id == asideData.id) {
                parentData.parentStatus = element.status;
                element.elementdata && element.elementdata.bodymatter.map((ele) => {
                    if (parentUrn && ele.id === parentUrn.manifestUrn) {
                        parentData.childStatus = ele.status ;   /** In Section-Break */
                    }
                })
            }
            else if (poetryData && element.id == poetryData.parentUrn) {
                parentData.parentStatus = element.status;       /** In Poetry */
            }
        })
    }
    return parentData
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
