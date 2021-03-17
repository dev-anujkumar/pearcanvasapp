import React, { Fragment } from 'react';
import Button from './../ElementButtons';
import TinyMceEditor from "../tinyMceEditor";
import DialogueContent from './DialogueContent.jsx';
import DialogueSeprator from './DialogueSeprator.jsx';

export default function ElementDialogue(props) {
    /**
        renderDialogueContent | This function used to render Dialogue Content
        @param _props | This contains the props object 
    **/
    const renderDialogueContent = (_props) => {
        let dialogueContent = _props.element.html.dialogueContent;
        if (dialogueContent !== null && dialogueContent !== undefined) {
            return dialogueContent.map((element, index) => {
                let labelText = (element.type == 'lines') ? 'DE' : 'SD';
                return (
                    <Fragment key={element.id}>
                        {index === 0 && <DialogueSeprator
                            index={index}
                            firstOne={index === 0}
                            // esProps={_props.elementSepratorProps(0, true, parentUrn, "", _props.index, null)}
                            elementType="element-dialogue"
                            sectionBreak={false}
                            permissions={_props.permissions}
                            onClickCapture={_props.onClickCapture}
                            userRole={_props.userRole}
                            pasteElement={_props.pasteElement}
                        />}
                        <div className={"editor"}
                            data-id={element.id}
                            onMouseOver={_props.handleOnMouseOver}
                            onMouseOut={_props.handleOnMouseOut}
                            onClickCapture={(e) => _props.onClickCapture(e)}
                        >
                            {((_props.elemBorderToggle !== undefined && _props.elemBorderToggle) || _props.borderToggle == 'active') ?
                                <div>
                                    <Button
                                        type="element-label"
                                        btnClassName={_props.btnClassName}
                                        labelText={labelText}
                                        copyContext={(e) => { OnCopyContext(e, this.toggleCopyMenu) }}
                                        onClick={(event) => this.labelClickHandler(event)}
                                    />
                                    {
                                        _props.permissions && _props.permissions.includes('elements_add_remove') ?
                                            (<Button
                                                type="delete-element"
                                                onClick={(e) => this.showDeleteElemPopup(e, true)}
                                            />)
                                            : null
                                    }
                                </div>
                                : ''
                            }
                            <div
                                className={`element-container ${_props.borderToggle}`}
                                data-id={_props.elementId}
                                onClick={(e) => this.handleFocus("", "", e, labelText)}
                            >
                                <DialogueContent
                                    index={index}
                                    labelText={labelText}
                                    element={_props.element}
                                    elementId={_props.element.id}
                                    model={element}
                                    type={_props.type}
                                    permissions={_props.permissions}
                                    handleBlur={_props.handleBlur}
                                    handleFocus={_props.handleFocus}
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
                        <DialogueSeprator
                            index={index}
                            // esProps={_props.elementSepratorProps(index, false, parentUrn, "", _props.index, null)}
                            elementType="element-dialogue"
                            sectionBreak={false}
                            permissions={_props.permissions}
                            onClickCapture={_props.onClickCapture}
                            userRole={_props.userRole}
                            pasteElement={_props.pasteElement}
                        />
                    </Fragment>
                )
            })
        }
    }

    return (
        (props !== null && props !== undefined) ?
            <div className="figureElement">
                <div className="divImageTextWidth">
                    <figure className="figureImageTextWidth" resource="">
                        <header className="figure-header">
                            <TinyMceEditor
                                permissions={props.permissions}
                                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                                element={props.element}
                                handleEditorFocus={props.handleFocus}
                                handleBlur={props.handleBlur}
                                index={`${props.index}-0`}
                                placeholder="Enter Act Title..."
                                tagName={'h4'}
                                className={" figureLabel "}
                                model={props.element.html.actTitle}
                                slateLockInfo={props.slateLockInfo}
                                glossaryFootnoteValue={props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
                                elementId={props.elementId}
                            />
                            <TinyMceEditor
                                permissions={props.permissions}
                                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                                element={props.element}
                                handleEditorFocus={props.handleFocus}
                                handleBlur={props.handleBlur}
                                index={`${props.index}-1`}
                                placeholder="Enter Scene Title..."
                                tagName={'h4'}
                                className={" figureTitle "}
                                model={props.element.html.sceneTitle}
                                slateLockInfo={props.slateLockInfo}
                                glossaryFootnoteValue={props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
                                elementId={props.elementId}
                            />
                        </header>
                        <div>
                            {renderDialogueContent(props)}
                        </div>
                    </figure>
                    <div>
                        <TinyMceEditor
                            permissions={props.permissions}
                            openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                            element={props.element}
                            handleEditorFocus={props.handleFocus}
                            handleBlur={props.handleBlur}
                            index={`${props.index}-4`}
                            placeholder="Enter Credit..."
                            tagName={'p'}
                            className={" figureCredit "}
                            model={props.element.html.credits}
                            slateLockInfo={props.slateLockInfo}
                            glossaryFootnoteValue={props.glossaryFootnoteValue}
                            glossaaryFootnotePopup={props.glossaaryFootnotePopup}
                            elementId={props.elementId}
                        />
                    </div>
                </div>
            </div>
            : ''
    )
}