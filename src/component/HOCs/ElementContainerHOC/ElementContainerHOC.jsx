import React, { Component } from 'react';
import TinyMceEditor from "../../tinyMceEditor"
import { getTitleSubtitleModel } from "../../../constants/utility.js"
import KeyboardWrapper from '../../Keyboard/KeyboardWrapper.jsx';
import { FORMATTED_TITLE } from '../../../constants/Element_Constants';
/**
* @description - ElementContainerHOC is a HOC. It is defined simply
* to make a HOC skeleton of the Poetry alike Element.
*/
const ElementContainerHOC = (WrappedComponent) => {
    // ...and returns another component...
    return class extends Component {

        renderContainer = (model, index, slateLockInfo) => {
            const { element } = this.props

            let divClass = 'figureElement',
            divContainerClass= 'divImageTextWidth',
            figureClass='figureImageTextWidth',
            figTitleClass= 'heading4ImageTextWidthTitle',
            // figCaptionClass= 'figcaptionImageTextWidth',
            figCreditClass= 'paragraphImageTextWidthCredit'
            let formattedSubtitle, formattedTitle
            if(model.contents.hasOwnProperty(FORMATTED_TITLE)){
                /**
                 * New format
                 */
                formattedTitle = getTitleSubtitleModel(model.contents[FORMATTED_TITLE].html.text, FORMATTED_TITLE).replace(/&nbsp;/g, "")
                formattedSubtitle = getTitleSubtitleModel(model.contents[FORMATTED_TITLE].html.text, "formatted-subtitle")
            }
            else{
                formattedSubtitle = `<p class="paragraphNumeroUno"><br/></p>`
                formattedTitle = `<p class="paragraphNumeroUno"><br/></p>`
            }

            let formattedCredit = model.contents.hasOwnProperty('creditsarray') && model.contents['creditsarray'].length ?
                model.contents["creditsarray"][0].html && model.contents["creditsarray"][0].html.text : "<p><br/></p>";
            let subTitle
            let credit = element.contents && element.contents.hasOwnProperty('creditsarray') && element.contents['creditsarray'][0]

            let poetryElem = <div className={divClass}>
                <div className={divContainerClass}>
                    <figure className={figureClass} >
                        <header>
                            <KeyboardWrapper index={`${this.props.index}-0`} enable>
                                <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle formatted-text"} model={formattedSubtitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formatted-subtitle"
                                    currentElement={subTitle} showHideType={this?.props?.showHideType} />
                            </KeyboardWrapper>
                        </header>

                        <div>
                            <WrappedComponent data={this.state} {...this.props} />
                        </div>
                        <figcredit>
                            <KeyboardWrapper index={`${this.props.index}-1`} enable>
                                <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Credit..." tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={formattedCredit} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="creditsarray"
                                    currentElement={credit} showHideType={this?.props?.showHideType} />
                            </KeyboardWrapper>
                        </figcredit>
                    </figure>
                </div>
            </div>

            return poetryElem
        }

        render() {
            const { model, index, slateLockInfo } = this.props;
            return this.renderContainer(model, index, slateLockInfo)
        }
    };
}

export default ElementContainerHOC;
