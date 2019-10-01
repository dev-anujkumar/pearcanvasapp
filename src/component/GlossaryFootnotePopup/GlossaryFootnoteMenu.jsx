/**
* Root Component of Glossary Footnote Component.
*/
import React from 'react';
import { connect } from 'react-redux';
import GlossaryFootnotePopup from "./GlossaryFootnotePopup.jsx";
import PropTypes from 'prop-types'
import {glossaaryFootnotePopup} from './GlossaryFootnote_Actions';
/**
* @description - GlossaryFootnoteMenu is a class based component. It is defined simply
* to make a skeleton of Glossary and Footnote.
*/
class GlossaryFootnoteMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { glossaryFootnote } = this.props;
        return (
 
                <GlossaryFootnotePopup glossaryFootnote={glossaryFootnote} closePopup={()=>this.closePopup()} saveContent={()=>this.saveContent()} />
        )
    }


    /**
    * @description - This function is to close the Glossary and Footnote Popup.
    * @param {event} 
    */

    togglePopup = () => {
        this.setState({
            showPopUp: this.props.activePopUp
        })
    }
    closePopup = () => {
        //this.togglePopup()
        this.props.glossaaryFootnotePopup(false);
    }
    /**
    * @description - This function is to save the Content of Glossary and Footnote.
    * @param {event} 
    */

    saveContent =() => {
        //  this.togglePopup()
        this.props.glossaaryFootnotePopup(false);
    }
}

GlossaryFootnoteMenu.defaultProps = {
    glossaryFootnote: "Glossary"
}

GlossaryFootnoteMenu.propTypes = {
    /** Glossary or Footnote Popup to be rendered */
    glossaryFootnote: PropTypes.string,
    /** Handler to close popup on cancel button click */
    closePopup: PropTypes.func,
    /** Handler to save content of popup on save button click */
    saveContent: PropTypes.func
}
const mapStateToProps = state => {console.log('state:::', state);
    return {
      
        glossaryFootnoteValue:state.glossaryFootnoteValue

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        glossaaryFootnotePopup:(popUpStatus)=>{
            dispatch(glossaaryFootnotePopup(popUpStatus))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(GlossaryFootnoteMenu);