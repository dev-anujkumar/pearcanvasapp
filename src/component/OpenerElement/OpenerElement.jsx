import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { labelOptions, getOpenerContent, getOpenerImageSource } from './OpenerConstants'
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';

import '../../styles/OpenerElement/OpenerElement.css'
import { hasReviewerRole } from '../../constants/utility';
import noImage from '../../images/OpenerElement/no-image.png'
import { c2MediaModule } from './../../js/c2_media_module';

import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import { checkSlateLock } from "../../js/slateLockUtility.js"

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
            label: getOpenerContent(textsemantics, "label", text) || "No Label",
            number: getOpenerContent(textsemantics, "number", text),
            title: getOpenerContent(textsemantics, "title", text),
            showLabelDropdown: false,
            imgSrc: getOpenerImageSource(bgImage),
            width: null,
            imageId: props.element.backgroundimage.imageid ? props.element.backgroundimage.imageid : "",
        }
    }

    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
        let imageId = imageData['workURN'] ? imageData['workURN'] : "";
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
        let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {
            let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
            this.setState({
                imgSrc: epsURL,
                imageId: imageId,
                width
            });
            if (document.querySelector("[name='alt_text']"))
                document.querySelector("[name='alt_text']").innerHTML = altText;
            if (document.querySelector("[name='long_description']"))
                document.querySelector("[name='long_description']").innerHTML = longDesc;
        }
        
        this.handleBlur({imgSrc: epsURL, imageId});
        disableHeader(false)
        hideTocBlocker()
    }
    handleC2ExtendedClick = (data) => {
        let data_1 = data;
        let that = this;
        !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })
    }

     /**
     * Responsible for opening C2 media popup
     * @param {e} event
     */
    handleC2MediaClick = (e) => {
        if(hasReviewerRole()){
            return true
        }
        const { slateLockInfo , permissions } = this.props
        if(checkSlateLock(slateLockInfo))
            return false

        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;
        if (alfrescoPath && alfrescoPath.nodeRef) {
            if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco'))    { 
            data_1 = alfrescoPath;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']
            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']
            this.handleC2ExtendedClick(data_1)
            }
            else{
                this.props.accessDenied(true)
            }
        } else {
            if (permissions.includes('alfresco_crud_access')) {
                c2MediaModule.onLaunchAddAnAsset(function (data_1) {
                    c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                        c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                            that.dataFromAlfresco(data);
                        })
                    })
                });
            }
        }
    }

    /**
     * Handles label model change event
     * @param {e} event
     */
    handleOpenerLabelChange = e => {
        this.setState({
            label: e.target.innerHTML
        })
        this.handleBlur(e)
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
        const openerLabelOptions = labelOptions.map((value, index) => {
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
     * Handles title model change event
     * @param {e} event
     */
    handleOpenerTitleChange = e => {
        this.setState({
            title: e.target.value            
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
              "max-width": "605px",
              "height": "384px",
              "margin-top": "1.5em",
              "margin-left": "auto",
             "margin-right": "auto",
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
        if(checkSlateLock(slateLockInfo)){
            e.preventDefault()
            return false
        }
        this.props.onClick()

    }

    createSemantics = ({...values}) => {
        let textSemantics = [];
        let currentIndex = 0;
        
        Object.keys(values).forEach(item => {
            textSemantics.push({
                "type": item,
                "charStart": currentIndex,
                "charEnd": currentIndex += (values[item]).length
            });
            currentIndex++;
        });

        return textSemantics;
    }

    /**
     * Handles blur event for each input box and initiates saving call
     * @param {*} event blur event object
     */
    handleBlur = (event) => {
        if(checkSlateLock(this.props.slateLockInfo)){
            event.preventDefault()
            return false
        }
        let element = this.props.element;
        let { label, number, title, imgSrc, imageId } = this.state;
        label = event.target && event.target.innerText ? event.target.innerText : label;
        imgSrc = event.imgSrc || imgSrc;
        imageId = event.imageId || imageId;

        if(!element.title) {
            element.title = {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "",
                "textsemantics": []
            };
        }
                
        element.title.text = `${label} ${number}: ${title}`;
        element.title.textsemantics = this.createSemantics({label, number});

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

        this.props.updateElement(element);
    }
    
    
    render() {
        const { imgSrc, width } = this.state
        const { element, backgroundColor, slateLockInfo } = this.props
        const styleObj = this.getBGStyle(imgSrc, width)
        return (
            <div className = "opener-element-container" onClickCapture={(e) => this.handleOpenerClick(slateLockInfo, e)}>
                <div className = "input-box-container">
                    <div className="opener-label-box">
                        <div className="opener-label-text">Label</div>
                        <div className="element-dropdown-title label-content" onClick={this.toggleLabelDropdown}>{this.state.label}
                            {this.renderLabelDropdown()}
                            <span>{dropdownArrow}</span>
                        </div>
                    </div>
                    <div className="opener-label-box oe-number-box">
                        <div className="opener-number-text">Number</div>
                        <input className="element-dropdown-title opener-number" maxLength="9" value={this.state.number} type="text" onChange={this.handleOpenerNumberChange} onKeyPress={this.numberValidatorHandler} onBlur={this.handleBlur} />
                    </div>
                    <div className="opener-label-box oe-title-box">
                        <div className="opener-title-text">Title</div>
                        <input className="element-dropdown-title opener-title" value={this.state.title} type="text" onChange={this.handleOpenerTitleChange} onBlur={this.handleBlur} />
                    </div>
                </div>
                <figure className="pearson-component opener-image figureData" onClick={this.handleC2MediaClick} style={{ backgroundColor: `${backgroundColor}` }}>
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
    model : PropTypes.object.isRequired,
}

OpenerElement.displayName = 'OpenerElement'

export default OpenerElement;
  