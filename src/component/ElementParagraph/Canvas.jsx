import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {ElementParagraph} from './ElementParagraph';


export class Canvas extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <div>
<div className="wrapper">
        <div className="header" id="mytoolbar">
          <h1 >Canvas</h1>
        </div>
        <div className="container">
          <div className="slate">

            <div className="editor-container">

              <div className="Editor" >
                <ElementParagraph  />
              </div>
            </div>
           </div>
        </div>
      </div>
</div>
        );
    }
} 