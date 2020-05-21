/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import config from '../../config/config';
import '../../styles/ElementShowHide/ElementShowHide.css'
import ElementContainerContext from '../ElementContainer/ElementContainerContext.js'
import ShowHideTinyMce from './ShowHideTinyMce.jsx'
import { hasReviewerRole } from '../../constants/utility.js'

class ElementShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: ""
        };

    }

    showHideCallBack = (status, index) => {
        let newIndex = index.split("-"),
            newshowIndex;
        if (status === "create") {
            newIndex[newIndex.length - 1] = parseInt(newIndex[newIndex.length - 1]) + 1
        } else if (status === "delete") {
            newIndex[newIndex.length - 1] = parseInt(newIndex[newIndex.length - 1]) - 1
        }

         newshowIndex = newIndex.join("-");
        if (document.querySelector(`#cypress-${newshowIndex}`)) {
            setTimeout(()=>{
                document.querySelector(`#cypress-${newshowIndex}`).click();
            },0)
        }
    }
    createShowHideElement = (type, index, elementShowHideId) => {
        this.context.createShowHideElement && this.context.createShowHideElement(this.context.element.id, type, index, this.context.element.contentUrn, this.showHideCallBack, this.context.element, this.context.index);
    }

    activeShowHide = (e) => {
        if (!hasReviewerRole()) {
            let activeElement = document.querySelector('.show-hide-active')
            if (activeElement && activeElement !== e.currentTarget.closest(".show-hide")) {
                document.querySelector('.show-hide-active').classList.remove("show-hide-active")
            }
            if (e.currentTarget && e.currentTarget.closest(".show-hide")) {
                e.currentTarget.closest(".show-hide").classList.add("show-hide-active")
            }
        }
    }

    deleteShowHideUnit = (id, type, contentUrn, index, eleIndex, parentId) => {
        this.context.deleteShowHideUnit && this.context.deleteShowHideUnit(id, type, contentUrn, index, eleIndex, parentId, this.showHideCallBack, this.context.element, this.context.index)
    }

    render() {
        const { index, element } = this.context;
        return (
            <div className="divWidgetShowHide"  onClick={(e)=>this.context.handleFocus("","",e)} >
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
                                        model={posterItem.html && posterItem.html.text }
                                        placeholder="This field cannot be empty, either add specific content or add in the default content of Reveal Answer"
                                        activeShowHide={this.activeShowHide}
                                        showHideType="revel"
                                        currentElement={posterItem}
                                        key={posterItem.id}
                                        createShowHideElement={this.createShowHideElement}
                                        deleteShowHideUnit={this.deleteShowHideUnit}
                                    />
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
ElementShowHide.contextType = ElementContainerContext;
//export default connect(null, { deleteShowHideUnit })(ElementShowHide)
export default ElementShowHide