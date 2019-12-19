/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor";
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import '../../styles/ElementShowHide/ElementShowHide.css'
import { deleteShowHideUnit } from "../ElementContainer/ElementContainer_Actions.js"

class ElementShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: ""
        };

    }

    createShowHideElement = (type, index, elementShowHideId) => {
        this.props.createShowHideElement(this.props.element.id, type, index, this.props.element.contentUrn, () => {
                let newIndex = index.split("-")
                newIndex[2] = parseInt(newIndex[2]) + 1
                let newshowIndex = newIndex.join("-")
                if (document.getElementById(`cypress-${newshowIndex}`)) {
                    document.getElementById(`cypress-${newshowIndex}`).focus();
                }
        });
    }

    activeShowHide = (e) => {
        let activeElement = document.querySelector('.show-hide-active')
        if (activeElement && activeElement!== e.currentTarget.closest(".show-hide")) {
            document.querySelector('.show-hide-active').classList.remove("show-hide-active")
            
        }
        if (e.currentTarget && e.currentTarget.closest(".show-hide")) {
            e.currentTarget.closest(".show-hide").classList.add("show-hide-active")
        }
       

    }

    deleteShowHideUnit = (id, type, contentUrn, index) => {
        this.props.deleteShowHideUnit(id, type, contentUrn, index)
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
                            {element && element.interactivedata.show && element.interactivedata.show.map((showItem, innerIndex) => {
                                return (
                                    <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-1-${innerIndex}`}
                                        innerIndex = {innerIndex}
                                        placeholder="Enter Show text"
                                        id={showItem.id}
                                        //  tagName={'p'}
                                        model={showItem.html.text}
                                        handleEditorFocus={this.props.handleFocus}
                                        handleBlur={this.props.handleBlur}
                                        slateLockInfo={slateLockInfo}
                                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                        elementId={this.props.elementId}
                                        activeShowHide={this.activeShowHide}
                                        showHideType="show"
                                        createShowHideElement={this.createShowHideElement}
                                        currentElement = {showItem}
                                        deleteShowHideUnit = {this.deleteShowHideUnit}
                                    />)
                            })}
                        </div>
                    </div>
                    <div class="divWidgetShowHideActionText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle " resource="">Button Expand text Customize:</h4>
                        </header>
                        <div class="container revel">

                            {element && element.interactivedata.postertextobject && element.interactivedata.postertextobject.map((posterItem, innerIndex) => {
                                return (
                                    <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-2-${innerIndex}`}
                                        innerIndex = {innerIndex}
                                        placeholder="This cannot be left blank"
                                        // id={ posterItem.id} tagName={'p'}
                                        model={posterItem.elementdata.text && posterItem.elementdata.text !== "" ? posterItem.html.text : "<p class=\"paragraphNumeroUno\">Revel Answer:</p>"}
                                        handleEditorFocus={this.props.handleFocus}
                                        handleBlur={this.props.handleBlur}
                                        slateLockInfo={slateLockInfo}
                                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                        elementId={this.props.elementId}
                                        activeShowHide={this.activeShowHide}
                                        showHideType="revel"
                                        createShowHideElement={this.createShowHideElement}
                                        currentElement = {posterItem}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div class="divWidgetShowHideAnswerText show-hide" data-type="action">
                        <header>
                            <h4 className="heading4WidgetShowHideTitle" resource="">Hide</h4>
                        </header>
                        <div class="container hide">
                            {element && element.interactivedata.hide && element.interactivedata.hide.map((hideItem, innerIndex) => {
                                return (
                                    <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-3-${innerIndex}`}
                                        innerIndex = {innerIndex}
                                        placeholder="Enter Hide text"
                                        id={hideItem.id}
                                        //  tagName={'p'}
                                        model={hideItem.html.text}
                                        handleEditorFocus={this.props.handleFocus}
                                        handleBlur={this.props.handleBlur}
                                        slateLockInfo={slateLockInfo}
                                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                        elementId={this.props.elementId}
                                        activeShowHide={this.activeShowHide}
                                        showHideType="hide"
                                        createShowHideElement={this.createShowHideElement}
                                        currentElement = {hideItem}
                                        deleteShowHideUnit = {this.deleteShowHideUnit}
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

export default connect(null, { deleteShowHideUnit })(ElementShowHide)
// export default ElementShowHide;