/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor";
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';

class ElementShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: ""
        };

    }


    render() {
        const { model, index, element, slateLockInfo } = this.props;
        return (

            /*   <div className="interactive-element">
                  {this.renderInteractiveType(model, itemId, index, slateLockInfo)}
                  {this.state.showAssesmentpopup? <PopUp handleC2Click ={this.handleC2InteractiveClick} togglePopup={this.togglePopup}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
              </div> */

            <div className="divWidgetShowHide" resource="">
                <figure className="figureWidgetShowHide" resource="">
                    <header>
                        <h4 className="heading4WidgetShowHideTitle" resource=""></h4>
                    </header>
                    <div className="pearson-component showHide" data-uri="" data-type="showHide" data-width="600" data-height="399" >
                        <div data-reactroot="">
                            <div className="sh-container">
                                <div>
                                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className="paragraphShowHideWidgetQuestionText" placeholder="Enter shown text" tagName={'p'}
                                        model={element.interactivedata && element.interactivedata.show[0].html} id={this.props.id} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                                    <p className="paragraphNumeroUno revealAns" resource="" aria-label="Reveal Answer">
                                        <a className="paragraphNumeroUno">
                                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} placeholder="Enter hidden text"
                                                id={this.props.id} tagName={'p'}
                                                model={element.interactivedata && element.interactivedata.hide[0].html} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figcaption className="figcaptionWidgetShowHide" resource=""></figcaption>
                </figure>
                <p className="paragraphWidgetShowHideCredit"></p>
            </div>

        )

    }
}
ElementShowHide.displayName = "ElementShowHide";

ElementShowHide.defaultProps = {
    /** Detail of element in JSON object */
    itemId: ""
}

ElementShowHide.propTypes = {

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func,
    /** itemId coming from c2module */
    itemId: PropTypes.string
}
export default ElementShowHide;