import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { labelOptions, getOpenerContent, getOpenerImageSource, moduleLabelOptions, volumeLabelOptions } from './OpenerConstants'
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';

import '../../styles/OpenerElement/OpenerElement.css'
import { createLabelNumberTitleModel, getLabelNumberTitleHTML, hasReviewerRole, sendDataToIframe } from '../../constants/utility';
import noImage from '../../images/OpenerElement/no-image.png'
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import axios from 'axios';
import { alfrescoPopup, saveSelectedAssetData, saveSelectedAlfrescoElement, saveSelectedAltTextLongDescData } from '../AlfrescoPopup/Alfresco_Action'
import { connect } from 'react-redux';
import TinyMceEditor from '../tinyMceEditor';

class OpenerElement extends Component {

    constructor(props){
        super(props)
        const { textsemantics, text } = props.element.title;
        const bgImage = props.element.backgroundimage.path;

        if (document.querySelector("[name='alt_text']") && props.element.backgroundimage.alttext)
            document.querySelector("[name='alt_text']").innerHTML = props.element.backgroundimage.alttext;
        if (document.querySelector("[name='long_description']") && props.element.backgroundimage.longdescripton)
            document.querySelector("[name='long_description']").innerHTML = props.element.backgroundimage.longdescripton;

        this.state = {
            label: getOpenerContent(textsemantics, "label", text) || 'No Label',
            number: getOpenerContent(textsemantics, "number", text) || '',
            title: getOpenerContent(textsemantics, "title", text) || '',
            showLabelDropdown: false,
            imgSrc: getOpenerImageSource(bgImage),
            width: null,
            imageId: props.element.backgroundimage.imageid ? props.element.backgroundimage.imageid : "",
            projectMetadata: false,
            updateImageOptions:false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        const { elementId, alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ) {
            this.dataFromNewAlfresco(alfrescoAssetData)
        }
    }
    dataFromNewAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let imageData = data;
        let epsURL = imageData.epsUrl ? imageData.epsUrl : imageData?.['institution-urls'][0]?.publicationUrl ? imageData?.['institution-urls'][0]?.publicationUrl : "" ;
        let uniqID = imageData.id ? imageData.id : "";
        let imageId = `urn:pearson:alfresco:${uniqID}`;
        let figureType = data?.content?.mimeType?.split('/')[0]
        let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
        let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {
            let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
            let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
            this.setState({
                imgSrc: epsURL,
                imageId: imageId,
                updateImageOptions:false,
                width
            }, ()=>{
            this.handleBlur({imgSrc: epsURL, imageId});
            });
            if (document.querySelector("[name='alt_text']"))
                document.querySelector("[name='alt_text']").innerHTML = altText;
            if (document.querySelector("[name='long_description']"))
                document.querySelector("[name='long_description']").innerHTML = longDesc;
        }
        let payloadObj = {
            asset: {}, 
            id: ''
        }
        this.props.saveSelectedAssetData(payloadObj)
        const altLongDescData = {
            altText: altText,
            longDesc: longDesc
        }
        this.props.saveSelectedAltTextLongDescData(altLongDescData)
        disableHeader(false)
        hideTocBlocker()
    }
    
    handleSiteOptionsDropdown = (alfrescoPath, id, currentAsset) =>{
        let that = this
        let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                id,
                currentAsset
            }
                that.props.alfrescoPopup(payloadObj)
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }

     /**
     * Responsible for opening C2 media popup
     * @param {e} event
     */
    handleC2MediaClick = (e) => {
        if(hasReviewerRole()){
            return true
        }
        const { slateLockInfo } = this.props

        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
                if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId            
                const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    const citeNodeRef = alfrescoPath?.alfresco?.nodeRef ? alfrescoPath?.alfresco?.nodeRef : alfrescoPath.alfresco.guid
                    let messageObj = {
                        appName:'cypress',
                        citeName: citeName,
                        citeNodeRef: citeNodeRef,
                        elementId: this.props.elementId,
                        currentAsset : {type: "image"}
                    }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                    const messageDataToSave = {
                        id: this.props.elementId,
                        editor: undefined,
                        citeNodeRef: citeNodeRef
                    }
                    this.props.saveSelectedAlfrescoElement(messageDataToSave);
            }
            else{
                this.props.accessDenied(true)
            }
        }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                let currentAsset = {type: "image"}
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, currentAsset);
            }
            else {
                this.props.accessDenied(true)
            }
        }
    }
    handleC2GlobalCO=(e)=>{
        if(hasReviewerRole()){
            return true
        }

        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let GLOBAL_CO = config.GLOBAL_CO;
        let globalAlfrescoPath = null
        if (GLOBAL_CO) {
            globalAlfrescoPath = {
                "nodeRef": GLOBAL_CO.CITE_NODE_REF,
                "repoInstance": GLOBAL_CO.CITE_REPO_INSTANCC,
                "repoName": GLOBAL_CO.CITE_REPO_NAME
            }
        }
        if (globalAlfrescoPath && globalAlfrescoPath.nodeRef) {
            if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                let messageObj = {
                    appName:'cypress',
                    citeName: globalAlfrescoPath?.repoName,
                    citeNodeRef: globalAlfrescoPath?.nodeRef,
                    elementId: this.props.elementId,
                    currentAsset: { type: "image" }
                }
                sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                const messageDataToSave = {
                    id: this.props.elementId,
                    editor: undefined,
                    citeNodeRef: globalAlfrescoPath?.nodeRef
                }
                this.props.saveSelectedAlfrescoElement(messageDataToSave);
            }
            else {
                this.props.accessDenied(true)
            }
        }
        else {
            this.props.accessDenied(true)
        } 
    }
    /**
     * Handles label model change event
     * @param {e} event
     */
    handleOpenerLabelChange = e => {
        this.setState({
            label: e.target.innerHTML
        }, () => {this.handleBlur(e)})
        
        this.toggleLabelDropdown()
    }
    
    /**
     * Toggles label dropdown
     */
    toggleLabelDropdown = (e) => {
        this.setState({
            showLabelDropdown: !this.state.showLabelDropdown
        })
    }

    /**
     * Renders label dropdown
     */
    renderLabelDropdown = () => {
        const { showLabelDropdown } = this.state
        let openerElementLabelOptions 
        switch(this.props.setSlateParent){
            case "module":
                openerElementLabelOptions = moduleLabelOptions
            break;
            case "volume":
                openerElementLabelOptions = volumeLabelOptions
            break;
            default:
                openerElementLabelOptions = labelOptions
            break; 
        }
        const openerLabelOptions = openerElementLabelOptions.map((value, index) => {
            return <li key={index} data-value={value} onClick={this.handleOpenerLabelChange}>{value}</li>
        })
        if(showLabelDropdown){
            return (
                <ul className="element-dropdown-content">
                    {openerLabelOptions}
                </ul>
            )
        }
        else{
            return null
        }
    }

    /**
     * Handles number model change event
     * @param {e} event
     */
    handleOpenerNumberChange = e => {
        this.setState({
            number: e.target.value
        })
    }

    /**
     * Validates input in the number field
     * @param {e} event
     */
    numberValidatorHandler = (e) => {
        let charCode = (e.which) ? e.which : e.keyCode;
        if((charCode>=48 && charCode<= 57) || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)){
            return true
        } else {
            e.preventDefault()
            return false
        }
    }
    /**
     * Handles background image style
     *  @param {imgSrc} image source
     */
    getBGStyle = (imgSrc, width) => {
        let styleObj = {
            "width" : "24%"
        }
        if (imgSrc) {
            //  styleObj["width"] = width ? width : "100%"
            styleObj = {
                "maxWidth": "605px",
                "height": "384px",
                "marginTop": "1.5em",
                "marginLeft": "auto",
                "marginRight": "auto",
                "width":"76%"
            }
        }

        return styleObj
    }
    
    /**
     * Handles Focus on opener element
     * @param {slateLockInfo} Slate lock data
     */
    handleOpenerClick = (slateLockInfo, e) => {
        this.props.handleFocus()

    }

    createSemantics = ({...values}) => {
        let textSemantics = [];
        let currentIndex = 0;   
        
        if(values.label && values.number){
            Object.keys(values).forEach(item => {
            textSemantics.push({
                "type": item,
                "charStart": currentIndex,
                "charEnd": currentIndex += (values[item]).length
            });
            currentIndex++;
        });
    }
        else if(values.label || values.number){
            let hasValue = values.label ? values.label : values.number;
            let type = values.label ? "label" : "number";
            textSemantics.push({
                "type": type,
                "charStart": currentIndex,
                "charEnd": currentIndex += (hasValue).length
            });
        }
    
        return textSemantics;
    }

    /**
     * Handles blur event for each input box and initiates saving call
     * @param {*} event blur event object
     */
    handleBlur = (event) => {
        if(config.savingInProgress){
            event.preventDefault()
            return false
        }

        let labelDOM = document.getElementById(`cypress-${this.props.index}-0`),
            numberDOM = document.getElementById(`cypress-${this.props.index}-1`),
            titleDOM = document.getElementById(`cypress-${this.props.index}-2`)

        let labelHTML = labelDOM ? labelDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            titleHTML = titleDOM ? titleDOM.innerHTML : ""

        let flag = true;

        let element = this.props.element;
        let { label, number, imgSrc, imageId } = this.state;
        label = event?.target && event.target.innerText ? ((event.target.innerText === 'No Label') ? "" : event.target.innerText) : (label === 'No Label' ? '' : label);
        imgSrc = event?.imgSrc || imgSrc;
        imageId = event?.imageId || imageId;

        if(!element.backgroundimage) {
            element.backgroundimage = {
                "path": "",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "",
                "alttext": "",
                "longdescripton": "",
                "credits": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                }
            };
        }

        titleHTML = titleHTML.replace(/class="paragraphNumeroUno"/g, "").replace("<p >", '').replace(/<br>/g, '').replace("</p>", '')
        let labelNumberTitleHTML = createLabelNumberTitleModel(label, number, titleHTML);  
        labelNumberTitleHTML = labelNumberTitleHTML.replace(/&nbsp;/g, ' ')
        if(element?.html.title === labelNumberTitleHTML  && this.state.imgSrc!==event?.imgSrc){ //After adding chaining saving call not triggering
            flag = false
        }
        if(element?.html.title === '<p><br></p>'){ //After adding chaining saving call not triggering
            flag = false
        }

        let altText = "";
        let longDesc = "";
        if (document.querySelector("[name='alt_text']"))
            altText = document.querySelector("[name='alt_text']").innerHTML;
        if (document.querySelector("[name='long_description']"))
            longDesc = document.querySelector("[name='long_description']").innerHTML;

        element.backgroundimage.path = imgSrc;
        element.backgroundimage.imageid = imageId;
        element.backgroundimage.alttext = altText;
        element.backgroundimage.longdescription = longDesc;
        element.backgroundcolor = this.props.backgroundColor;
        element.textcolor=this.props.textColor;
        element.html.title = labelNumberTitleHTML;

        flag && this.props.updateElement(element);
    }

    /**
   * This function responsible for disabling the toolbar in openerElement
   */

    handleToolbarOpener = (event) => {
        if( document.getElementById('tinymceToolbar')){
            document.getElementById('tinymceToolbar').classList.add('toolbar-disabled')
        }
    }   
    renderExistingCOImage = () => {
        let COImg = <div className="exisiting-opener-element-image-view">
            <div className="update-image-label" onClick={()=>{ !hasReviewerRole() && this.setState({updateImageOptions:!this.state.updateImageOptions})}}>Update Image
            <span className="color_Dropdown_arrow">{dropdownArrow}</span>
            </div>
          {this.state.updateImageOptions? <ul className="image-global-button">
                <li onClick={this.handleC2GlobalCO}>Global Opener Element Site</li>
                <li onClick={this.handleC2MediaClick}>Choose from project's Alfresco site</li>
            </ul>:null} 
        </div> 
        return COImg
    }
    renderDefaultCOImage = () => {
        let COImg = <div className="empty-opener-element-view">
            <div className="select-image-label">Select an Image</div>
            <div className="select-image-co-buttons">
                <div className={`${hasReviewerRole() ? "cursor-pointer" : ""} select-image-global-button`} onClick={this.handleC2GlobalCO}>Global Opener Element Site</div>
                <div className={`${hasReviewerRole() ? "cursor-pointer" : ""} select-image-alresco-button`} onClick={this.handleC2MediaClick}>Choose from project's Alfresco site</div>
            </div>
        </div>
        return COImg
    }
    componentDidMount() {
        this.props.saveSelectedAltTextLongDescData({})
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Remove Update Button Popup if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.state.updateImageOptions == true && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                updateImageOptions: false
            })
        }
    }
    render() {
        const { imgSrc, width } = this.state
        const { element, backgroundColor, slateLockInfo } = this.props
        const openerHtmlData = getLabelNumberTitleHTML(element);
        let isDisable = hasReviewerRole() ? " disable-role" : ""

        const styleObj = this.getBGStyle(imgSrc, width)
        return (
            <div className = "opener-element-container" ref={this.setWrapperRef} onClickCapture={(e) => this.handleOpenerClick(slateLockInfo, e)}>
                <div className = "input-box-container">
                    <div className="opener-label-box">
                        <div className="opener-label-text">Label</div>
                        <div className={"element-dropdown-title label-content" + isDisable} onClick={this.toggleLabelDropdown}>{this.state.label}
                            {this.renderLabelDropdown()}
                            <span>{dropdownArrow}</span>
                        </div>
                    </div>
                    <div className="opener-label-box oe-number-box">
                        <div className="opener-number-text">Number</div>
                        <input className={"element-dropdown-title opener-number" + isDisable} maxLength="9" value={this.state.number} type="text" onChange={this.handleOpenerNumberChange} onKeyPress={this.numberValidatorHandler} onBlur={this.handleBlur} onClick={this.handleToolbarOpener}/>
                    </div>
                    <div className="opener-label-box oe-title-box">
                        <div className="opener-title-text">Title</div>
                        <TinyMceEditor permissions={this.props.permissions} element={this.props.element} handleEditorFocus={this.props.handleFocus} handleBlur={this.handleBlur} index={`${this.props.index}-2`} tagName='opener' className={"element-dropdown-title opener-title" + isDisable} model={openerHtmlData.formattedTitle} slateLockInfo={this.props.slateLockInfo} elementId={this.props.elementId}/>
                    </div>
                </div>
                {imgSrc?this.renderExistingCOImage():this.renderDefaultCOImage()}
                
                <figure className="pearson-component opener-image figureData" style={{ backgroundColor: `${backgroundColor}` }}>
                    <img style={styleObj} src={imgSrc ? imgSrc : noImage}
                        draggable="false" 
                    />
                </figure>
            </div>
        )
    }
}

OpenerElement.propTypes = {
    /** Model */
    element : PropTypes.object.isRequired,
}

OpenerElement.displayName = 'OpenerElement'


const mapActionToProps = (dispatch) =>{
    return{
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        },
        saveSelectedAlfrescoElement: (payloadObj) => {
            dispatch(saveSelectedAlfrescoElement(payloadObj))
        },
        saveSelectedAltTextLongDescData: (payloadObj) => {
            dispatch(saveSelectedAltTextLongDescData(payloadObj))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        setSlateParent :  state.appStore.setSlateParent
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(OpenerElement);  