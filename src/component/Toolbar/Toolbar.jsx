import React, { useState } from 'react';
import {connect} from 'react-redux';

import '../../styles/Toolbar/Toolbar.css';
import {
    audioNarration,
    audioNarrationEnable
} from '../../images/TinyMce/TinyMce.jsx'
import {toggleElemBordersAction} from './Toolbar_Actions.js';
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx'

const _Toolbar = props => {
    
    const [addDropDown , setValueAdd] = useState(false);
    const [openDropDown , setValueOpen] = useState(false);
    function _handleAddDropdown () {
        setValueAdd(!addDropDown);
        console.log("addDropDown",addDropDown)
    }
    function _handleOpenDropdown () {
        setValueOpen(!openDropDown);
        console.log("openDropDown",openDropDown)
    }
    /**
     * Function for show/hide border
     */
    function _handleElemBorders () {
        props.toggleElemBorders()
    }

    /**
     * @description {responsable for render switch buttons}
     * @param {border or pageNumber} type 
     */
    function _elemToggleBtnJsx (type) {
        return(<>
                <label className="switch">
                    {type === 'border' ?<input 
                                            type="checkbox" 
                                            onChange={_handleElemBorders}
                                            defaultChecked = 'true'/>: 
                    <input 
                        type="checkbox" 
                        onChange={props.togglePageNumbering}/>
                    }
                    <span className="slider round"></span>
                </label>
            </>
        )
    }

    return (
        <div className='toolbar-container'>
            <div className="header" id="tinymceToolbar"></div>
            {
                props.addAudio ?
                    <div className="audio-block">
                        <div className="audioicon">
                            <div className="audio audioicon tooltip" onClick={() => _handleAddDropdown()}>
                                {audioNarration}
                                <span className="tooltiptext">Audio Tag</span>
                            </div>

                            {addDropDown && <AddAudioBook closeAddAudioBook={props.closeAddAudioBook} />}
                        </div>
                    </div> :
                    <div className="audio-block">
                        <div className="audioicon">
                            <div className="audio audioicon tooltip" onClick={() => _handleOpenDropdown()}>
                                {audioNarrationEnable}
                                <span className="tooltiptext">Audio Tag</span>
                            </div>

                            {openDropDown && <OpenAudioBook closeAudioBookDialog={props.closeAudioBookDialog} />}
                        </div>
                    </div>
            }
            <div class="toggle-actions">
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {elemBorderToggle} = state.toolbarReducer.elemBorderToggle
    return {
        elemBorderToggle,
        permissions : state.appStore.permissions,
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio,
    }
}

const mapActionToProps = {
    toggleElemBorders : toggleElemBordersAction
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;
