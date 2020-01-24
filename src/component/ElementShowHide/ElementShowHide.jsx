/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor";
// import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import '../../styles/ElementShowHide/ElementShowHide.css'
import { deleteShowHideUnit } from "../ElementContainer/ElementContainer_Actions.js"
import ElementContainerContext from '../ElementContainer/ElementContainerContext.js'
import ShowHideTinyMce from './ShowHideTinyMce.jsx'
class ElementShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: "",
            currentElement: {}
        };

    }
    createShowHideElement = (type, index, elementShowHideId) => {
        this.context.createShowHideElement(this.context.element.id, type, index, this.context.element.contentUrn, (status) => {
            if (status) {
                let newIndex = index.split("-")
                newIndex[newIndex.length - 1] = parseInt(newIndex[newIndex.length - 1]) + 1
                let newshowIndex = newIndex.join("-");
                if (document.getElementById(`cypress-${newshowIndex}`)) {
                    document.getElementById(`cypress-${newshowIndex}`).focus();
                }
            }
        });
    }

    activeShowHide = (e, currentElement) => {
        let activeElement = document.querySelector('.show-hide-active')
        if (activeElement && activeElement !== e.currentTarget.closest(".show-hide")) {
            document.querySelector('.show-hide-active').classList.remove("show-hide-active")

        }
        if (e.currentTarget && e.currentTarget.closest(".show-hide")) {
            e.currentTarget.closest(".show-hide").classList.add("show-hide-active")
        }
        //this.setState({currentElement:currentElement});

    }

    deleteShowHideUnit = (id, type, contentUrn, index, eleIndex, parentId) => {
        this.props.deleteShowHideUnit(id, type, contentUrn, index, eleIndex, parentId, (status) => {
            if (status) {
                let newIndex = eleIndex.split("-")
                newIndex[newIndex.length - 1] = parseInt(newIndex[newIndex.length - 1]) - 1
                let newshowIndex = newIndex.join("-");
                if (document.getElementById(`cypress-${newshowIndex}`)) {
                    document.getElementById(`cypress-${newshowIndex}`).focus();
                }
            }
        })
    }

    render() {
        const { index, element, slateLockInfo } = this.context;

        return (
            <div className="divWidgetShowHide" /* onClick={() => this.props.handleFocus("",this.state.currentElement)} */>
                <div className="pearson-component showHide" data-type="showHide" >
                    <div className="divWidgetShowHideQuestionText show-hide" data-type="show">
                        <header className="showhideHeader">
                            <h4 className="heading4WidgetShowHideTitle" resource="">Show</h4>
                        </header>
                        <div className="container show">
                            {element && element.interactivedata.show && element.interactivedata.show.map((showItem, innerIndex) => {
                                return (<ShowHideTinyMce
                                    index={`${index}-1-${innerIndex}`}
                                    innerIndex={innerIndex}
                                    model={showItem.html.text}
                                    activeShowHide={this.activeShowHide}
                                    placeholder="Enter Show text"
                                    showHideType="show"
                                    currentElement={showItem}
                                    key={showItem.id}
                                    createShowHideElement={this.createShowHideElement}
                                    deleteShowHideUnit={this.deleteShowHideUnit}
                                />
                                    /* <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-1-${innerIndex}`}
                                        innerIndex = {innerIndex}
                                        placeholder="Enter Show text"
                                        id={showItem.id}
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
                                        onListSelect={this.props.onListSelect}
                                        deleteShowHideUnit = {this.deleteShowHideUnit}
                                    /> */

                                )
                            })}
                        </div>
                    </div>
                    <div className="divWidgetShowHideActionText show-hide" data-type="action">
                        <header className="showhideHeader">
                            <h4 className="heading4WidgetShowHideTitle " resource="">Button Expand text Customize:</h4>
                        </header>
                        <div className="container revel">

                            {element && element.interactivedata.postertextobject && element.interactivedata.postertextobject.map((posterItem, innerIndex) => {
                                return (
                                    <ShowHideTinyMce
                                        index={`${index}-2-${innerIndex}`}
                                        innerIndex={innerIndex}
                                        model={posterItem.elementdata.text && posterItem.elementdata.text !== "" || posterItem.html.text.match(/<img/) ? posterItem.html.text : "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"}
                                        placeholder="This field cannot be empty, either add specific content or add in the default content of Reveal Answer"
                                        activeShowHide={this.activeShowHide}
                                        showHideType="revel"
                                        currentElement={posterItem}
                                        key={posterItem.id}
                                        createShowHideElement={this.createShowHideElement}
                                        deleteShowHideUnit={this.deleteShowHideUnit}
                                    />
                                    /* <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-2-${innerIndex}`}
                                        innerIndex={innerIndex}
                                        placeholder="This field cannot be empty, either add specific content or add in the default content of Reveal Answer"
                                        model={posterItem.elementdata.text && posterItem.elementdata.text !== "" || posterItem.html.text.match(/<img/) ? posterItem.html.text : "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"}
                                        handleEditorFocus={this.props.handleFocus}
                                        handleBlur={this.props.handleBlur}
                                        slateLockInfo={slateLockInfo}
                                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                        elementId={this.props.elementId}
                                        activeShowHide={this.activeShowHide}
                                        showHideType="revel"
                                        createShowHideElement={this.createShowHideElement}
                                        currentElement={posterItem}
                                        onListSelect={this.props.onListSelect}
                                        key={posterItem}
                                    /> */
                                )
                            })}
                        </div>
                    </div>
                    <div className="divWidgetShowHideAnswerText show-hide" data-type="action">
                        <header className="showhideHeader">
                            <h4 className="heading4WidgetShowHideTitle" resource="">Hide</h4>
                        </header>
                        <div className="container hide">
                            {element && element.interactivedata.hide && element.interactivedata.hide.map((hideItem, innerIndex) => {
                                return (
                                    <ShowHideTinyMce
                                        index={`${index}-3-${innerIndex}`}
                                        innerIndex={innerIndex}
                                        placeholder="Enter Hide text"
                                        model={hideItem.html.text}
                                        activeShowHide={this.activeShowHide}
                                        showHideType="hide"
                                        currentElement={hideItem}
                                        key={hideItem.id}
                                        createShowHideElement={this.createShowHideElement}
                                        deleteShowHideUnit={this.deleteShowHideUnit}
                                    />
                                   /*  <TinyMceEditor permissions={this.props.permissions}
                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                        element={this.props.element}
                                        index={`${index}-3-${innerIndex}`}
                                        innerIndex={innerIndex}
                                        placeholder="Enter Hide text"
                                        id={hideItem.id}
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
                                        currentElement={hideItem}
                                        deleteShowHideUnit={this.deleteShowHideUnit}
                                        onListSelect={this.props.onListSelect}
                                    /> */)
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
ElementShowHide.contextType = ElementContainerContext;
export default connect(null, { deleteShowHideUnit })(ElementShowHide)
// export default ElementShowHide;