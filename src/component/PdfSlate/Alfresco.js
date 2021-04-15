import axios from "axios";
import config from "../../config/config";
import { hasReviewerRole } from "../../constants/utility";
import { c2MediaModule } from "../../js/c2_media_module";
import { disableHeader, hideTocBlocker } from "../../js/toggleLoader";

let projectMetadata;

/**
    * @description data after selecting an asset from alfresco c2 module
    * @param {*} data selected asset data
    */
export const dataFromAlfresco = (data, props, alfrescoSiteData) => {
    hideTocBlocker();
    disableHeader(false);
    let imageData = data;
    let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";              //commented lines will be used to update the element data
    let figureType = imageData['assetType'] ? imageData['assetType'] : "";
    let width = imageData['width'] ? imageData['width'] : "";
    let height = imageData['height'] ? imageData['height'] : "";

    if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {

        let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
        let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
        let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
        if (epsURL !== "") {
            this.setState({ imgSrc: epsURL })
        } else {
            this.setState({ imgSrc: DEFAULT_IMAGE_SOURCE })
        }

        let scaleMarkerData = {};
        Object.assign(scaleMarkerData, (data && data.scalemarker && data.scalemarker.properties) ? { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.scalemarker.properties["d.cmis:versionSeriesId"].value || null } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.scalemarker.properties["t.cmis:name"].value || "The alttext for the scale image" } : null,
            (data && data.scalemarker && data.scalemarker.EpsUrl) ? { "path": data.scalemarker.EpsUrl || null } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "height": data.scalemarker.properties["e.exif:pixelXDimension"].value || null } : null,
            (data && data.scalemarker && data.scalemarker.properties && data.scalemarker.properties["e.exif:pixelYDimension"]) ? { "width": data.scalemarker.properties["e.exif:pixelYDimension"].value || null } : null,
        );

        let setFigureData = {
            path: epsURL,
            height: height,
            width: width,
            schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            imageid: `urn:pearson:alfresco:${uniqID}`,
            alttext: altText,
            longdescription: longDesc,
            type: figureType,
        }
        
        Object.assign(setFigureData, (Object.keys(scaleMarkerData).length > 0) ? { scaleimage: scaleMarkerData } : null);

        props.updateFigureData(setFigureData, props.index, props.elementId, () => {
            props.handleFocus("updateFromC2")
            props.handleBlur()
        })
        const data = config?.alfrescoMetaData?.alfresco;
        let alfrescoSiteLocation = alfrescoSiteData
        if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')){
            handleAlfrescoSiteUrl(props.elementId, data)
        }
        this.updateAlfrescoSiteUrl()
    }
}
/**
    * @description Open C2 module with predefined Alfresco location
    * @param {*} locationData alfresco locationData
    */
export const handleC2ExtendedClick = (locationData, props, alfrescoSiteData) => {
    //const alfrescoSiteData = config.alfrescoSiteData;
    
    let data_1 = locationData; 
   
    !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
        c2MediaModule.AddanAssetCallBack(data_2, function (data) {
            dataFromAlfresco(data, props, alfrescoSiteData);
        })
    })

}
/**
    * @description function will be called on image src add and fetch resources from Alfresco
    */
export const handleC2MediaClick = (props, alfrescoSiteData) => {
    props.handleFocus();
    if (hasReviewerRole()) {
        return true
    }

    //const figureDataObj = props.model.figuredata;
    //const currentAsset = figureDataObj ? {
    //    id: figureDataObj.imageid.split(':').pop(), // get last
    //    type: figureDataObj.type,
    //} : null;

    const currentAsset = {
        id: "e2b1710e-a000-4625-b582-367261a2cd0e",
        type: "image"
    };

    let alfrescoPath = config.alfrescoMetaData;
    if (alfrescoPath && projectMetadata) {
        alfrescoPath.alfresco = projectMetadata.alfresco;
    }
    var data_1 = false;
    if(alfrescoPath?.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
    if (alfrescoPath.alfresco?.nodeRef) {         //if alfresco location is available
        if (props?.permissions.includes('add_multimedia_via_alfresco')) {
            data_1 = alfrescoPath.alfresco;
            data_1.currentAsset = currentAsset;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            handleC2ExtendedClick(data_1, props, alfrescoSiteData)
        }
        else {
            props.accessDenied(true)
        }

    }} else {
        if (props.permissions.includes('alfresco_crud_access')) {
            c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                data_1 = {
                    ...alfrescoData,
                    currentAsset: currentAsset,
                };

                let request = {
                    eTag: alfrescoPath.etag,
                    projectId: alfrescoPath.id,
                    ...alfrescoPath,
                    additionalMetadata: { ...alfrescoData },
                    alfresco: { ...alfrescoData }
                };

                /*
                    preparing data according to Project api
                */

                request.additionalMetadata['repositoryName'] = data_1['repoName'];
                request.additionalMetadata['repositoryFolder'] = data_1['name'];
                request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                request.alfresco['repositoryName'] = data_1['repoName'];
                request.alfresco['repositoryFolder'] = data_1['name'];
                request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                request.alfresco['visibility'] = data_1['siteVisibility'];

                handleC2ExtendedClick(data_1, props, alfrescoSiteData);
                /*
                    API to set alfresco location on dashboard
                */
                let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                let SSOToken = request.ssoToken;
                return axios.patch(url, request.alfresco,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'ApiKey': config.STRUCTURE_APIKEY,
                            'Content-Type': 'application/json',
                            'PearsonSSOSession': SSOToken,
                            'If-Match': request.eTag
                        }
                    })
                    .then(function (response) {
                        let tempData = { alfresco: alfrescoData };
                        //that.setState({
                        //    projectMetadata: tempData
                        //})
                        projectMetadata = tempData;
                    })
                    .catch(function (error) {
                        console.log("error", error)
                    });
            })
        } else {
            props.accessDenied(true)
        }
    }

}