// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sortable from 'react-sortablejs';
import config from '../../config/config';
// IMPORT - Components //
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import ContainerHeader from '../ContainerHeader/ContainerHeader.jsx';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import { guid } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import './../../styles/ElementAsideContainer/ElementAsideContainer.css';
import SectionSeperator from './SectionSeperator.jsx';
import { ASIDE_SOURCE, elementLabelClass, ignoreForDragClass, labelHtmlData, lazyloadWrapperClass, transitionNoneText } from '../../constants/Element_Constants.js';
import TinyMceEditor from "../../component/tinyMceEditor";
import { getLabelNumberTitleHTML, checkHTMLdataInsideString, sendDataToIframe, hasReviewerRole } from '../../constants/utility';
import {enableAsideNumbering} from './../Sidebar/Sidebar_Action';
import ElementConstants from '../ElementContainer/ElementConstants';
import LazyLoad from "react-lazyload";
import { LargeLoader } from '../SlateWrapper/ContentLoader.jsx'
// IMPORT - Assets //

let random = guid();

class ElementAsideContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionFocus: false,
            btnClassName: "",
            showTitle: this.setFieldsForAside(this.props?.element, this.props?.asideTitleData),
            elementId: this.props.elementId,
            asideTitleData: this.props.asideTitleData
        }
        this.asideRef = React.createRef();
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ((nextProps.asideTitleData != prevState?.asideTitleData)) {
            return {
                asideTitleData: nextProps.asideTitleData
            };
        }
        return null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.asideRef && !this.asideRef.current?.contains(event.target) && !this.props.isAutoNumberingEnabled) {
            this.handleAsideBlur(event);
        }
    }

    setFieldsForAside = (element, asideTitleData) => {
        if (element && asideTitleData) {
            const asideObj = asideTitleData.filter(obj => {
                return obj.elementId === element.id;
              })
            if (asideObj.length) {
                return asideObj[0].isAsideNumber;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    handleFocus = (e) => {

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

    renderContainer({ element: _containerData },designtype,isDiffDesignType) {
        try {
            if (_containerData !== null && _containerData !== undefined) {
                if (Object.values(_containerData).length > 0) {
                    let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData;
                    let { bodymatter: _bodyMatter } = _contents || _elementData;
                    let { index } = this.props;
                    let parentUrn = {
                        manifestUrn: _containerId,
                        contentUrn: _containerData.contentUrn,
                        elementType: _containerType
                    }

                    let filterElement = _bodyMatter.filter((ele) => ele.type == "manifest");
                    let elementLength = _bodyMatter.length - filterElement.length;
                    this['cloneCOSlateControlledSource_2' + random] = this.renderElement(_bodyMatter, parentUrn, index, elementLength)
                    return (
                        <div className={`container-aside ${isDiffDesignType ? designtype : ''}`} data-id={_containerId} container-type={_containerType}>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
                                    disabled: hasReviewerRole(),
                                    //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                                    animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                                    dragoverBubble: false,
                                    removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                                    fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                                    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                                    scrollSpeed: 10,
                                    handle: elementLabelClass, //Drag only by element tag name button
                                    dataIdAttr: 'data-id',
                                    scroll: true, // or HTMLElement
                                    filter: ignoreForDragClass,
                                    preventOnFilter: false,
                                    draggable: lazyloadWrapperClass,
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
                                            elementIndex: this.props.index,
                                            parentElement: { type: this.props?.parentElement?.type, subtype: this.props?.parentElement?.subtype, showHideType: this.props?.showHideType }
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
            asideId: this.props.element.id,
            elementIndex: this.props.index,
            parentElement: { type: this.props?.parentElement?.type, subtype: this.props?.parentElement?.subtype, showHideType: this.props?.showHideType }
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
                        disabled: hasReviewerRole(),
                       // preventOnFilter: true, // Call event.preventDefault() when triggered filter
                        animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                        dragoverBubble: false,
                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                        scrollSpeed: 10,
                        handle: elementLabelClass, //Drag only by element tag name button
                        dataIdAttr: 'data-id',
                        scroll: true, // or HTMLElement
                        filter: ignoreForDragClass,
                        preventOnFilter: false,
                        draggable: lazyloadWrapperClass,
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

        // Check if searched URN match the section break URN
        let searched = '';
        if(this.props.searchUrn !== '' && this.props.searchUrn === _elementId) {
            searched = 'searched';
        }

        return (
            <div className={`aside-section-break ${searched}`} data-id={_elementId}>
                <SectionSeperator
                    elemBorderToggle={elemBorderToggle}
                    borderToggle={borderToggle}
                    setActiveElement={this.props.setActiveElement}
                    element={_element}
                    showDeleteElemPopup={this.props.showDeleteElemPopup}
                    permissions={this.props.permissions}
                    userRole={this.props.userRole}
                    handleCopyPastePopup={this.props.handleCopyPastePopup}
                    handleUndoOption = {this.props.handleUndoOption}
                    closeUndoTimer = {this.props.closeUndoTimer}
                />
                <Sortable
                    options={{
                        sort: true,  // sorting inside list
                        disabled: hasReviewerRole(),
                        //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                        animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                        dragoverBubble: false,
                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                        scrollSpeed: 10,
                        handle: elementLabelClass, //Drag only by element tag name button
                        dataIdAttr: 'data-id',
                        scroll: true, // or HTMLElement
                        filter: ignoreForDragClass,
                        draggable: lazyloadWrapperClass,
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
        const { id, type, subtype, groupeddata, contentUrn } = this.props?.parentElement || {};
        let asideData = {
            type: "element-aside",
            subtype :this.props.element.subtype,
            id: this.props.element.id,
            contentUrn: this.props.element.contentUrn,
            element : this.props.element,
            index: this.props.index
        };
         /* @columnIndex@ */
        const columnIndex = this.props?.index?.toString().split("-").length === 3 ? this.props.index.split("-")[1] : "";
        const columnId = groupeddata?.bodymatter[columnIndex]?.id;
        const parentContentUrn = contentUrn;
        const columnContentUrn = groupeddata?.bodymatter[columnIndex]?.contentUrn;
        const multiColumnType = groupeddata?.bodymatter?.length ? `${groupeddata?.bodymatter?.length}C` : undefined;
        /* Adding parent id and type to update redux store while creating new element inside 2c->Aside->New */
        asideData = (type === ElementConstants.MULTI_COLUMN && !subtype) ? {...asideData, parent: { id, type, columnId, columnName: columnIndex == 0 ? "C1" : columnIndex == 1 ? "C2" : "C3", multiColumnType: multiColumnType, parentContentUrn, columnContentUrn }} : asideData;
        /* Adding parent id, type and contentUrn update redux store while creating new element inside S/H->Aside->New */
        asideData = (type === ElementConstants.SHOW_HIDE) ? {...asideData, parent: { id, type, contentUrn, showHideType: this.props?.showHideType }} : asideData;
        /* Adding parent id and type to update redux store while creating new element inside TB->Tab->Aside->New */
        if (type === ElementConstants.MULTI_COLUMN && subtype === ElementConstants.TAB) {
            let indexes = this.props?.index?.toString()?.split('-') || [];
            let columnDetails = {
                columnIndex: Number(indexes[2]),
                columnId: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.id,
                columnContentUrn: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.contentUrn,
                columnName: Number(indexes[2]) === 0 ? "C1" : "C2"
            }
            asideData = {...asideData, parent: {...this.props.parentElement, columnDetails: columnDetails}}
        }
        try {
            if (_elements !== undefined) {
                if (_elements.length == 0) {
                    let index = 0
                    return(
                        <ElementSaprator
                            index= {index}
                            upperOne={true}
                            firstOne={true}
                            parentUrn={parentUrn}
                            asideData={asideData}
                            parentIndex={parentIndex}
                            esProps={this.props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                            elementType="element-aside"
                            sectionBreak={this.props.element.subtype == "workedexample" ? true : false}
                            permissions={this.props.permissions}
                            onClickCapture={this.props.onClickCapture}
                            splithandlerfunction={this.props.splithandlerfunction}
                            userRole={this.props.userRole}
                            pasteElement={this.props.pasteElement}
                            source={ASIDE_SOURCE}
                            handleCopyPastePopup={this.props.handleCopyPastePopup}
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
                                    firstOne={true}
                                    parentUrn={parentUrn}
                                    asideData={asideData}
                                    parentIndex={parentIndex}
                                    esProps={this.props.elementSepratorProps(0, true, parentUrn, asideData, parentIndex)}
                                    elementType="element-aside"
                                    sectionBreak={true}
                                    permissions={this.props.permissions}
                                    onClickCapture={this.props.onClickCapture}
                                    splithandlerfunction={this.props.splithandlerfunction}
                                    userRole={this.props.userRole}
                                    pasteElement={this.props.pasteElement}
                                    source={ASIDE_SOURCE}
                                    handleCopyPastePopup={this.props.handleCopyPastePopup}
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
                                    <LazyLoad
                                        once={true}
                                        placeholder={<div data-id={element.id}><LargeLoader /></div>}
                                    >
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
                                        userRole={this.props.userRole}
                                        pasteElement={this.props.pasteElement}
                                        source={ASIDE_SOURCE}
                                        handleCopyPastePopup={this.props.handleCopyPastePopup}
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
                                        userRole={this.props.userRole}
                                        elementSepratorProps={this.props.elementSepratorProps}
                                        splithandlerfunction={this.props.splithandlerfunction}
                                        pasteElement={this.props.pasteElement}
                                        handleUndoOption = {this.props.handleUndoOption}
                                        closeUndoTimer = {this.props.closeUndoTimer}
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
                                        userRole={this.props.userRole}
                                        pasteElement={this.props.pasteElement}
                                        source={ASIDE_SOURCE}
                                        handleCopyPastePopup={this.props.handleCopyPastePopup}
                                        dataId = {element.id}
                                    />
                                </LazyLoad>
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
 * @discription - this function render title fields
 *
 */
    renderTitleField = (asideHtmlData) => {
        let showTitleField = this.setFieldsForAside(this.props.element, this.state.asideTitleData);
        if (showTitleField) {
            return (
                <div className={`asideHeader ${hasReviewerRole() ? "pointer-events-none" : ""}`}>
                    <header className="figure-header new-figure-image-header">
                        <div className="image-label">
                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.element} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-t1`} placeholder="Label" tagName={'h4'} className={" figureLabel "} model={asideHtmlData?.formattedLabel} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} id={this.props.id} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                            <label className={checkHTMLdataInsideString(asideHtmlData?.formattedLabel) ? transitionNoneText : "floating-label"}>Label</label>
                        </div>
                        <div className="floating-number-group">
                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.element} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-t2`} placeholder="Number" tagName={'h4'} className={" figureNumber "} model={asideHtmlData?.formattedNumber} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} id={this.props.id}parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                            <label className={checkHTMLdataInsideString(asideHtmlData?.formattedNumber) ? transitionNoneText : "floating-number"}>Number</label>
                        </div>
                    </header>
                    <div className="floating-title-group">
                        <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.element} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-t3`} placeholder="Title" tagName={'h4'} className={" figureTitle "} model={asideHtmlData?.formattedTitle} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} id={this.props.id} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                        <label className={checkHTMLdataInsideString(asideHtmlData?.formattedTitle) ? transitionNoneText : "floating-title"}>Title</label>
                    </div>
                </div>
            )
        }
    }

    onFigureElementFieldFocus = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains(transitionNoneText)) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains(transitionNoneText))) {
            labelElement?.nextElementSibling?.classList?.add(transitionNoneText);
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
                {this.renderContainer(this.props,"")}
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


    onFigureImageFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains(transitionNoneText)) {
            labelElement?.nextElementSibling?.classList?.remove(transitionNoneText);
        }
    }



    /**
  *
  * @discription - This function is renders aside container
  * @param {string} designtype -string to select type of aside container
  */

    renderAside = (designtype,isDiffDesignType) => {
        return (
            <React.Fragment>
                {this.borderTop(designtype)}
                {this.renderContainer(this.props,designtype,isDiffDesignType)}
                <div className={designtype + "BorderBottom"} />
            </React.Fragment>

        )
    }

    handleAsideBlur = (evt) => {
        this.props.handleBlur();
        const { element, index } = this.props;

        let hasAsideTitleData = element?.html?.title && (element.html.title !== "<p class='paragraphNumeroUno'></p>" && element.html.title !== "<p></p>") ? true : false;
        const newToggleValue = hasAsideTitleData ? true : false;
        let labelElement = document.getElementById(`cypress-${index}-t1`);
        let numberElement = document.getElementById(`cypress-${index}-t2`);
        let titleElement = document.getElementById(`cypress-${index}-t3`);
        const focusInLabel = labelHtmlData.includes(labelElement?.innerHTML)
        const focusInNumber = labelHtmlData.includes(numberElement?.innerHTML)
        const focusInTitle = labelHtmlData.includes(titleElement?.innerHTML)
        let focusOnToolbar = false, focusOnOtherElement = false
        if (evt?.path?.length > 0) {
            const evtNodes = evt.path
            const activeNodeIndex = evtNodes[0]?.id?.split('-')
            if (activeNodeIndex?.length > 1) {
                if ((activeNodeIndex[0] === "cypress" && activeNodeIndex[1] !== index)) {
                    focusOnOtherElement = true
                }
            }
            else {
                for (let evtNode of evtNodes.values()) {
                    if (evtNode?.classList?.contains('element-container') && (evtNode?.classList?.contains('as'))) {
                        if (this.props.elementId !== evtNode?.dataset.id) {
                            focusOnOtherElement = true
                        }
                    }
                    if (evtNode?.classList?.contains('toolbar-container')) {
                        focusOnToolbar = true
                    }
                }
            }
        }
        if (!newToggleValue && focusInLabel && focusInNumber && focusInTitle) {
            if ((this.props.elementId !== this.props?.activeElement?.elementId) || (this.props.elementId === this.props?.activeElement?.elementId && (focusOnOtherElement))) {
                this.props.enableAsideNumbering(newToggleValue, element.id);
            }
        }
    }

    checkForAutoNumberedContent = (currentElement) => {
        if ((currentElement?.type === 'element-aside') && currentElement.hasOwnProperty('numberedandlabel') && this.props?.isAutoNumberingEnabled) {
            return true
        }
        return false
    }
    /**
     * render | renders title and slate wrapper
     */
    render() {
        const { element, isAutoNumberingEnabled } = this.props;
        let asideHtmlData;
        if (!isAutoNumberingEnabled) {
            asideHtmlData = getLabelNumberTitleHTML(element);
        }
        let designtype = element.hasOwnProperty("designtype") ? element.designtype : "",
            subtype = element.hasOwnProperty("subtype") ? element.subtype : "";
        let showTitleField = this.setFieldsForAside(this.props.element, this.state.asideTitleData);
        let labelMargin = (showTitleField || this.checkForAutoNumberedContent(element)) ? 'remove-margin-top' : ''
        let diffDesignType = ["asideSidebar04", "asideSidebar05", "asideSidebarFeature", "asideActivity"]
        let isDiffDesignType= diffDesignType.includes(designtype);
        return (
            <aside className={`${labelMargin} ${ isDiffDesignType ? '' : designtype } aside-container`} tabIndex="0">
                {this.checkForAutoNumberedContent(element) ?
                    <ContainerHeader
                        {...this.props}
                        model = {element}
                        isAutoNumberingEnabled = {isAutoNumberingEnabled}
                        elementHtmlData = {asideHtmlData}
                    /> : this.renderTitleField(asideHtmlData)
                }
                {subtype == "workedexample" ? this.renderWorkExample(designtype) : this.renderAside(designtype,isDiffDesignType)}
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
        searchUrn: state.searchReducer.searchTerm,
        asideTitleData: state.appStore.asideTitleData,
        activeElement: state.appStore.activeElement,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        figureDropdownData: state.appStore.figureDropdownData
    };
};


export default connect(
    mapStateToProps,
    {
        swapElement,
        enableAsideNumbering
    }
)(ElementAsideContainer);
