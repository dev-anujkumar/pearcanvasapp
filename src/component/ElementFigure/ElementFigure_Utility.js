/**Imports */
import { checkHTMLdataInsideString, hasReviewerRole, sendDataToIframe } from '../../constants/utility';
import config from '../../config/config';
import { BLOCK_CODE, MATH_ML } from './ElementFigure_Constants';

export const getLabelClass = (elementType, props) => {
    let labelClass
    let { preformattedText } = props?.figureTypeData?.figureHtmlData
    switch (elementType) {
        case MATH_ML:
            labelClass = checkHTMLdataInsideString(props?.model?.html?.text) ? "transition-none" : "floating-math-content"
            break;
        case BLOCK_CODE:
        default:
            labelClass = (preformattedText === '' || preformattedText == undefined) ? "floating-code-content" : "transition-none";
    }
    return labelClass
}

export const launchTableSPA = (elementId, parentEntityUrn, sectionType, handleFocus) => {
    let editable = true;
    if (hasReviewerRole()) {
        editable = false;
    }
    handleFocus()
    let slateData = {
        elementId: elementId,
        currentProjectId: config.projectUrn,
        slateEntityUrn: config.slateEntityURN,
        parentEntityUrn: parentEntityUrn,
        sectionType: sectionType || "bodymatter"
    }
    let tableConfig = {
        S3MathImagePath: config.S3MathImagePath ? config.S3MathImagePath : "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/",
        alfrescoMetaData: config?.alfrescoMetaData ?? {},
        CMDS_APIKEY: config.CMDS_APIKEY,
        CMDS_DATABASE: config.CMDS_DATABASE,
        CMIS_REPO: config.CMIS_REPO,
        CMDS_AUTHORIZATION: config.CMDS_AUTHORIZATION,
        EPS_API: config.EPS_API,
        PROJECTAPI_ENDPOINT: config.PROJECTAPI_ENDPOINT,
        STRUCTURE_APIKEY: config.STRUCTURE_APIKEY,
        AlfrescoSiteAPIUrl: config.ALFRESCO_EDIT_METADATA,
        
    }
    const configAPIKey = JSON.parse(JSON.stringify(tableConfig));
    sendDataToIframe({ 'type': 'launchTableSPA', 'message': {}, "id": elementId, editable, slateData, configAPIKey });
}
