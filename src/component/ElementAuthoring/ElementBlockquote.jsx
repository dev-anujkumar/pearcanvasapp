import React, { Component } from 'react'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';
export class ElementBlockquote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { element, className, model, openGlossaryFootnotePopUp, slateLockInfo, openAssetPopoverPopUp, glossaryFootnoteValue, openMarkedIndexPopUp, markedIndexValue } = this.props
        let blockquoteClass = "blockquoteMarginalia"
        let xyz = "<p class=paragraphNummerEins contenteditable=true><br></p>"
        let abc = "<p class=\"blockquoteTextCredit\" contenteditable=\"true\" data-placeholder=\"Attribution Text\">aa</p>"
        console.log('INSIDE BLOCKQUOTE', model)
        let blockquoteElement = <blockquote className={blockquoteClass} contentEditable={false}>
            <KeyboardWrapper enable index={`${this.props.index}-0`}>
                <TinyMceEditor
                    isBlockList={this.props.isBlockList}
                    openAssetPopoverPopUp={openAssetPopoverPopUp}
                    openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                    index={`${this.props.index}-0`}
                    elementId={this.props.elementId}
                    element={this.props.element}
                    placeholder={this.props.placeholder !== undefined ? this.props.placeholder : "Type Something..."}
                    className={className}
                    model={xyz}
                    tagName={this.props.tagName}
                    handleEditorFocus={this.props.handleFocus}
                    handleBlur={this.props.handleBlur}
                    slateLockInfo={slateLockInfo}
                    onListSelect={this.props.onListSelect}
                    permissions={this.props.permissions}
                    glossaryFootnoteValue={glossaryFootnoteValue}
                    glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                    handleAudioPopupLocation={this.props.handleAudioPopupLocation}
                    handleAssetsPopupLocation={this.props.handleAssetsPopupLocation}
                    showHideType={this.props?.showHideType}
                    parentElement={this.props?.parentElement}
                    openMarkedIndexPopUp={openMarkedIndexPopUp}
                    markedIndexValue={markedIndexValue}
                    parentManifestListItem={this?.props?.parentManifestListItem}
                />
            </KeyboardWrapper>
            <KeyboardWrapper enable index={`${this.props.index}-1`}>
                <TinyMceEditor
                    isBlockList={this.props.isBlockList}
                    openAssetPopoverPopUp={openAssetPopoverPopUp}
                    openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                    index={`${this.props.index}-1`}
                    elementId={this.props.elementId}
                    element={this.props.element}
                    placeholder={this.props.placeholder !== undefined ? this.props.placeholder : "Type Something..."}
                    className={className}
                    model={abc}
                    tagName={this.props.tagName}
                    handleEditorFocus={this.props.handleFocus}
                    handleBlur={this.props.handleBlur}
                    slateLockInfo={slateLockInfo}
                    onListSelect={this.props.onListSelect}
                    permissions={this.props.permissions}
                    glossaryFootnoteValue={glossaryFootnoteValue}
                    glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                    handleAudioPopupLocation={this.props.handleAudioPopupLocation}
                    handleAssetsPopupLocation={this.props.handleAssetsPopupLocation}
                    showHideType={this.props?.showHideType}
                    parentElement={this.props?.parentElement}
                    openMarkedIndexPopUp={openMarkedIndexPopUp}
                    markedIndexValue={markedIndexValue}
                    parentManifestListItem={this?.props?.parentManifestListItem}
                />
            </KeyboardWrapper>
        </blockquote>
        return blockquoteElement
    }
}


export default ElementBlockquote