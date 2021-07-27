import {
    ASIDE,
    MULTI_COLUMN,
    POPUP_ELEMENT,
    WORKED_EXAMPLE,
} from './TcmConstants';

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
        parentUrn,
        oldElementId
    } = pasteParams
    let payload = {
        "elementUrn": elementId,
        "elementEntityUrn": selection.element.contentUrn,
        "type": elementType,
        "elementTag": elementTag[elementType],
        "projectUrn": projectUrn,
        "sourceSlateUrn": selection.sourceSlateManifestUrn,
        "sourceSlateEntityUrn": selection.sourceSlateEntityUrn,
        "operationType": "cut",//copy
        "typeOfElement": "container",//narrative
        "sourceElementIndex": selection.sourceElementIndex?.toString(),
        "destinationSlateUrn": destnSlateManifestURN,
        "destinationSlateEntityUrn": destnSlateEntityURN
    }
    if(oldElementId !== elementId){
        payload["oldElementUrn"] = selection.element.id
    }
    if (asideData) {
        payload["destinationContainer"] = { //optional
            "type": asideData.type,
            "versionUrn": asideData.id,
            "entityUrn": asideData.contentUrn,
            "hasChild": asideData.id !== parentUrn.manifestUrn ? true : false, //SB/Col1/2/3
            "childType": parentUrn.elementType,
            "childVersionUrn": parentUrn.manifestUrn,
            "childEntityUrn": parentUrn.contentUrn,//optional,
        }
        if (asideData?.parent) {
            const { id, columnId, type, columnName, parentContentUrn, columnContentUrn } = asideData.parent
            payload.destinationContainer.destnContainerParent = {
                "type": type,
                "versionUrn": id,
                "entityUrn": parentContentUrn,
                "hasChild": true, //SB/Col1/2/3
                "childType": columnName,
                "childVersionUrn": columnId,
                "childEntityUrn": columnContentUrn//optional
            }
        }
        const tagPrefixParams = {
            type,
            asideData,
            parentUrn,
            destinationContainer: payload?.destinationContainer
        }
        const elementTagPrefix = prepareTagPrefix(tagPrefixParams)
        payload["destinationContainer"]["ContainerTag"] = elementTagPrefix
    }
    console.log('from cutcopysnapshots request payload ', payload)
    return JSON.parse(JSON.stringify(payload));
}

export const prepareTagPrefix = (parentData) => {
    let prefixTag = ""
    const { asideData, parentUrn, destinationContainer } = parentData;
    if (asideData) {
        const parentTag = setParentTag(asideData.element);
        const childType = destinationContainer?.hasChild ? destinationContainer.childType : undefined
        if (childType) {
            const childTag = setChildTag(parentUrn)
            prefixTag = parentTag + ":" + `${childTag ?? ""}` + prefixTag
        }
        else {
            prefixTag = parentTag
        }
        if (asideData?.parent) {
            const { columnName, multiColumnType } = asideData.parent
            const grandParentTag = multiColumnType + ":" + columnName
            prefixTag = grandParentTag + ":" + prefixTag
        }
    }
    console.log('prefixTag',prefixTag)
    return prefixTag
}

const setParentTag = (element) => {
    switch (element.type) {
        case ELEMENT_ASIDE:
            return elementTag[element.subtype === WORKED_EXAMPLE ? WORKED_EXAMPLE : ASIDE];
        case MULTI_COLUMN:
            return parentUrn.multiColumnType
        case POPUP_ELEMENT:
        default:
            return elementTag[element.type];
    }
}

const setChildTag = (parentElement) => {
    switch (parentElement.elementType) {
        case WE_MANIFEST:
            return elementTag[WE_MANIFEST];
        case MULTI_COLUMN_GROUP:
            return parentElement.columnName
        case ELEMENT_ASIDE:
        default:
            return elementTag['WE_HEAD']
    }
}

const elementTag = Object.freeze({
    'popup': 'POP',
    'aside': 'AS',
    'manifest': 'BODY',
    'workedexample': 'WE',
    'WE_HEAD': 'HEAD'
})