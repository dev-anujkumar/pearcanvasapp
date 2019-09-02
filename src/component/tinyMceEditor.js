import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);        
    };
     
    render() {    
        console.log("this.props >> ", this.props.placeholder)  
        let classes = this.props.className?this.props.className+" cypress-editable":''+" cypress-editable";
        //  classes = this.props.className+" cypress-editable"
        switch(this.props.tagName){
            case 'p':
                    return ( 
                        <div>          
                        <p className={classes} contentEditable="true" 
                         dangerouslySetInnerHTML={{__html: this.props.model}}
                            > 
                    </p>
                    </div>);
            case 'h4':
                return(
                    <h4  className={classes} contentEditable="true" 
                    dangerouslySetInnerHTML={{__html: this.props.model}}
                       > 
                       </h4>
                )
            default:
                    return(
                        <div  className={classes} contentEditable="true" 
                        dangerouslySetInnerHTML={{__html: this.props.model}}
                           > 
                           </div>
                    )
        } 
      
    }
}
TinyMceEditor.propTypes = {
    error: PropTypes.string,
};

TinyMceEditor.defaultProps = {
    error: null,
};

export default TinyMceEditor

