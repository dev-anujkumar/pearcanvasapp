import React, { Component } from 'react';
import TinyMceEditor from "../../tinyMceEditor"
import { getTitleSubtitleModel } from "../../../constants/utility.js"
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
            figLabelClass= 'heading4ImageTextWidthNumberLabel',
            figTitleClass= 'heading4ImageTextWidthTitle',
            // figCaptionClass= 'figcaptionImageTextWidth',
            figCreditClass= 'paragraphImageTextWidthCredit'
            let formattedSubtitle, formattedTitle
            if(model.contents.hasOwnProperty('formatted-title')){
                /**
                 * New format
                 */
                formattedTitle = getTitleSubtitleModel(model.contents["formatted-title"].html.text, "formatted-title").replace(/&nbsp;/g, "")
                formattedSubtitle = getTitleSubtitleModel(model.contents["formatted-title"].html.text, "formatted-subtitle")
            }
            else{
                formattedSubtitle = `<p class="paragraphNumeroUno"><br/></p>`
                formattedTitle = `<p class="paragraphNumeroUno"><br/></p>`
            }

            // let formattedCaption = model.contents.hasOwnProperty('formatted-caption') ? model.contents["formatted-caption"].html && model.contents["formatted-caption"].html.text : "<p></p>";
            let formattedCredit = model.contents.hasOwnProperty('creditsarray') && model.contents['creditsarray'].length ?
                model.contents["creditsarray"][0].html && model.contents["creditsarray"][0].html.text : "<p><br/></p>";
            let subTitle
            let Title = subTitle = element.contents && element.contents['formatted-title']
            let credit = element.contents && element.contents.hasOwnProperty('creditsarray') && element.contents['creditsarray'][0]
            
            let poetryElem = <div className={divClass}>
                <div className={divContainerClass}>
                    <figure className={figureClass} >
                        <header>
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel formatted-text"} model={formattedTitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formatted-title" 
                             currentElement={Title}/>

                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle formatted-text"} model={formattedSubtitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="formatted-subtitle" 
                            currentElement={subTitle}/>
                        </header>

                        <div>
                            <WrappedComponent data={this.state} {...this.props} />
                        </div>
                        <figcredit>
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Credit..." tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={formattedCredit} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} createPoetryElements={this.props.createPoetryElements} poetryField="creditsarray"
                                currentElement={credit} />
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