import axios from 'axios';
import tinymce from 'tinymce/tinymce';
import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    ERROR_POPUP,
    GET_TCM_RESOURCES,
    AUTHORING_ELEMENT_UPDATE,
    CHECK_ASIDE_NUMBER
} from './../../constants/Action_Constants';
import elementTypes from './../Sidebar/elementTypes';
import figureDataBank from '../../js/figure_data_bank';
import { sendDataToIframe } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { DECORATIVE, DECORATIVE_IMAGE, POD_DEFAULT_VALUE, allowedFigureTypesForTCM, tbSidebarEndpoint } from '../../constants/Element_Constants'
import { prepareTcmSnapshots } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import {  handleElementsInShowHide, onUpdateSuccessInShowHide, findSectionType } from '../ShowHide/ShowHide_Helper.js';
import TcmConstants from '../TcmSnapshots/TcmConstants.js';
import { fetchParentData } from '../TcmSnapshots/TcmSnapshotsOnDefaultSlate';
import { checkContainerElementVersion, fetchManifestStatus, prepareSnapshots_ShowHide } from '../TcmSnapshots/TcmSnapshotsCreate_Update';
const { ELEMENT_ASIDE, MULTI_COLUMN, SHOWHIDE } = TcmConstants;
let imageSource = ['image','table','mathImage'],imageDestination = ['primary-image-figure','primary-image-table','primary-image-equation']
const elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza', 'figure', "interactive"];
import { getContainerEntityUrn, updateAutonumberingOnElementTypeUpdate } from '../FigureHeader/AutoNumber_helperFunctions';
import { autoNumberFigureTypesForConverion } from '../FigureHeader/AutoNumberConstants';
import ElementConstants from '../ElementContainer/ElementConstants';
import { decoToOtherTypeConversion, fetchOldDataAfterConversion } from '../ElementContainer/ElementContainer_Actions';
import { updateAutoNumberSequenceOnDelete } from '../FigureHeader/AutoNumber_DeleteAndSwap_helpers';
export const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes, fromToolbar,showHideObj) => (dispatch,getState) => {
    let { appStore } =  getState();
    try {
        let conversionDataToSend = {};
    // Input Element
    let oldElementFigureData ;
    const inputPrimaryOptionsList = elementTypes[oldElementInfo['elementType']],
        inputPrimaryOptionType = inputPrimaryOptionsList[oldElementInfo['primaryOption']],
        overallType = inputPrimaryOptionsList['enumType']

    const inputSubTypeList = inputPrimaryOptionType['subtype'],
        inputSubType = inputSubTypeList[[oldElementInfo['secondaryOption']]]

    let inputSubTypeEnum = inputSubType['enum'],
    inputPrimaryOptionEnum = inputPrimaryOptionType['enum']

    // setting secondaryOption as default when newElementData does not have secondaryOption after conversion from any other figure type to decorative image
    if(newElementData?.secondaryOption === '' && newElementData?.primaryOption === 'primary-image-figure') {
        newElementData.secondaryOption = 'secondary-image-figure-width'
    } else if(newElementData?.primaryOption === 'primary-image-equation' && newElementData?.secondaryOption === '') {
        newElementData.secondaryOption = 'secondary-image-equation-half'
    } else if(newElementData?.primaryOption === 'primary-image-table' && newElementData?.secondaryOption === '') {
        newElementData.secondaryOption = 'secondary-image-table-half'
    }

    // Output Element
    const outputPrimaryOptionsList = elementTypes[newElementData['elementType']],
        outputPrimaryOptionType = outputPrimaryOptionsList[newElementData['primaryOption']]

    const outputSubTypeList = outputPrimaryOptionType['subtype'],
        outputSubType = outputSubTypeList[[newElementData['secondaryOption']]]

        if (oldElementData.type === "figure") {
            if (!(imageSource.includes(oldElementData.figuretype) && (imageDestination.includes(newElementData['primaryOption']) || newElementData.primaryOption === DECORATIVE_IMAGE)) && oldElementData.figuretype !== 'codelisting' && !oldElementData.figuredata.interactivetype){
                oldElementData.figuredata = {...figureDataBank[newElementData['primaryOption']]}
            }
            if(oldElementData.figuredata.srctype){
                oldElementData.figuredata.srctype=outputSubType['wipValue']
            }
            if (oldElementData.figuredata.interactivetype) {
                oldElementFigureData = JSON.parse(JSON.stringify(oldElementData.figuredata));
                oldElementData.figuredata = {...figureDataBank[newElementData['secondaryOption']]}
                oldElementData.html.postertext = ""; /** [BG-2676] - Remove postertext on Conversion */
                if (oldElementData.figuredata && oldElementData.figuredata.postertext && oldElementData.figuredata.postertext.text) {
                    oldElementData.figuredata.postertext.text = "";
                }
            }

            /* On conversion of primary option type, change the POD value to default value */
            if((oldElementData.figuretype  === 'image'|| oldElementData.figuretype === "table" || oldElementData.figuretype === "mathImage" || oldElementData.figuredata?.decorative) &&
            inputPrimaryOptionType !== outputPrimaryOptionType ){
                oldElementData.figuredata.podwidth = POD_DEFAULT_VALUE
            }

        /* on Conversion removing the tinymce instance for BCE element*/
        if ((outputPrimaryOptionType && outputPrimaryOptionType['enum'] === "BLOCK_CODE_EDITOR" || newElementData && newElementData['primaryOption'] === 'primary-blockcode-equation') &&
            newElementData['secondaryOption'] === "secondary-blockcode-language-default") {
            if (tinymce && tinymce.activeEditor && tinymce.activeEditor.id) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', false)
            }
        }
        else {
            if (tinymce && tinymce.activeEditor && tinymce.activeEditor.id && document.getElementById(tinymce.activeEditor.id)) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', true)
            }
        }
        if(oldElementData.figuretype && oldElementData.figuretype === "codelisting" && newElementData['primaryOption'] === "primary-blockcode-equation") {
            oldElementFigureData = JSON.parse(JSON.stringify(oldElementData.figuredata));
            oldElementData.figuredata.programlanguage = elementTypes[newElementData['elementType']][newElementData['primaryOption']].subtype[newElementData['secondaryOption']].text;
             oldElementData.figuredata.preformattedtext = [];
        }

            let figureElementsType = ['image', 'table', 'mathImage', 'audio', 'video', 'interactive', 'codelisting'];
            if (figureElementsType.includes(oldElementData.figuretype)) {
                oldElementData.hasOwnProperty('subtitle') ? delete oldElementData.subtitle : oldElementData;  // conversion of old figure to new type at the time of conversion
            }

            const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled

            // Removing fields on conversion from other figure types to decorative image
            if (newElementData?.primaryOption === DECORATIVE_IMAGE) {
                if(isAutoNumberingEnabled && oldElementData?.hasOwnProperty('numberedandlabel')){
                    oldElementData.numberedandlabel = false
                }
                delete oldElementData?.title
                delete oldElementData?.captions
                delete oldElementData.html?.captions
                delete oldElementData.html?.text
                delete oldElementData.html?.title
                delete oldElementData.figuredata?.type
            }
            // Resetting fields on conversion from decorative image to other figure types
            else if (oldElementData.figuredata?.decorative) {
                dispatch(decoToOtherTypeConversion(true));
                dispatch(fetchOldDataAfterConversion(oldElementData));
                if (isAutoNumberingEnabled && oldElementData?.hasOwnProperty('numberedandlabel')) {
                    oldElementData.numberedandlabel = true
                    oldElementData.displayedlabel = "Figure"
                    if(oldElementData?.hasOwnProperty('manualoverride')){
                        delete oldElementData.manualoverride
                    }
                }
                oldElementData.title = {
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: ""
                }
                oldElementData.captions = {
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: ""
                }
                oldElementData.html = {
                    ...oldElementData.html,
                    title: "<p><br></p>",
                    text: "",
                    captions: "<p><br></p>",
                    credits: oldElementData?.html?.credits
                }
                delete oldElementData?.figuredata?.decorative
                oldElementData.figuredata.type = "image"
            }
    }

    let outputSubTypeEnum = outputSubType['enum'],
    outputPrimaryOptionEnum = outputPrimaryOptionType['enum']

        if (oldElementData.figuretype === "assessment") {
            /**-----------Sidebar Conversion for Single Assessment-----------*/
            let assessmentData = prepareAssessmentDataForConversion(oldElementData, outputSubType.text)
            oldElementData = assessmentData.oldElementData;
            inputSubTypeEnum = inputSubType['enum'];
            outputSubTypeEnum = outputSubType['enum'];
        }
        /** Remove subtype key on conversion from BQ to P/H/LO*/
        let textPrimaryOption = ["primary-paragraph", "primary-heading", 'primary-learning-objective']
        if (oldElementInfo.primaryOption === "primary-blockquote" && oldElementData.subtype && (textPrimaryOption.includes(newElementData.primaryOption))) {
            delete oldElementData.subtype
        }
    /**s
     * Patch [code in If block] - in case list is being converted from toolbar and there are some unsaved changes in current element
     * then send dom html data instead of sending store data
     */
    if (newElementData.primaryOption === "primary-list") {
        let storeHtml = oldElementData.html && oldElementData.html.text || ''
        let containerDom = document.querySelector(`[data-id='${oldElementData.id}']`)
        let elementContainer = containerDom && containerDom.querySelector('.element-container')
        let editableDom = elementContainer && elementContainer.querySelector('.cypress-editable')
        if(editableDom){
          tinyMCE.$(editableDom).find('ol').removeAttr('data-mce-style')
        }
        let domHtml = editableDom ? editableDom.innerHTML : "<ol></ol>"
        if(showHideObj){
            containerDom = document.getElementById(`cypress-${showHideObj.index}`)
            if(containerDom){
                tinyMCE.$(containerDom).find('ol').removeAttr('data-mce-style')
            }
            domHtml = containerDom ? containerDom.innerHTML : "<ol></ol>"
        }
        if (storeHtml !== domHtml) {
            oldElementData.html.text = domHtml
        }
        /**
         * case - if list is being converted from sidepanel then pick counterIncrement value from element data
         */
        if (outputSubTypeEnum !== "DISC" && newElementData.startvalue === undefined && oldElementData.elementdata.type === 'list' && oldElementData.elementdata.startNumber) {
            newElementData.startvalue = parseInt(oldElementData.elementdata.startNumber)
        }
        /**
         * case - if bullet list is being converted into bullet again then explicitly proceed with paragraph coversion
         */
        if (inputPrimaryOptionEnum === outputPrimaryOptionEnum && outputPrimaryOptionEnum==="LIST" && inputSubTypeEnum === outputSubTypeEnum && fromToolbar) {
            outputPrimaryOptionEnum = "AUTHORED_TEXT"
            outputSubTypeEnum = "NA"
        }
    }
        /**
         * case - if element list is being converted into paragraph from sidepanel
         * [BG-2515] | Remove subtype during list to paragraph or heading conversion
         */
        if (oldElementInfo.primaryOption === "primary-list" && (textPrimaryOption.includes(newElementData.primaryOption)) && oldElementData.subtype) {
            delete oldElementData.subtype
        }

    if (oldElementData.subtype && oldElementData.subtype === "workedexample") {
        if (outputSubTypeEnum && outputSubTypeEnum === "WORK_EXAMPLE_2") {
            oldElementData.designtype = "workedexample2"
        }
    }
    if (oldElementData.subtype && oldElementData.subtype === "sidebar") {
        let elemDesigntype = "asideSidebar01"
        switch (outputSubTypeEnum) {
            case "SIDEBAR_02":
                elemDesigntype = "asideSidebar02"
                break;
            case "SIDEBAR_03":
                elemDesigntype = "asideSidebar03"
                break;
            case "SIDEBAR_04":
                elemDesigntype = "asideSidebar04"
                break;
            case "SIDEBAR_05":
                elemDesigntype = "asideSidebar05"
                break;
            // case "SIDEBAR_06":
            //     elemDesigntype = "asideSidebar06"
            //     break;
            case "SIDEBAR_01":
            default:
                elemDesigntype = "asideSidebar01"
                break;
        }
        oldElementData.designtype = elemDesigntype
    }
    if (oldElementData.type === "element-blockfeature") {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = oldElementData.html.text;
        tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
        oldElementData.html.text = tempDiv.innerHTML;
    }
    conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum,
        projectUrn : config.projectUrn,
        slateVersionUrn:appStore.parentUrn && Object.keys(appStore.parentUrn).length !== 0 ? appStore.parentUrn.manifestUrn: config.slateManifestURN,
        counterIncrement: (newElementData.startvalue > 0) ? (newElementData.startvalue) : 1, // earlier default by 0
        index: indexes[indexes.length - 1],
        slateEntity : appStore.parentUrn && Object.keys(appStore.parentUrn).length !== 0 ?appStore.parentUrn.contentUrn:config.slateEntityURN
    }
    const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled
    if (newElementData.primaryOption !== "primary-list" && conversionDataToSend.inputType === conversionDataToSend.outputType && conversionDataToSend.inputSubType === conversionDataToSend.outputSubType) {
        return;
    }
    if (showHideObj) {
        if (showHideObj?.containerinSH?.element?.type !== ELEMENT_ASIDE && showHideObj?.containerinSH?.parent?.type !== SHOWHIDE) {
            conversionDataToSend["sectionType"] = showHideObj.showHideType;
            conversionDataToSend["elementParentEntityUrn"] = showHideObj.element.contentUrn;
        }
    }
    if (isAutoNumberingEnabled && (outputPrimaryOptionEnum === 'AUDIO' || outputPrimaryOptionEnum === 'VIDEO')) {
        conversionDataToSend = {
            ...conversionDataToSend,
            displayedlabel: outputPrimaryOptionEnum === 'AUDIO' ? 'Audio' : 'Video'
        }
    }

    let parentEntityUrn = conversionDataToSend.elementParentEntityUrn || appStore.parentUrn && appStore.parentUrn.contentUrn || config.slateEntityURN
    conversionDataToSend["elementParentEntityUrn"] = parentEntityUrn
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.conversionInProcess = true
    if(config.elementStatus[conversionDataToSend.id] === "approved"){
        config.savingInProgress = true
    }
    config.isSavingElement = true
    const url = `${config.REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(async res =>{
        // Making condition true for triggering slate level save api
        localStorage.setItem('isChangeInSlate', 'true');
        let parentData = store;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        /** [PCAT-8289] -------------------------------- TCM Snapshot Data handling ----------------------------------*/
        // This check is added to prevent snapshots for TB element, it will be removed when TB element will support TCM
        const isTbElement = appStore?.asideData?.subtype === ElementConstants.TAB || appStore?.asideData?.parent?.subtype === ElementConstants.TAB || appStore?.asideData?.grandParent?.asideData?.subtype === ElementConstants.TAB || appStore?.asideData?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB;
        if (!isTbElement) {
            if (elementType.indexOf(oldElementData.type) !== -1) {
                if (oldElementData && (oldElementData.figuretype == "codelisting" || oldElementData.figuretype == "interactive")) {
                    oldElementData.figuredata = oldElementFigureData
                }
                let elementConversionData = {
                    currentSlateData: {
                        status: currentSlateData.status,
                        contentUrn: currentSlateData.contentUrn
                    },
                    oldElementData: oldElementData,
                    response: res.data
                }
                if (config.isPopupSlate) {
                    elementConversionData.currentSlateData.popupSlateData = currentParentData[config.tempSlateManifestURN]
                }
                if (currentSlateData && currentSlateData.status === 'approved') {
                    await tcmSnapshotsForConversion(elementConversionData, indexes, appStore, dispatch)
                }
                else {
                    /**
                    * @param {Object} newAppStore
                    * @description - Adding showhide data into appstore variable to form snapshots of conversion
                    */
                    const newAppStore = showHideObj?.element?.type === "showhide" ? { ...appStore, showHideObj } : appStore;
                    tcmSnapshotsForConversion(elementConversionData, indexes, newAppStore, dispatch)
                }

            }
        }
        /**-----------------------------------------------------------------------------------------------------------*/

        if (res && res.data && res.data.type && res.data.type === 'figure' && res.data.figuretype && res.data.figuretype === 'codelisting') {
            if (res.data.figuredata && !res.data.figuredata.programlanguage) {
                res.data.figuredata.programlanguage = 'Select';
            }
        }
        if (currentSlateData.status === 'approved') {
            if(currentSlateData.type==="popup"){
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            }
            else{
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            /**
             * PCAT-6929 : Renumbering of List element creates a new version but doesn't reorder the List numbering in element
             */
        }
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        config.conversionInProcess = false
        if (currentSlateData.status === 'wip') {
            config.savingInProgress = false
        }
        config.isSavingElement = false
        tinymce.activeEditor&&tinymce.activeEditor.undoManager&&tinymce.activeEditor.undoManager.clear();
        /**------------------------------------------------[BG-2676]------------------------------------------------- */
        let posterText = res.data && res.data.html && res.data.html.postertext
        let ctaNode = document.querySelector(`#cypress-${indexes[0]}-2.actionPU`)
        if (posterText === "" || posterText === '<p></p>') {
            if (ctaNode) {
                setTimeout(() => {
                    ctaNode.click();
                }, 0)
                ctaNode.classList.add("place-holder")
            }
        }
        /**-------------------------------------------------------------------------------------------------------- */
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let focusedElement = bodymatter;
        //Separate case for element conversion in showhide
        if (showHideObj) {
            if (appStore?.asideData?.parent?.type === "showhide") {
                switch (indexes.length) {
                    case 4:
                        bodymatter[indexes[0]].interactivedata[appStore?.asideData?.parent?.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]] = res.data;
                        break;
                    case 5:
                        bodymatter[indexes[0]].interactivedata[appStore?.asideData?.parent?.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = res.data;
                        break;
                }
            } else {
                onUpdateSuccessInShowHide(res?.data, bodymatter, indexes, appStore?.asideData);
            } // Update store for element inside Tab of TB
        } else if (appStore?.asideData?.type === ElementConstants.MULTI_COLUMN && appStore?.asideData?.subtype === ElementConstants.TAB) {
            bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]] = res.data;
        } else if (appStore.parentUrn.elementType === "group") {
            focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] = res.data
            // TB->Tab->AS/WE->Element
        } else if(appStore?.asideData?.parent?.type === ElementConstants.MULTI_COLUMN && appStore?.asideData?.parent?.subtype === ElementConstants.TAB) {
            switch(indexes.length) {
                case 5:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]] = res.data;
                    break;
                case 6:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]] = res.data;
                    break;
            }
        } else if(appStore?.asideData?.parent?.type === "groupedcontent") {
            switch(indexes.length) {
                case 4:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]] = res?.data;
                    break;
                case 5:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = res?.data;
                    break;
            }
            // Tab Element of TB element
        } else if (appStore?.asideData?.parentElementType === ElementConstants.MULTI_COLUMN && appStore?.asideData?.parentElementSubtype === ElementConstants.TAB) {
            focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0] = res.data;
        }
        else {
            indexes.forEach(index => {
                if(focusedElement[index]){
                if(newElementData.elementId === focusedElement[index].id) {
                    focusedElement[index] = res.data
                } else {
                    if(('elementdata' in focusedElement[index] && 'bodymatter' in focusedElement[index].elementdata) || ('contents' in focusedElement[index] && 'bodymatter' in focusedElement[index].contents) || 'interactivedata' in bodymatter[index]) {
                        focusedElement = focusedElement[index].elementdata && focusedElement[index].elementdata.bodymatter ||  focusedElement[index].contents && focusedElement[index].contents.bodymatter ||  bodymatter[index].interactivedata[showHideObj.showHideType]
                    }
                }
            }
            });
        }
        store[config.slateManifestURN].contents.bodymatter = bodymatter;
        let altText="";
        let longDesc="";
        if(res.data.figuredata){
            altText=res.data.figuredata && res.data.figuredata.alttext ? res.data.figuredata.alttext : "";
            longDesc = res.data.figuredata && res.data.figuredata.longdescription ? res.data.figuredata.longdescription : "";
        }

        let activeElementObject = {
            elementId: res.data.id,
            index: indexes.join("-"),
            elementType: newElementData.elementType,
            primaryOption: newElementData.primaryOption,
            secondaryOption: newElementData.secondaryOption,
            tag: newElementData.labelText,
            toolbar: newElementData.toolbar,
            elementWipType: newElementData.elementWipType,
            altText,
            longDesc
        };
        if(newElementData.primaryOption=='primary-blockcode-equation'){
            activeElementObject.numbered= res.data.figuredata.numbered
          activeElementObject.startNumber= res.data.figuredata.startNumber
           activeElementObject.syntaxhighlighting= res.data.figuredata.syntaxhighlighting

        }
        const asideElementTypes = ['element-aside', 'element-workedexample'];
        if (asideElementTypes.includes(newElementData.elementType)) {
            const hasAsideNumber = (res.data?.html?.title && (res.data?.html?.title !== "<p class='paragraphNumeroUno'></p>" && res.data?.html?.title !== "<p></p>")) ? true : false;
            activeElementObject.asideNumber = hasAsideNumber
        }
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: store
        });
        const isBCE_Element = res.data?.type === 'figure' && res.data?.figuretype === 'codelisting' ?  true : false
        if (isAutoNumberingEnabled && autoNumberFigureTypesForConverion.includes(outputPrimaryOptionEnum) && !isBCE_Element ) {
            const autoNumberedElements = getState()?.autoNumberReducer?.autoNumberedElements;
            const currentSlateAncestorData = getState()?.appStore?.currentSlateAncestorData;
            dispatch(updateAutonumberingOnElementTypeUpdate(res.data, oldElementData, autoNumberedElements, currentSlateAncestorData, store));
        }
        // Handling autonumbering when figure type is changed to decorative
        else if(isAutoNumberingEnabled && outputPrimaryOptionEnum === DECORATIVE && !isBCE_Element) {
            const autoNumberedElements = getState()?.autoNumberReducer?.autoNumberedElements;
            const currentSlateAncestorData = getState()?.appStore?.currentSlateAncestorData;
            const parentIndex = getContainerEntityUrn(currentSlateAncestorData);
            dispatch(updateAutoNumberSequenceOnDelete(parentIndex, res.data.contentUrn, autoNumberedElements))
        }
        /**
         * PCAT-7902 || ShowHide - Content is removed completely when clicking the unordered list button twice.
         * Setting the correct active element to solve this issue.
         */
        if(showHideObj && res.data.type === "element-authoredtext"){
            activeElementObject = {
                ...activeElementObject,
                primaryOption: "primary-paragraph",
                secondaryOption: "secondary-paragraph",
                tag: "P",
                toolbar: [],
                elementWipType: "element-authoredtext"
            }
        }

        //tcm conversion code
        if (config.tcmStatus && !isTbElement) {
            if (elementType.indexOf(oldElementData.type) !== -1) {
                prepareDataForConversionTcm(oldElementData.id, getState, dispatch, res.data.id, res.data);
            }
        }
        dispatch({
            type: SET_ACTIVE_ELEMENT,
            payload: activeElementObject
        });
        if (activeElementObject.tag === "BQ") {
            const node1 = document.querySelector(`[data-id="${activeElementObject.elementId}"]`)
            const node2 = node1?.querySelector(`.paragraphNummerEins`)
            node2?.focus()
        }
    })

    .catch(err =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
        console.error("Conversion Error >> ",err)
    })
}
catch (error) {
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
    dispatch({type: ERROR_POPUP, payload:{show: true}})
    console.error(error)
}
}
function prepareDataForConversionTcm(updatedDataID, getState, dispatch,versionid, resData) {
    if (resData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(resData.figuretype)) {
        return false
    }
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData && tcmData.filter(function (element, index) {
    if (element && element.elemURN && (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work'))) {
            indexes.push(index)
        }
    });
    if (indexes.length == 0 || (versionid && updatedDataID !== versionid)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionid && updatedDataID !== versionid ? versionid : updatedDataID,
            "feedback": null
        })
    }
    else {
        if(tcmData && tcmData[indexes] && indexes.length > 0 && updatedDataID){
        tcmData[indexes]["elemURN"] = updatedDataID
        tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
        tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
        tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false
        }
    }
    if (tcmData.length>0) {
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
    }
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}

/**
 * @function tcmSnapshotsForConversion
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementConversionData - Object containing required element data
 * @param {String} indexes - index of element
 * @param {Object} appStore - store data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForConversion = async (elementConversionData,indexes,appStore,dispatch) => {
    try{
        const { oldElementData, response, currentSlateData } = elementConversionData
        if (response.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(response.figuretype)) {
            return false
        }
        let actionStatus = {
            action:"update",
            status:"",
            fromWhere:"conversion"
        }
        let convertAppStore = JSON.parse(JSON.stringify(appStore.slateLevelData));
        let convertSlate = convertAppStore[config.slateManifestURN];
        let convertBodymatter = convertSlate.contents.bodymatter;
        let convertParentData = fetchParentData(convertBodymatter,indexes, appStore.showHideObj, response);
        let versionStatus = fetchManifestStatus(convertBodymatter, convertParentData,response.type);
        /** latest version for WE/CE/PE/AS/2C*/
        convertParentData = await checkContainerElementVersion(convertParentData, versionStatus, currentSlateData)
        /**
        * @description For SHOWHIDE Element - create showHideObj/AsideData/parentUrn to prepare
        * snapshots of showhide element
        * @param {String} typeOfElement
        */
        const typeOfElement = convertParentData?.asideData?.grandParent?.asideData?.type;
        if([ELEMENT_ASIDE, MULTI_COLUMN].includes(typeOfElement)) {
            convertParentData = prepareSnapshots_ShowHide(convertParentData, response, indexes);
        }
        if (oldElementData.id !== response.id) {
            oldElementData.id = response.id
            oldElementData.versionUrn = response.id
            let actionStatusVersioning = Object.assign({}, actionStatus);
            actionStatusVersioning.action="create"
            actionStatusVersioning.status ="accepted"
            prepareTcmSnapshots(oldElementData, actionStatusVersioning, convertParentData, "",indexes);
        }

        prepareTcmSnapshots(response,actionStatus, convertParentData,"",indexes);
    } catch(error){
        console.log("Error: ", error)
    }
}

const prepareAssessmentDataForConversion = (oldElementData, format) => {

    let usageType = document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText;
    let assessmentFormat = format == "Elm" ? "puf" : format.toLowerCase();
    let assessmentItemType = assessmentFormat == 'tdx' ? "tdxAssessmentItem" : "assessmentItem";
	if (assessmentFormat === "quad cite") {
        assessmentFormat = "cite"
    }
    oldElementData.figuredata.elementdata={
        usagetype : usageType,
        assessmentid : "",
        assessmentitemid : "",
        assessmenttitle: "",
        assessmentitemtitle: "",
        assessmentformat : assessmentFormat,
        assessmentitemtype : assessmentItemType,
        schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment"
    }

    if (oldElementData && oldElementData.html && oldElementData.html.title) {
        oldElementData.html.title = "";
    }
    if (oldElementData && oldElementData.title && oldElementData.title.text) {
        oldElementData.title.text = "";
    }

    /** [PCAT-6792] | WIP changes in embedded assessment */
    /** [PCAT-7961] | case(1) - As no unique figuredata.id is present for the assessment,the  'figuredata.id' key is removed */
    if (oldElementData && oldElementData.figuredata && (oldElementData.figuredata.id || oldElementData.figuredata.id == "")) {
        delete oldElementData.figuredata.id;
    }
    /** [PCAT-7961] | case(2) - As no image is present for the assessment,the  'posterimage' key is removed */
    let isPosterImage = oldElementData && oldElementData.figuredata && oldElementData.figuredata.elementdata && oldElementData.figuredata.elementdata.posterimage;
    if (isPosterImage) {
        delete oldElementData.figuredata.elementdata.posterimage
    }
    let asessmentConversionData = {
        oldElementData: oldElementData
    }

    return asessmentConversionData
}

export const handleElementConversion = (elementData, store, activeElement, fromToolbar,showHideObj) => (dispatch, getState) => {
    let { appStore } = getState()
    store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0) {
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let indexes = activeElement.index;
        indexes = indexes?.toString().split("-");
        //Separate case for element conversion in showhide
        if(showHideObj || (appStore?.asideData?.type === 'showhide')) {
            const innerElementType = activeElement.elementType
            let oldElementData = handleElementsInShowHide(bodymatter, indexes, innerElementType, showHideObj, '', appStore?.asideData);
            let showhideElement = {
                currentElement: oldElementData.currentElement,
                index: activeElement.index,
                containerinSH: appStore?.asideData,
                element: appStore?.asideData,
                showHideType: oldElementData.showHideType
            }
            dispatch(convertElement(showhideElement.currentElement, elementData, activeElement, store, indexes, fromToolbar, showhideElement));
        } else if (appStore?.asideData?.parent?.type === SHOWHIDE) {
            const innerElementType = activeElement?.elementType
            let elementOldDataSH;
            let sectionType = appStore?.asideData?.sectionType ? appStore?.asideData?.sectionType : appStore?.asideData?.parent?.showHideType;
            if (indexes?.length === 4) {
                elementOldDataSH = bodymatter[indexes[0]]?.interactivedata[sectionType][indexes[2]].elementdata.bodymatter[indexes[3]];
            }
            else if (indexes?.length === 5) {
                elementOldDataSH = bodymatter[indexes[0]]?.interactivedata[sectionType][indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
            }
            let showhideElement = {
                currentElement: elementOldDataSH,
                index: activeElement.index,
                containerinSH: appStore?.asideData,
                element: appStore?.asideData?.parent,
                showHideType: findSectionType(indexes[1])
            }
            dispatch(convertElement(showhideElement.currentElement, elementData, activeElement, store, indexes, fromToolbar, showhideElement));
            // If Element is inside Tab Element of TB element
        } else if (appStore?.asideData?.type === ElementConstants.MULTI_COLUMN && appStore?.asideData?.subtype === ElementConstants.TAB) {
            let elementOldData = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
            dispatch(convertElement(elementOldData, elementData, activeElement, store, indexes, fromToolbar, showHideObj));
        } else if (appStore && appStore.parentUrn && appStore.parentUrn.elementType === "group") {
            let elementOldData = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
            dispatch(convertElement(elementOldData, elementData, activeElement, store, indexes, fromToolbar, showHideObj))
            // TB->Tab->AS/WE->Element
        } else if(appStore?.asideData?.parent?.type === ElementConstants.MULTI_COLUMN && appStore?.asideData?.parent?.subtype === ElementConstants.TAB) {
            let elementOldDataTab;
            switch(indexes.length) {
                case 5:
                    elementOldDataTab = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]];
                    break;
                case 6:
                    elementOldDataTab = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]];
                    break;
            }
            dispatch(convertElement(elementOldDataTab, elementData, activeElement, store, indexes, fromToolbar, showHideObj));
        } else if(appStore?.asideData?.parent?.type === "groupedcontent") {
            let elementOldData2C;
            switch(indexes.length) {
                case 4:
                    elementOldData2C = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                    break;
                case 5:
                    elementOldData2C = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                    break;
            }
            dispatch(convertElement(elementOldData2C, elementData, activeElement, store, indexes, fromToolbar, showHideObj));
            // Tab Element of TB element
        } else if (appStore?.asideData?.parentElementType === ElementConstants.MULTI_COLUMN && appStore?.asideData?.parentElementSubtype === ElementConstants.TAB) {
            let elementOldData = bodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0];
            dispatch(convertElement(elementOldData, elementData, activeElement, store, indexes, fromToolbar, showHideObj));
        }
        else {
            indexes.forEach(index => {
                if(bodymatter[index]){
                    if(elementData.elementId === bodymatter[index].id) {
                        dispatch(convertElement(bodymatter[index], elementData, activeElement, store, indexes, fromToolbar,showHideObj));
                    } else {
                        if( bodymatter[index] && (('elementdata' in bodymatter[index] && 'bodymatter' in bodymatter[index].elementdata) || ('contents' in bodymatter[index] && 'bodymatter' in bodymatter[index].contents) || 'interactivedata' in bodymatter[index])) {
                            bodymatter = bodymatter[index].elementdata && bodymatter[index].elementdata.bodymatter ||   bodymatter[index].contents && bodymatter[index].contents.bodymatter ||  bodymatter[index].interactivedata[showHideObj.showHideType]
                        }

                    }
                }

            });
        }
    }

    return store;
}

/**
 *
 * @param {Object} elementData | element's data which is being converted
 * @param {Boolean} fromToolbar | conversion from toolbar (only list type)
 */
export const conversionElement = (elementData, fromToolbar) => (dispatch, getState) => {
    if(!config.conversionInProcess && !config.savingInProgress && !config.isSavingElement){
        let appStore =  getState().appStore;
        dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement, fromToolbar,appStore.showHideObj));
    } else {
        return false;
    }
}

export const setBCEMetadata = (attribute,value) => (dispatch, getState) => {
    let activeElement =  getState().appStore.activeElement;
    activeElement[attribute]=value
    dispatch({
        type: SET_ACTIVE_ELEMENT,
        payload: activeElement
    });

}



export const updateBlockListMetadata = (dataToUpdate) => (dispatch, getState) => {
    let elementEntityUrn = dataToUpdate.blockListData.contentUrn;
    let dataToSend = dataToUpdate.dataToSend
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.conversionInProcess = true
    config.isSavingElement = true
    const url = `${config.REACT_APP_API_URL}v1/${config.projectUrn}/container/${elementEntityUrn}/metadata`
    return axios.put(url, dataToSend, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(res => {
        const newParentData = getState().appStore.slateLevelData;
        const parsedParentData = JSON.parse(JSON.stringify(newParentData));
        const slateLevelBLIndex = (typeof dataToUpdate?.slateLevelBLIndex === 'number') ? [`${dataToUpdate.slateLevelBLIndex}`] : dataToUpdate.slateLevelBLIndex;
        if (parsedParentData[config.slateManifestURN]?.status === 'approved') {
            if (parsedParentData.type === "popup") {
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message': true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(parsedParentData.id, parsedParentData.contentUrn, 0, parsedParentData, ""));
            }
            else {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
        } else {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            //For Nested BL inside SH i.e Slate->SH->BL->BL || For Parent BL inside SH i.e Slate->SH->BL
            if ((dataToUpdate?.asideData?.parent?.type && dataToUpdate.asideData.parent.type === "showhide" && dataToUpdate?.asideData?.parent?.showHideType) || (dataToUpdate?.asideData?.type && dataToUpdate.asideData.type === "showhide" && dataToUpdate?.asideData?.sectionType)) {
                let showHideSection = dataToUpdate?.asideData?.parent?.showHideType ? dataToUpdate.asideData.parent.showHideType : dataToUpdate.asideData.sectionType;
                updateBLMetaData(dataToUpdate?.blockListData?.id, parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]].interactivedata[showHideSection][slateLevelBLIndex[2]], dataToSend)
            } // For Nested BL inside AS i.e Slate->AS/WE(header)->BL
            else if(parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]]?.type === "groupedcontent"){
                updateBLMetaData(dataToUpdate?.blockListData?.id, parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]]?.groupeddata?.bodymatter[slateLevelBLIndex[1]]?.groupdata?.bodymatter[slateLevelBLIndex[2]], dataToSend)
            }// For Nested BL inside 2C & 3C i.e Slate->2C/3C->BL
            else if((dataToUpdate?.slateLevelBLIndex?.length)%2 === 0 && parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]]?.type === "element-aside"){
                updateBLMetaData(dataToUpdate?.blockListData?.id, parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]].elementdata.bodymatter[slateLevelBLIndex[1]], dataToSend)
            } // For Nested BL inside AS i.e Slate->WE(Body)->BL
            else if(parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]]?.type === "element-aside"){
                updateBLMetaData(dataToUpdate?.blockListData?.id, parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]]?.elementdata?.bodymatter[slateLevelBLIndex[1]]?.contents?.bodymatter[slateLevelBLIndex[2]], dataToSend)
            }//For BL on Slate Level i.e Slate->BL
            else {
                updateBLMetaData(dataToUpdate?.blockListData?.id, parsedParentData[config?.slateManifestURN]?.contents?.bodymatter[slateLevelBLIndex[0]], dataToSend)
            }
            dispatch({
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: parsedParentData
                }
            })
        }
        if(dataToSend.columnnumber || dataToSend.fontstyle || dataToSend.iconcolor){
        let activeElementObject = {
            contentUrn: dataToUpdate.blockListData.contentUrn,
            elementId: dataToUpdate.blockListData.id,
            index: dataToUpdate.index,
            elementType: dataToUpdate.elementType,
            primaryOption: dataToUpdate.primaryOption,
            secondaryOption: dataToUpdate.secondaryOption,
            fontStyle: dataToUpdate.fontStyle,
            bulletIcon: dataToUpdate.iconColor,
            toolbar: dataToUpdate.toolbar,
            elementWipType: dataToUpdate.elementWipType,
            tag: "P"
        };
        dispatch({
            type: SET_ACTIVE_ELEMENT,
            payload: activeElementObject
        });
        }
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
    })
        .catch(err => {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
            console.error(" Error >> ", err)
        })
}

export const updateContainerMetadata = (dataToUpdate) => (dispatch, getState) => {
    const parentData = getState().appStore.slateLevelData;
    const currentParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = currentParentData[config.slateManifestURN];
    const updateParams = {
        dataToUpdate,
        activeElement: getState().appStore.activeElement,
        currentSlateData
    }
    let dataToSend = {
        numberedline: dataToUpdate.isNumbered
    }
    if (dataToUpdate.isNumbered == true) {
        dataToSend.startlinenumber = dataToUpdate.startNumber
    }
    let elementEntityUrn = ""
    const updatedData = dispatch(updateContainerMetadataInStore(updateParams,""))
    if(updatedData?.elementEntityUrn){
        elementEntityUrn = updatedData.elementEntityUrn
    }
    let updatedSlateLevelData = updatedData?.currentSlateData ?? parentData
    currentParentData[config.slateManifestURN] = updatedSlateLevelData
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: currentParentData//{[config.slateManifestURN] : updatedSlateLevelData }
        }
    })
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.conversionInProcess = true
    config.isSavingElement = true
    const url = `${config.REACT_APP_API_URL}v1/${config.projectUrn}/container/${elementEntityUrn}/metadata`
    return axios.put(url, dataToSend, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(res => {
        if (currentSlateData?.status === 'approved') {
            if (currentSlateData.type === "popup") {
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message': true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            }
            else {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
        } else {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            const newParentData = getState().appStore.slateLevelData;
            const parsedParentData = JSON.parse(JSON.stringify(newParentData));
            let newSlateData = parsedParentData[config.slateManifestURN];
            const newParams = {
                dataToUpdate,
                activeElement: getState().appStore.activeElement,
                currentSlateData: newSlateData
            }
            const updatedStore = dispatch(updateContainerMetadataInStore(newParams));
            if(updatedStore.currentSlateData){
                parsedParentData[config.slateManifestURN] = updatedStore.currentSlateData;
                dispatch({
                    type: AUTHORING_ELEMENT_UPDATE,
                    payload: {
                        slateLevelData: parsedParentData//{[config.slateManifestURN] : updatedStore.currentSlateData}
                    }
                })
            }
        }
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
    })
        .catch(err => {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
            console.error(" Error >> ", err)
        })
}

export const updateBLMetaData = (elementId, elementData, metaData) => {
    if(elementData?.id === elementId){
        if(metaData.subtype){
            elementData.subtype = metaData.subtype;
            elementData.listtype = metaData.listtype;
            elementData.startNumber = metaData.startNumber;
        }
        if(metaData.columnnumber){
            elementData.columnnumber = metaData.columnnumber;
        }
        if(metaData.fontstyle){
            elementData.fontstyle = metaData.fontstyle;
        }
        if(metaData.iconcolor){
            elementData.iconcolor = metaData.iconcolor;
        }
    }
    else{
        if (elementData?.listdata?.bodymatter) {
            elementData.listdata?.bodymatter.forEach((listData) => updateBLMetaData(elementId, listData,metaData))
        }
        if (elementData?.listitemdata?.bodymatter) {
            elementData.listitemdata.bodymatter.forEach((listItemData, index) => {
                if (listItemData.id === elementId) {
                    if(metaData.subtype){
                        elementData.listitemdata.bodymatter[index].subtype = metaData.subtype;
                        elementData.listitemdata.bodymatter[index].listtype = metaData.listtype;
                        elementData.listitemdata.bodymatter[index].startNumber = metaData.startNumber;
                    }
                    if(metaData.columnnumber){
                        elementData.listitemdata.bodymatter[index].columnnumber = metaData.columnnumber;
                    }
                    if(metaData.fontstyle){
                        elementData.listitemdata.bodymatter[index].fontstyle = metaData.fontstyle;
                    }
                    if(metaData.iconcolor){
                        elementData.listitemdata.bodymatter[index].iconcolor = metaData.iconcolor;
                    }
                    return;
                }
                updateBLMetaData(elementId, listItemData,metaData);
            });
        }
    }
}


const updateContainerMetadataInStore = (updateParams, elementEntityUrn="") => (dispatch, getState) => {
    const { appStore } =  getState();
    const {
        dataToUpdate,
        activeElement,
        currentSlateData,
        versionedElement
    } = updateParams;
    const { index, elementType } = activeElement;
    let tmpIndex = typeof index === 'number' ? index : index.split("-")
     let indexesLen = tmpIndex.length
     let newBodymatter = currentSlateData.contents.bodymatter
     let updatedElement = {}
    if (versionedElement) {
        return versionedElement
    } else if (elementType == "poetry") {
        if(typeof tmpIndex === 'number'){
            currentSlateData.contents.bodymatter[tmpIndex].numberedline = dataToUpdate.isNumbered
            currentSlateData.contents.bodymatter[tmpIndex].startlinenumber = dataToUpdate.startNumber
            updatedElement = currentSlateData.contents.bodymatter[tmpIndex]
        } else {
            switch (indexesLen) {
                case 2:     /** Toggle use line of PE inside WE/Aside */
                    newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].numberedline = dataToUpdate.isNumbered
                    newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].startlinenumber = dataToUpdate.startNumber
                    updatedElement = newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]]
                    break;

                case 3:      /** Toggle Use Line of PE inside multicolumn/ WE section break*/
                    if (newBodymatter[tmpIndex[0]].type == "groupedcontent") {
                        newBodymatter[tmpIndex[0]].groupeddata.bodymatter[tmpIndex[1]].groupdata.bodymatter[tmpIndex[2]].numberedline = dataToUpdate.isNumbered
                        newBodymatter[tmpIndex[0]].groupeddata.bodymatter[tmpIndex[1]].groupdata.bodymatter[tmpIndex[2]].startlinenumber = dataToUpdate.startNumber
                        updatedElement = newBodymatter[tmpIndex[0]].groupeddata.bodymatter[tmpIndex[1]].groupdata.bodymatter[tmpIndex[2]]
                    } else if (newBodymatter[tmpIndex[0]]?.type == "showhide") {
                        newBodymatter[tmpIndex[0]].interactivedata[appStore?.asideData?.sectionType][tmpIndex[2]].numberedline = dataToUpdate.isNumbered
                        newBodymatter[tmpIndex[0]].interactivedata[appStore?.asideData?.sectionType][tmpIndex[2]].startlinenumber = dataToUpdate.startNumber
                        updatedElement = newBodymatter[tmpIndex[0]].interactivedata[appStore?.asideData?.sectionType][tmpIndex[2]]
                    } else {
                        newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].contents.bodymatter[tmpIndex[2]].numberedline = dataToUpdate.isNumbered
                        newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].contents.bodymatter[tmpIndex[2]].startlinenumber = dataToUpdate.startNumber
                        updatedElement = newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].contents.bodymatter[tmpIndex[2]]
                    }
                   break;
    }
        }
    }
        elementEntityUrn = updatedElement?.contentUrn

        if (typeof tmpIndex === 'number') {
            currentSlateData.contents.bodymatter[tmpIndex] = updatedElement
        } else {
            switch (indexesLen) {
                case 1:
                    newBodymatter[tmpIndex[0]] = updatedElement
                    break;
                case 2:
                    newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]] = updatedElement
                    break;
                case 3:
                    if (newBodymatter[tmpIndex[0]].type == "groupedcontent") {
                        newBodymatter[tmpIndex[0]].groupeddata.bodymatter[tmpIndex[1]].groupdata.bodymatter[tmpIndex[2]] = updatedElement
                    }
                    if (newBodymatter[tmpIndex[0]].type == "element-aside") {
                        newBodymatter[tmpIndex[0]].elementdata.bodymatter[tmpIndex[1]].contents.bodymatter[tmpIndex[2]] = updatedElement
                    }
                    break;
            }
        }

    return {
       elementEntityUrn, currentSlateData
    }

}

export const enableAsideNumbering = (isAsideNumber,elementId) => (dispatch) => {
    dispatch({
        type: CHECK_ASIDE_NUMBER,
        payload: {isAsideNumber, elementId}
    });
}
