/**
 * Module - ListButtonDrop
 * Description - memoized funtional component for list drop element
 */

// IMPORT - Plugins //
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CanvasWrapper/ListButtonDrop.css';
import {removeListHighliting } from '../ListElement/eventBinding'
import listCheck from '../../images/ElementButtons/listCheck.svg'
import numbersList from '../../images/ElementButtons/numbersList.svg'
import alphabetsCapitalList from '../../images/ElementButtons/alphabetsCapitalList.svg'
import alphabetsSmallList from '../../images/ElementButtons/alphabetsSmallList.svg'
import romansCapitalList from '../../images/ElementButtons/romansCapitalList.svg'
import romansSmallList from '../../images/ElementButtons/romansSmallList.svg'
import noneList from '../../images/ElementButtons/noneList.svg'

/**
 * ListButtonDrop | it is component renders list drop ui on editor tool header
 * @param {object} props | received props to <ListButtonDrop />
 */
const ListButtonDrop = (props) => {
    return (
        <div className="fr-popup fr-desktop" ref={props.setListDropRef}>
            <div className="fr-buttons numbered-list-dropdown">
                <DecimalListIconBox {...props} />
                <UpperAlphaListIconBox {...props} />
                <LowerAlphaListIconBox {...props} />
                <UpperRomanListIconBox {...props} />
                <LowerRomanListIconBox {...props} />
                <NoStyleListIconBox {...props} />
            </div>
            <div className="list-input-layer" id="list-input-layer">
                <div className="topText">Start with</div>
                <div>
                    <div id="listInputCover" className="">
                        <input ref={props.inputRef} id="listINputBox" defaultValue={props.startValue} maxLength="9" type="text" dir="auto" pattern="\d*" className="list-input-box fr-not-empty" onKeyPress={numberValidatorHandler} onKeyDown={handleCtrlV} onPaste={handleRightClickCtrlV} onKeyUp={(e) => { handleInputSubmit(e, props) }} />
                        <button id="popupGoBtn-1" type="button" tabIndex="-1" role="button" title="submit" className={`fr-command fr-btn fr-btn-font_awesome ${!props.startValue && 'disabledListBtn' || ''} `} data-cmd="popupGoBtn" onClick={(e) => { handleInputSubmit(e, props, true) }}>
                            <img src={listCheck}/>
                            <span className="fr-sr-only">submit</span>
                        </button>
                    </div>
                    <div className="error-holder">
                        <span id="errorAlpha">Maximum value for Alpha list is 26</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * onListOptionSelect | gets triggered on selecting anyone of the option
 * @param {string} type | chosen orderd list type
 */
const onListOptionSelect = (type, props) => {
    let _value = parseInt(document.getElementById('listINputBox').value || 1); // earlier default by 0
    _value = isNaN(_value) ? 1 : _value; //isNaN(_value) && 0 || _value; // earlier default by 0
    props.onListSelect(type, _value, false);
    removeListHighliting();
    let _listWrapperDiv = document.querySelector('#listDropWrapper');
    if (_listWrapperDiv)
        _listWrapperDiv.querySelector('.fr-popup').classList.remove('fr-active');
}
/**
 * getHorizontalLines | returns two horizontal parallel lines
 */
/**
 * DecimalListIconBox | renders Decimal list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const DecimalListIconBox = (props) => {
    const _listFor = 'decimal';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
            <img className={"list-img"} src={numbersList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * UpperAlphaListIconBox | renders Upper Alpha list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const UpperAlphaListIconBox = (props) => {
    const _listFor = 'upper-alpha';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
           <img className={"list-img"} src={alphabetsCapitalList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * LowerAlphaListIconBox | renders Lower Alpha list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const LowerAlphaListIconBox = (props) => {
    const _listFor = 'lower-alpha';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
            <img className={"list-img"} src={alphabetsSmallList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * UpperRomanListIconBox | renders Upper Roman list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const UpperRomanListIconBox = (props) => {
    const _listFor = 'upper-roman';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
            <img className={"list-img"} src={romansCapitalList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * LowerRomanListIconBox | renders Lower Roman list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const LowerRomanListIconBox = (props) => {
    const _listFor = 'lower-roman';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
            <img className={"list-img"} src={romansSmallList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * NoStyleListIconBox | renders None list icon in list drop
 * @param {object} props | received props to <ListButtonDrop />
 */
const NoStyleListIconBox = (props) => {
    const _listFor = 'none';
    return (
        <div className={`list-options ${props.selectedOption === _listFor ? 'selected' : ''}`} onClick={() => { onListOptionSelect(_listFor, props) }} id={`${_listFor}-1`} tabIndex="-1" data-cmd={_listFor}>
            <img className={"list-img-none"} src={noneList}/>
            <span className="list-opt-tooltip">{_listFor}</span>
        </div>
    )
}
/**
 * numberValidatorHandler | validates entered input to integer value only | Event : onKeyPress
 * @param {object} e | received event of input
 */
const numberValidatorHandler = (e) => {
    let charCode = (e.which) ? e.which : e.keyCode;
    if (charCode >= 48 && charCode <= 57) {
        return true
    } else {
        e.preventDefault()
        return false
    }
}
/**
 * handleCtrlV | pervent to paste any value on input | Event : onKeyDown
 * @param {object} e | received event of input
 */
const handleCtrlV = (e) => {
    if ((e.ctrlKey) && (e.which == 86)) {
        e.stopPropagation();
        e.preventDefault();

        return false
    }
}
/**
 * handleRightClickCtrlV | pervent to rightClick+paste any value on input | Event : onPaste
 * @param {object} e | received event of input
 */
const handleRightClickCtrlV = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return false
}
/**
 * handleInputSubmit | handle enable/disable input submit button and submit on enter key | Event : onKeyUp
 * @param {object} e | received event of input
 * @param {object} props | received props of parent portal element
 */
const handleInputSubmit = (e, props, onClicked) => {
    let value = document.getElementById('listINputBox').value;
    if (value == '') {
        document.getElementById('popupGoBtn-1').classList.add('disabledListBtn')
    }
    else {
        document.getElementById('popupGoBtn-1').classList.remove('disabledListBtn')
    }
    let charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode === 13 && value != '') || onClicked) {
        let type = document.getElementById('listDropWrapper').querySelector('.list-options.selected') &&
            document.getElementById('listDropWrapper').querySelector('.list-options.selected').getAttribute('data-cmd');
        if (type) {
            onListOptionSelect(type, props);
        }
    }
}

ListButtonDrop.propTypes = {
    /** setListDropRef is set for ref callback api */
    setListDropRef: PropTypes.func.isRequired,
    /** onListSelect is the list select action */
    onListSelect: PropTypes.func.isRequired,
    /** selectedOption is the pre-selected list option */
    selectedOption: PropTypes.string,
    /** startValue is selcted input value */
    startValue: PropTypes.any
}

// const MemoizedListButtonDrop = React.memo(ListButtonDrop);

export default React.memo(ListButtonDrop);
