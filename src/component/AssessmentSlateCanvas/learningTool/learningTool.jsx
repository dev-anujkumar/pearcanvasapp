/**
* Root Compoent of Learning Tool/ Learning App Assessment
*/
/** ----- Import - Plugins ----- */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/** ----- Import - Components ----- */
import ApiResults from './ApiResults.jsx';
import LearningToolBody from './Components/LearningToolBody.jsx'
import LearningToolHeader from './Components/LearningToolHeader.jsx'
import LearningToolSearch from './Components/LearningToolSearch.jsx'
/** ----- Import - Dependencies ----- */
import { disableHeader } from '../../../js/toggleLoader.js';
import error_icon from '../../../images/AssessmentSlateCanvas/error_icon.svg'
import './../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
import { LT_LA_HEADER, LT_LA_SEARCH_TEXT, learningToolTableHeaders, learningToolPages, capitalizeString } from './learningToolUtility.js';
/** ----- Import - Action Creators ----- */
import { removeSelectedData, toolTypeFilterSelectedAction, closeLtAction, selectedFigureAction, learningToolDisFilterAction, learningToolSearchAction, paginationFunctionAction } from './learningToolActions.js';

/**
* @description - LearningTool is a class based component. It is defined simply
* to make a skelten of the Learning Tool UI
*/
class LearningTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            selectedLearningDiscipline: "",
            selectedLearningAppType: "",
            showError: false,
            // learningSystem: ""
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.apiResponse != nextProps.apiResponse) {
            this.setState({
                currentPage: 1
            })
        }
    }

    /**
    * @description - Take the value of selected filter in learning App type and dispatch an action
    * @param {event} - event 
    */
    setlearningAppType = (e) => {
        let selectedTypeValue = e.target.value;
        this.setState({
            // learningSystem: this.props.learningSystems[selectedTypeValue].learningSystem,
            selectedLearningAppType: selectedTypeValue
        })
    }

    /**
    * @description - Take the value of selected filter in discipline type and dispatch an action
    * @param {event} - event 
    */
    setlearningToolDiscipline = (e) => {
        let selectedDisFilterValue = e.target.value;
        this.setState({ selectedLearningDiscipline: selectedDisFilterValue })
        this.props.learningToolDisFilter(selectedDisFilterValue);
    }

    /**
    * @description - This function close the Popup by despatching an action
    */
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
        const { selectedLearningAppType } = this.state
        const learningSystem = this.props.learningSystems[selectedLearningAppType].learningSystem
        this.props.learningToolSearchAction(learningSystem, selectedLearningAppType, searchTitle, searchKeyword);
    }

    /**
    * @discription - This function is for handeling the data,when we select any entery from 
    * the table
    * @param {Object} args - Object of properties we want to send in wip
    */
    selectedFigure = (args) => {
        this.props.selectedFigure(args);
    }

    /**
     * @discription - This function is for validating the format of input in search bar
     */
    validateSearch = (e, searchText) => {
        this.setState({ searchValue: searchText })
        let searchValue = searchText
        let regex = /^[A-Za-z0-9 " "\-]{0,100}$/
        if (!regex.test(searchValue)) {
            this.setState({ showError: true })
        } else {
            this.setState({ showError: false })
        }
    }

    linkLearningApp = () => {
        this.props.linkLearningApp(this.props.selectedResultFormApi);
        this.props.closePopUp();
    }

    render() {
        disableHeader(true);
        return (
            <div>
                <div className="learningToolContainer">
                    <div className="learningToolHeader">
                        {/* Title of POPUP */}
                        <div className="learningToolHeaderTitle">
                            <h1 className="learningToolHeaderString">{LT_LA_HEADER}</h1>
                        </div>
                        <div className="learningToolHeaderMainDiv">
                            {/* LT/LA Dropdown Header */}
                            <LearningToolHeader setlearningAppType={this.setlearningAppType} learningSystems={this.props.learningSystems} setlearningToolDiscipline={this.setlearningToolDiscipline} apiResponseForDis={this.props.apiResponseForDis} showDisFilterValues={this.props.showDisFilterValues} capitalizeString={capitalizeString} />
                            {/* Search Bar for searching */}
                            <LearningToolSearch error_icon={error_icon} showError={this.state.showError} validateSearch={this.validateSearch} selectedTypeValue={this.state.selectedLearningAppType} learningToolSearchAction={(searchKeyword) => this.learningToolSearchClick(searchKeyword)} searchTextCondition={LT_LA_SEARCH_TEXT} />
                        </div>
                    </div>
                    <hr />
                    {/* Body of the popup table */}
                    {this.props.showLTBody ? <LearningToolBody apiResponse={this.props.apiResponse} selectedResultData={this.props.selectedResultFormApi} learningToolPageLimit={learningToolPages} selectedFigure={this.selectedFigure} learningToolTableHeaders={learningToolTableHeaders} capitalizeString={capitalizeString} /> : ''}
                    {/* Footer for the popUp */}
                    <div className="learningToolFooter">
                        <button disabled={this.props.linkButtonDisable == false ? this.props.linkButtonDisable : true} className="learningToolFooterButtonLink" onClick={this.linkLearningApp}>Link</button>
                        <button className="learningToolFooterButtonCancel" onClick={this.closeLt}>Cancel</button>
                    </div>
                </div>
                {/* Background blocker div of Learning Tool */}
                <div className='blockerBgDivLT' tabIndex="0" onClick={this.closeLt}>
                </div>
            </div>
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
        learningTypeSelected: state.learningToolReducer.learningTypeSelected,
        shouldHitApi: state.learningToolReducer.shouldHitApi,
        learningToolTypeValue: state.learningToolReducer.learningToolTypeValue,
        apiResponse: state.learningToolReducer.apiResponse,
        showErrorMsg: state.learningToolReducer.showErrorMsg,
        showLTBody: state.learningToolReducer.showLTBody,
        showDisFilterValues: state.learningToolReducer.showDisFilterValues,
        selectedResultFormApi: state.learningToolReducer.selectedResultFormApi,
        linkButtonDisable: state.learningToolReducer.linkButtonDisable,
        apiResponseForDis: state.learningToolReducer.apiResponseForDis,
        learningToolDisValue: state.learningToolReducer.learningToolDisValue,
        numberOfRows: state.learningToolReducer.numberOfRows,
        learningSystems: state.learningToolReducer.learningSystems,
    }
}

LearningTool.displayName = "LearningTool"

LearningTool.propTypes = {
    /** This function is called when saving of data */
    linkLearningApp: PropTypes.func,
    /** This function is called to close the popup */
    closePopUp: PropTypes.func,
    closelearningPopup: PropTypes.func
}


/**
 * @discription - connect this component with redux
 */
export default connect(
    mapStateToProps,
    mapActionToProps
)(LearningTool)