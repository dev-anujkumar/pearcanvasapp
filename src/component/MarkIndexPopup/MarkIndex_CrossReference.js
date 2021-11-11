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
        let tempCrossRef = [...crossRef];
        if (tempCrossRef.length > 0) {
            let tempIndex = tempCrossRef.indexOf(item)
            if (tempIndex > -1) tempCrossRef.splice(tempIndex, 1);
            if (tempIndex <= -1) tempCrossRef.push(item);
        } else {
            tempCrossRef.push(item)
        }

        let activeElement = document.getElementById('cross-ref');
        if(tempCrossRef.length > 0){
            activeElement.classList.remove('show-cross-ref-label');
            activeElement.classList.add('hide-cross-ref-label');
        }else{
            activeElement.classList.add('show-cross-ref-label');
            activeElement.classList.remove('hide-cross-ref-label');
        }

        setcrossRef(tempCrossRef);
    }
    return (
        <div>
            <div className="markedindex-secondlevel-header">
                <div id="index-secondlevel-attacher">
                    <Tooltip direction="bottom" showClass={crossRef.length === 0 ? true : false} tooltipText={crossRef.join(', ')}>
                        <div className="markedindex-secondlevel-label" onClick={changePopUpStatus}>
                            <label className="cross-reference-lable">Cross Reference (See Also)</label>
                            <ReactMarkedIndexEditor className='markedindex-editor place-holder cross-reference' id='cross-reference' markIndexCurrentValue={crossRef.join(',')} filterCrossRef={filterCrossRef} isFilterCrossRefNeeded={crossRefValue?.length > 0 ? false : true}/>
                            <label id="cross-ref" className={crossRef.length === 0 ? 'show-cross-ref-label' : 'hide-cross-ref-label'}>None</label>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {
                popUpStatus && <CrossRefCheckbox selectedData={crossRef} handleSelectedCheckboxValue={handleSelectedCheckboxValue} dropDownList={filteredDropDown.length > 0 ? filteredDropDown : dropDown}/>
            }
        </div>
    )
}