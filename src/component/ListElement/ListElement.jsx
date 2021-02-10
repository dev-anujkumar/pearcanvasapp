// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor.js"
import PopUp from '../../component/PopUp';
import { showTocBlocker, showBlocker, hideTocBlocker,disableHeader } from '../../js/toggleLoader';
// IMPORT - Assets //
import '../../styles/ListElement/style.css'

export class ListElement extends Component {
    constructor(props) {
        super(props);
        this.state = { popup : false };
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    listWarningConfirmation = ()=>{
        this.props.onListSelect(this.state.listType, "");
        this.togglePopup(false,null)
    }
    
    togglePopup = (value,type)=>{
        showBlocker(value); 
        this.props.showBlocker(value)
        if(value){
            showTocBlocker();
        }
        else{
            hideTocBlocker();
            disableHeader(false)
        }
        this.setState({popup : value, listType : type})
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
            <React.Fragment>
                {this.state.popup &&
                    <PopUp
                        dialogText={"Performing this action will remove the list and convert this text to a paragraph. Do you wish to continue?"}
                        active={true}
                        listConfirmation={true}
                        togglePopup={this.togglePopup}
                        tocDeleteClass={'listConfirmation'}
                        saveButtonText={"Yes"}
                        saveContent={this.listWarningConfirmation}
                    />
                }
                <TinyMceEditor
                    openAssetPopoverPopUp={this.props.openAssetPopoverPopUp}
                    openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                    index={this.props.index}
                    elementId={this.props.elementId}
                    element={this.props.element}
                    placeholder={this.props.placeholder || "Type Something..."}
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
                    togglePopup={this.togglePopup}
                    innerIndex={this.props.innerIndex}
                    id={this.props.currentElement?this.props.currentElement.id:null}
                    activeShowHide={this.props.activeShowHide}
                    createShowHideElement={this.props.createShowHideElement}
                    currentElement={this.props.currentElement}
                    deleteShowHideUnit={this.props.deleteShowHideUnit}
                    handleAudioPopupLocation = {this.props.handleAudioPopupLocation}
                />
            </React.Fragment>
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