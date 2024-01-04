import { triggerSlateLevelSave } from "../../../js/slateLevelSave";
import { sendDataToIframe, isOwnerRole, isSubscriberRole, defaultMathImagePath } from "../../../constants/utility";
import { fetchAlfrescoSiteDropdownList } from '../../AlfrescoPopup/Alfresco_Action';
import { hideBlocker } from "../../../js/toggleLoader.js";
import config from "../../../config/config";
import { CHANGE_SLATE_ACTION, RELEASE_SLATE_LOCK_ACTION } from "../../SlateWrapper/SlateWrapperConstants";
import {  ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX, FETCH_LO_FOR_SLATES, FRONT_MATTER, BACK_MATTER, CM_DESCRIPTION } from '../../../constants/Element_Constants.js';

import {
    TocToggle, ELM_CREATE_IN_PLACE, SAVE_ELM_DATA, CLOSE_ELM_PICKER, OpenLOPopup, AddToExternalFrameworkAS
} from '../../../constants/IFrameMessageTypes';
import { LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX } from '../../AssessmentSlateCanvas/AssessmentSlateConstants.js';

/**
 * This function is used to handle the currect selected slate in canvas
 * @param {Object} message | Message from wrapper with current slate details
 * @param {*} props | component props
 * @param {*} showCanvasBlocker | Callback function to handle canvas blocker
 */
export const setCurrentSlate = (message, props, showCanvasBlocker) => {
    config.isSlateLockChecked = false;
    let currentSlateObject = {};
    const projectSubscriptionDetails = {
        isSubscribed: false,
        owner: {}
    }

    if (message?.node?.autoNumberingDetails) {
        props.setTocContainersAutoNumberList(message.node.autoNumberingDetails)
    }
    // reset owner slate popup flag on slate change
    resetOwnerSlatePopupFlag(props);
    if (message['category'] === 'titleChange') {
        config.staleTitle = message?.title ?? '';
        currentSlateObject = {
            title: message.title,
        }
        props.setUpdatedSlateTitle(currentSlateObject)
    }
    if (message && message.node) {
        // To prevent the change slate focus action on browser refresh
        let isRefreshBrowser = localStorage.getItem('browser_refresh');
        if (isRefreshBrowser == '1') {
            localStorage.setItem('browser_refresh', '0');
            // At the time slate versioning prevent trigger slate level save
        } else if (localStorage.getItem('slateNewVersion') === 'true') {
            localStorage.removeItem('slateNewVersion');
        } else {
            triggerSlateLevelSave(config.slateEntityURN, CHANGE_SLATE_ACTION);
        }
        const slateManifest = config.isPopupSlate ? config.tempSlateManifestURN : config.slateManifestURN
        if (props.withinLockPeriod === true) {
            props.releaseSlateLock(config.projectUrn, slateManifest)
            triggerSlateLevelSave(config.slateEntityURN, RELEASE_SLATE_LOCK_ACTION);
        }
        sendDataToIframe({ 'type': 'hideWrapperLoader', 'message': { status: true } })
        sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
        currentSlateObject = {
            title: message.node.unformattedTitle ? message.node.unformattedTitle.en : ''
        }
        showCanvasBlocker(false)
        props.setUpdatedSlateTitle(currentSlateObject)
        config.staleTitle = message.node.unformattedTitle ? message.node.unformattedTitle.en : '';
        config.slateEntityURN = message.node.entityUrn;
        config.slateManifestURN = message.node.containerUrn;
        config.tempSlateManifestURN = null;
        config.tempSlateEntityURN = null;
        config.disablePrev = message.disablePrev;
        config.disableNext = message.disableNext;
        config.slateType = message?.node?.nodeLabel === "assessment-slate" ? "assessment" : message?.node?.nodeLabel;
        config.parentContainerUrn = message.node.ParentContainerUrn;
        config.parentEntityUrn = message.node.ParentEntityUrn;
        config.page = 0;
        config.scrolling = true;
        config.totalPageCount = 0;
        config.fromTOC = true;
        config.tcmslatemanifest = null;
        config.parentLabel = message.node.nodeParentLabel;
        config.parentOfParentItem = message.node.parentOfParentItem
        // checking if selected container is subscribed or not
        if (message?.node?.isSubscribed) {
            projectSubscriptionDetails.isSubscribed = message.node.isSubscribed;
        }
        // calling an action to set project subscription details coming from TOC SPA
        props.setProjectSubscriptionDetails(projectSubscriptionDetails);
        props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
        /* Message from TOC is current Slate is Joined PDF */
        /** ---------------------------------------------- */
        if (message?.node) {
            let matterType = 'bodymatter'
            if (message.node.parentOfParentItem !== "") {
                if (message.node.parentOfParentItem === 'backmatter') {
                    matterType = 'backmatter'
                } else if (message.node.parentOfParentItem === 'frontmatter') {
                    matterType = 'frontmatter'
                }
            } else if (message.node.nodeParentLabel === 'backmatter') {
                matterType = 'backmatter'
            } else if (message.node.nodeParentLabel === 'frontmatter') {
                matterType = 'frontmatter'
            }
            props.setSlateMatterType(matterType);
        }
        config.isPopupSlate = false;
        config.figureDataToBeFetched = true;
        props.fetchAudioNarrationForContainer(slateData)
        props.clearElementStatus()
        props.fetchUsageTypeData('assessment');
        props.fetchSlateData(message.node.containerUrn, config.slateEntityURN, config.page, '', "");
        props.fetchLOBList();
        config.savingInProgress = false
        props.setSlateType(config.slateType);
        props.setSlateEntity(config.slateEntityURN);
        props.setSlateParent(message.node.nodeParentLabel);
        props.glossaaryFootnotePopup(false);
        props.audioGlossaryPopup(false);
        props.savePopupParentSlateData({});
        let apiKeys_LO = {
            'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
            'strApiKey': config.STRUCTURE_APIKEY,
            'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
            'productApiUrl': config.PRODUCTAPI_ENDPOINT,
            'manifestReadonlyApi': config.MANIFEST_READONLY_ENDPOINT,
            'assessmentApiUrl': config.ASSESSMENT_ENDPOINT,
            'structureApiEndpoint': config.AUDIO_NARRATION_URL
        }
        if (config.parentEntityUrn !== FRONT_MATTER && config.parentEntityUrn !== BACK_MATTER && (FETCH_LO_FOR_SLATES.includes(config.slateType))) {
            let externalLFUrn = []
            if (props?.projectLearningFrameworks?.externalLF?.length) {
                props.projectLearningFrameworks.externalLF.map(lf => externalLFUrn.push(lf.urn));
            }
            sendDataToIframe({
                'type': 'getSlateLO', 'message': {
                    projectURN: config.projectUrn, slateURN: config.slateManifestURN,
                    apiKeys_LO, externalLFUrn: externalLFUrn, entityURN: config.slateEntityURN
                }
            })
        }
        else if (config.parentEntityUrn !== FRONT_MATTER && config.parentEntityUrn !== BACK_MATTER && config.slateType == "container-introduction") {
            sendDataToIframe({ 'type': 'getLOList', 'message': { projectURN: config.projectUrn, chapterURN: config.parentContainerUrn, apiKeys_LO } })
        }
    }
    /**
     * TO BE IMPLEMENTED
     *  */
}


/**
 * function to set owner project slate popup flag as true
 */
export const resetOwnerSlatePopupFlag = (props) => {
    const { projectSubscriptionDetails } = props;
    const isOwnerKeyExist = localStorage.getItem('hasOwnerEdit');
    const isSubscribersKeyExist = localStorage.getItem('hasSubscriberView');
    if (isOwnerRole(projectSubscriptionDetails?.sharingContextRole, projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed) && !isOwnerKeyExist) {
        props.isOwnersSubscribedSlate(true);
    } else if (isSubscriberRole(projectSubscriptionDetails?.sharingContextRole, projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed) &&
        !isSubscribersKeyExist) {
        props.isSubscribersSubscribedSlate(true);
    }
}

/**
 * Handle the element update action on linking a page
 */
export const updatePageLink = (linkData, props) => {
    let activeElement, linkNode, linkHTML, editor;
    let linkId = "", elementId = "", pageId = "";
    let linkNotification = '';
    document.getElementById('link-notification').innerText = "";
    if ('link' in linkData && linkData.link == "link" && 'elementId' in linkData &&
        'linkId' in linkData && 'pageId' in linkData && 'pageName' in linkData) {

        linkId = linkData.linkId || "";
        elementId = linkData.elementId || "";
        pageId = linkData.pageId || "";

        var html = linkData.pageName;
        var div = document.createElement("div");
        div.innerHTML = html;
        const pageLinkText = div.innerText
        let elementContainer = document.querySelector('.element-container[data-id="' + linkData.elementId + '"]');
        activeElement = elementContainer.querySelectorAll('.cypress-editable');
        activeElement.forEach((item) => {
            if (item.classList.contains('mce-content-body') || !item.classList.contains('place-holder')) {
                if (item.querySelector(`[asset-id="${linkData.linkId}"]`) || item.querySelector('#' + linkData.linkId)) {
                    tinymce.activeEditor.undoManager.transact(() => {
                        item.focus();
                        editor = item;

                        let elementTag = "";
                        linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) :
                            item.querySelector('#' + linkData.linkId);
                        if (linkNode.classList.contains('sup')) {
                            elementTag = 'sup';
                        } else if (linkNode.classList.contains('sub')) {
                            elementTag = 'sub';
                        }
                        linkHTML = linkNode.innerHTML || '';
                        linkNode.outerHTML = '<abbr title="Slate Link" class="Pearson-Component AssetPopoverTerm ' + elementTag + '" asset-id="' + linkId +
                            '" element-id="' + elementId + '" data-uri="' + pageId + '">' + linkHTML + '</abbr>';
                        if (/(<abbr [^>]*id="page-link-[^"]*"[^>]*>.*<\/abbr>)/gi.test(linkNode.outerHTML)) {
                            linkNotification = "Link updated to slate '" + pageLinkText + "'.";
                        } else {
                            linkNotification = "Link added to slate '" + pageLinkText + "'.";
                        }
                    });
                }
            }
        });
    } else if ('link' in linkData && (linkData.link == "cancel" || linkData.link == "unlink" || linkData.link == "unlinkToc") &&
        'elementId' in linkData && 'linkId' in linkData) {
        let elementContainer = document.querySelector('.element-container[data-id="' + linkData.elementId + '"]');
        activeElement = elementContainer.querySelectorAll('.cypress-editable');
        activeElement.forEach((item) => {
            if (item.classList.contains('mce-content-body') || !item.classList.contains('place-holder')) {
                if (item.querySelector(`[asset-id="${linkData.linkId}"]`) || item.querySelector('#' + linkData.linkId)) {

                    tinymce.activeEditor.undoManager.transact(() => {
                        item.focus();
                        editor = item;
                        linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) :
                            item.querySelector('#' + linkData.linkId);
                        linkHTML = linkNode.innerHTML || '';
                        linkNode.outerHTML = linkHTML;
                        if (linkData.link == "unlink" || linkData.link == "unlinkToc") {
                            props.assetIdForSnapshot(linkData.linkId)
                            linkNotification = "Link removed.";
                        }
                    });
                }
            }
        });
    }

    document.getElementById('link-notification').innerText = linkNotification;
    sendDataToIframe({ 'type': TocToggle, 'message': { "open": false } });

    setTimeout(() => {
        if (editor) {
            editor.click();
            editor.blur();
        }
    }, 500);
}

/**
 * This function is used to handle the project details
 * @param {Object} message | Message from wrapper with project detai;s
 * @param {Object} props | Component Props
 */
export const handleProjectDetails = (message, props) => {
    config.tcmStatus = (message.tcm && message.tcm.activated == true ? true : undefined);
    config.userId = message['x-prsn-user-id'].toLowerCase();
    config.userName = message['x-prsn-user-id'].toLowerCase();
    config.ssoToken = message.ssoToken;
    config.myCloudProxySession = message.myCloudProxySession;
    config.projectUrn = message.id;
    config.citeUrn = message.citeUrn;
    config.isCypressPlusEnabled = message.isCypressPlusEnabled;
    config.projectEntityUrn = message.entityUrn;
    config.alfrescoMetaData = message;
    if (message?.alfresco?.repositoryFolder) {
        let alfrescoRepository = message.alfresco.repositoryFolder?.split('/')?.[0] || message.alfresco.repositoryFolder
        config.alfrescoMetaData.alfresco.repositoryFolder = alfrescoRepository
        if (message?.alfresco?.siteId) config.alfrescoMetaData.alfresco.siteId = alfrescoRepository
        fetchAlfrescoSiteDropdownList('projectAlfrescoSettings')
    }
    props.cypressPlusEnabled(message.isCypressPlusEnabled, config.SHOW_CYPRESS_PLUS,)
    config.book_title = message.name;
    props.fetchAuthUser()
    props.fetchLearnosityContent()

    // call get project api here
    props.getProjectDetails()
    props.fetchProjectLFs()
    props.fetchDefaultLF(message.defaultLearningFramework)
}

/**
 * Sending required project permission parent App
 * @param {Object} props 
 */
export const sendingPermissions = (props) => {
    /**
     * TO BE VERIFIED
     *  */
    let permissionObj = props.currentProject || null;
    if (permissionObj === null) {
        permissionObj = {};
        if (props.permissions) {
            const {permissions} = props
            const tocEditTitle = permissions.includes('toc_edit_title') ? 'toc_edit_title' : ""
            const tocDelete = permissions.includes('toc_delete_entry') ? 'toc_delete_entry' : ""
            const tocRearrage = permissions.includes('toc_rearrange_entry') ? 'toc_rearrange_entry' : ""
            const tocAdd = permissions.includes('toc_add_pages') ? 'toc_add_pages' : ""
            const unlinkContent = permissions.includes('unlink_content_from_TOC') ? 'unlink_content_from_TOC' : ""
            permissionObj.permissions = [tocEditTitle, tocDelete, tocRearrage, tocAdd, unlinkContent]
        }
        permissionObj.roleId = props.roleId;
    }


    sendDataToIframe({
        'type': 'Permissions',
        'message': { 'permissions': permissionObj.permissions, 'roleName': permissionObj.roleId }
    });
}

/**
  * This method handles all transactions from Elm Picker SPA
  * @param {*} message | message received from wrapper
  * @param {Object} props | Component Props
  * @param {Function} showCanvasBlocker | Callback function to handle canvas blocker
  */
export const handleElmPickerTransactions = (message,props,showCanvasBlocker) => {
    
    if (message?.dataToSend?.type) {
        switch (message.dataToSend.type) {
            case ELM_CREATE_IN_PLACE:
            case SAVE_ELM_DATA:
                props.setElmPickerData(message.dataToSend);
                break;
            case CLOSE_ELM_PICKER:
            default:
                props.setElmPickerData({})
                break;
        }
        showCanvasBlocker(false)
    } else {
        props.setElmPickerData({})
    }
    hideBlocker()
}

/**
 * This function is used to handle the data from alfresco
 * @param {Object} message | Message from Wrapper with Selected Alfresco asset data
 * @param {Object} props | Parent component props
 */
export const handleSelectedAlfrescoData = (message,props) => {
    //Check if message.asset is array
    if (message.asset && Array.isArray(message.asset) && message.asset?.length > 0) {
        message.asset = message.asset[0]
    }
    else if (message.assets && Array.isArray(message.assets) && message.assets?.length > 0) {
        message.asset = message.assets[0]
    }
    if (props?.alfrescoReducer?.savedElement) {
        message = {
            ...message,
            ...props.alfrescoReducer?.savedElement,
            isEditor: props.alfrescoReducer.savedElement?.editor ?? undefined
        }
        let changedSiteUrl = false, changedAlfrescoData = {}
        if (message.site && Object.keys(message.site)?.length > 0) {
            const projectAlfrescoNodeRef = props.alfrescoReducer?.savedElement?.citeNodeRef ?? ""
            if (message.site?.citeNodeRef !== projectAlfrescoNodeRef) {
                changedSiteUrl = true
                changedAlfrescoData = {
                    guid: message.site?.citeNodeRef,
                    title: message.site?.title,
                    id: message.site?.citeName,
                    visibility: message.site?.visibility
                }
            }
            message = {
                ...message,
                changedSiteUrl,
                changedAlfrescoData
            }
        }
    }
    message.launchAlfrescoPopup = false
    console.log('Message from Alfresco', message)
    if (message.isEditor) {
        handleEditorSave(message,props)
    }
    if (message.calledFrom === "NarrativeAudio" || message.calledFromGlossaryFootnote) {
        handleAudioData(message,props)
    }
    if (message.calledFrom === "GlossaryImage" || message.calledFromImageGlossaryFootnote) {
        handleImageData(message,props)
    }
    // Making condition true for triggering slate level save api
    localStorage.setItem('isChangeInSlate', 'true');
    props.saveSelectedAssetData(message)
}
/**
 * This method is used to save inline alfresco image
 * @param {Object} message | Message from Wrapper 
 * @param {Object} props | Parent component props 
 */
const handleEditorSave = (message,props) => {
    let params = {
        element: message.id,
        editor: props.alfrescoEditor,
        asset: message.asset,
        launchAlfrescoPopup: false,
        isInlineEditor: message.isEditor,
        imageArgs: props.imageArgs
    }
    props.saveInlineImageData(params);
    hideBlocker();
}

/**
 * This method is used to add Slate Audio
 * @param {Object} message | Message from wrapper
 * @param {*} props | Parent component props
 */
const handleAudioData = (message,props) => {
    let imageData = message.asset;
    let figureType = imageData?.content?.mimeType?.split('/')[0]
    let smartLinkAssetType = imageData?.properties[CM_DESCRIPTION] && (typeof (imageData.properties[CM_DESCRIPTION]) == "string") ?
        imageData.properties[CM_DESCRIPTION].includes('smartLinkType') ?
            JSON.parse(imageData.properties[CM_DESCRIPTION]).smartLinkType : "" : "";
    if (figureType == "audio" || smartLinkAssetType?.toLowerCase() == "audio") {
        props.saveDataFromAlfresco(message);
        let payloadObj = {
            asset: {},
            id: ''
        }
        props.saveSelectedAssetData(payloadObj);
        hideBlocker();
    } else {
        props.showWrongAudioPopup(true);
    }
}

/**
 * handle Glossary Image Data
 */
const handleImageData = (message,props) => {
    let imageData = message.asset;
    let figureType = imageData?.content?.mimeType?.split('/')[0]
    if (figureType == "image") {
        props.saveImageDataFromAlfresco(message);
        let payloadObj = {
            asset: {},
            id: ''
        }
        props.saveSelectedAssetData(payloadObj);
        hideBlocker();
    } else {
        props.showWrongImagePopup(true);
    }
}

/**
 * This function is used to launch LO picker for assessment slates
 * @param {Object} message | Message from Wrapper for assessment LO popup
 * @param {Object} props | component props
 */
export const getAssessmentForWillowAlignment = (message,props) => {
    const { currentSlateLOData, projectLearningFrameworks, currentSlateLF, defaultLF } = props
    let slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    let apiKeys_LO = {
        'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
        'strApiKey': config.STRUCTURE_APIKEY,
        'productApiUrl': config.PRODUCTAPI_ENDPOINT,
        'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
        'assessmentApiUrl': config.ASSESSMENT_ENDPOINT,
        'myCloudProxySession': config.myCloudProxySession,
        'manifestReadonlyApi': config.MANIFEST_READONLY_ENDPOINT,
        'structureApiEndpoint': config.AUDIO_NARRATION_URL
    };
    let externalLFUrn = [];
    if (projectLearningFrameworks?.externalLF?.length) {
        projectLearningFrameworks.externalLF.map(lf => externalLFUrn.push(lf.urn));
    }
    let assessmentuRN = "";
    let assessmentType = "";
    let assessmentTypeLO = "";
    if (config.slateType === 'assessment' && document.getElementsByClassName("slate_assessment_data_id_lo").length) {
        assessmentuRN = document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
        assessmentType = document.getElementsByClassName("slate_assessment_data_format_lo")[0].innerText;
    }
    switch (assessmentType) {
        case TDX:
            assessmentTypeLO = ASSESSMENT_ITEM_TDX
            break;
        case CITE:
        case LEARNING_TEMPLATE:
        case PUF:
        case LEARNOSITY:
        default:
            assessmentTypeLO = ASSESSMENT_ITEM
            break;
    }
    let previewData = {
        previewUrl: config.PREVIEW_ASSESSMENT_LO_ENDPOINT,
        bookId: config.citeUrn,
        assessmentUrn: assessmentuRN,
        assessmentType: assessmentTypeLO,
        projectEntityUrn: config.projectEntityUrn
    }
    sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
    sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } });
    sendDataToIframe({
        'type': OpenLOPopup,
        'message': {
            'text': AddToExternalFrameworkAS,
            'data': currentSlateLOData,
            'isLOExist': true,
            'selectedLOs': currentSlateLOData,
            'apiConstants': message.apiKeys_LO ?? apiKeys_LO,
            'externalLFUrn': externalLFUrn,
            'currentSlateId': slateManifestURN,
            'currentSlateLF': currentSlateLF,
            'assessmentUrn': message.assessmentUrn ? message.assessmentUrn : assessmentuRN,
            'previewData': previewData,
            'defaultLF': defaultLF,
            'loSpa_Source': message.loSpa_Source,
            'isSubscribed': message.isSubscribed ? message.isSubscribed : false,
            'isApprovedSlate': message.isApprovedSlate,
            'entityURN': message.entityURN,
            'isSlateLocked': message?.isSlateLocked
        }
    })
}