import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';

import '../../styles/Toolbar/Toolbar.css';
import SlateTagDropdown from '../ElementMetaDataAnchor/SlateTagDropdown.jsx';

import { toggleElemBordersAction } from './Toolbar_Actions.js';
import { slateTagDisable, slateTagEnable, audioNarration, audioNarrationEnable, collapseHeader, expandHeader, searchIcon,
    searchClose, searchUp, searchDown } from '../../images/TinyMce/TinyMce.jsx';
import { checkSlateLock } from '../../js/slateLockUtility.js'
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js';
import SearchComponent from './Search/Search.jsx';

const _Toolbar = props => {
    const { isToolBarBlocked } = props;
    const [lodropdown, setLODropdown] = useState(false);
    const [addDropDown, setValueAdd] = useState(false);
    const [openDropDown, setValueOpen] = useState(false);
    const [showHeader, setHeaderValue] = useState(true);
    const [UrnSearch, searchToggle] = useState(false);
    const slateStatus = props.slateLevelData[config.slateManifestURN]?.status
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

    let searchElm = UrnSearch;
    let searchTerm = props.searchUrn || '';
    if(config.isPopupSlate) {
        searchElm = false;
        searchTerm = '';
    }

    return (
        <>
            <div className='toolbar-container'>
                <div className={`header ${isToolBarBlocked} ${accessToolbar}`} id="tinymceToolbar"></div>
                {/* ***********************Slate Tag in toolbar******************************************** */}
                {config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && props.slateType !== "container-introduction" && !config.parentOfParentItem && 
                    <div className={props?.isLOExist ? "leaningobjective-block" : `leaningobjective-block ${isToolBarBlocked}`}>
                        <div className="learningobjectiveicon">
                            <div className={`learningobjectiveicon slate-tag-icon ${slateStatus === "approved" ? "disable" : ""}`} title="Slate Tag" onClick={_handleLODropdown}>
                                {props.isLOExist ? slateTagEnable : slateTagDisable}
                            </div>
                            {lodropdown &&
                                <SlateTagDropdown permissions={props.permissions} currentSlateLOData={props.currentSlateLOData} lastAlignedExternalLO={props.lastAlignedExternalLO} handleLODropdown={_handleLODropdown} closeLODropdown={closeLODropdown} showCanvasBlocker={props.showCanvasBlocker} projectSubscriptionDetails = {props.projectSubscriptionDetails} />
                            }
                        </div>
                    </div>
                }

                {/* ***********************Audio Narration in toolbar******************************************** */}
                {   /* Add Audio if there is no audio exists in slate */
                    (props.addAudio && (!hasReviewerRole())) &&
                    <div className={isToolBarBlocked ? `audio-block ${accessToolbar} ${isToolBarBlocked}` : `audio-block ${accessToolbar}`}>
                        <div className="audioicon">
                            <div className={`audio audioicon ${(config.isCypressPlusEnabled || slateStatus === 'approved') ? 'disable-audio' : ''}`} title="Audio Tag" onClick={() => {
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
                            <div className={`audio audioicon ${config.isCypressPlusEnabled ? 'disable-audio' : ''}`} title="Audio Tag" onClick={() => {
                                if (checkSlateLock(props.slateLockInfo)) {
                                    return false
                                }
                                else {
                                    _handleOpenDropdown()
                                }
                            }}>
                                {audioNarrationEnable}
                            </div>
                            {openDropDown && <OpenAudioBook closeAudioBookDialog={closeAudioBookDialog} projectSubscriptionDetails = {props.projectSubscriptionDetails} />}
                        </div>
                    </div>
                }
                {/* *****end**** */}
            </div>
            {/* ***********************Collapse Header******************************************** */}
            <div className="side-icons">
                {<div className="icon search-urn" onClick={e => { handleSearchToggle(e, true) }}>
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
        </>   
    )
}

const mapStateToProps = (state) => {
    const { elemBorderToggle } = state.toolbarReducer.elemBorderToggle
    return {
        elemBorderToggle,
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
        slateLevelData: state.appStore.slateLevelData
    }
}

const mapActionToProps = {
    toggleElemBorders: toggleElemBordersAction,
    checkSlateLock
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;