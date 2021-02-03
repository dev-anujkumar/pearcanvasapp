import React from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { connect } from 'react-redux';
import config from '../../config/config'
import {
    fetchSlateData,
    createPopupUnit
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js'
import { checkSlateLock } from '../../js/slateLockUtility.js'
import { getTitleSubtitleModel } from "../../constants/utility.js"
import { findKey } from "lodash";

/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/

class ElementPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openPopupSlate:false
        }
        this.popupBorderRef = React.createRef()
    }
    componentDidMount = () => {
        this.popupBorderRef.current.addEventListener('click', this.handlepopupSlateClick)
    }
    componentWillUnmount = () => {
        this.popupBorderRef.current.removeEventListener('click', this.handlepopupSlateClick);
    }
    handlepopupSlateClick = (event) => {
        this.props.handleFocus();
        if(config.popupCreationCallInProgress || config.isSavingElement){
            return false
        }
        if(event.target.classList.contains("buttonWidgetPU")){
            if(!(checkSlateLock(this.props.slateLockInfo) || this.props.activeElement.elementId !== this.props.element.id  || config.savingInProgress)){
                this.renderSlate()
            }
        } 
    }
    
    renderSlate =()=>{
        const { element, index, slateLevelData } = this.props
        const sUrn = findKey(slateLevelData, (slate) => (slate.type === "manifest" || slate.type === "chapterintro"))
        const eUrn = slateLevelData[sUrn] && slateLevelData[sUrn].contentUrn
        config.tempSlateManifestURN = sUrn
        config.tempSlateEntityURN = eUrn
        config.slateManifestURN = element.id
        config.slateEntityURN = element.contentUrn
        config.cachedActiveElement = {
            index,
            element: {...element}
        }
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        this.props.fetchSlateData(config.slateManifestURN, config.slateEntityURN, 0, false,"");
    }

    /**
     * Creates Title/Subtitle element if not present.
     */
    createPopupUnit = async (popupField, forceupdate, index, parentElement, createdFromFootnote) => {
        if (!config.popupCreationCallInProgress) {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
            config.popupCreationCallInProgress = true
            await this.props.createPopupUnit(popupField, parentElement, (currentElementData) => this.props.handleBlur(forceupdate, currentElementData, index, null), index, config.slateManifestURN, createdFromFootnote)
        }
    }
    renderPopup = () => {        
        const {index, element, slateLockInfo} = this.props
        const { popupdata } = element
        let formattedTitle, formattedSubtitle

        /** If both formatted-title and subtitle or only formatted-title is present */
        if (popupdata && popupdata.hasOwnProperty('formatted-title')) {
            formattedTitle = getTitleSubtitleModel(popupdata["formatted-title"].html.text, "formatted-title").replace(/&nbsp;/g, "")
            formattedSubtitle = getTitleSubtitleModel(popupdata["formatted-title"].html.text, "formatted-subtitle")
        }
        /** If only formatted-subtitle is present */
        else if (popupdata && popupdata.hasOwnProperty('formatted-subtitle') && !popupdata.hasOwnProperty('formatted-title')) {
            formattedTitle = `<p class="paragraphNumeroUno"><br/></p>`
            formattedSubtitle = getTitleSubtitleModel(popupdata["formatted-subtitle"].html.text, "formatted-subtitle")
        }
        else {
            formattedTitle = `<p class="paragraphNumeroUno"><br/></p>`
            formattedSubtitle = `<p class="paragraphNumeroUno"><br/></p>`
        }

        return(
            <div className="divWidgetPU" resource="">
                <figure className="figureWidgetPU" resource="">
                    <header>
                        <TinyMceEditor permissions = {this.props.permissions}
                            openGlossaryFootnotePopUp = {this.props.openGlossaryFootnotePopUp}
                            element = {element}
                            index = {`${index}-0`}
                            className = "heading4WidgetPUNumberLabel figureLabel formatted-text"
                            id = {this.props.id}
                            placeholder = "Enter Label..."
                            tagName = {'h4'}
                            model = {formattedTitle}
                            currentElement = {popupdata && (popupdata["formatted-title"] || popupdata["formatted-subtitle"])}
                            handleEditorFocus = {this.props.handleFocus}
                            handleBlur = {this.props.handleBlur}
                            slateLockInfo = {slateLockInfo}
                            glossaryFootnoteValue = {this.props.glossaryFootnoteValue}
                            glossaaryFootnotePopup = {this.props.glossaaryFootnotePopup}
                            elementId = {this.props.elementId}
                            popupField = "formatted-title"
                            createPopupUnit = {this.createPopupUnit}
                            handleAudioPopupLocation = {this.props.handleAudioPopupLocation}
                        />
                        <TinyMceEditor permissions = {this.props.permissions} 
                            openGlossaryFootnotePopUp = {this.props.openGlossaryFootnotePopUp} 
                            element = {element}
                            index = {`${index}-1`}
                            className = 'heading4WidgetPUTitle figureTitle formatted-text'
                            id = {this.props.id}
                            placeholder = "Enter Title..."
                            tagName = {'h4'}
                            model={formattedSubtitle} 
                            currentElement = {popupdata && (popupdata["formatted-title"] || popupdata["formatted-subtitle"])}
                            handleEditorFocus = {this.props.handleFocus}
                            handleBlur = {this.props.handleBlur}
                            slateLockInfo = {slateLockInfo}
                            glossaryFootnoteValue = {this.props.glossaryFootnoteValue}
                            glossaaryFootnotePopup = {this.props.glossaaryFootnotePopup}
                            elementId = {this.props.elementId} 
                            popupField = "formatted-subtitle" 
                            createPopupUnit = {this.createPopupUnit}
                            handleAudioPopupLocation = {this.props.handleAudioPopupLocation}
                        />
                    </header>
                    <div className="pearson-component pu"  data-uri="" data-type="pu" data-width="600" data-height="399" ref={this.popupBorderRef}>
                        {
                            <a className="buttonWidgetPU">
                                <TinyMceEditor permissions = {this.props.permissions}
                                    openGlossaryFootnotePopUp = {this.props.openGlossaryFootnotePopUp}
                                    index = {`${index}-2`} 
                                    placeholder = "Enter call to action..." 
                                    className = {"actionPU formatted-text"} 
                                    id = {this.props.id}
                                    element = {element}
                                    currentElement = {popupdata && popupdata.postertextobject && popupdata.postertextobject[0]}
                                    model = {popupdata && popupdata.postertextobject ? popupdata.postertextobject[0].html.text : "" }
                                    handleEditorFocus = {this.props.handleFocus}
                                    handleBlur = {this.props.handleBlur} 
                                    slateLockInfo = {slateLockInfo} 
                                    elementId = {this.props.elementId}
                                    popupField = "postertextobject" 
                                    createPopupUnit = {this.createPopupUnit}
                                    handleAudioPopupLocation = {this.props.handleAudioPopupLocation}
                                />
                            </a>
                        }
                    </div>
                </figure>
            </div>
        )
    }

    render() {
        return (
            <div className="interactive-element">
                { this.renderPopup() }
            </div>
        )
    }
}
ElementPopup.displayName = "ElementPopup"

const mapStatetoProps = (state) => {
    return {
        slateLevelData: state.appStore.slateLevelData
    }
}

export default connect(
    mapStatetoProps,
    {
        fetchSlateData,
        createPopupUnit
    }
)(ElementPopup);