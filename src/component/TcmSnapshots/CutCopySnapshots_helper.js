/**
 * This function is used to prepare request payload for cut-copy-snapshots
 * @param {*} pasteParams 
 * @returns 
 */
export const preparePayloadData = (pasteParams) => {
    const {
        elementId,
        elementType,
        projectUrn,
        selection,
        destnSlateManifestURN,
        destnSlateEntityURN,
        asideData,
        parentUrn
    } = pasteParams
    let payload = {
        "elementurn": elementId,//manifest - popupid
        "type": elementType,//popup
        "projectUrn": projectUrn,//new key
        "sourceSlateUrn": selection.sourceSlateManifestUrn,
        "sourceSlateEntityUrn": selection.sourceSlateEntityUrn,
        "operationType": "cut",//copy
        "typeOfElement": "container",//narrative
        "destinationSlateUrn": destnSlateManifestURN,
        "destinationSlateEntityUrn": destnSlateEntityURN
    }
    if (asideData) {
        payload.destinationContainer = { //optional
            "elementTag": asideData.subtype === "worked-example" ? "WE" : "AS",//we - create a function to set
            "type": asideData.type,
            "entityUrn": asideData.contentUrn,
            "hasChild": asideData.id !== parentUrn.manifestUrn ? true : false, //SB/Col1/2/3
            "childType": parentUrn.elementType,//we - create a function to set
            "childEntityUrn": parentUrn.contentUrn,//optional,
        }
        if (asideData?.parent) {
            const { type, multiColumnType, parentContentUrn, columnContentUrn } = asideData.parent
            payload.destinationContainer.destnContainerParent = {
                'elementTag': multiColumnType,
                "type": type,
                "entityUrn": parentContentUrn,
                "hasChild": true, //SB/Col1/2/3
                "childType": columnName,
                "childEntityUrn": columnContentUrn//optional
            }
        }
    }

    console.log('request payload', payload)
    return payload;
}