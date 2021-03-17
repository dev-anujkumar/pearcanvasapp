import React, { Component, Fragment } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import Button from './../ElementButtons';
import { DialogueSaprator } from './DialogueSaprator.jsx';

class ElementDialogue extends Component {

    prepareLineDom = (model) => {
        let ConvertedModel = model && model.html && model.html.text.replace(/<p>/g, "")
        ConvertedModel = ConvertedModel && ConvertedModel.replace(/<\/p>/g, "")
        let lineModel = ConvertedModel ? ConvertedModel : '<span class="poetryLine"><br /></span>'
        return lineModel;
    }

    renderContents = (_props) => {
        console.log('DialogueElement===', _props)
        try {
            if (_props !== null && _props !== undefined) {
                return _props.element.html.dialogueContent.map((element, index) => {

                    // let lineModel = this.prepareLineDom(_props.model)
                    let labelText = (element.type === 'lines') ? 'DE' : 'SD';
                    let placeholder = (element.type === 'lines') ? 'Enter Stage Directions...' : 'Enter Dialogue...';
                    let parentUrn = {
                        manifestUrn: _props.elementId,
                        contentUrn: _props.element.contentUrn,
                        elementType: "element-dialogue"
                    }
                    return (
                        <div className={"editor"}
                            data-id={_props.element.id}
                            onMouseOver={this.handleOnMouseOver}
                            onMouseOut={this.handleOnMouseOut}
                            onClickCapture={(e) => _props.onClickCapture(e)}
                        >
                            {
                                (_props.elemBorderToggle !== undefined && _props.elemBorderToggle) || _props.borderToggle == 'active' ?
                                    <div>
                                        <Button
                                            type="element-label"
                                            btnClassName={`${_props.btnClassName}`}
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
                                data-id={_props.element.id}
                                onClick={(e) => this.handleFocus("", "", e, labelText)}
                            >
                                <Fragment key={element.id}>
                                    {/* {index === 0 && <DialogueSaprator
                                        index={index}
                                        firstOne={index === 0}
                                        esProps={_props.elementSepratorProps(0, true, parentUrn, "", _props.index, null)}
                                        elementType="element-dialogue"
                                        // poetryData={poetryData}
                                        sectionBreak={false}
                                        permissions={_props.permissions}
                                        onClickCapture={_props.onClickCapture}
                                        userRole={_props.userRole}
                                        pasteElement={_props.pasteElement}
                                    // source={POETRY_SOURCE}
                                    />} */}
                                    {
                                        (element.type === 'lines') ?
                                            <TinyMceEditor
                                                index={_props.index}
                                                elementId={_props.elementId}
                                                element={_props.element}
                                                placeholder={'Enter Character Name...'}
                                                className={_props.className}
                                                model={_props.element.html.characterName}
                                                tagName={'h4'}
                                                handleEditorFocus={_props.handleFocus}
                                                handleBlur={_props.handleBlur}
                                                slateLockInfo={_props.slateLockInfo}
                                                onListSelect={_props.onListSelect}
                                                permissions={_props.permissions}
                                                setActiveElement={_props.setActiveElement}
                                                btnClassName={_props.btnClassName}
                                                borderToggle={_props.borderToggle}
                                                elemBorderToggle={_props.elemBorderToggle}
                                                glossaryFootnoteValue={_props.glossaryFootnoteValue}
                                                glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                                                handleAudioPopupLocation={_props.handleAudioPopupLocation}
                                            /> 
                                        : ''
                                    }
                                    <TinyMceEditor
                                        index={_props.index}
                                        elementId={_props.elementId}
                                        element={_props.element}
                                        placeholder={placeholder}
                                        className={_props.className}
                                        model={_props.element.html.text}
                                        tagName={'div'}
                                        handleEditorFocus={_props.handleFocus}
                                        handleBlur={_props.handleBlur}
                                        slateLockInfo={_props.slateLockInfo}
                                        onListSelect={_props.onListSelect}
                                        permissions={_props.permissions}
                                        setActiveElement={_props.setActiveElement}
                                        btnClassName={_props.btnClassName}
                                        borderToggle={_props.borderToggle}
                                        elemBorderToggle={_props.elemBorderToggle}
                                        glossaryFootnoteValue={_props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                                        handleAudioPopupLocation={_props.handleAudioPopupLocation}
                                    />
                                    {/* <DialogueSaprator
                                        index={index}
                                        esProps={_props.elementSepratorProps(index, false, parentUrn, "", _props.index, null)}
                                        elementType="element-dialogue"
                                        // poetryData={poetryData}
                                        sectionBreak={false}
                                        permissions={_props.permissions}
                                        onClickCapture={_props.onClickCapture}
                                        userRole={_props.userRole}
                                        pasteElement={_props.pasteElement}
                                    // source={POETRY_SOURCE}
                                    /> */}
                                </Fragment>
                            </div>
                        </div>
                    );
                })
            }
        } catch (error) {
            console.log("DialogueContainerError::", error)
        }
    }

    render() {
        try {
            let _props = this.props;
            if (_props !== null && _props !== undefined) {
                return (
                    <div className="figureElement">
                        <div className="divImageTextWidth">
                            <figure className="figureImageTextWidth" resource="">
                                <header className="figure-header">
                                    <TinyMceEditor
                                        permissions={_props.permissions}
                                        openGlossaryFootnotePopUp={_props.openGlossaryFootnotePopUp}
                                        element={_props.element}
                                        handleEditorFocus={_props.handleFocus}
                                        handleBlur={_props.handleBlur}
                                        index={`${_props.index}-0`}
                                        placeholder="Enter Act Title..."
                                        tagName={'h4'}
                                        className={" figureLabel "}
                                        model={_props.element.html.actTitle}
                                        slateLockInfo={_props.slateLockInfo}
                                        glossaryFootnoteValue={_props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                                        elementId={_props.elementId}
                                    />
                                    <TinyMceEditor
                                        permissions={_props.permissions}
                                        openGlossaryFootnotePopUp={_props.openGlossaryFootnotePopUp}
                                        element={_props.element}
                                        handleEditorFocus={_props.handleFocus}
                                        handleBlur={_props.handleBlur}
                                        index={`${_props.index}-1`}
                                        placeholder="Enter Scene Title..."
                                        tagName={'h4'}
                                        className={" figureTitle "}
                                        model={_props.element.html.sceneTitle}
                                        slateLockInfo={_props.slateLockInfo}
                                        glossaryFootnoteValue={_props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                                        elementId={_props.elementId}
                                    />
                                </header>
                                <div>
                                    {this.renderContents(this.props)}
                                </div>
                            </figure>
                            <div>
                                <TinyMceEditor
                                    permissions={_props.permissions}
                                    openGlossaryFootnotePopUp={_props.openGlossaryFootnotePopUp}
                                    element={_props.element}
                                    handleEditorFocus={_props.handleFocus}
                                    handleBlur={_props.handleBlur}
                                    index={`${_props.index}-4`}
                                    placeholder="Enter Credit..."
                                    tagName={'p'}
                                    className={" figureCredit "}
                                    model={_props.element.html.credits}
                                    slateLockInfo={_props.slateLockInfo}
                                    glossaryFootnoteValue={_props.glossaryFootnoteValue}
                                    glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                                    elementId={_props.elementId}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        } catch (error) {
            console.error("Dialogue Element Error::", error);
        }
    }
}

export default ElementDialogue;













import React, { Fragment } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { DialogueSaprator } from './DialogueSaprator.jsx';

const DialogueContent = (_props) => {
    return (
        <Fragment key={element.id}>
            {/* {index === 0 && <DialogueSaprator
                index={index}
                firstOne={index === 0}
                // esProps={_props.elementSepratorProps(0, true, parentUrn, "", _props.index, null)}
                elementType="element-dialogue"
                // poetryData={poetryData}
                sectionBreak={false}
                permissions={_props.permissions}
                onClickCapture={_props.onClickCapture}
                userRole={_props.userRole}
                pasteElement={_props.pasteElement}
                // source={POETRY_SOURCE}
            />} */}
            <header className="figure-header">
                {
                    (element.type === 'lines') ?
                        <TinyMceEditor
                            index={index}
                            elementId={_props.elementId}
                            element={_props.element}
                            placeholder={'Enter Character Name...'}
                            className={_props.className}
                            model={element.characterName}
                            tagName={'h4'}
                            handleEditorFocus={_props.handleFocus}
                            handleBlur={_props.handleBlur}
                            slateLockInfo={_props.slateLockInfo}
                            onListSelect={_props.onListSelect}
                            permissions={_props.permissions}
                            setActiveElement={_props.setActiveElement}
                            btnClassName={_props.btnClassName}
                            borderToggle={_props.borderToggle}
                            elemBorderToggle={_props.elemBorderToggle}
                            glossaryFootnoteValue={_props.glossaryFootnoteValue}
                            glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                            handleAudioPopupLocation={_props.handleAudioPopupLocation}
                        />
                        : ''
                }
                <TinyMceEditor
                    index={index}
                    elementId={_props.elementId}
                    element={_props.element}
                    placeholder={placeholder}
                    className={_props.className}
                    model={element.text}
                    tagName={'div'}
                    handleEditorFocus={_props.handleFocus}
                    handleBlur={_props.handleBlur}
                    slateLockInfo={_props.slateLockInfo}
                    onListSelect={_props.onListSelect}
                    permissions={_props.permissions}
                    setActiveElement={_props.setActiveElement}
                    btnClassName={_props.btnClassName}
                    borderToggle={_props.borderToggle}
                    elemBorderToggle={_props.elemBorderToggle}
                    glossaryFootnoteValue={_props.glossaryFootnoteValue}
                    glossaaryFootnotePopup={_props.glossaaryFootnotePopup}
                    handleAudioPopupLocation={_props.handleAudioPopupLocation}
                />
            </header>
            {/* <DialogueSaprator
                index={index}
                // esProps={_props.elementSepratorProps(index, false, parentUrn, "", _props.index, null)}
                elementType="element-dialogue"
                // poetryData={poetryData}
                sectionBreak={false}
                permissions={_props.permissions}
                onClickCapture={_props.onClickCapture}
                userRole={_props.userRole}
                pasteElement={_props.pasteElement}
            // source={POETRY_SOURCE}
            /> */}
        </Fragment>
    )
}

export default DialogueContent;