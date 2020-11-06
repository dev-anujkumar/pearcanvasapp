/**
* Root Compoent of Learning Tool/ Learning App Assessment
*/
/** ----- Import - Plugins ----- */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/** ----- Import - Components ----- */
import LearningToolHeader from './Components/LearningToolHeader.jsx'
import LearningToolBody from './Components/LearningToolBody.jsx'
/** ----- Import - Dependencies ----- */
import './../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
import { LT_LA_HEADER, LT_LA_SEARCH_TEXT, BUTTON_TEXT_LINK, BUTTON_TEXT_CANCEL, learningToolTableHeaders, learningToolPages, capitalizeString } from './learningToolUtility.js';
/** ----- Import - Action Creators ----- */
import { removeSelectedData, toolTypeFilterSelectedAction, closeLtAction, selectedFigureAction, learningToolDisFilterAction, learningToolSearchAction, paginationFunctionAction } from './learningToolActions.js';

/** @description - LearningTool is a class based component. It is defined simply to make a skelten of the Learning Tool UI */
class LearningTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            searchValue: "",
            selectedLearningAppType: "",
            selectedLearningDiscipline: ""
        }
    }

    /**
    * @description - Take the value of selected filter in learning App type and dispatch an action
    * @param {value} - value of learning app type 
    */
    setlearningAppType = (value) => {
        let selectedTypeValue = value;
        this.setState({
            selectedLearningAppType: selectedTypeValue
        })
    }

    /**
    * @description - Take the value of selected filter in discipline type and dispatch an action
    * @param {event} - event 
    */
    setlearningToolDiscipline = (selectedDisFilterValue) => {
        this.setState({ selectedLearningDiscipline: selectedDisFilterValue })
        this.props.learningToolDisFilter(selectedDisFilterValue);
    }

    /** @description - This function close the Popup by despatching an action */
    closeLt = () => {
        this.props.closelearningPopup();
        this.props.closeLt();
        this.props.removeSelectedData();

    }

    /**
    * @discription - This function is for searching in searchbar and dispatch an action
    * @param {String} searchTitle - value of template label/title to be searched
    * @param {String} searchKeyword - value of keyword to be searched
    */
    learningToolSearchClick(searchTitle, searchKeyword) {
        const { selectedLearningAppType, showError } = this.state
        const learningSystem = this.props.learningToolReducer.learningSystems[selectedLearningAppType].learningSystem;
        const keywordForSearch = showError ? "" : searchKeyword;
        this.props.learningToolSearchAction(learningSystem, selectedLearningAppType, searchTitle, keywordForSearch);
    }

    /**
    * @discription - This function is for handeling the data,when we select any entery from the table
    * @param {Object} args - Object of properties we want to send in wip
    */
    selectedFigure = (args) => {
        this.props.selectedFigure(args);
    }

    /**
     * @discription - This function is for validating the format of input in search bar
     */
    validateSearch = (searchText) => {
        this.setState({ searchValue: searchText })
        let searchValue = searchText
        let regex = /^[A-Za-z0-9 " "\-]{0,100}$/
        if (!regex.test(searchValue)) {
            this.setState({ showError: true });
        } else {
            this.setState({ showError: false });
        }
    }

    /** @discription - This function is for linking the selected LT/LA assessment */
    linkLearningApp = () => {
        this.props.linkLearningApp(this.props.learningToolReducer.selectedResultFormApi);
        this.props.closePopUp();
    }

    render() {
        const { searchLoading, errorFlag, showLTBody, apiResponse, learningSystems, linkButtonDisable, apiResponseForDis, showDisFilterValues, selectedResultFormApi } = this.props.learningToolReducer
        const searchProps = {
            showError: this.state.showError,
            searchTextCondition: LT_LA_SEARCH_TEXT,
            validateSearch: this.validateSearch,
            searchLoading: searchLoading
        }
        const dropdownProps = {
            selectedTypeValue: this.state.selectedLearningAppType,
            learningSystems: learningSystems,
            apiResponseForDis: apiResponseForDis,
            setlearningAppType: this.setlearningAppType,
            showDisFilterValues: showDisFilterValues,
            setlearningToolDiscipline: this.setlearningToolDiscipline
        }
        return (
            <>
                <div className="learningToolContainer">
                    <div className="learningToolHeader">
                        {/* Title of POPUP */}
                        <div className="learningToolHeaderTitle">
                            <h1 className="learningToolHeaderString">{LT_LA_HEADER}</h1>
                        </div>
                        <div className="learningToolHeaderMainDiv">
                            {/* LT/LA Dropdown Header & Search Bar */}
                            <LearningToolHeader
                                searchProps={searchProps}
                                dropdownProps={dropdownProps}
                                learningToolSearchAction={(searchTitle, searchKeyword) => this.learningToolSearchClick(searchTitle, searchKeyword)}
                            />
                        </div>
                    </div>
                    <hr />
                    {/* Body of the popup table */}
                    {<LearningToolBody searchLoading={searchLoading} showLTBody={showLTBody} errorFlag={errorFlag} apiResponse={apiResponse} selectedResultData={selectedResultFormApi} learningToolPageLimit={learningToolPages} selectedFigure={this.selectedFigure} learningToolTableHeaders={learningToolTableHeaders} capitalizeString={capitalizeString} />}
                    {/* Footer for the popUp */}
                    <div className="learningToolFooter">
                        <button disabled={this.props.learningToolReducer.linkButtonDisable == false ? linkButtonDisable : true} className="learning-tool-button" onClick={this.linkLearningApp}>{BUTTON_TEXT_LINK}</button>
                        <button className="learning-tool-button learning-tool-cancel" onClick={this.closeLt}>{BUTTON_TEXT_CANCEL}</button>
                    </div>
                </div>
                {/* Background blocker div of Learning Tool */}
                <div className='blockerBgDivLT' tabIndex="0" onClick={this.closeLt}>
                </div>
            </>
        )
    }

}

/** 
 * @discription - dispatch actions as props from this component
 */
const mapActionToProps = {
    learningAppType: toolTypeFilterSelectedAction,
    closeLt: closeLtAction,
    selectedFigure: selectedFigureAction,
    learningToolDisFilter: learningToolDisFilterAction,
    learningToolSearchAction: learningToolSearchAction,
    paginationFunction: paginationFunctionAction,
    removeSelectedData: removeSelectedData
}

/**
 *  @discription - get state variable as props in this component
 */
const mapStateToProps = (state) => {
    return {
        learningToolReducer: state.learningToolReducer
    }
}

LearningTool.displayName = "LearningTool"
LearningTool.propTypes = {
    linkLearningApp: PropTypes.func,
    closePopUp: PropTypes.func,
    closelearningPopup: PropTypes.func
}

export default connect(mapStateToProps, mapActionToProps)(LearningTool)