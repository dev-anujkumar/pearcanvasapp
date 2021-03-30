/**
 * This module consists of Helper Functions for External Framework Learning Objectives
 */

import elementConstants from '../../component/ElementContainer/ElementConstants.js';

/**
 * This methoda is used to get a unique LO URN to create a new Metadata Anchor on slate
 */
export const getMetadataAnchorLORef = () => (dispatch, getState) => {
    const currentSlateLOs = getState().metadataReducer.currentSlateLOData;
    const currentSlateLOUrns = currentSlateLOs.map(slateLO => slateLO.loUrn);
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = newParentData[config.slateManifestURN];
    const slateElements = currentSlateData?.contents?.bodymatter;
    let existingSlateMetadataAnchors = [];
    if (slateElements?.length) {
        existingSlateMetadataAnchors = getSlateMetadataAnchorElem(slateElements);
    }
    const existingLOUrns = existingSlateMetadataAnchors.map(element => element.loUrn);
    let uniqueSlateMetadataAnchors = [...new Set(existingLOUrns)];
    let existingLOsinMA = findLOsToLink(currentSlateLOUrns, uniqueSlateMetadataAnchors, []);
    const loUrnToLink = existingLOsinMA?.length ? existingLOsinMA[0] : currentSlateLOUrns[0];
    return loUrnToLink;
}

/**
 * This function returns an array of items from Array1 that are part of Array2
 * @param {Array} array1
 * @param {Array} array2
 * @param {Array} finalArray
 */
const findLOsToLink = (array1, array2, finalArray = []) => {
    array1.map(item1 => {
        const itemExists = array2.some(item2 => item2 === item1);
        !itemExists && finalArray.push(item1)
    })
    return finalArray;
}

/**
 * This function fetches all Metadata Anchor Elements on the Slate
 * @param {*} slateElements List of Elements on Slate
 * @param {*} existingSlateMetadataAnchors Metadata Anchor Elements on Slate
 */
export const getSlateMetadataAnchorElem = (slateElements = [], existingSlateMetadataAnchors = []) => {
    if (slateElements?.length) {
        slateElements.map((element, index) => {
            let metadataAnchorElement = {};
            switch (element.type) {
                case elementConstants.METADATA_ANCHOR: /** MA on Slate */
                    metadataAnchorElement = { id: element.id, loUrn: element?.elementdata?.loref, index: index };
                    break;
                case elementConstants.ELEMENT_ASIDE:
                    element.elementdata.bodymatter.map((nestedElem, nestedIndex) => {
                        /** MA inside Aside/WE:HEAD */
                        if (nestedElem.type == elementConstants.METADATA_ANCHOR) {
                            metadataAnchorElement = { id: nestedElem.id, loUrn: nestedElem?.elementdata?.loref, index: `${index}-${nestedIndex}` };
                        }
                        /** MA inside Aside/WE:BODY */
                        else if (nestedElem.type == elementConstants.ELEM_SECTION_BREAK) {
                            nestedElem.contents.bodymatter.map((weBodyElem, weIndex) => {
                                if (weBodyElem.type == elementConstants.METADATA_ANCHOR) {
                                    metadataAnchorElement = { id: weBodyElem.id, loUrn: weBodyElem?.elementdata?.loref, index: `${index}-${nestedIndex}-${weIndex}` };
                                }
                            })
                        }
                    });
                    break;
                default:
                    metadataAnchorElement = {};
                    break;
            }
            existingSlateMetadataAnchors.push(metadataAnchorElement);
        })
    }
    return existingSlateMetadataAnchors;
}

/**
 * This function is responsible for preparing list of Metadata Anchor Elements
 * on the slate that need to be updated w.r.t. Ext LO
 * @param {*} slateBodymatter Slate Bodymatter
 * @param {*} message Ext LO Update Event Message
 */
export const prepareLODataForUpdate = (slateBodymatter, message) => {
    let slateLOElems = getSlateMetadataAnchorElem(slateBodymatter);
    let loDataToUpdate = [];
    let linkLOs = message?.loLinked ?? [];
    let metadataElemToUpdate = [];
    message?.loUnlinked?.forEach(loItem => {
        let metadataElems = slateLOElems.filter(metadataElem => metadataElem.loUrn === loItem.id);
        if (metadataElems.length) {
            let LOWipData = prepareLO_WIP_Data("", metadataElems, config.slateManifestURN);
            if (linkLOs?.length) {
                LOWipData.elementdata.loref = linkLOs[0];
                linkLOs.splice(0, 1);
                metadataElemToUpdate = metadataElemToUpdate.concat(metadataElems);
            }
            loDataToUpdate.push(LOWipData)
        }
    });
    const remaningMAElems = anyMatchInArray(slateLOElems, 'id', metadataElemToUpdate, 'id', []);
    remaningMAElems?.forEach(loItem => {
        let metadataElems = slateLOElems.filter(metadataElem => metadataElem.loUrn === "");
        if (metadataElems.length) {
            let LOWipData = prepareLO_WIP_Data(loItem.id, metadataElems, config.slateManifestURN);
            loDataToUpdate.push(LOWipData)
        }
    });
    return loDataToUpdate;
}

/**
 * This function prepares Request Payload to update Metadata Anchor Elements
 * @param {*} loUrn  LO-URN to update
 * @param {*} metadataElems metadata anchor elements to update
 * @param {*} slateManifestURN slate id
 * @returns {Object} LO WIP Data - Request payload to update Metadata Anchor Element
 */
const prepareLO_WIP_Data = (loUrn, metadataElems, slateManifestURN) => {
    return {
        "elementdata": {
            "loref": loUrn
        },
        "metaDataAnchorID": metadataElems?.map(metadataElem => metadataElem.id) ?? [],
        "elementVersionType": elementConstants.METADATA_ANCHOR,
        "loIndex": metadataElems?.map(metadataElem => metadataElem.index) ?? [],
        "slateVersionUrn": slateManifestURN
    }
}

/**
 * This function returns an array of items from Array1 that are part of Array2
 * @param {Array} array1
 * @param {String} key1
 * @param {Array} array2
 * @param {String} key2
 * @param {Array} finalArray
 */
export const anyMatchInArray = (array1, key1, array2, key2, finalArray = []) => {
    array1 && array1.map(item1 => {
        const itemExists = array2 && array2.some(item2 => item2[key2] === item1[key1]);
        !itemExists && item1[key1] && finalArray.push(item1[key1])
    })
    return finalArray;
};