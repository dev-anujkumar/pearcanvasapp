import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { labelOptions } from './LabelOptions'
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';

import '../../styles/OpenerElement/OpenerElement.css'

import noImage from '../../images/OpenerElement/no-image.png'
import { c2MediaModule } from './../../js/c2_media_module';

import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import { checkSlateLock } from "../../js/slateLockUtility.js"
import { getPermissions } from '../../js/UserPermissions.js'

class OpenerElement extends Component {

    constructor(props){
        super(props)

        this.state = {
            label: props.model ? props.model.label : "Chapter",
            number: props.model ? props.model.number : "",
            title: props.model ? props.model.title : "",
            showLabelDropdown: false,
            imgSrc: null,
            width: null
        }
    }

    dataFromAlfresco = (data) => {
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";
        let smartLinkPath = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:url'].value) ? imageData.body.results[0].properties['s.avs:url'].value : "";
        let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
        let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {
            let imageId = imageData['workURN'] ? imageData['workURN'] : "";
            let previewURL = imageData['previewUrl'] ? imageData['previewUrl'] : "";
            let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
            this.setState({ imgSrc: epsURL, width })
            if (document.querySelector("[name='alt_text']"))
                document.querySelector("[name='alt_text']").innerHTML = altText;
            if (document.querySelector("[name='long_description']"))
                document.querySelector("[name='long_description']").innerHTML = longDesc;
        }
    }
    handleC2ExtendedClick = (data) => {
        let data_1 = data;
        let that = this;
        c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
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
        const { slateLockInfo } = this.props
        if(slateLockInfo.isLocked && config.userId != slateLockInfo.userId)
            return false

        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;
        if (alfrescoPath && alfrescoPath.nodeRef) {
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
        } else {
            if (this.props.getPermissions('alfresco_crud_access')) {
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
        this.toggleLabelDropdown()
    }
    
    /**
     * Toggles label dropdown
     */
    toggleLabelDropdown = () => {
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
        if(imgSrc){
            styleObj["width"] = width ? width : "100%"
        }

        return styleObj
    }
    
    /**
     * Handles Focus on opener element
     * @param {slateLockInfo} Slate lock data
     */
    handleOpenerClick = (slateLockInfo) => {
        if(checkSlateLock(slateLockInfo)){
            return false
        }
        this.props.onClick()

    }
    
    render() {
        const { imgSrc, width } = this.state
        const { element, backgroundColor, slateLockInfo } = this.props
        const styleObj = this.getBGStyle(imgSrc, width)
        return (
            <div className = "opener-element-container" onClick={() => this.handleOpenerClick(slateLockInfo)}>
                <div className = "input-box-container">
                    <div className="opener-label-box">
                        <div className="opener-label-text">Label</div>
                        <div className="element-dropdown-title label-content" onClick={this.toggleLabelDropdown}>{this.state.label}
                            {this.renderLabelDropdown()}
                            <span>{dropdownArrow}</span>
                        </div>
                    </div>
                    <div className="opener-label-box">
                        <div className="opener-number-text">Number</div>
                        <input className="element-dropdown-title opener-number" maxLength="9" value={this.state.number} type="text" onChange={this.handleOpenerNumberChange} onKeyPress={this.numberValidatorHandler} />
                    </div>
                    <div className="opener-label-box">
                        <div className="opener-title-text">Title</div>
                        <input className="element-dropdown-title opener-title" value={this.state.title} type="text" onChange={this.handleOpenerTitleChange} />
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

export default connect(
    null, 
    {
        getPermissions
    }
)(OpenerElement);
