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
    createShowHideElement =(type,index) =>{
        this.props.createShowHideElement(this.props.element.id,type,index);
    }

    activeShowHide = (e) =>{
       let activeElement =  document.querySelector('.show-hide-active')
       if(activeElement){
        document.querySelector('.show-hide-active').classList.remove("show-hide-active")
       }
        e.target.closest(".show-hide").classList.add("show-hide-active")
    }
    render() {
        const { model, index, element, slateLockInfo } = this.props;
        
        return (
            <div class="divWidgetShowHide">
                <div class="pearson-component showHide" data-type="showHide">
                    <div class="divWidgetShowHideQuestionText show-hide" data-type="show">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle" resource="">Show</h4>
                        </header>
                        <div class="container show">
                        {element && element.interactivedata.show.map((showItem,innerIndex)=>{
                            return ( 
                            <TinyMceEditor permissions={this.props.permissions}
                             openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                             element={this.props.element}
                             index={`${index}-1-${innerIndex}`}
                             placeholder="Enter Show text"
                             id={this.props.id} tagName={'p'}
                             model={showItem.html.text}
                             handleEditorFocus={this.props.handleFocus}
                             handleBlur={this.props.handleBlur}
                             slateLockInfo={slateLockInfo}
                             glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                             glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                             elementId={this.props.elementId} 
                             activeShowHide = {this.activeShowHide}
                             showHideType = "show"
                             createShowHideElement= {this.createShowHideElement}
                             />)
                        })}
                        </div>
                    </div>
                    <div class="divWidgetShowHideActionText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle " resource="">Button Expand text Customize:</h4>
                        </header>
                        <div class="container revel">
                            <TinyMceEditor permissions={this.props.permissions}
                                openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                element={this.props.element}
                                index={`${index}-2`}
                                placeholder="Enter revel text"
                                id={this.props.id} tagName={'p'}
                                model={element.interactivedata && element.interactivedata.postertextobject.html.text}
                                handleEditorFocus={this.props.handleFocus}
                                handleBlur={this.props.handleBlur}
                                slateLockInfo={slateLockInfo}
                                glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                elementId={this.props.elementId}
                                activeShowHide = {this.activeShowHide}
                                showHideType = "revel"
                                createShowHideElement = {this.createShowHideElement}
                                />
                        </div>
                    </div>
                    <div class="divWidgetShowHideAnswerText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle" resource="">Hide</h4>
                        </header>
                        <div class="container hide">
                         {element && element.interactivedata.hide.map((hideItem,innerIndex)=>{
                            return ( 
                            <TinyMceEditor permissions={this.props.permissions}
                             openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                             element={this.props.element}
                             index={`${index}-3-${innerIndex}`}
                             placeholder="Enter Hide text"
                             id={this.props.id} tagName={'p'}
                             model={hideItem.html.text}
                             handleEditorFocus={this.props.handleFocus}
                             handleBlur={this.props.handleBlur}
                             slateLockInfo={slateLockInfo}
                             glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                             glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                             elementId={this.props.elementId} 
                             activeShowHide = {this.activeShowHide}
                             showHideType = "hide"
                             createShowHideElement = {this.createShowHideElement}
                             />)
                        })}

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