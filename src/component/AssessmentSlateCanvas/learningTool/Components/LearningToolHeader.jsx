/**
* Search Bar Component of Learning Tool/Learning App Assessment
*/
import React, { useState } from 'react';
import { searchHeaders, DISABLED_OPTION, TYPE_LEARNING_APP, TYPE_DISCIPLINE, DEFAULT_OPTION, PLACEHOLDER_TITLE, PLACEHOLDER_KEYWORD, BUTTON_TEXT_SEARCH } from '../learningToolUtility.js';
import '../../../../styles/DropdownMenu/style.css';
import error_icon from '../../../../images/AssessmentSlateCanvas/error_icon.svg'
import { hasReviewerRole } from '../../../../constants/utility.js';
import Dropdown from '../../../DropdownMenu';
import InputSearch from '../../../InputSearch';
const LearningToolHeader = (props) => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedAppType, setAppType] = useState(DEFAULT_OPTION);
    const [selectedDiscipline, setDiscipline] = useState(DEFAULT_OPTION);
    const [openAppTypeDropdown, setOpenAppTypeDropdown] = useState(false);
    const [openDisciplineDropdown, setOpenDisciplineDropdown] = useState(false);

    const {
        searchProps: { showError, searchTextCondition, validateSearch },
        dropdownProps: { selectedTypeValue, setlearningAppType, learningSystems, setlearningToolDiscipline, apiResponseForDis, showDisFilterValues }
    } = props;

    /*** @description - This function is to call search function for the search term 
     * @param e - event triggered
    */
    const handleSearch = e => {
        e.preventDefault();
        props.learningToolSearchAction(searchTitle, searchKeyword);//send for search
    }
    /*** @description - This function is to toggle the Assessment Usage-Type PopUp*/
    const toggleAppTypeDropdown = () => {
        setOpenAppTypeDropdown(!openAppTypeDropdown)
        setOpenDisciplineDropdown(false)
    }

    const toggleDisciplineDropdown = () => {
        setOpenDisciplineDropdown(!openDisciplineDropdown)
        setOpenAppTypeDropdown(false)
    }

    /*** @description - This function is to handle the value in searchbar input
     * @param event - event triggered
    */
    const handleKeywordChange = (value) => {
        setSearchKeyword(value);
        validateSearch(value);
    }

    /*** @description - This function is to handle the value in searchbar input
     * @param listItem - listitem value
     * @param event - event triggered
     * @param listType - type of dropdown
    */
    const handleDropdownChange = (listItem, event, listType) => {
        setOpenAppTypeDropdown(false);
        setOpenDisciplineDropdown(false);
        const newValue = listItem === DEFAULT_OPTION ? "" : listItem
        if (listType === TYPE_DISCIPLINE) {
            setDiscipline(newValue == "" ? DEFAULT_OPTION : newValue.prefLabel);
            setlearningToolDiscipline(newValue == "" ? newValue : newValue.prefLabel);
        }
        else {
            setAppType(newValue == "" ? DEFAULT_OPTION : listItem.label)
            setlearningAppType(newValue == "" ? newValue : newValue.appType);
        }
        event.stopPropagation();
    }

    return (
        <table>
            <tbody className="learning-tool-header">
                <tr className='row-1'>
                    {searchHeaders.map(header => {
                        return (
                            <td>
                                <div className="spanLTFilterDis">{header}{header == TYPE_LEARNING_APP && <span className="required-field">*</span>}</div>
                            </td>)
                    })}
                </tr>
                <tr className='row-2'>
                    <td onClick={!hasReviewerRole() && toggleAppTypeDropdown}>{/* Learning AppType Dropdown */}
                        <div className="learningAppType" title={selectedAppType ? selectedAppType : DEFAULT_OPTION}>
                            <span className="selected-learning-tool">{selectedAppType ? selectedAppType : DEFAULT_OPTION}</span>
                            <span className="dropdown-menu-arrow"></span>
                        </div>
                        {openAppTypeDropdown &&
                            <Dropdown ulClass={'learningAppType'} type={TYPE_LEARNING_APP} dropdownList={Object.values(learningSystems)} dropdownClass={'learning-tool-dropdown'} clickHandlerFn={handleDropdownChange} hasDefaultOption={true} />}
                    </td>
                    <td onClick={!hasReviewerRole() && toggleDisciplineDropdown}>{/* Discipline Dropdown */}
                        <div className="learningAppType" title={selectedDiscipline ? selectedDiscipline : DEFAULT_OPTION}>
                            <span className="selected-learning-tool">{selectedDiscipline ? selectedDiscipline : DEFAULT_OPTION}</span>
                            <span className="dropdown-menu-arrow"></span>
                        </div>
                        {showDisFilterValues ? openDisciplineDropdown &&
                            <Dropdown ulClass={'learningAppType'} type={TYPE_DISCIPLINE} dropdownList={apiResponseForDis.options} dropdownClass={'learning-tool-dropdown'} clickHandlerFn={handleDropdownChange} hasDefaultOption={true} />
                            : DISABLED_OPTION}
                    </td>
                    <td>{/* Search Keyword */}
                        <InputSearch searchId={"learningToolSearchBar"} searchClass={`learningToolSearchBar ${showError ? "error" : ""}`} maxInputLimit={100} placeholderText={PLACEHOLDER_KEYWORD} searchValueHandler={handleKeywordChange} />
                        {showError ? <img className="exclamation-icon" src={error_icon}></img> : ""}
                        <div className={`learning-search-text ${showError ? "errorSpan" : ""}`}>{searchTextCondition}</div>
                    </td>
                    <td>{/* Search Title */}
                        <InputSearch searchId={"learningToolSearchBar"} searchClass={"learningToolSearchBar"} maxInputLimit={100} placeholderText={PLACEHOLDER_TITLE} searchValueHandler={setSearchTitle} />
                    </td>
                    <td>
                        <button disabled={!selectedTypeValue} className="learning-tool-button" onClick={handleSearch}>{BUTTON_TEXT_SEARCH}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
export default LearningToolHeader;