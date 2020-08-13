import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';

import '../../styles/Toolbar/Toolbar.css';
import SlateTagDropdown from '../ElementMetaDataAnchor/SlateTagDropdown.jsx';

import { toggleElemBordersAction, toggleLODropdown } from './Toolbar_Actions.js';
import { slateTagDisable, slateTagEnable } from '../../images/TinyMce/TinyMce.jsx';
import {
    audioNarration,
    audioNarrationEnable
} from '../../images/TinyMce/TinyMce.jsx';
import { checkSlateLock } from '../../js/slateLockUtility.js'
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx'
import { hasReviewerRole } from '../../constants/utility.js'

const _Toolbar = props => {
    const [lodropdown, setLODropdown] = useState(false);
    const [addDropDown, setValueAdd] = useState(false);
    const [openDropDown, setValueOpen] = useState(false);

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
     * Function for show/hide border
     */
    function _handleElemBorders() {
        props.toggleElemBorders()
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
     * @description {responsable for render switch buttons}
     * @param {border or pageNumber} type 
     */
    function _elemToggleBtnJsx(type) {
        return (<>
            <label className="switch">
                {type === 'border' ? <input
                    type="checkbox"
                    onChange={_handleElemBorders}
                    defaultChecked='true' /> :
                    <input
                        type="checkbox"
                        onChange={props.togglePageNumbering} />
                }
                <span className="slider round"></span>
            </label>
        </>
        )
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
    let accessToolbar = (props.permissions && props.permissions.includes('access_formatting_bar')) ? "" : " disableToolbar"

    return (

        <div className='toolbar-container'>
            <div className={"header" + accessToolbar} id="tinymceToolbar"></div>
            {/* ***********************Slate Tag in toolbar******************************************** */}
            {config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && props.slateType !== "container-introduction" &&
                <div className="leaningobjective-block">
                    <div className="learningobjectiveicon">
                        <div className="learningobjectiveicon slate-tag-icon" title="Slate Tag" onClick={_handleLODropdown}>
                            {props.isLOExist ? slateTagEnable : slateTagDisable}
                        </div>
                        {lodropdown &&
                            <SlateTagDropdown permissions={props.permissions} currentSlateLOData={props.currentSlateLOData} handleLODropdown={_handleLODropdown} closeLODropdown={closeLODropdown} />
                        }
                    </div>
                </div>
            }

            {/* ***********************Audio Narration in toolbar******************************************** */}
            {   /* Add Audio if there is no audio exists in slate */
                (props.addAudio && (!hasReviewerRole())) &&
                <div className={"audio-block" + accessToolbar}>
                    <div className="audioicon">
                        <div className="audio audioicon" title="Audio Tag" onClick={() => {
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
                        <div className="audio audioicon" title="Audio Tag" onClick={() => {
                            if (checkSlateLock(props.slateLockInfo)) {
                                return false
                            }
                            else {
                                _handleOpenDropdown()
                            }
                        }}>
                            {audioNarrationEnable}
                        </div>
                        <span class="openAudioIcon"></span>
                        {openDropDown && <OpenAudioBook closeAudioBookDialog={closeAudioBookDialog} />}
                    </div>
                </div>
            }
            {/* *****end**** */}

            {/* <div className="toggle-actions">
            {props.permissions.includes('toggle_element_page_no') &&
            <div className='elem-page-number'>
                <div className='elemPageText'>Element <br />Page Number</div>
                {_elemToggleBtnJsx('pageNumber')}
            </div>
            }
            {props.permissions.includes('toggle_element_borders') &&
                <div className='element-borders'>
                    <div className='elemBorderText'>Element Borders</div>
                        {_elemToggleBtnJsx('border')}
                    </div>
                }
            </div> */}
        </div>
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
        slateLockInfo: state.slateLockReducer.slateLockInfo
    }
}

const mapActionToProps = {
    toggleElemBorders: toggleElemBordersAction,
    toggleLODropdown: toggleLODropdown,
    checkSlateLock
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;