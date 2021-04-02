import React, { Fragment } from 'react';
import Button from './../ElementButtons';
import TinyMceEditor from "../tinyMceEditor";
import DialogueContent from './DialogueContent.jsx';
import DialogueSeprator from './DialogueSeprator.jsx';
import "../../styles/ElementDialogue/DialogueStyles.css"
import { connect } from 'react-redux';
import { updateElement } from '../ElementContainer/ElementContainer_Actions.js';
import config from "../../config/config.js";
import { sendDataToIframe, removeBlankTags, removeClassesFromHtml } from '../../constants/utility.js';
import { createPSDataForUpdateAPI } from './DialogueElementUtils';

class ElementDialogue extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedInnerElementIndex: null
        }
    }

    addElement = (psIndex, psElementIndex, data, oldPSData) => {
        const dialogueContent = oldPSData.html.dialogueContent;
        dialogueContent.splice(psElementIndex, 0, data);
        const newPsElement = {
            ...oldPSData,
            html: {
                ...oldPSData.html,
                dialogueContent
            }
        }
        this.callUpdateApi(newPsElement);
    }

    deleteElement = (psIndex, psElementIndex, oldPSData) => {
        const dialogueContent = oldPSData.html.dialogueContent;
        dialogueContent.splice(psElementIndex, 1);
        const newPsElement = {
            ...oldPSData,
            html: {
                ...oldPSData.html,
                dialogueContent
            }
        }
        this.callUpdateApi(newPsElement);
    }
    /**
     * 
        @renderDialogueContent | This function used to render Dialogue Content
        @param _props | This contains the props object 
    **/
    renderDialogueContent = (_props) => {
        let dialogueContent = _props.element?.html?.dialogueContent;
        if (dialogueContent !== null && dialogueContent !== undefined) {
            const buttonClass = _props.btnClassName.replace("activeTagBgColor", "")
            return dialogueContent.map((element, index) => {
                let labelText = (element.type === 'lines') ? 'DE' : 'SD';
                return (
                    <Fragment key={element.id}>
                        <div className={"editor"}
                            data-id={element.id}
                            onMouseOver={_props.handleOnMouseOver}
                            onMouseOut={_props.handleOnMouseOut}
                            onClickCapture={(e) => _props.onClickCapture(e)}
                        >
                            {this.renderButtons(index, buttonClass, labelText, _props.element)}
                            <div
                                className={`element-container ${this.setBorderToggle(_props.borderToggle, index, this.state.selectedInnerElementIndex)}`}
                                data-id={_props.elementId}
                            >
                                <DialogueContent
                                    index={index}
                                    elementIndex={this.props.index}
                                    labelText={labelText}
                                    element={_props.element}
                                    elementId={_props.element.id}
                                    model={_props?.element?.html?.dialogueContent}
                                    type={_props.type}
                                    permissions={_props.permissions}
                                    handleBlur={this.updateSD_DE}
                                    handleFocus={(...args) => this.handleInnerFocus(...args, index)}
                                    btnClassName={_props.btnClassName}
                                    borderToggle={_props.borderToggle}
                                    elemBorderToggle={_props.elemBorderToggle}
                                    elementSepratorProps={_props.elementSepratorProps}
                                    deleteElement={_props.deleteElement}
                                    userRole={_props.userRole}
                                    slateLockInfo={_props.slateLockInfo}
                                    updatePageNumber={_props.updatePageNumber}
                                />
                            </div>
                        </div>
                        <DialogueSeprator index={index}
                            elementIndex={this.props.index}
                            element={_props.element}
                            addElement={this.addElement}
                            elementType="element-dialogue"
                            sectionBreak={false}
                            permissions={_props.permissions}
                            onClickCapture={_props.onClickCapture}
                            userRole={_props.userRole}
                        />
                    </Fragment>
                )
            })
        }
    }

    /**
     * Handling border style and properties
     * @param {*} elemBorderToggleFromProp Slate level border based on toggle
     * @param {*} borderToggleFromState Element level border based on focus
     */
    setBorderToggle = (elemBorderToggleFromProp, index, selectedInnerIndex) => {
        const borderToggleFromState = index === selectedInnerIndex && this.props.activeElement.elementId === this.props.elementId ? "active" : ""
        if (elemBorderToggleFromProp !== 'undefined' && elemBorderToggleFromProp) {
            if (borderToggleFromState === 'active' && elemBorderToggleFromProp !== "showBorder") {
                return borderToggleFromState
            }
            else if (borderToggleFromState !== 'active' && elemBorderToggleFromProp === "hideBorder") {
                return 'hideBorder'
            } else {
                return 'showBorder'
            }
        }
        else {
            if (borderToggleFromState === 'active') {
                return borderToggleFromState
            }
            else {
                return 'hideBorder'
            }
        }
    }

    renderButtons = (index, buttonClass, labelText, element) => {
        if ((this.props.elemBorderToggle !== undefined && this.props.elemBorderToggle) || this.props.borderToggle == 'active') {
            return (
                <div>
                    <Button
                        type="element-label"
                        btnClassName={`${buttonClass} ${index === this.state.selectedInnerElementIndex && this.props.borderToggle !== "showBorder" ? "activeTagBgColor" : ""}`}
                        labelText={labelText}
                    />
                    {
                        this.props.permissions && this.props.permissions.includes('elements_add_remove') ?
                            (<Button
                                type="delete-element"
                                onClick={(e) => {
                                    this.deleteElement(this.props.index, index, element);
                                    // deleteElement(elementIndex, index, element);
                                    // show delete element popup
                                    // props.showDeleteElemPopup(e, true)
                                }}
                            />)
                            : null
                    }
                </div>
            )
        }
        return null
    }

    /**
     * Handles focus for inner elements (SD and DE)
     * @param {} c2Flag 
     * @param {*} showHideObj 
     * @param {*} event Event object
     * @param {*} index 
     */
    handleInnerFocus = (c2Flag, showHideObj, event, index) => {
        event.stopPropagation()
        this.setState({ selectedInnerElementIndex: index })
        this.props.handleFocus(c2Flag, showHideObj, event)
    }

    /**
     * Handles focus for outer parts (rest area except SD and DE)
     * @param {*} c2Flag 
     * @param {*} showHideObj 
     * @param {*} event Event object
     */
    handleOuterFocus = (c2Flag, showHideObj, event) => {
       this.setState({ selectedInnerElementIndex: null })
        this.props.handleFocus(c2Flag, showHideObj, event)
    }

    handleOuterBlur = (field, eventTarget) => {
        let newPSData = JSON.parse(JSON.stringify(this.props.element)) || {};
        if(newPSData?.html?.hasOwnProperty(field)){
            newPSData.html[field] = `<p>${removeBlankTags(eventTarget?.innerHTML)}</p>`  
            if (removeClassesFromHtml(this.props.element.html?.[field]) !== removeClassesFromHtml(newPSData.html[field]) && !config.savingInProgress) {
                // create data and call update API
                this.callUpdateApi(newPSData);
            }
        }
    }


    /* @@updateSD_DE - To update the data of SD and DE Element Data */
    updateSD_DE = (field, data, index) => {
        let newPSData = JSON.parse(JSON.stringify(this.props.element)) || {};
        if(newPSData?.html?.hasOwnProperty("dialogueContent")){
            newPSData.html.dialogueContent[index] = data;
            if (removeClassesFromHtml(this.props.element?.html?.dialogueContent[index][field]) !==
                removeClassesFromHtml(newPSData.html?.dialogueContent[index][field]) &&
                !config.savingInProgress) {
                // create data and call update API
                this.callUpdateApi(newPSData);
            }
        }
    }

    /* Update the data to server */
    callUpdateApi = (newPSData) => {
        /* @@createPSDataForUpdateAPI - Prepare the data to send to server */
        const { index, parentUrn, asideData, parentElement } = this.props;
        const dataToSend = createPSDataForUpdateAPI(this.props, newPSData)
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        config.isSavingElement = true
        this.props.updateElement(dataToSend, index, parentUrn, asideData, null, parentElement, null)
    }

  
    render(){
        const copmpProps = {
            permissions: this.props.permissions,
            element: this.props.element,
            slateLockInfo: this.props.slateLockInfo,
            elementId: this.props.elementId,
            handleEditorFocus: this.handleOuterFocus
        }
        return (
            (this.props !== null && this.props !== undefined) ?
                <div className="figureElement">
                    <div className="divImageTextWidth">
                        <figure className="figureImageTextWidth" resource="">
                            <p id="startLineSetting">Start Line number-{this.props.element?.elementdata?.startNumber || 1}</p>
                            <header className="figure-header">
                                <TinyMceEditor
                                    {...copmpProps}
                                    index={`${this.props.index}-Act-Title`}
                                    placeholder="Enter Act Title..."
                                    tagName={'h4'}
                                    className={" figureLabel "}
                                    model={this.props.element?.html?.actTitle}
                                    handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => this.handleOuterBlur("actTitle", eventTarget)}

                                />
                                <TinyMceEditor
                                    {...copmpProps}
                                    index={`${this.props.index}-Scene-Title`}
                                    placeholder="Enter Scene Title..."
                                    tagName={'h4'}
                                    className={" figureTitle "}
                                    model={this.props.element?.html?.sceneTitle}
                                    handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => this.handleOuterBlur("sceneTitle", eventTarget)}
                                />
                            </header>
                            <div>
                                {<DialogueSeprator
                                    index={0}
                                    addElement={this.addElement}
                                    element={this.props.element}
                                    elementIndex={this.props.index}
                                    firstOne={true}
                                    elementType="element-dialogue"
                                    sectionBreak={false}
                                    permissions={this.props.permissions}
                                    onClickCapture={this.props.onClickCapture}
                                    userRole={this.props.userRole}
                                />
                                }
                                {this.renderDialogueContent(this.props)}
                            </div>
                        </figure>
                        <div>
                            <TinyMceEditor
                                {...copmpProps}
                                index={`${this.props.index}-Credit`}
                                placeholder="Enter Credit..."
                                tagName={'p'}
                                className={" figureCredit "}
                                model={this.props.element?.html?.credits}
                                handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => this.handleOuterBlur("credits", eventTarget)}
                            />
                        </div>
                    </div>
                </div>
                : ''
        )
    }
}

const dispatchActions = {
    updateElement
}

const mapStateToProps = ({ appStore }) => {
    return {
        asideData: appStore.asideData,
        parentUrn: appStore.parentUrn
    }
}

ElementDialogue.displayName = "ElementDialogue"
export default connect(mapStateToProps, dispatchActions)(ElementDialogue);

