import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);        
    };
     
    render() {        
        return (
            <div className="Editor" contentEditable="true" dangerouslySetInnerHTML={{__html: 
                this.props.model.text}}>
                    {/* <Editor
                    //initialValue ={initialVlaue}
                    init={this.editorConfig}
                    onChange={this.handleEditorChange}
                /> */}
            </div>
        );
    }
}
TinyMceEditor.propTypes = {
    error: PropTypes.string,
};

TinyMceEditor.defaultProps = {
    error: null,
};

export default TinyMceEditor