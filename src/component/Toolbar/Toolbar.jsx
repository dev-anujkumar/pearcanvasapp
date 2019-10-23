import React from 'react';
import {connect} from 'react-redux';

import '../../styles/Toolbar/Toolbar.css';

import {toggleElemBordersAction} from './Toolbar_Actions.js';

const _Toolbar = props => {
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
            <span className="spacer"></span>
            <div className='elem-page-number'>
                <div className='elemPageText'>Element <br />Page Number</div>
                {_elemToggleBtnJsx('pageNumber')}
            </div>
            {/* {config.PERMISSIONS.includes('toggle_element_borders') && */}
                <div className='element-borders'>
                    <div className='elemBorderText'>Element Borders</div>
                        {_elemToggleBtnJsx('border')}
                </div>
            {/* } */}
        </div>
    )
}

const mapStateToProps = (state) => {
    const {elemBorderToggle} = state.toolbarReducer.elemBorderToggle
    return {
        elemBorderToggle
    }
}

const mapActionToProps = {
    toggleElemBorders : toggleElemBordersAction
}

const Toolbar = connect(mapStateToProps, mapActionToProps)(_Toolbar)

export default Toolbar;
