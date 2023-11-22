import React, { Component } from 'react'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';
export class ElementBlockquote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { element, className, model, openGlossaryFootnotePopUp, slateLockInfo, openAssetPopoverPopUp, glossaryFootnoteValue,
                openMarkedIndexPopUp, markedIndexValue } = this.props
        let blockquoteClass = "blockquoteMarginalia"
        let firstClass = "paragraphNummerEins"
        let secondClass = "blockquoteTextCredit"
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = model.text;
        //checking no of childs in node
        let firstParaBlock = tempDiv.children[0]?.children[0]?.outerHTML
        let attrParaBlock = tempDiv.children[0]?.children[1]?.classList?.contains('blockquoteTextCredit') ?
                            tempDiv.children[0]?.children[1].outerHTML : tempDiv.children[0]?.children[2]?.outerHTML
        let blockquoteElement = 
      <div>
         <blockquote className={blockquoteClass}>
         <KeyboardWrapper enable index={`${this.props.index}-0`}>
                <TinyMceEditor
                    isBlockList={this.props.isBlockList}
                    openAssetPopoverPopUp={openAssetPopoverPopUp}
                    openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                    index={`${this.props.index}-0`}
                    elementId={this.props.elementId}
                    element={this.props.element}
                    placeholder={"Type Something..."}
                    className={firstClass}
                    model={firstParaBlock}
                    tagName="blockquote"
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
                    placeholder={"Attribution Text"}
                    className={secondClass}
                    model={attrParaBlock}
                    tagName="blockquote"
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
    </div>
        return blockquoteElement
    }
}


export default ElementBlockquote
