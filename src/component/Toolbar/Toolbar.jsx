import React, { useState } from 'react';
import {connect} from 'react-redux';
import config from '../../config/config';

import '../../styles/Toolbar/Toolbar.css';
import SlateTagDropdown from '../ElementMetaDataAnchor/SlateTagDropdown.jsx';

import {toggleElemBordersAction, toggleLODropdown } from './Toolbar_Actions.js';
import { slateTagDisable, slateTagEnable } from '../../images/TinyMce/TinyMce.jsx';

const _Toolbar = props => {
    const [lodropdown, setLODropdown] = useState(true);
    /**
     * Function for show/hide border
     */
    function _handleElemBorders () {
        props.toggleElemBorders()
    }
    function _handleLODropdown () {
        setLODropdown(!lodropdown);
       
       
    }
    function closeLODropdown(){
        setLODropdown(!lodropdown);
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
            {config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && props.slateType !=="container-introduction" && 
            <div className="leaningobjective-block">
                <div className="learningobjectiveicon">
                    <div className="learningobjectiveicon slate-tag-icon" title="Slate Tag" onClick={_handleLODropdown}>
                    {props.isLOExist? slateTagEnable:slateTagDisable }
                    </div>
                    {lodropdown &&
                    <SlateTagDropdown permissions={props.permissions} currentSlateLOData={props.currentSlateLOData} handleLODropdown={_handleLODropdown} closeLODropdown={closeLODropdown} />
                    }
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
        currentSlateLOData: state.metadataReducer.currentSlateLOData,
        LODropdownToggle :state.toolbarReducer.LODropdownToggle,
        slateType: state.appStore.slateType,
        isLOExist: state.metadataReducer.slateTagEnable,
    }
}

const mapActionToProps = {
    toggleElemBorders : toggleElemBordersAction,
    toggleLODropdown:toggleLODropdown
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;
