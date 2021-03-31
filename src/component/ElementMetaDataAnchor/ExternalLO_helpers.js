/**
 * This module consists of Helper Functions for External Framework Learning Objectives
 */
import axios from 'axios';
import config from '../../config/config';
import elementConstants from '../../component/ElementContainer/ElementConstants.js';
import { PROJECT_LEARNING_FRAMEWORKS } from '../../constants/Action_Constants';
/**
 * This API fetches the Learning Framework(s) linked to the project
 */
export const fetchProjectLFs = () => dispatch => {
    axios.get(`${config.ASSET_POPOVER_ENDPOINT}v2/${config.projectUrn}/learningframeworks`, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken,
            "x-Roles": "ContentPlanningAdmin"
        }
    }).then(response => {
        if (response.status === 200 && response?.data?.learningFrameworks?.length > 0) {
            const learningFrameworks = response.data.learningFrameworks;
            const cypressLF = learningFrameworks.find(learningFramework => config.book_title.includes(learningFramework?.label?.en));
            const externalLF = learningFrameworks.filter(learningFramework => !config.book_title.includes(learningFramework?.label?.en))
            dispatch({
                type: PROJECT_LEARNING_FRAMEWORKS,
                payload: {
                    cypressLF: cypressLF ?? {},
                    externalLF: externalLF ?? []
                }
            });
        }
    }).catch(error => {
        console.log('Error in fetching Learning Framework linked to the project>>>> ', error)
        dispatch({
            type: PROJECT_LEARNING_FRAMEWORKS,
            payload: {}
        });
    })

};

/**
 * This methoda is used to get a unique LO URN to create a new Metadata Anchor on slate
 */
export const getMetadataAnchorLORef = () => (dispatch, getState) => {
    let currentSlateLOs = getState().metadataReducer.currentSlateLOData;
    currentSlateLOs && currentSlateLOs.length && currentSlateLOs.map(slateLO => {
        if (!slateLO.hasOwnProperty("loUrn")) {
            slateLO["loUrn"] = slateLO["id"]
        }
    })
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
                    metadataAnchorElement = { id: element.id, loUrn: element?.elementdata?.loref ?? "", index: index };
                    break;
                case elementConstants.ELEMENT_ASIDE:
                    element.elementdata.bodymatter.map((nestedElem, nestedIndex) => {
                        /** MA inside Aside/WE:HEAD */
                        if (nestedElem.type == elementConstants.METADATA_ANCHOR) {
                            metadataAnchorElement = { id: nestedElem.id, loUrn: nestedElem?.elementdata?.loref ?? "", index: `${index}-${nestedIndex}` };
                        }
                        /** MA inside Aside/WE:BODY */
                        else if (nestedElem.type == elementConstants.ELEM_SECTION_BREAK) {
                            nestedElem.contents.bodymatter.map((weBodyElem, weIndex) => {
                                if (weBodyElem.type == elementConstants.METADATA_ANCHOR) {
                                    metadataAnchorElement = { id: weBodyElem.id, loUrn: weBodyElem?.elementdata?.loref ?? "", index: `${index}-${nestedIndex}-${weIndex}` };
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
    /** Handle M.A. elements with LO unlinked and update with new LO link if there any */
    message?.loUnlinked?.forEach(loItem => {
        let metadataElems = slateLOElems.filter(metadataElem => metadataElem.loUrn === loItem.id);
        if (metadataElems.length) {
            let LOWipData = prepareLO_WIP_Data("unlink", "", metadataElems, config.slateManifestURN);
            if (linkLOs?.length) {
                LOWipData.elementdata.loref = linkLOs[0].id;
                linkLOs.splice(0, 1);
                metadataElemToUpdate = metadataElemToUpdate.concat(metadataElems);
            }
            loDataToUpdate.push(LOWipData)
        }
    });
    /** Handle M.A. elements with no LO and update with new LO link if there any */
    const remaningMAElems = anyMatchInArray(slateLOElems, 'id', metadataElemToUpdate, 'id', []);
    let metadataElemsEmpty = slateLOElems.filter(metadataElem => metadataElem.loUrn === "");
    if (linkLOs?.length && remaningMAElems?.length) {
        remaningMAElems?.forEach(loItem => {
            if (metadataElemsEmpty.length) {
                let LOWipData = prepareLO_WIP_Data("link", "", metadataElemsEmpty[0], config.slateManifestURN);
                if (linkLOs?.length) {
                    LOWipData.elementdata.loref = linkLOs[0].id;
                    loDataToUpdate.push(LOWipData);
                    linkLOs.splice(0, 1);
                    metadataElemsEmpty.splice(0, 1);
                }
            }
        });
    }

    return loDataToUpdate;
}

/**
 * This function prepares Request Payload to update Metadata Anchor Elements
 * @param {*} loUrn  LO-URN to update
 * @param {*} metadataElems metadata anchor elements to update
 * @param {*} slateManifestURN slate id
 * @returns {Object} LO WIP Data - Request payload to update Metadata Anchor Element
 */
const prepareLO_WIP_Data = (type, loUrn, metadataElems, slateManifestURN) => {

    const metadataIDs = type === "unlink" ? (metadataElems?.map(metadataElem => metadataElem.id) ?? []) : [metadataElems.id];
    const metadataIndexes = type === "unlink" ? (metadataElems?.map(metadataElem => metadataElem.index) ?? []) : [metadataElems.index];
    return {
        "elementdata": {
            "loref": loUrn
        },
        "metaDataAnchorID": metadataIDs,
        "elementVersionType": elementConstants.METADATA_ANCHOR,
        "loIndex": metadataIndexes,
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

/**
 * This function returns the updated list of LOs linked to Slate
 * @param {Array} existingSlateLOs LOs previously linked to Slate
 * @param {Array} unlinkedLOs LOs unlinked
 * @param {Array} linkedLOs new LOs linked
 */
export const setCurrentSlateLOs = (existingSlateLOs, unlinkedLOs, linkedLOs) => {
    let updatedSlateLOs = [];
    const slateLO_Unlinked = unlinkedLOs?.length ? unlinkedLOs.map(unlinkedLO => unlinkedLO.id) : [];
    existingSlateLOs && existingSlateLOs.length && existingSlateLOs.map(slateLO => {
        if (!slateLO.hasOwnProperty("id")) {
            slateLO["id"] = slateLO["loUrn"]
        }
    })
    updatedSlateLOs = existingSlateLOs.filter(existingLO => slateLO_Unlinked.indexOf(existingLO.id) < 0);
    updatedSlateLOs = updatedSlateLOs.concat(linkedLOs ?? []);
    return updatedSlateLOs;
}