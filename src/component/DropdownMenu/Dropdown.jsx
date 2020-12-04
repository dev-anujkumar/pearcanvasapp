/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React from 'react'
import { TYPE_DISCIPLINE, TYPE_LEARNING_APP, DEFAULT_OPTION } from './DropdownConstants.js';
import { hasReviewerRole } from '../../constants/utility.js';
export const Dropdown = (props) => {

    const { type, dropdownList, dropdownClass, clickHandlerFn, hasDefaultOption, ulClass, showDropdown } = props;

    const renderDropdown = (listType) => {
        let learningToolData = dropdownList && dropdownList.map((listItem, index) => {
            return <li
                key={index}
                className={`dropdown-li-item ${dropdownClass}`}
                onClick={(e) => !hasReviewerRole() && clickHandlerFn(listItem, e, listType)}>
                {listItem}
            </li>
        })
        return learningToolData;
    }

    return (
        <ul className={`dropdown-parent ${ulClass}`}>
            {hasDefaultOption && <li className={`dropdown-li-item ${dropdownClass}`} onClick={(e) => !hasReviewerRole() && clickHandlerFn(DEFAULT_OPTION, e, type)}>{DEFAULT_OPTION}</li>}
            {showDropdown && renderDropdown(type)}
        </ul>
    )
}
