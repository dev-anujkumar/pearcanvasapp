import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip';
import ReactMarkedIndexEditor from "../tinyMceMarkedIndexEditor";
import { CrossRefCheckbox } from './CrossRefCheckBox';


export const CrossReference = () => {
    const [popUpStatus, setPopUpStatus] = useState(false);
    const [crossRef, setcrossRef] = useState([]);
    const selectedData = [];
    const dropDownList = ['gloss', 'sub'];

    const changePopUpStatus = () => {
        if(popUpStatus){
            setPopUpStatus(false);
        } else {
            setPopUpStatus(true);
        }
    }
    return (
        <div>
            <div className="markedindex-secondlevel-header">
                <div id="index-secondlevel-attacher">
                    <div className="markedindex-secondlevel-label" onClick={changePopUpStatus}>
                        <label id="secondLevel" className="transition-none">Cross Reference (See Also)</label>
                        <ReactMarkedIndexEditor className='markedindex-editor place-holder sub-entry' id='markedindex-1' markedLabelId="secondLevel" />
                    </div>
                </div>
            </div>
            {
                popUpStatus && <CrossRefCheckbox selectedData={selectedData} dropDownList={dropDownList}/>
            }
        </div>
    )
}