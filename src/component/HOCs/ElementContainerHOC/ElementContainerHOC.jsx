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

            let divClass = 'divImageTextWidth',
            figureClass= 'figureImageTextWidth',
            figLabelClass= 'heading4ImageTextWidthNumberLabel',
            figTitleClass= 'heading4ImageTextWidthTitle',
            figCaptionClass= 'figcaptionImageTextWidth',
            figCreditClass= 'paragraphImageTextWidthCredit'

            let poetryElem = <div className={divClass}>
                <figure className={figureClass} >
                    <header>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.contents["formatted-label"].text} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.contents["formatted-title"].text} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </header>

                    <div>
                        <WrappedComponent data={this.state} {...this.props} />
                    </div>

                    <figcaption className={figCaptionClass} >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.contents["formatted-caption"].text} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </figcaption>

                    <div>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.contents["formatted-credit"].text} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </div>
                </figure>
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