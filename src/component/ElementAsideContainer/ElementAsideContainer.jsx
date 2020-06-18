// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sortable from 'react-sortablejs';
import config from '../../config/config';
// IMPORT - Components //
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import { guid } from '../../constants/utility.js';
import PageNumberElement from '../SlateWrapper/PageNumberElement.jsx';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import './../../styles/ElementAsideContainer/ElementAsideContainer.css';
import SectionSeperator from './SectionSeperator.jsx';
import { checkSlateLock } from "../../js/slateLockUtility.js"
// IMPORT - Assets //

let random = guid();

class ElementAsideContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionFocus: false,
            btnClassName: ""

        }
        this.asideRef = React.createRef();
    }

    handleFocus = (e) => {
        if(e.target && !(e.target.classList.contains('elemDiv-hr') || e.target.classList.contains('aside-container'))){
            return false;
        }

        if (checkSlateLock(this.props.slateLockInfo)) {
            return false
        }
        this.props.setActiveElement(this.props.element);
        let toolbar = config.asideToolbar
        if (toolbar && toolbar.length) {
            tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn')
                .each((index) => {
                    if (config.toolBarList[index] && toolbar.indexOf(config.toolBarList[index]) > -1) {
                        tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn').eq(index).addClass('toolbar-disabled')
                    }
                });
        }     
        this.props.handleFocus();
    }
    
    /**
     * 
     * @discription - renderSlate | renders slate editor area with all elements it contain
     * @param {string} element -object of element
     */

    renderContainer({ element: _containerData }) {
        try {
            if (_containerData !== null && _containerData !== undefined) {
                if (Object.values(_containerData).length > 0) {
                    let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData;
                    let { bodymatter: _bodyMatter } = _contents || _elementData;
                    let { index } = this.props
                    let parentUrn = {
                        manifestUrn: _containerId,
                        contentUrn: _containerData.contentUrn,
                        elementType: _containerType
                    }
                    let filterElement = _bodyMatter.filter((ele) => ele.type == "manifest");
                    let elementLength = _bodyMatter.length - filterElement.length;
                    if(!_bodyMatter.length && this.props.deleteElement){
                        this.props.deleteElement();
                    }
                    this['cloneCOSlateControlledSource_2' + random] = this.renderElement(_bodyMatter, parentUrn, index, elementLength)
                    return (
                        <div className="container-aside" data-id={_containerId} container-type={_containerType}>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
                                    //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                                    animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                                    dragoverBubble: false,
                                    removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                                    fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                                    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                                    scrollSpeed: 10,
                                    handle: '.element-label', //Drag only by element tag name button
                                    dataIdAttr: 'data-id',
                                    scroll: true, // or HTMLElement
                                    filter: ".ignore-for-drag",
                                    preventOnFilter: false,
                                    draggable: ".editor",
                                    forceFallback: true,
                                    onStart: function (/**Event*/) {
                                        // same properties as onEnd
                                    },
                                    // Element dragging ended
                                    onUpdate: (/**Event*/evt) => {
                                        let swappedElementData;
                                        let bodyMatterObj = [];
                                        if(this.props.element.contents){
                                            bodyMatterObj = this.props.element.contents.bodymatter;
                                        }
                                        else{
                                            bodyMatterObj = this.props.element.elementdata.bodymatter;
                                        }
                                        swappedElementData = bodyMatterObj[evt.oldDraggableIndex]
                                        let dataObj = {
                                            oldIndex: evt.oldDraggableIndex,
                                            newIndex: evt.newDraggableIndex,
                                            swappedElementData: swappedElementData,
                                            currentSlateEntityUrn: parentUrn.contentUrn,
                                            containerTypeElem: 'we',
                                        }
                                        this.props.swapElement(dataObj, (bodyObj) => { })
                                        this.props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                        let showHideNode = document.querySelector('.show-hide-active')
                                        if(showHideNode){
                                            showHideNode.classList.remove("show-hide-active")
                                        }
                                    },
                                }}
                                ref={(c) => {
                                    if (c) {
                                        //let sortable = c.sortable;
                                    }
                                }}
                                tag="div"
                                onChange={function (items, sortable, evt) { }}
                            >
                                {this['cloneCOSlateControlledSource_2' + random]}
                            </Sortable>
                        </div>
                    )
                }
            }
        } catch (error) {
            // handle error
        }
    }

    /**
     * Sortable onUpdate callback for section and section-break
     * @param {Object} evt Event object
     * @param {Object} _containerBodyMatter bodymatter object
     * @param {Number} index index of section/section break
     * @param {String} sectionType type - section or section-break
     */
    onSectionDragUpdate = (evt, _containerBodyMatter, index, sectionType) => {
        let swappedElementData;
        let bodyMatterObj = [];
        let contentURN;
        if(this.props.element.contents){
            contentURN = this.props.element.contentUrn;
            bodyMatterObj = this.props.element.contents.bodymatter;
        } else {
            contentURN = this.props.element.elementdata.bodymatter[index].contentUrn;
            bodyMatterObj = this.props.element.elementdata.bodymatter[index].contents.bodymatter;
        }

        if(bodyMatterObj[evt.oldDraggableIndex]) {
            swappedElementData = bodyMatterObj[evt.oldDraggableIndex];
        } else {
            if (sectionType === "section") {
                this.sectionBodyMatter = _containerBodyMatter;
                swappedElementData = this.sectionBodyMatter[evt.oldDraggableIndex]
            }
            else if (sectionType === "section-break") {
                this.sectionBreakBodyMatter = _containerBodyMatter;
                swappedElementData = this.sectionBreakBodyMatter[evt.oldDraggableIndex]
            }
        }

        let dataObj = {
            oldIndex: evt.oldDraggableIndex,
            newIndex: evt.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: contentURN,
            containerTypeElem: 'section',
            asideId: this.props.element.id
        }

        this.props.swapElement(dataObj, (bodyObj) => { })
        this.props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        let showHideNode = document.querySelector('.show-hide-active')
        if(showHideNode){
            showHideNode.classList.remove("show-hide-active")
        }
    }
    
    /**
    * 
    * @description - This function is section break
    * @param {string} element -object of element
    */
    section(element, index) {

        let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = element;
        let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
        let parentUrn = {
            manifestUrn: _elementId,
            contentUrn: element.contentUrn,
            elementType: _elementType
        }
        this.sectionBodyMatter = _containerBodyMatter;
        let parentIndex = `${this.props.index}-${index}`
        let elementLength = _containerBodyMatter.length
        this['cloneCOSlateControlledSource_1' + random] = this.renderElement(_containerBodyMatter, parentUrn, parentIndex, elementLength)
        return (
            <div className="section" data-id={_elementId} >
                <hr className="work-section-break" />
                <Sortable
                    options={{
                        sort: true,  // sorting inside list
                       // preventOnFilter: true, // Call event.preventDefault() when triggered filter
                        animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                        dragoverBubble: false,
                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                        scrollSpeed: 10,
                        handle: '.element-label', //Drag only by element tag name button
                        dataIdAttr: 'data-id',
                        scroll: true, // or HTMLElement
                        filter: ".ignore-for-drag",
                        preventOnFilter: false,
                        draggable: ".editor",
                        forceFallback: true,
                        onStart: function (/**Event*/) {
                            // same properties as onEnd
                        },
                        // Element dragging ended
                        onUpdate: (/**Event*/evt) => {
                            this.onSectionDragUpdate(evt, _containerBodyMatter, index, "section")
                        },
                    }}
                    ref={(c) => {
                        if (c) {
                            //let sortable = c.sortable;
                        }
                    }}
                    tag="div"
                    onChange={function (items, sortable, evt) { }}

                >
                    {this['cloneCOSlateControlledSource_1' + random]}
                </Sortable>
            </div>
        )
    }

    /**
     * 
     * @description - This function is section break
     * @param {string} _elements -object of element
     */

    sectionBreak(_element, index) {
        let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = _element;
        let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
        let parentUrn = {
            manifestUrn: _elementId,
            contentUrn: _element.contentUrn,
            elementType: _elementType
        }
        this.sectionBreakBodyMatter = _containerBodyMatter;
        const { elemBorderToggle, borderToggle } = this.props
        let parentIndex = `${this.props.index}-${index}`
        let elementLength = _containerBodyMatter.length
        this['cloneCOSlateControlledSource_3' + random] = this.renderElement(_containerBodyMatter, parentUrn, parentIndex, elementLength)

        return (
            <div className="aside-section-break" data-id={_elementId}>
                <SectionSeperator
                    elemBorderToggle={elemBorderToggle}
                    borderToggle={borderToggle}
                    setActiveElement={this.props.setActiveElement}
                    element={_element}
                    showDeleteElemPopup={this.props.showDeleteElemPopup}
                    permissions={this.props.permissions}
                />
                <Sortable
                    options={{
                        sort: true,  // sorting inside list
                        //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                        animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                        dragoverBubble: false,
                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                        scrollSpeed: 10,
                        handle: '.element-label', //Drag only by element tag name button
                        dataIdAttr: 'data-id',
                        scroll: true, // or HTMLElement
                        filter: ".ignore-for-drag",
                        draggable: ".editor",
                        preventOnFilter: false,
                        forceFallback: true,
                        onStart: function (/**Event*/) {
                            // same properties as onEnd
                        },
                        // Element dragging ended
                        onUpdate: (/**Event*/evt) => {
                            this.onSectionDragUpdate(evt, _containerBodyMatter, index, "section-break")
                        },
                    }}
                    ref={(c) => {
                        if (c) {
                            //let sortable = c.sortable;
                        }
                    }}
                    tag="div"
                    onChange={function (items, sortable, evt) { }}
                >
                    {this['cloneCOSlateControlledSource_3' + random]}
                </Sortable>
            </div>
        )
    }

    /**
   * 
   * @discription - This function is renders element
   * @param {string} _elements -object of element
   * @param {string} parentUrn -parent Entity urn for add new element
   */
    renderElement(_elements, parentUrn, parentIndex, elementLength) {
        let firstSection = true;
        let showSectionBreak;
        let asideData = {
            type: "element-aside",
            subtype :this.props.element.subtype, 
            id: this.props.element.id,
            contentUrn: this.props.element.contentUrn,
            element : this.props.element
        };
        try {
            if (_elements !== undefined) {
                if (_elements.length == 0) {
                    let index = 0
                    return(
                        <ElementSaprator
                        index= {index}
                        upperOne={true}
                        firstOne={index === 0}
                        parentUrn={parentUrn}
                        asideData={asideData}
                        parentIndex={parentIndex}
                        esProps={this.props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                        elementType="element-aside"
                        sectionBreak={true}
                        permissions={this.props.permissions}
                        onClickCapture={this.props.onClickCapture}
                        splithandlerfunction={this.props.splithandlerfunction}
                    />
                    ) 
                 
                } else {
                    return _elements.map((element, index) => {
                        if (element.type == "manifest" && firstSection) {
                            firstSection = false;
                            if(index == 0){
                                return (
                                    <>
                                    <ElementSaprator
                                    index= {0}
                                    upperOne={true}
                                    firstOne={0}
                                    parentUrn={parentUrn}
                                    asideData={asideData}
                                    parentIndex={parentIndex}
                                    esProps={this.props.elementSepratorProps(0, true, parentUrn, asideData, parentIndex)}
                                    elementType="element-aside"
                                    sectionBreak={true}
                                    permissions={this.props.permissions}
                                    onClickCapture={this.props.onClickCapture}
                                    splithandlerfunction={this.props.splithandlerfunction}
                                />
                                {this.section(element, index)}
                                </>
                                
                                )
                            }else{
                                return  this.section(element, index);
                            }
                           
                        } else if (element.type == "manifest" && !firstSection) {
                            return this.sectionBreak(element, index);
                        }
                        else {
                            showSectionBreak = (elementLength == index + 1) ? true : false
                            return (
                                <React.Fragment key={element.id}>
                                    {index === 0 && (!this.props.element.hasOwnProperty("subtype") || this.props.element.subtype == "sidebar") && <ElementSaprator
                                        upperOne={true}
                                        firstOne={index === 0}
                                        index={index}
                                        parentUrn={parentUrn}
                                        asideData={asideData}
                                        parentIndex={parentIndex}
                                        esProps={this.props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                                        elementType={this.props.element.type}
                                        permissions={this.props.permissions}
                                        onClickCapture={this.props.onClickCapture}
                                        splithandlerfunction={this.props.splithandlerfunction}
                                    />
                                    }
                                    <ElementContainer
                                        element={element}
                                        index={`${parentIndex}-${index}`}
                                        parentUrn={parentUrn}
                                        showBlocker={this.props.showBlocker}
                                        asideData={asideData}
                                        permissions={this.props.permissions}
                                        handleCommentspanel={this.props.handleCommentspanel}
                                        isBlockerActive={this.props.isBlockerActive}
                                        onClickCapture={this.props.onClickCapture}
                                        parentElement = {this.props.element}
                                        onListSelect={this.props.onListSelect}
                                    >
                                    </ElementContainer>
                                    <ElementSaprator
                                        index={index}
                                        parentUrn={parentUrn}
                                        asideData={asideData}
                                        parentIndex={parentIndex}
                                        esProps={this.props.elementSepratorProps(index, false, parentUrn, asideData, parentIndex)}
                                        splithandlerfunction={this.props.splithandlerfunction}
                                        elementType={this.props.element.type}
                                        sectionBreak={this.props.element.subtype == "workedexample" ? showSectionBreak : false}
                                        permissions={this.props.permissions}
                                        onClickCapture={this.props.onClickCapture}
                                    />
                                </React.Fragment>
                            )
                        }

                    })
                }

            }

        } catch (error) {
            console.log("error", error)
        }
    }
    /**
  * 
  * @discription - This function is renders workexample
  * @param {string} designtype -string to select type of work example
  */

    renderWorkExample = (designtype) => {
        return (
            <React.Fragment>
                <hr className={`aside-horizotal-break ${designtype == "workedexample2" ? 'aside-horizotal-break-green' : ""}`} />
                {this.renderContainer(this.props)}
                <hr className={`aside-break-bottom ${designtype == "workedexample2" ? 'aside-break-bottom-green' : ""}`}></hr>
            </React.Fragment>
        )
    }

    /**
* 
* @discription - This function is renders diffrent types of border of aside
* @param {string} designtype -string to select type of aside container
*/

    borderTop = (designtype) => {
        if (designtype == "asideSidebar01" || designtype == "asideSidebar02" || designtype == "asideSidebar03" || designtype == "asideTacticBox") {
            return (
                <div className={designtype + "BorderTop"} />
            )
        } else if (designtype == "asideSidebar04") {
            return (
                <div className={designtype}>
                    <h5 className="heading5NummerEinsSidebar04"></h5>
                </div>
            )
        } else if (designtype == "asideSidebar05") {
            return (
                <React.Fragment>
                    <div className={designtype}></div>
                    <h4 className="heading4NumeroUnoSidebar05" resource=""></h4>
                </React.Fragment>
            )
        } else if (designtype == "asideActivity") {
            return (
                <React.Fragment>
                    <div className={designtype}></div>
                    <h3 className="heading3ActivityLabel"></h3>
                </React.Fragment>
            )
        } else {
            return (
                <div className={designtype + "BorderTop"}></div>
            )

        }
    }
    /**
  * 
  * @discription - This function is renders aside container
  * @param {string} designtype -string to select type of aside container
  */

    renderAside = (designtype) => {

        return (
            <React.Fragment>
                {this.borderTop(designtype)}
                {this.renderContainer(this.props)}
                <div className={designtype + "BorderBottom"} />
            </React.Fragment>

        )
    }


    /**
     * render | renders title and slate wrapper
     */
    render() {
        const { element } = this.props;
        let designtype = element.hasOwnProperty("designtype") ? element.designtype : "",
            subtype = element.hasOwnProperty("subtype") ? element.subtype : "";
        return (
            <aside onMouseUp = {this.handleFocus} className={`${designtype} aside-container`} tabIndex="0" onBlur={this.props.handleBlur} ref={this.asideRef}>
                {subtype == "workedexample" ? this.renderWorkExample(designtype) : this.renderAside(designtype)}
            </aside>
        );
    }
}
ElementAsideContainer.displayName = "ElementAsideContainer"

ElementAsideContainer.propTypes = {
    /** slate data attached to store and contains complete slate object */
    element: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
    };
};


export default connect(
    mapStateToProps,
    {
        swapElement
    }
)(ElementAsideContainer);