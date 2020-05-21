/**
* Root Component of ELM Assessment
*/
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import { insertElmResourceAction, fetchAssessmentItem, openAssessmentSearchBar,setSearchBlock } from './Actions/ElmActions';
import ElmHeader from './Components/ElmHeader';
import ElmTableComponent from './Components/ElmTableComponent';

const RootElmSingleAssessment = (props) => {

    const [apiData, setElmResourceApiData] = useState({});

    useEffect(() => {
        setElmResourceApiData(apiData)
        props.elmResource(props.activeAssessmentType);
    },[])

    /*** @description - This function is to pass props to elm-Header component*/
    const elmHeaderProps = {
        title: 'Pearson Unified Format Assessments'
    };
    const closeElmLearnosityWindow =()=>{
        props.openAssessmentSearchBar(props.activeAssessmentType, false)
        props.closeElmWindow();
    }
    return (
        <div className="vex-overlay elm-wrapper">
            <div className="root-container">
                <ElmHeader elmHeaderProps={elmHeaderProps} closeElmWindow={closeElmLearnosityWindow}/>
                {props.elmReducer.errFlag == null ?
                    <div className="elm-loader"></div> :
                    <ElmTableComponent
                        elmReducer={props.elmReducer}
                        closeElmWindow={closeElmLearnosityWindow}
                        addPufFunction={props.addPufFunction}
                        activeUsageType={props.activeUsageType}
                        fetchAssessmentItem={props.fetchAssessmentItem}
                        activeAssessmentType={props.activeAssessmentType}
                        setItemParentUrn={props.setItemParentUrn}
                        setElmLoader={props.setElmLoader}
                        currentSlateAncestorData={props.currentSlateAncestorData}
                        activeAssessmentType={props.activeAssessmentType}
                    />
                }
            </div>
        </div>
    );

}


const mapActionToProps = {
    elmResource: insertElmResourceAction,
    fetchAssessmentItem: fetchAssessmentItem,
    setSearchBlock:setSearchBlock,
    openAssessmentSearchBar:openAssessmentSearchBar
}

const mapStateToProps = (state) => {
    return {
        elmReducer: state.elmReducer,
        currentSlateAncestorData : state.appStore.currentSlateAncestorData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(RootElmSingleAssessment);