import React from 'react';

import '../../styles/Toolbar/Toolbar.css';

export default function Toolbar(props) {

    function _elemToggleBtnJsx () {
        return(
            <>
                <label className="switch">
                    <input type="checkbox" />
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
                <div className='elemPageText'>
                    Element <br />Page Number
                </div>
                {_elemToggleBtnJsx()}
            </div>
            <div className='element-borders'>
            
            <div className='elemBorderText'>
                Element Borders
                </div>
            {_elemToggleBtnJsx()}
            </div>
        </div>
    )
}
