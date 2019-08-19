import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TinyMceEditor} from "../tinyMceEditor"
//import '../../styles/book.scss'
export class Paragraph extends Component {
    render() {
        const { type, onClick } = this.props
        return(
            <>
               <TinyMceEditor type = {type} onClick = {onClick} />
            </>
        )
    }
}
Paragraph.defaultProps = {
    type: "paragraph"
}

Paragraph.propTypes = {
    type : PropTypes.string.isRequired,
    onClick : PropTypes.func
}

export default Paragraph