/**
* Root Component of ELM Assessment Picker
*/
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import { insertElmResourceAction, fetchAssessmentItem, openAssessmentSearchBar } from './Actions/ElmActions';
import ElmHeader from './Components/ElmHeader';
import ElmTableComponent from './Components/ElmTableComponent';
import { ELM_INT } from '../AssessmentSlateConstants.js';

const RootElmComponent = (props) => {

    const [apiData, setElmResourceApiData] = useState({});

    useEffect(() => {
        setElmResourceApiData(apiData)
        props.elmResource(props.activeAssessmentType);
    },[])

    const closeElmLearnosityWindow =()=>{
        props.openAssessmentSearchBar(props.activeAssessmentType, false)
        props.closeElmWindow();
    }
    return (
        <div className="vex-overlay elm-wrapper">
            <div className={`root-container ${props.activeAssessmentType == ELM_INT ? 'elm-interactive' : ''}`}>
                <ElmHeader closeElmWindow={closeElmLearnosityWindow} activeAssessmentType={props.activeAssessmentType}/>
                {props.elmReducer.errFlag == null ?
                    <div className="elm-loader"></div> :
                    <ElmTableComponent
                        elmReducer={props.elmReducer}
                        elementType={props.elementType}
                        closeElmWindow={closeElmLearnosityWindow}
                        addPufFunction={props.addPufFunction}
                        activeUsageType={props.activeUsageType}
                        setItemParentUrn={props.setItemParentUrn}                        
                        fetchAssessmentItem={props.fetchAssessmentItem}
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
    openAssessmentSearchBar:openAssessmentSearchBar
}

const mapStateToProps = (state) => {
    return {
        elmReducer: state.elmReducer,
        // currentSlateAncestorData : state.appStore.currentSlateAncestorData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(RootElmComponent);