import React from 'react';
import { addAudioNarrationForContainer } from './AudioNarration_Actions'
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker } from '../../js/toggleLoader'
import { c2MediaModule } from '../../js/c2_media_module';
import config from '../../config/config';

class AddAudioBook extends React.Component {

    constructor(props) {
        super(props);
    }

    processConfirmation = () => {
        this.props.closeAddAudioBook();
        this.handleC2MediaClick(this)
    }

    dataFromAlfresco = (data) => {
        let imageData = data;
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";

        if (figureType === "audio") {
            let smartLinkAssetType = (typeof (data.desc) == "string") ? data.desc.includes('smartLinkType') ? JSON.parse(data.desc).smartLinkType : "" : "";
            if (data.desc && (data.desc.smartLinkType == "Audio" || data.assetType == "audio" || smartLinkAssetType == "Audio")) {
                let audioData = {
                    "narrativeAudioUrn": data.uniqueID || "",
                    "location": data.smartLinkURl,
                    "title": {
                        "en": data.displayName || data.displayTitle
                    },
                    "format": data.mimetype
                }
                this.props.addAudioNarrationForContainer(audioData);
                hideTocBlocker();
                // enableHeaderCanvas();
                return false;
            }
            //  else if (audioNarration == "audioNarration") {
            //     console.log("Selected Alfresco Media type is not an audio.")
            //     vex.dialog.alert("Selected alfresco media type is not an Audio.");
            //     hideTocBlocker();
            //     enableHeaderCanvas();
            //     return false;
            // }

        }
    }
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
        let that = this;
        c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
        // this.props.handleFocus();
        // if (e.target.tagName.toLowerCase() === "p") {
        //     e.stopPropagation();
        //     return;
        // }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;

        if (alfrescoPath && alfrescoPath.nodeRef) {         //if alfresco location is available
            data_1 = alfrescoPath;
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

            this.handleC2ExtendedClick(data_1)

        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                c2MediaModule.onLaunchAddAnAsset(function (data_1) {                                                                           // alfresco location is not assigned to project
                    c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                        c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                            that.dataFromAlfresco(data);
                        })
                    })
                })
            }
        }

    }

    // processClose = () => {
    //     this.props.closeAddAudioBook();
    //     // enableHeaderCanvas();
    //     hideTocBlocker();
    // }

    shouldComponentUpdate() {
        return false;
    }

    openConfirmationBox = (e) => {
        let that = this
        // disableHeaderCanvas();
        showTocBlocker();
        that.processConfirmation();
    }

    render = () => {
        return (
            <div>
                {this.openConfirmationBox()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio,
        openRemovePopUp: state.audioReducer.openRemovePopUp
    }
}

const mapActionToProps = {
    addAudioNarrationForContainer
}

export default connect(mapStateToProps, mapActionToProps)(AddAudioBook);