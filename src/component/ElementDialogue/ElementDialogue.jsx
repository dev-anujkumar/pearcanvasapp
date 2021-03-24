import React, { Fragment, useState } from 'react';
import Button from './../ElementButtons';
import TinyMceEditor from "../tinyMceEditor";
import DialogueContent from './DialogueContent.jsx';
import DialogueSeprator from './DialogueSeprator.jsx';
import "../../styles/ElementDialogue/DialogueStyles.css"

export default function ElementDialogue(props) {
    const [selectedInnerElementIndex, setInnerElementIndex] = useState(null)
    const elementIndex = props.index;
    // if (props.activeElement !== props.elementId) setInnerElementIndex(null)
    /**
        @renderDialogueContent | This function used to render Dialogue Content
        @param _props | This contains the props object 
    **/
    const renderDialogueContent = (_props) => {
        let dialogueContent = _props.element.html.dialogueContent;
        if (dialogueContent !== null && dialogueContent !== undefined) {
            const buttonClass = _props.btnClassName.replace("activeTagBgColor", "")
            return dialogueContent.map((element, index) => {
                let labelText = (element.type === 'lines') ? 'DE' : 'SD';
                return (
                    <Fragment key={element.id}>
                        {index === 0 && <DialogueSeprator
                            index={index}
                            elementIndex={elementIndex}
                            firstOne={index === 0}
                            // esProps={_props.elementSepratorProps(0, true, parentUrn, "", _props.index, null)}
                            elementType="element-dialogue"
                            sectionBreak={false}
                            permissions={_props.permissions}
                            onClickCapture={_props.onClickCapture}
                            userRole={_props.userRole}
                        />}
                        <div className={"editor"}
                            data-id={element.id}
                            onMouseOver={_props.handleOnMouseOver}
                            onMouseOut={_props.handleOnMouseOut}
                            onClickCapture={(e) => _props.onClickCapture(e)}
                        >
                            {renderButtons(index, buttonClass, labelText)}
                            <div
                                className={`element-container ${setBorderToggle(_props.borderToggle, index, selectedInnerElementIndex)}`}
                                data-id={_props.elementId}
                            // onClick={handleInnerFocus}
                            >
                                <DialogueContent
                                    index={index+1}
                                    elementIndex={elementIndex}
                                    labelText={labelText}
                                    element={_props.element}
                                    elementId={_props.element.id}
                                    model={element}
                                    type={_props.type}
                                    permissions={_props.permissions}
                                    handleBlur={_props.handleBlur}
                                    handleFocus={(...args) => handleInnerFocus(...args, index)}
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
                        <DialogueSeprator   index={index}
                                    elementIndex={elementIndex}
                            // esProps={_props.elementSepratorProps(index, false, parentUrn, "", _props.index, null)}
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
    const setBorderToggle = (elemBorderToggleFromProp, index, selectedInnerIndex) => {
        const borderToggleFromState = index === selectedInnerIndex && props.activeElement.elementId === props.elementId ? "active" : ""
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

    const renderButtons = (index, buttonClass, labelText) => {
        if ((props.elemBorderToggle !== undefined && props.elemBorderToggle) || props.borderToggle == 'active') {
            return (
                <div>
                    <Button
                        type="element-label"
                        btnClassName={`${buttonClass} ${index === selectedInnerElementIndex && props.borderToggle !== "showBorder" ? "activeTagBgColor" : ""}`}
                        labelText={labelText}
                    />
                    {
                        props.permissions && props.permissions.includes('elements_add_remove') ?
                            (<Button
                                type="delete-element"
                                onClick={(e) => props.showDeleteElemPopup(e, true)}
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
    const handleInnerFocus = (c2Flag, showHideObj, event, index) => {
        event.stopPropagation()
        setInnerElementIndex(index)
        props.handleFocus(c2Flag, showHideObj, event)
    }

    /**
     * Handles focus for outer parts (rest area except SD and DE)
     * @param {*} c2Flag 
     * @param {*} showHideObj 
     * @param {*} event Event object
     */
    const handleOuterFocus = (c2Flag, showHideObj, event) => {
        setInnerElementIndex(null)
        props.handleFocus(c2Flag, showHideObj, event)
    }

    const copmpProps = {
        permissions: props.permissions,
        element: props.element,
        slateLockInfo: props.slateLockInfo,
        elementId: props.elementId,
        handleBlur: props.handleBlur,
        handleEditorFocus: handleOuterFocus
    }
    return (
        (props !== null && props !== undefined) ?
            <div className="figureElement">
                <div className="divImageTextWidth">
                    <figure className="figureImageTextWidth" resource="">
                        <p id="startLineSetting">Start Line number-{props.element.elementdata.startNumber}</p>
                        <header className="figure-header">
                            <TinyMceEditor
                                {...copmpProps}
                                index={`${props.index}-0`}
                                placeholder="Enter Act Title..."
                                tagName={'h4'}
                                className={" figureLabel "}
                                model={props.element.html.actTitle}


                            />
                            <TinyMceEditor
                                {...copmpProps}
                                index={`${props.index}-1`}
                                placeholder="Enter Scene Title..."
                                tagName={'h4'}
                                className={" figureTitle "}
                                model={props.element.html.sceneTitle}
                            />
                        </header>
                        <div>
                            {renderDialogueContent(props)}
                        </div>
                    </figure>
                    <div>
                        <TinyMceEditor
                            {...copmpProps}
                            index={`${props.index}-4`}
                            placeholder="Enter Credit..."
                            tagName={'p'}
                            className={" figureCredit "}
                            model={props.element.html.credits}
                        />
                    </div>
                </div>
            </div>
            : ''
    )
}
