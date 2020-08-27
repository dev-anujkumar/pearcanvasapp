// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor.js"
// IMPORT - Assets //
import '../../styles/ListElement/style.css'

export class ListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    render() {
        const { className, model, element, slateLockInfo, showHideType } = this.props
        //***************************************************************
        //************ this is to cover wip conversion case *************
        let wipModel = null;
        if (!model) {
            let subType = element.subtype;
            let startNumber = isNaN(parseInt(element.elementdata.startNumber)) ? 0 : element.elementdata.startNumber; //isNaN(parseInt(element.elementdata.startNumber)) && 0 || element.elementdata.startNumber;
            startNumber = (startNumber > 0) && (startNumber - 1) || 0;
            wipModel = {
                "text": `<ol class='${subType}' data-treelevel='1' style='counter-increment: section ${startNumber};'><li class='reset listItemNumeroUnoUpperAlpha'>This is a default text and will perform working once wip conversion is ready</li></ol>`
            }
        }
        //***************************************************************
        return (
            <TinyMceEditor
                openAssetPopoverPopUp={this.props.openAssetPopoverPopUp}
                openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                index={this.props.index}
                elementId={this.props.elementId}
                element={this.props.element}
                placeholder="Type Something..."
                className={className}
                model={wipModel || model}
                handleEditorFocus={this.props.handleFocus}
                onFocus={this.onFocus}
                handleBlur={this.props.handleBlur}
                onKeyup={this.onKeyup}
                onBlur={this.onBlur}
                onClick={this.onClick}
                slateLockInfo={slateLockInfo}
                onListSelect={this.props.onListSelect}
                permissions={this.props.permissions}
                glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                showHideType={showHideType}
                showBlocker={this.props.showBlocker}
            />
        )
    }
    onClick() {

    }
    onBlur() {

    }
    onKeyup() {

    }
    onFocus() {

    }
}

ListElement.displayName = "ListElement"

ListElement.defaultProps = {
    type: "element-list"
}

ListElement.propTypes = {
    /** Type of element to be rendered */
    type: PropTypes.string.isRequired,
    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func

}

export default ListElement