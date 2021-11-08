import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip';
import ReactMarkedIndexEditor from "../tinyMceMarkedIndexEditor";
import { CrossRefCheckbox } from './CrossRefCheckBox';


export const CrossReference = ({crossRefValue}) => {
    let [popUpStatus, setPopUpStatus] = useState(false);
    let [crossRef, setcrossRef] = useState([]);
    let [filteredDropDown, setFilteredDropDown] = useState([]);
    const dropDown = useSelector(state => state.markedIndexReducer.crossReferenceValues);

    useEffect(() => {
        if(crossRefValue?.length){
            setcrossRef(crossRefValue);
        }
    },[]);

    const changePopUpStatus = () => {
        if(popUpStatus){
            setPopUpStatus(false);
        } else {
            setPopUpStatus(true);
        }
    }

    const filterCrossRef = value => {
        let newDropDown = dropDown.filter(word => word.includes(value));
        setFilteredDropDown(newDropDown);
    }

    const handleSelectedCheckboxValue = (item) => {
        if (crossRef.length > 0) {
            let tempIndex = crossRef.indexOf(item)
            if (tempIndex > -1) crossRef.splice(tempIndex, 1);
            if (tempIndex <= -1) crossRef.push(item);
        } else {
            crossRef.push(item)
        }
        setcrossRef(crossRef);
    }
    return (
        <div>
            <div className="markedindex-secondlevel-header">
                <div id="index-secondlevel-attacher">
                    <div className="markedindex-secondlevel-label" onClick={changePopUpStatus}>
                        <label id="secondLevel" className="transition-none">Cross Reference (See Also)</label>
                        <ReactMarkedIndexEditor className='markedindex-editor place-holder sub-entry' id='cross-reference' markIndexCurrentValue={crossRef.join(',')} placeholder="None" filterCrossRef={filterCrossRef}/>
                    </div>
                </div>
            </div>
            {
                popUpStatus && <CrossRefCheckbox selectedData={crossRef} handleSelectedCheckboxValue={handleSelectedCheckboxValue} dropDownList={filteredDropDown.length > 0 ? filteredDropDown : dropDown}/>
            }
        </div>
    )
}