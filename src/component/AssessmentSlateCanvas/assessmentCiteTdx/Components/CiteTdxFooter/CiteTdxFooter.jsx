/**
* Footer Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import './CiteTdxPagination.css';
import { getCiteTdxData } from '../../Actions/CiteTdxActions'

class CiteTdxFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    sendCiteTdxAssessment = () => {
        let obj = {
            id: this.props.currentAssessmentSelected.versionUrn,
            title: this.props.currentAssessmentSelected && this.props.currentAssessmentSelected.name ? this.props.currentAssessmentSelected.name : "dummy",
            usageType: this.props.usageTypeMetadata
        }
        this.props.addCiteTdxFunction(obj);
        this.props.closeWindowAssessment();

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

    render() {
        const { currentPage } = this.state;
        const { filterUUID } = this.props;
        const { citeApiData, tdxApiData, mmiApiData, isLoading } = this.props;
        const apiData = (this.props.assessmentType === "Full Assessment CITE") ? citeApiData : (this.props.assessmentType === "Full Assessment TDX") ? tdxApiData : mmiApiData;
        let hideNavigationPrevious = (currentPage <= 1) ? 'hideNavigation' : '';
        let hideNavigationNext = ((apiData && apiData.assessments && apiData.assessments.length == 0) || (apiData && apiData.assessments && apiData.assessments.length < 20)) ? 'hideNavigation' : '';
        let disableClick = (isLoading) ? 'disableClick' : '';
        let rmNavOnFilter = (filterUUID == undefined || filterUUID == '') ? '' : 'hideNavigation';
        return (
            <div className="assessmentpopup-footer">
                {/** @description Pagination code starts here ---- */}
                <div className="pagination">
                    <a className={hideNavigationPrevious + ' ' + disableClick + ' ' + rmNavOnFilter} onClick={() => this.handlePagination(currentPage - 1)} href="#">&#60;</a>
                    <a href="#" className="active">{currentPage}</a>
                    <a className={hideNavigationNext + ' ' + disableClick + ' ' + rmNavOnFilter} onClick={() => this.handlePagination(currentPage + 1)} href="#"> &#62;</a>
                </div>
                {/** @description Footer right Section code starts here ---- */}
                <div className="assesmentfooter-inner">
                    <button className="assessmentpopup cancel-assessment" onClick={this.props.closeWindowAssessment}>CANCEL</button>
                    <button className="assessmentpopup add-assessment" onClick={this.sendCiteTdxAssessment}>SELECT</button>
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
        isLoading: state.citeTdxReducer.isLoading
    }
}

const mapActionToProps = {
    getCiteTdxData: getCiteTdxData,
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxFooter);
