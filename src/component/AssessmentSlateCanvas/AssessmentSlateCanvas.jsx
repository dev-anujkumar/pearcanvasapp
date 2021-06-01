/**
* Module | AssessmentSlateCanvas
* description | This is the Root Component of Assessment Slate
*/
/** ----- Import - Plugins ----- */
import React, { Component } from 'react'
import { connect } from 'react-redux';
/** ----- Import - Components ----- */
import TinyMceEditor from "./../tinyMceEditor";
import AssessmentSlateData from './AssessmentSlateData.jsx';
/** ----- Import - Dependencies ----- */
import { specialCharacterDecode } from './assessmentCiteTdx/Actions/CiteTdxActions';
import { showTocBlocker, disableHeader, hideTocBlocker, hideToc, ShowCanvasLoader } from '../../js/toggleLoader';
import { setAssessmentFormat, hasAssessmentID, setAssessmentElement, setAssessmentUsageType } from './AssessmentActions/assessmentUtility.js';
/*** @description - AssessmentSlateCanvas is a class based component that acts as a container for Assessment Slate */
class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assessmentFormat: props.model && setAssessmentFormat(props.model),
            getAssessmentData: props.model && hasAssessmentID(props.model),
            assessmentSlateObj: props.model && setAssessmentElement(props.model),
            getAssessmentDataPopup: false
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if ('model' in nextProps && 'elementdata' in nextProps.model && 'assessmentformat' in nextProps.model.elementdata) {
            return {
                assessmentFormat: nextProps.model && setAssessmentFormat(nextProps.model),
                getAssessmentData: nextProps.model && hasAssessmentID(nextProps.model),
                assessmentSlateObj: nextProps.model && setAssessmentElement(nextProps.model)
            }
        }
    }

    /*** 
    * @description - This is the function to add Elm/Learnosity Assessments to Assessment Slate 
    * @param pufObj - The object contains data about Elm/Learnosity Assessment 
    */
    addPufAssessment = (pufObj, activeAssessmentType, updateType, cb) => {
        showTocBlocker();
        disableHeader(true);
        this.updateAssessment(pufObj.id, "", pufObj.title, activeAssessmentType, pufObj.usagetype, updateType);
        if (cb) {
            cb();
        }
    }

    /*** 
    * @description - This is the function to add CITE/TDX Assessments to Assessment Slate 
    * @param citeTdxObjs - The object contains data about CITE/TDX Assessment 
    * @param activeAssessmentType currwnt assessment format (CITE/TDX)
    */
    addCiteTdxAssessment = (citeTdxObj, activeAssessmentType) => {
        showTocBlocker();
        disableHeader(true);
        this.updateAssessment(citeTdxObj.id, "", specialCharacterDecode(citeTdxObj.title), activeAssessmentType, citeTdxObj.usageType, 'insert');
    }

    /*** @description - This function is to update state variables based on the parameters
       * @param id - assessment-id of the assessment
       * @param itemID - assessment-item-id of the assessment
       * @param title - assessment-title of the assessment
       * @param format - assessment Format of the assessment
       * @param usageType - usageType of the assessment
       * @param change - type of change - insert/update
    */
    updateAssessment = (id, itemID, title, format, usageType, change, learningsystem, templateid, templatetype) => {
        let dataToSend = {
            id: id,
            title: title,
            itemID: itemID,
            format: format,
            usageType: usageType,
            templatelabel: title,
            templateid: templateid,
            templatetype: templatetype,
            learningsystem: learningsystem
        }
        this.setState({
            assessmentSlateObj: {
                assessmentId: id,
                itemId: itemID,
                title: title,
            },
            getAssessmentData: true,
        }, () => {
            this.handleAssessmentBlur(dataToSend);
        })
        if (change === 'insert') {
            this.setState({
                getAssessmentDataPopup: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        getAssessmentDataPopup: false
                    })
                }, 3000)
                ShowCanvasLoader(false);
            })
        }
        else {
            this.setState({
                getAssessmentData: false
            })
        }
        disableHeader(false);
        hideTocBlocker(false);
    }

    /*** @description - This function is to handle Focus on the Assessment element on click*/
    handleAssessmentFocus = () => {
        this.props.handleFocus();
    }

    /*** @description - This function is to handle Blur on the Assessment element on blur*/
    handleAssessmentBlur = (assessmentData) => {
        this.props.handleBlur(assessmentData);
    }

    render() {
        const { type, model, permissions, isLOExist, showBlocker, elementId } = this.props;
        const { getAssessmentDataPopup, getAssessmentData, assessmentSlateObj } = this.state;
        let handleCanvasBlocker = {
            showTocBlocker: showTocBlocker,
            disableHeader: disableHeader,
            hideTocBlocker: hideTocBlocker,
            hideToc: hideToc,
            showBlocker: showBlocker,
            ShowLoader: ShowCanvasLoader
        }
        return (
            <div className="AssessmentSlateMenu" onClick={this.handleAssessmentFocus}>
                <AssessmentSlateData
                    type={type}
                    model={model}
                    isLOExist={isLOExist}
                    permissions={permissions}
                    getAssessmentData={getAssessmentData}
                    assessmentSlateObj={assessmentSlateObj}
                    getAssessmentDataPopup={getAssessmentDataPopup}
                    updateAssessment={this.updateAssessment}
                    addPufAssessment={this.addPufAssessment}
                    setAssessmentFormat={setAssessmentFormat}
                    handleCanvasBlocker={handleCanvasBlocker}
                    handleAssessmentBlur={this.handleAssessmentBlur}
                    addCiteTdxAssessment={this.addCiteTdxAssessment}
                    setAssessmentUsageType={setAssessmentUsageType}
                    elementId={elementId}
                />
                <TinyMceEditor
                    slateLockInfo={this.props.slateLockInfo}
                    handleBlur={this.props.handleBlur}
                    model={this.props.model}
                    handleEditorFocus={this.props.handleFocus}
                    className="addLOdata"
                    permissions={this.props.permissions}
                    element={this.props.model}
                />
            </div>
        );
    }
}

AssessmentSlateCanvas.displayName = "AssessmentSlateCanvas"

const mapStateToProps = (state) => {
    return {
        permissions: state.appStore.permissions
    }
}

export default connect(mapStateToProps, {})(AssessmentSlateCanvas)