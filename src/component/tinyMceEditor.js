import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        console.log("this.props >> ", this.props.placeholder)
        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + " cypress-editable";
        classes = this.props.className + " cypress-editable";
         /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                return (
                    
                        <p className={classes} contentEditable="true"
                            dangerouslySetInnerHTML={{ __html: this.props.model }}
                        >
                        </p>
                   );
            case 'h4':
                return (
                    <h4 className={classes} contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: this.props.model }}
                    >
                    </h4>
                )
                case 'code':
                        return (
                            <code id="codeListing" className={classes} contentEditable="true"
                                dangerouslySetInnerHTML={{ __html: this.props.model }}
                            >
                            </code>
                        )
            default:
                return (
                    <div className={classes} contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: this.props.model }}
                    >
                    </div>
                )


        }
    }
}
TinyMceEditor.propTypes = {
    /** class name of the element type to be rendered */
    className:PropTypes.string,
    /** Detail of element in JSON object */
    model:PropTypes.object,

};

TinyMceEditor.defaultProps = {
    error: null,
};

export default TinyMceEditor

