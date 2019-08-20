import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../styles/ElementParagraph/Tiny.css';
import {TinyMceEditor} from '../tinyMceEditor.js';
import {Toolbar} from './Toolbar.jsx';
export class ElementParagraph extends React.Component
{
    constructor(props) {
        super(props);

      }


    render(){
      const {eType, eValue}=this.props;
        return(
<div>
<div className="canvas-wrapper">
        <div className="header" id="mytoolbar">
          <h1 >Canvas</h1>
        </div>
        <div className="container">
          <div className="slate">

            <div className="editor-container">

              <div className="Editor" >
                <TinyMceEditor  
                element={eType}     
                value={eValue}         
                />
               </div>
            </div>
           </div>
           <div className="sideMenu">
            <Toolbar/>
           </div>
        </div>
      </div>
</div>
        );
    }
}


Paragraph.defaultProps = {
  type: "paragraph"
}

Paragraph.propTypes = {
  type : PropTypes.string.isRequired,
  onClick : PropTypes.func
}