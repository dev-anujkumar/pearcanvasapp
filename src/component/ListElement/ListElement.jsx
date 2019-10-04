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
        const { className, placeholder, model } = this.props
        return (
            <TinyMceEditor
                openGlossaryFootnotePopUp = {this.props.openGlossaryFootnotePopUp}
                index={this.props.index}
                elementId={this.props.elementId}
                element={this.props.element}
                placeholder="Type Something..."
                className={className}
                model={model}
                handleEditorFocus={this.props.handleFocus}
                onFocus={this.onFocus}
                handleBlur={this.props.handleBlur}
                onKeyup={this.onKeyup}
                onBlur={this.onBlur}
                onClick={this.onClick}
                slateLockInfo={slateLockInfo}
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