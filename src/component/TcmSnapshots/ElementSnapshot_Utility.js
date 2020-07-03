/**
 * Module - ElementSnapshot_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots for Glossary/Footnoete/Asset_Popover
 */

/**************************Import Modules**************************/
// import config from '../../config/config.js';
//import assetPopover functions for snapshots

/**
 * @function setSemanticsSnapshots
 * @description-This function is to set the snapshots for semantics in an element
 * @param {String} status - status of the action performed
 * @param {Object} element - wipData for element
 * @returns {Object}
*/
export const setSemanticsSnapshots = (status, element) => {
    let glossarySnap, footnoteSnap, assetPopoverSnap;
    let semanticSnapshots = {};
    switch (element.type) {
        case 'element-authoredtext':
            let glossaryList = element.elementdata && element.elementdata.glossaryentries && !element.elementdata.headers ? element.elementdata.glossaryentries : [];
            glossarySnap = prepareGlossarySnapshotContent(status, glossaryList);
            let footnoteList = element.elementdata && element.elementdata.footnotes ? element.elementdata.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(status, footnoteList);
            assetPopoverSnap = []//assetPopover allowed in paraheading
            break;

        case 'element-list':
            glossarySnap = setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'glossary');
            footnoteSnap = setSnapshotsInListAndPoetry(status, element.elementdata.listitems, 'footnote');
            assetPopoverSnap = []//assetPopover allowed in List
            break;

        case 'element-blockfeature':
            glossarySnap = [];
            let footnoteList = element.elementdata && element.elementdata.authoredtext && element.elementdata.authoredtext.footnotes ? element.elementdata.authoredtext.footnotes : [];
            footnoteSnap = prepareFootnoteSnapshotContent(status, footnoteList)
            assetPopoverSnap = []//assetPopover allowed in BQ
            break;

        case 'element-learningobjectives':
            glossarySnap = [];
            footnoteSnap = [];
            assetPopoverSnap = []//assetPopover allowed in LO
            break;

        case 'stanza':
            glossarySnap = setSnapshotsInListAndPoetry(status, element.poetrylines, 'glossary');
            footnoteSnap = setSnapshotsInListAndPoetry(status, element.poetrylines, 'footnote');
            assetPopoverSnap = []//assetPopover allowed in LO
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
 * @function setSnapshotsInList
 * @description-This is a recursive function to prepare snapshot content for each Glossary entry in a List element
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
            }
        } else if (item.listitems && item.listitems.length > 0) {
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
            changeType: "update",
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
            changeStatus: status,
            changeType: "update",
            charAt: footnoteItem.charAt,
            footnoteid: footnoteItem.footnoteid
        }
        if (footnoteItem.footnotecontent && footnoteItem.footnotecontent[0] && footnoteItem.footnotecontent[0].elementdata) {
            let footnoteText = footnoteItem.footnotecontent[0].elementdata.text ? footnoteItem.footnotecontent[0].elementdata.text : "";
            footnoteData.footnote = `"<p class="paragraphNumeroUno">${footnoteText}</p>`
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
const prepareAssetPopoverSnapshotContent = (status, assetsList) => {
    let assetPopoverSnap = []
    /**
     * AssetPopover snapshot function 
     */
    return assetPopoverSnap
}
