/**
* Footer Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import './CiteTdxPagination.css';
import { getCiteTdxData } from '../../Actions/CiteTdxActions'
import { CITE,TDX } from '../../../AssessmentSlateConstants.js'
class CiteTdxFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPageNo
        }
    }

    sendCiteTdxAssessment = () => {
        let obj = {
            id: this.props.currentAssessmentSelected.versionUrn,
            title: this.props.currentAssessmentSelected && this.props.currentAssessmentSelected.name? this.props.currentAssessmentSelected.name: "dummy",
            usageType: this.props.usageTypeMetadata,
            slateType: this.props.openedFrom,
            singleAssessmentID:  this.props.currentSingleAssessmentSelected ? this.props.currentSingleAssessmentSelected:""
        }
        let parentPageNo = this.state.currentPage
        this.props.addCiteTdxFunction(obj, parentPageNo);
        if(this.props.openedFrom !== "singleSlateAssessment"){
            this.props.closeWindowAssessment();
            this.props.resetPage(true);
        }
        if(this.props.isInnerComponent){
            console.count("singleSlateAssessment")
            this.props.resetPage(true);
        }

    }

    handlePagination = (pageNo) => {
        const { assessmentType, searchTitle } = this.props;
        this.props.resetPage(false);
        this.setState({ currentPage: pageNo }, () => {
            this.props.getCiteTdxData(assessmentType, searchTitle, null, pageNo);
            this.props.getCurrentPageNo(pageNo);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.isReset !== prevProps.isReset) {
            if (this.props.isReset) {
                this.setState({ currentPage: 1 });
                this.props.getCurrentPageNo(1);
            }
        }     
    }

    handleClose = () => {
        this.props.resetPage(true);
        this.props.closeWindowAssessment();
    }

    render() {
        const { currentPage } = this.state;
        const { filterUUID } = this.props;
        const { citeApiData, tdxApiData, mmiApiData, isLoading } = this.props;
        const apiData = (this.props.assessmentType === CITE) ? citeApiData : (this.props.assessmentType === TDX) ? tdxApiData : mmiApiData;
        let hideNavigationPrevious = (currentPage <= 1) ? 'hideNavigation' : '';
        let hideNavigationNext = ((apiData && apiData.assessments && apiData.assessments.length == 0) || (apiData && apiData.assessments && apiData.assessments.length < 25)) ? 'hideNavigation' : '';
        let disableClick = (isLoading) ? 'disableClick' : '';
        let rmNavOnFilter = (filterUUID == undefined || filterUUID == '') ? '' : 'hideNavigation';
        let addClass;
        if((this.props.openedFrom === "slateAssessment" || this.props.openedFrom === "singleSlateAssessment" ) && Object.keys(this.props.currentAssessmentSelected).length > 0 ){
            addClass="add-button-enabled";
        }
        else if(this.props.openedFrom === "singleSlateAssessmentInner" && Object.keys(this.props.currentSingleAssessmentSelected).length > 0){
            addClass="add-button-enabled";
        }
        else{
            addClass="add-button-disabled";
        }
        return (
            <div className="assessmentpopup-footer">
                {/** @description Pagination code starts here ---- */}
                {!this.props.setCurrentAssessment && <div className="pagination">
                    <a className={`noSelect ${hideNavigationPrevious} ${disableClick} ${rmNavOnFilter}`} onClick={() => this.handlePagination(currentPage - 1)} href="#">&#60;</a>
                    <a href="#" className="active noSelect">{currentPage}</a>
                    <a className={`noSelect ${hideNavigationNext} ${disableClick} ${rmNavOnFilter}`} onClick={() => this.handlePagination(currentPage + 1)} href="#"> &#62;</a>
                </div>}
                {/** @description Footer right Section code starts here ---- */}
                <div className="assesmentfooter-inner">
                    <button className="assessmentpopup cancel-assessment noSelect" onClick={this.handleClose}>CANCEL</button>
                    <button className={`assessmentpopup add-assessment noSelect ${addClass}`} onClick={this.sendCiteTdxAssessment}>SELECT</button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected,
        citeApiData: state.citeTdxReducer.citeData,
        tdxApiData: state.citeTdxReducer.tdxData,
        mmiApiData: state.citeTdxReducer.mmiData,
        isLoading: state.citeTdxReducer.isLoading,
        currentSingleAssessmentSelected: state.citeTdxReducer.currentSingleAssessmentSelected
    }
}

const mapActionToProps = {
    getCiteTdxData: getCiteTdxData,
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxFooter);
