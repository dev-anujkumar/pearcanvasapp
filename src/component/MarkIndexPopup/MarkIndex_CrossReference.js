import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip';
import ReactMarkedIndexEditor from "../tinyMceMarkedIndexEditor";
import { CrossRefCheckbox } from './CrossRefCheckBox';
import { MARKEDINDEX_NO_RESULT_FOUND_TEXT, hideCrossRefLabelClass, showCrossRefLabelClass } from './../../constants/Element_Constants';


export const CrossReference = ({crossRefValue}) => {
    let wrapperRef = useRef(null);
    let [popUpStatus, setPopUpStatus] = useState(false);
    let [crossRef, setcrossRef] = useState([]);
    let [filteredDropDown, setFilteredDropDown] = useState([]);
    let [showErrorMsg, setShowErrorMsg] = useState(false)
    const dropDown = useSelector(state => state.markedIndexReducer.crossReferenceValues);

    useEffect(() => {
        if(crossRefValue?.length){
            setcrossRef(crossRefValue);
        }

        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
    },[]);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setPopUpStatus(false);
            setShowErrorMsg(false);
        }
    };

    const changePopUpStatus = value => {
        setPopUpStatus(value);
    }

    const handleDropDownClick = () => {
        const crossRefData = document.getElementById("markedindex-cross-reference").innerHTML?.replace('<br data-mce-bogus="1">', "");
        const indexEntryData = document.getElementById("markedindex-0").innerHTML?.replace('<br data-mce-bogus="1">', "")?.replace('&nbsp;', "");
        if(crossRefData.length > 2 && !popUpStatus && indexEntryData) changePopUpStatus(true);
    }

    const filterCrossRef = value => {
        if(value?.length > 2){
            if(!popUpStatus){
                changePopUpStatus(true);
            }
            let newDropDown = dropDown.filter(word => word.includes(value));
            setFilteredDropDown(newDropDown);
            setShowErrorMsg(true)
        } else {
            changePopUpStatus(false);
            setShowErrorMsg(false)
        }
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
            activeElement.classList.remove(showCrossRefLabelClass);
            activeElement.classList.add(hideCrossRefLabelClass);
        }else{
            activeElement.classList.add(showCrossRefLabelClass);
            activeElement.classList.remove(hideCrossRefLabelClass);
        }

        setcrossRef(tempCrossRef);
    }

    const focusOnPara = () => {
        const para = document.getElementById('markedindex-cross-reference');
        para.click();
        setTimeout(() => {
            para.focus();
        }, 200);
    }
    return (
        <div ref={wrapperRef}>
            <div className="markedindex-secondlevel-header">
                <div id="index-secondlevel-attacher">
                    <Tooltip direction="bottom cross-ref-tooltip" showClass={crossRef.length === 0 ? true : false} tooltipText={crossRef.join(',')}>
                        <div className="markedindex-secondlevel-label" onClick={handleDropDownClick}>
                            <label className="cross-reference-lable">Cross Reference (See Also)</label>
                            <ReactMarkedIndexEditor className='markedindex-editor place-holder cross-reference' id='markedindex-cross-reference' markIndexCurrentValue={crossRef.join(',')} filterCrossRef={filterCrossRef} isFilterCrossRefNeeded={crossRefValue?.length > 0 ? false : true}/>
                            <label id="cross-ref" className={crossRef.length === 0 ? showCrossRefLabelClass : hideCrossRefLabelClass} onClick={focusOnPara}>None</label>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {
                popUpStatus && <CrossRefCheckbox selectedData={crossRef} handleSelectedCheckboxValue={handleSelectedCheckboxValue} dropDownList={filteredDropDown.length > 0 ? filteredDropDown : []}/>
            }
            {
                !filteredDropDown?.length && showErrorMsg && <div className="cross-ref-dropdown-without-result">
                    <span>{MARKEDINDEX_NO_RESULT_FOUND_TEXT}</span>
                </div>
            }
        </div>
    )
}
