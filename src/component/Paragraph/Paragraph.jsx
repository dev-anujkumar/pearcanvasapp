import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TinyMceEditor} from "../tinyMceEditor"
//import '../../styles/book.scss'
export class Paragraph extends Component {

    
    render() {
        const { type, onClick } = this.props
        console.log("type====>",type)
        return(
            <>
         <div className="header" id="mytoolbar">
          <h1 >CANVAS</h1>
          {/* <div className="mce-tinymce"></div> */}
          </div>
               <TinyMceEditor type = {type} />
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