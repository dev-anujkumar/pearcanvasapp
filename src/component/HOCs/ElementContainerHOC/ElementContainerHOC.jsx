import React, { Component } from 'react';
import TinyMceEditor from "../../tinyMceEditor"
import figureData from './../../ElementFigure/figureTypes';


const containerWrapper = (WrappedComponent) => {
    // ...and returns another component...
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                someValues: 12
            };
        }
        
        renderContainer = (model, index, slateLockInfo) => {

            let divClass = 'figureElement',
            divContainerClass= 'divImageTextWidth',
            figureClass='figureImageTextWidth',
            figLabelClass= 'heading4ImageTextWidthNumberLabel',
            figTitleClass= 'heading4ImageTextWidthTitle',
            figCaptionClass= 'figcaptionImageTextWidth',
            figCreditClass= 'paragraphImageTextWidthCredit'
            
            let formattedSubtitle = model.contents.hasOwnProperty('formatted-subtitle') ? model.contents["formatted-subtitle"].html.text : "<p></p>";
            let formattedTitle = model.contents.hasOwnProperty('formatted-title') ? model.contents["formatted-title"].html.text : "<p></p>";
            let formattedCaption = model.contents.hasOwnProperty('formatted-caption') ? model.contents["formatted-caption"].html.text : "<p></p>";
            let formattedCredit = model.contents.hasOwnProperty('formatted-credit') ? model.contents["formatted-credit"].html.text : "<p></p>";

            let poetryElem = <div className={divClass}>
                <div className={divContainerClass}>
                    <figure className={figureClass} >
                        <header>
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={formattedTitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formattedTitle" />

                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={formattedSubtitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formattedSubtitle" />
                        </header>

                        <div>
                            <WrappedComponent data={this.state} {...this.props} />
                        </div>

                        <figcaption className={figCaptionClass} >
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={formattedCaption} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formattedCaption" />
                        </figcaption>

                        <div>
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={formattedCredit} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formattedCredit" />
                        </div>
                    </figure>
                </div>
            </div>

            return poetryElem
        }

        render() {
            const { model, index, slateLockInfo } = this.props;
            return this.renderContainer(model, index, slateLockInfo)
            // return "Hello Poetry element"
            //return <WrappedComponent data={...this.state} {...this.props} />;
        }
    };
}

export default containerWrapper;