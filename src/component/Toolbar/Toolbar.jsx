import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';

import '../../styles/Toolbar/Toolbar.css';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css'
import SlateTagDropdown from '../ElementMetaDataAnchor/SlateTagDropdown.jsx';

import { toggleUnlockSlateAction } from './Toolbar_Actions.js';
import { slateTagDisable, slateTagEnable, audioNarration, audioNarrationEnable, collapseHeader, expandHeader, searchIcon,
    searchClose, searchUp, searchDown } from '../../images/TinyMce/TinyMce.jsx';
import { checkSlateLock } from '../../js/slateLockUtility.js'
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx';
import { hasReviewerRole, isOwnerRole, isSlateLocked, isSubscriberRole, sendDataToIframe, showNotificationOnCanvas } from '../../constants/utility.js';
import SearchComponent from './Search/Search.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { slateVersioning } from '../SlateWrapper/SlateWrapper_Actions';
import { MOVED_TO_WIP } from '../../constants/Element_Constants';
import { ShowLoader } from '../../constants/IFrameMessageTypes';
import { ALLOWED_SLATES_IN_RC, APPROVED_BANNER_MESSAGE1, APPROVED_BANNER_MESSAGE2, EDIT_CONTENT_BTN, LOCKED_BANNER_MESSAGE, SLATES_DEFAULT_LABEL,
        SUBSCRIBER_BANNER_MESSAGE, IN_PROGRESS_IMPORT_STATUS } from '../SlateWrapper/SlateWrapperConstants';
import Button from '@mui/material/Button';

const _Toolbar = props => {
    const { isToolBarBlocked,roleId } = props;
    const [lodropdown, setLODropdown] = useState(false);
    const [addDropDown, setValueAdd] = useState(false);
    const [openDropDown, setValueOpen] = useState(false);
    const [showHeader, setHeaderValue] = useState(true);
    const [UrnSearch, searchToggle] = useState(false);
    const slateStatus = props?.slateLevelData[config.slateManifestURN]?.status
    const popupSlate = (props?.slateLevelData[config.slateManifestURN]?.type === "popup")
    let searchInputRef = useRef();

    useEffect(() => {
        setLODropdown(false);
        hideSlateTagIcon()
      }, [props.setSlateEntity, props.setSlateParent]);

    useEffect(() => {
        changeAudioNarration()
    }, [props.openAudio ,props.addAudio])

    /**
    * Function for show/hide slate tag icon
    */
    function hideSlateTagIcon() {
        if (document.getElementsByClassName("slate-tag-icon").length) {
            document.getElementsByClassName("slate-tag-icon")[0].style.display = "block";
        }
    }

    /**
     * Function for unlock slate button action
     */
    const handleUnlockClick = (e) => {
        props.toggleUnlockSlateAction(true)
    }

    /**
  * Function for show/hide audio Narration icon
  */

    function changeAudioNarration() {
            if (document.querySelector('.audio')) {
                document.querySelector('.audio').style.display = "block";
            }
    }

    /**
     * Function for show/hide audio Narration dropdown
     */
    function _handleAddDropdown() {
        setValueAdd(!addDropDown);
    }
    /**
     * Function for show/hide alfresco for audio Narration
     */
    function _handleOpenDropdown() {
        setValueOpen(!openDropDown);
    }

    /**
     * Function for show/hide dropdown
     */
    function _handleLODropdown() {
        setLODropdown(!lodropdown);
    }
    function closeLODropdown() {
        setLODropdown(!lodropdown);
    }

    /**
     * Function for handling audio Narration dropdown
     */

    function closeAudioBookDialog() {
        setValueOpen(!openDropDown);
    }

    function closeAddAudioBook() {
        setValueAdd(!addDropDown);
    }

    /**
     * Function for show/hide header
     */
    function showHideHeader() {
        setHeaderValue(!showHeader);
        sendDataToIframe({ 'type': 'collapseHeader', 'message': !showHeader});
    }
    let accessToolbar = (props.permissions && props.permissions.includes('access_formatting_bar')) ? "" : " disableToolbar"

    /**
     * Functiona for search box toggle
     */
    function handleSearchToggle(e, status = false) {
        e.stopPropagation();
        searchToggle(status);
        if(status) {
            searchInputRef.current.focus();
        }
    }

    const approveNormalSlate  = async () =>{
        let updateRCSlate = false;
        // In this condition, we are setting a flag to identify whether we need to
        // update slate after versioning in Resource collection, this flag is used by newversion wrapper API
        // updateRCSlate = true (update slate in RC using VCS API at backend)
        //updateRCSlate = false (Do not update slate in RC)
        if(ALLOWED_SLATES_IN_RC.includes(config.slateType) && !popupSlate) {
            updateRCSlate = true
        }
        const slateLabel = props.slateTocLabel[config.slateType] ?? SLATES_DEFAULT_LABEL[config.slateType]
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        const isOwnerSubscribedSlate = isOwnerRole(props.projectSubscriptionDetails.projectSharingRole, props.projectSubscriptionDetails.projectSubscriptionDetails.isSubscribed)
        const approveToWipStatus = await props.slateVersioning(updateRCSlate, isOwnerSubscribedSlate)
        if(approveToWipStatus) {
        showNotificationOnCanvas(`${slateLabel} ${MOVED_TO_WIP}`)
        changeAudioNarration()
        }
    }

    let searchElm = UrnSearch;
    let searchTerm = props.searchUrn || '';
    if(config.isPopupSlate) {
        searchElm = false;
        searchTerm = '';
    }
    const isReviewerRole = (roleId === 'comment_only')
    const isSubscribed = isSubscriberRole(props.projectSubscriptionDetails.projectSharingRole, props.projectSubscriptionDetails.projectSubscriptionDetails.isSubscribed)
    const slatePublishStatus = (slateStatus === "approved") && !popupSlate && !isReviewerRole
    const setPopUpSlateLOstatus = props?.slateLevelData?.[config.slateManifestURN]?.type === "popup" && props?.slateLevelData?.[config.slateManifestURN]?.status === "approved" &&
    config.tempSlateManifestURN  && props?.slateLevelData?.[config.tempSlateManifestURN]?.status === "approved";
    const isApprovedCondition = (slatePublishStatus && !config.isCypressPlusEnabled && !isReviewerRole);
    const isLockedSlate = isSlateLocked();
    const bannerClass = isSubscribed ? 'read-only-banner' : (isApprovedCondition || isLockedSlate) ? 'approved-banner' : 'banner';
    const isReadOnly = (isApprovedCondition || isLockedSlate) ? 'hideToolbar' : ''
    const toolbarClass = (isSubscribed || isApprovedCondition || isLockedSlate) ? 'subscribe-approved-container' : 'toolbar-container'
    const separatorClass = isSubscribed || isApprovedCondition ? 'separatorClass' : ''
    const lockedByUser = props.slateLockInfo ? props.slateLockInfo.firstName !== "" ? `${props.slateLockInfo.lastName}, ${props.slateLockInfo.firstName}` :
    `${props.slateLockInfo.userId}` : ""
    const importStatus = props.importDataFromResponse?.importStatus === IN_PROGRESS_IMPORT_STATUS
    return (
        <div className={bannerClass}>
            <div className={toolbarClass}>

            {/* ************** isSubscriber ************** */}
            { isSubscribed ?
            <div className='toolbar-text'>
                <VisibilityIcon />
                <div className='read-only'>{SUBSCRIBER_BANNER_MESSAGE}</div>
            </div> :
            isApprovedCondition ?
            <div className='toolbar-text'>
                <VisibilityIcon />
                <div className='read-only'>{APPROVED_BANNER_MESSAGE1} </div>
                <p className='toolbar-para-text'>{APPROVED_BANNER_MESSAGE2}</p>
                <button variant="outlined" color="primary" className="edit-content-btn" onClick={approveNormalSlate}>
                    {EDIT_CONTENT_BTN}
                </button>
            </div> :
            (checkSlateLock(props.slateLockInfo)) ?
            <div className='toolbar-text'>
                <LockIcon />
                <div><span className='read-only'>{LOCKED_BANNER_MESSAGE} </span><span className='locked-user'>by {lockedByUser} </span>
                {roleId === 'admin' &&
                <Button className="lock-button" variant="outlined"  onClick={handleUnlockClick}>Unlock Slate</Button>
                }
                </div>
            </div> : '' }

                <div className={`header ${isToolBarBlocked} ${accessToolbar} ${isReadOnly}`} id="tinymceToolbar"></div>
                {/* ***********************Slate Tag in toolbar******************************************** */}
                {config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && props.slateType !== "container-introduction" &&
                !config.parentOfParentItem &&
                    <div className={props?.isLOExist ? "leaningobjective-block" : `leaningobjective-block ${isToolBarBlocked}`}>
                        <div className="learningobjectiveicon">
                            <div className={`learningobjectiveicon slate-tag-icon ${(hasReviewerRole()  && !props.isLOExist) ? "disable" : ""}`}
                            title="Slate Tag" onClick={_handleLODropdown}>
                                {props.isLOExist ? slateTagEnable : slateTagDisable}
                            </div>
                            {lodropdown &&
                                <SlateTagDropdown permissions={props.permissions} currentSlateLOData={props.currentSlateLOData}
                                lastAlignedExternalLO={props.lastAlignedExternalLO} handleLODropdown={_handleLODropdown} closeLODropdown={closeLODropdown}
                                showCanvasBlocker={props.showCanvasBlocker} projectSubscriptionDetails = {props.projectSubscriptionDetails}
                                slatePublishStatus={slatePublishStatus} setPopUpSlateLOstatus={setPopUpSlateLOstatus}/>
                            }
                        </div>
                    </div>
                }

                {/* ***********************Audio Narration in toolbar******************************************** */}
                {   /* Add Audio if there is no audio exists in slate */
                    (props.addAudio && (!isReviewerRole || !isSubscribed) && !importStatus) &&
                    <div className={isToolBarBlocked ? `audio-block ${accessToolbar} ${isToolBarBlocked}` : `audio-block ${accessToolbar}`}>
                        <div className="audioicon">
                            <div className={`audio audioicon ${(config.isCypressPlusEnabled || (slateStatus === 'approved' && !popupSlate)) ? 'disable-audio' : ''}`}
                            title="Audio Tag" onClick={() => {
                                if (checkSlateLock(props.slateLockInfo)) {
                                    return false
                                }
                                else {
                                    _handleAddDropdown()
                                }
                            }}>
                                {audioNarration}
                            </div>

                            {addDropDown && <AddAudioBook closeAddAudioBook={closeAddAudioBook} />}
                        </div>
                    </div>
                }
                {
                    // for Enabling the audio Narration icon
                    /* Open Audio if already exists in slate */
                    (props.openAudio) &&
                    <div className="audio-block">
                        <div className="audioicon">
                            <div className={`audio audioicon ${(config.isCypressPlusEnabled || (slateStatus === 'approved' &&
                            !props.openAudio && !popupSlate)) ? 'disable-audio' : ''}`} title="Audio Tag" onClick={() => {
                                if (checkSlateLock(props.slateLockInfo)) {
                                    return false
                                }
                                else {
                                    _handleOpenDropdown()
                                }
                            }}>
                                {audioNarrationEnable}
                            </div>
                            {openDropDown && <OpenAudioBook closeAudioBookDialog={closeAudioBookDialog}
                            projectSubscriptionDetails = {props.projectSubscriptionDetails} slatePublishStatus = {slatePublishStatus} />}
                        </div>
                    </div>
                }
                {/* *****end**** */}
            </div>
            {/* ***********************Collapse Header******************************************** */}
            <div className="side-icons">
                {<div className={`icon search-urn ${separatorClass}`} onClick={e => { handleSearchToggle(e, true) }}>
                    {searchIcon}
                    <SearchComponent
                        search={searchElm}
                        searchInputRef={searchInputRef}
                        searchTerm={searchTerm}
                        onClose={handleSearchToggle}
                        icons={{ searchClose, searchUp, searchDown }}
                    />
                </div>}
                <div className="icon collapse-header" onClick={() => { showHideHeader() }}>
                    {showHeader ? collapseHeader : expandHeader}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        permissions: state.appStore.permissions,
        currentSlateLOData: state.metadataReducer.currentSlateLOData,
        slateType: state.appStore.slateType,
        setSlateEntity: state.appStore.setSlateEntity,
        isLOExist: state.metadataReducer.slateTagEnable,
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio,
        setSlateParent: state.appStore.setSlateParent,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        searchUrn: state.searchReducer.searchTerm,
        slateLevelData: state.appStore.slateLevelData,
        roleId:state.appStore.roleId,
        slateTocLabel:state.projectInfo.slateTocLabel,
        importDataFromResponse: state.appStore.importDataFromResponse
    }
}

const mapActionToProps = (dispatch) =>{
    return{
        checkSlateLock: (payloadObj) => {
            dispatch(checkSlateLock(payloadObj))
        },
        slateVersioning: (payloadObj, isOwnerSubscribedContainer) => {
            dispatch(slateVersioning(payloadObj, isOwnerSubscribedContainer))
        },
        toggleUnlockSlateAction: (payloadObj) => {
            dispatch(toggleUnlockSlateAction(payloadObj))
        }
    }
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;
