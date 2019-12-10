/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor";
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import '../../styles/ElementShowHide/ElementShowHide.css'
class ElementShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: ""
        };

    }
    conponentDidMount(){
        let eleemnt = document.queryselector('')
    }
    render() {
        const { model, index, element, slateLockInfo } = this.props;
        return (
            /*   <div className="divWidgetShowHide" resource="">
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
              </div> */

            <div class="divWidgetShowHide">
                <div class="pearson-component showHide" data-type="showHide">
                    <div class="divWidgetShowHideQuestionText show-hide show-hide-active" data-type="show">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle" resource="">Show</h4>
                        </header>
                        <div class="container">
                            <TinyMceEditor permissions={this.props.permissions}
                                openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                element={this.props.model}
                                index={`${index}-1`}
                                placeholder="Enter Show text"
                                id={this.props.id} tagName={'p'}
                                model={element.interactivedata && element.interactivedata.hide[0].html}
                                handleEditorFocus={this.props.handleFocus}
                                handleBlur={this.props.handleBlur}
                                slateLockInfo={slateLockInfo}
                                glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                elementId={this.props.elementId} />
                        </div>
                    </div>
                    <div class="divWidgetShowHideActionText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle " resource="">Button Expand text Customize:</h4>
                        </header>
                        <div class="container">
                            <TinyMceEditor permissions={this.props.permissions}
                                openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                element={this.props.model}
                                index={`${index}-2`}
                                placeholder="Enter revel text"
                                id={this.props.id} tagName={'p'}
                                model={element.interactivedata && element.interactivedata.hide[0].html}
                                handleEditorFocus={this.props.handleFocus}
                                handleBlur={this.props.handleBlur}
                                slateLockInfo={slateLockInfo}
                                glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                elementId={this.props.elementId} />
                        </div>

                    </div>
                    <div class="divWidgetShowHideAnswerText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle" resource="">Hide</h4>
                        </header>
                        <div class="container">
                            <TinyMceEditor permissions={this.props.permissions}
                                openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                element={this.props.model}
                                index={`${index}-3`}
                                placeholder="Enter Hide text"
                                id={this.props.id} tagName={'p'}
                                model={element.interactivedata && element.interactivedata.hide[0].html}
                                handleEditorFocus={this.props.handleFocus}
                                handleBlur={this.props.handleBlur}
                                slateLockInfo={slateLockInfo}
                                glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                elementId={this.props.elementId} />
                        </div>
                    </div>
                </div>
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