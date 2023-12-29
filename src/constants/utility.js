/**
 * Module - utility
 * Description - This file contains utility functions to be shared across
 */

// IMPORT - Module dependencies
import config from '../config/config';
import cypressConfig from '../config/cypressConfig';
import store from '../appstore/store'
import { handleBlankLineDom } from '../component/ElementContainer/UpdateElements';
import { checkSlateLock } from '../js/slateLockUtility';
import { DATA_MCE_SELECTED } from './Element_Constants';
import { COMPLETED_IMPORT_STATUS, IN_PROGRESS_IMPORT_STATUS } from '../component/SlateWrapper/SlateWrapperConstants';
// DECLARATION - const or variables
export const PRIMARY_BUTTON = "primary";
export const SECONDARY_BUTTON = "secondary";
export const CHECKBOX_MESSAGE = "Don't ask me again";
const WRAPPER_URL = config.WRAPPER_URL; // TO BE IMPORTED

export const MATCH_HTML_TAGS = ['</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</h6>', '</p>', '</ul>', '</ol>', '</li>']
export const ALLOWED_FORMATTING_TOOLBAR_TAGS = ['<strong>', '<code>', '<s>', '<u>', '<sub>', '<sup>', '<em>', '</strong>', '</code>', '</s>', '</u>', '</sub>',
                                                 '</sup>', '</em>', '<i>','<img']
export const MATCH_CLASSES_DATA = ['class="decimal"', 'class="disc"', 'class="heading1NummerEins"', 'class="heading2NummerEins"', 'class="heading3NummerEins"',
                                'class="heading4NummerEins"', 'class="heading5NummerEins"', 'class="heading6NummerEins"', 'class="paragraphNumeroUno"','class="pullQuoteNumeroUno"',
                                'class="heading2learningObjectiveItem"', 'class="listItemNumeroUnoUpperAlpha"',  'class="upper-alpha"','class="lower-alpha"',
                                'class= "listItemNumeroUnoLowerAlpha"', 'class="listItemNumeroUnoUpperRoman"','class="lower-roman"', 'class="upper-roman"',
                                 'class="listItemNumeroUnoLowerRoman"', 'handwritingstyle']
export const ALLOWED_ELEMENT_IMG_PASTE = ['element-authoredtext','element-learningobjectives','element-blockfeature','element-list']
export const AUTO_NUMBER_PLACEHOLDER = ["Label Name", "Label", "Number"]
export const PLACEHOLDER_ARRAY = ["Attribution Text", "Code Block Content", "Enter Button Label"]
export const GLOSSARY = 'GLOSSARY';
export const MARKEDINDEX = 'MARKEDINDEX';
export const validStylesTagList = ['strong','em','u','s','sup','sub','code'];
export const allowedFormattings = ['bold','italic','underline','strikethrough','superscript','subscript'];
export const validFirstNodeTags = ['span','dfn'];
export const withoutCursorInitailizedElements = ['figure', 'element-aside'];
export const ALLOWED_ENVIRONMENT_NAMES = ['dev', 'test', 'qa', 'staging', 'perf', 'prf', 'stg', 'smk'];
export const ALLOWED_FORMATTING_TAGS = ['<strong>', '<code>', '<s>', '<u>', '<sub>', '<sup>', '<em>', '</strong>', '</code>', '</s>', '</u>', '</sub>', '</sup>', '</em>', '<i>']

// function to get the environment name based on host
export const requestConfigURI = () => {
    const hostname = window.location.host;
    let environmentName = 'prod';
    if(hostname) {
        const splittedHostName = hostname.split(".");
        if(splittedHostName.length > 0 ) {
            const splittedHost = splittedHostName[0].split("-");
            if(splittedHost.length > 0) {
                splittedHost.forEach((environment) => {
                    if(ALLOWED_ENVIRONMENT_NAMES.includes(environment)) {
                        environmentName = environment;
                    }
                }); 
            }
        }
    }
    return environmentName;
}

export const sendDataToIframe = (messageObj) => {
    if(messageObj.type==='ShowLoader'){
        /**
         * This code has been written to prevent typing while loader is on
         */
        window.getSelection().removeAllRanges();
    }
    window.parent.postMessage(messageObj, WRAPPER_URL)
}

//Generate random number
export const guid = () => {
    function s4() {
        const crypto = window.crypto || window.msCrypto;
        let array = new Uint32Array(1);
        const randomValue = crypto.getRandomValues(array);

        return Math.floor((1 + randomValue[0]) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export const hasProjectPermission = (value) => {
    const authStore = store.getState();
    const isReadOnlyContent = isApprovedOrSubscribed(authStore)
    let permissions = authStore && authStore.appStore.permissions;
    let hasPermissions = permissions && permissions.includes(value);
    //if reviewer user, then preference will be given to Reviewer
    if(hasPermissions && value === 'note_viewer') return true
    // if not reviewer user but contetn is subscriber/approved, then readonly conditions willl
    // get preference
    if(isReadOnlyContent) return false
    //if not reviewer user or not readonly condition, then check other permissions
    return hasPermissions;
}
/**
 * This function check whether the current slate is approve or subscribed
 * and also check the conditions for popup slate
 * @param {Object} authStore
 * @returns
 */
export const isApprovedOrSubscribed = (authStore) => {
    const {appStore, projectInfo} = authStore;
    const isSubscriber = isSubscriberRole(projectInfo?.projectSharingRole, projectInfo?.projectSubscriptionDetails?.isSubscribed);
    const slatePublishStatus = appStore.slateLevelData[config.slateManifestURN]?.type !== "popup" && appStore.slateLevelData[config.slateManifestURN]?.status === "approved";
    const isPopupReadOnly = appStore.slateLevelData[config.slateManifestURN]?.type === "popup" && appStore.slateLevelData[config.slateManifestURN]?.status === "approved" &&
                            config.tempSlateManifestURN  && appStore.slateLevelData[config.tempSlateManifestURN]?.status === "approved";
    return ((slatePublishStatus  && !config?.isCypressPlusEnabled) || isPopupReadOnly || isSubscriber || isSlateLocked());
}
/**
 * This function checks the conditions for Reviewer users and approved/subscribed content both
 * at same time to show or hide elements borders. Preference is giving to reviewer user and border
 * will be visible for reviewer user
 * @returns
 */
export const isApproved = () =>{
    const authStore = store.getState();
    const {appStore} = authStore;
    const hasRole= appStore && appStore.roleId === "comment_only" && (hasProjectPermission('note_viewer'))
    if(hasRole && !isSlateLocked())  return false
    return isApprovedOrSubscribed(authStore)
}

export const isSlateLocked = () =>{
    const authStore = store.getState();
    const slateLockInfo = authStore?.slateLockReducer?.slateLockInfo;
    return checkSlateLock(slateLockInfo);
}

/**
 * This function checks if the slate has pending imported elements and is currently importing elements
 * @returns true when import is in-progress
 */
export const isImporting = () => {
    const authStore = store.getState();
    const {appStore} = authStore;
    
    if(appStore?.importDataFromResponse?.importStatus && 
        appStore?.importDataFromResponse?.importStatus === IN_PROGRESS_IMPORT_STATUS)
        return true;

    if(!appStore?.importDataFromResponse?.importStatus || 
        appStore?.importDataFromResponse?.importStatus === COMPLETED_IMPORT_STATUS )
        return false;
}


export const hasReviewerRole = (value) => {
    const authStore = store.getState();
    const {appStore} = authStore;
    if (value) {
        return !((hasProjectPermission(value) && !isApproved() && !isSlateLocked()) ? true : false)
    }
    let hasRole = (appStore && (appStore.roleId === "comment_only"
        && (hasProjectPermission('note_viewer'))) || isApproved() || isSlateLocked() || isImporting());
    return hasRole;
}

/**
 * This function checks the conditions for Reviewer users and subscribed content both
 * @returns
 */
export const hasReviewerSubscriberRole = () => {
    const authStore = store.getState();
    const {appStore, projectInfo} = authStore;
    const isSubscriber = isSubscriberRole(projectInfo?.projectSharingRole, projectInfo?.projectSubscriptionDetails?.isSubscribed);
    let hasRole = (appStore && (appStore.roleId === "comment_only"
        && (hasProjectPermission('note_viewer'))) || isSubscriber);
    return hasRole;
}
/**
 * [TK-1948] | Check & Fix Regular Expressions Dependency
 * Use of String.prototype.matchAll : matchAll does not raise any issue as it is not supported by NodeJS.
 * @param {String} html : input html to matched with regex
 */
export const matchHTMLwithRegex = function (html) {
    if (html) {
        let matchedTerms = [...String.prototype.matchAll.call(html, /(<p.*?>.*?<\/p>)/gs)]
        if (matchedTerms.length > 0) {
            return true
        }
        return false
    }
    return false
}

/**
 * This function converts HTML entity code to HTML entity number in case of Wiris data
 * @param {*} str element index
 */
export const encodeHTMLInWiris = (str) => {
    if (str) {
        str = str.replace(/alt="[^"]*"/g, '');
        let imageObj = str.match(/<img [^>]*data-temp-mathml="[^"]*"[^>]*>/gm);
        if (imageObj) {
            let imageObjNew = imageObj.map(image => {
                let mathMLData = image.match(/data-temp-mathml="[^"]*"/g).map(imageData => {
                    let encodedData = imageData.replace(/(&amp;)/g, "&");//imageData.replace(/(&|&amp;)nbsp;/g, "§#160;");
                    for (let key in htmlEntityList) {
                        if (htmlEntityList && htmlEntityList[key][0]) {
                            encodedData = encodedData.replace(new RegExp(htmlEntityList[key][0], 'g'), key);
                        }
                        if (htmlEntityList && htmlEntityList[key][1]) {
                            encodedData = encodedData.replace(new RegExp(htmlEntityList[key][1], 'g'), key);
                        }
                    }
                    return encodedData.replace(/(&|&amp;)/g, "")
                });
                image = image.replace(/data-temp-mathml="[^"]*"/g, mathMLData[0]);
                return image;
            });
            for (let i in imageObj) {
                str = str.replace(imageObj[i], imageObjNew[i]);
            }
        }
        return str;
    }
}

/**
 * Refines title content from unified model by removing extra tags
 * @param {*} htmlText unified HTML content
 */
const removeTagsforSubTitle = (htmlText, elementType) => {
    if (elementType === 'figure') {
        return htmlText.replace(/<label>?.+<\/label>/g, "").replace(/<number>?.+<\/number>/g, "").replace(/<p>|<\/p>/g, "")
    }
    return htmlText.replace(/<label>?.+<\/label>/g, "").replace(/<p>|<\/p>/g, "")
}


/**
 * Separates label and title from the unified HTML content and maps it to UI
 * @param {*} model label or title HTML content
 * @param {*} modelType type - label or title
 */
export const getTitleSubtitleModel = (model, modelType, modelElement = "popup") => {
    let modelDocDom = model && new DOMParser().parseFromString(model, "text/html")
    let modelDom = modelDocDom && modelDocDom.body && modelDocDom.body.children[0]
    let modelToReturn
    if(modelType){
        if (modelType === "formatted-title"){
            try{
                if(model && model.match(/<label>?.+<\/label>/g)){
                    modelToReturn = `<p class="paragraphNumeroUno">${modelDom.children[0].innerHTML}</p>`
                }
                else{
                    modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
                }
            }
            catch (error) {
                modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
            }
        } else if (modelType === "formatted-number"){
            try{
                if(model && model.match(/<number>?.+<\/number>/g)){
                    let numberHtml = modelDom.children[0].tagName === 'NUMBER' ? modelDom.children[0].innerHTML : modelDom.children[1].innerHTML;
                    modelToReturn = `<p class="paragraphNumeroUno">${numberHtml}</p>`
                }
                else{
                    modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
                }
            }
            catch (error) {
                modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
            }
        } else if (modelType === "formatted-subtitle"){
            try{
                let modelInnerHTML = modelDom.innerHTML
                let modelWithRemovedTags = removeTagsforSubTitle(modelInnerHTML, modelElement)
                modelToReturn = `<p class="paragraphNumeroUno">${modelWithRemovedTags}</p>`
            }
            catch (error) {
                modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
            }
        } else if (modelType === 'formatted-code-content'){
            try{
                if (model && model.match(/<span>?.+<\/span>/g)) {
                    for (let i = 0; i < modelDom.children.length; i++) {
                        if (modelDom.children[i].innerHTML === '<br>' || modelDom.children[i].innerHTML === "</br>"|| modelDom.children[i].innerHTML === "") {
                            modelToReturn = ''
                        } else {
                            modelToReturn = `<span class="codeNoHighlightLine">${modelDom.children[i].innerHTML}</span>`
                        }
                        if (modelDom.children.length > 1 && modelDom.children[modelDom.children.length - 1].innerHTML === '<br>') {
                            modelToReturn = `<span class="codeNoHighlightLine">${modelDom.children[modelDom.children.length - 1].innerHTML}</span>`
                        }
                    }
                }
            }
            catch (error) {
                modelToReturn = `<span class="codeNoHighlightLine"><br /></span>`
            }
        }
        else{
            modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
        }
    }
    return modelToReturn;
}

/**
 * Combines label and title HTML and returns HTML content to send through update API
 * @param {*} titleHTML Label HTML content
 * @param {*} subtitleHTML title HTML content
 */
export const createTitleSubtitleModel = (titleHTML, subtitleHTML) => {
    let labelHTML = titleHTML.replace(/<br>/g, ""),
        titleModel = subtitleHTML.replace(/<br>/g, "")

    labelHTML = handleBlankLineDom(labelHTML);
    titleModel = handleBlankLineDom(titleModel);

    if(labelHTML === ""){
        return `<p>${titleModel}</p>`
    }
    return `<p><label>${labelHTML}&nbsp;</label>${titleModel}</p>`
}
/**
 * Combines label, number and title HTML and returns HTML content to send through update API
 * @param {*} labelHTML Label HTML content
 * @param {*} numberHTML number HTML content
 * @param {*} titleHTML title HTML content
 */
export const createLabelNumberTitleModel = (labelHTML, numberHTML, titleHTML) => {
    labelHTML = labelHTML?.replace(/<br>/g, "");
    numberHTML = numberHTML?.replace(/<br>/g, "");
    titleHTML = titleHTML?.replace(/<br>/g, "");

    labelHTML = handleBlankLineDom(labelHTML);
    numberHTML = handleBlankLineDom(numberHTML);
    titleHTML = handleBlankLineDom(titleHTML);

    if (labelHTML === "" && numberHTML === ""){
        return `<p>${titleHTML}</p>`
    } else if (numberHTML === "" && labelHTML) {
        return `<p><label>${labelHTML}&nbsp;</label>${titleHTML}</p>`
    } else if (labelHTML === "" && numberHTML) {
        return `<p><number>${numberHTML}&nbsp;</number>${titleHTML}</p>`
    }
    return `<p><label>${labelHTML}&nbsp;</label><number>${numberHTML}&nbsp;</number>${titleHTML}</p>`
}

/**
 * Returns label, number and title HTML
 * @param {*} figureObj figure element object
 */
 export const getLabelNumberTitleHTML = (figureObj) => {
     // Modifying old figures html into new pattern
     // ................................XX...........................................
     let figureElementsType = ['image', 'table', 'mathImage', 'authoredtext', 'codelisting', 'interactive', 'tableasmarkup'];
     if ((figureObj.figuretype == 'audio' || figureObj.figuretype == 'video') && figureObj.type == 'figure') {
        if (figureObj.hasOwnProperty('title') && figureObj.hasOwnProperty('subtitle')) {
            figureObj.html.title = createLabelNumberTitleModel(figureObj.html.title.replace("<p>", '').replace("</p>", ''), '', figureObj.html.subtitle
            .replace("<p>", '').replace("</p>", ''));
        } else if (figureObj.hasOwnProperty('subtitle')) {
            figureObj.html.title = createLabelNumberTitleModel('', '', figureObj.html.subtitle.replace("<p>", '').replace("</p>", ''));
        }
        if (figureObj.hasOwnProperty('subtitle')) {
            delete figureObj.subtitle;
        }
     } else if (figureElementsType.includes(figureObj.figuretype) && figureObj.type == 'figure' && figureObj.hasOwnProperty('subtitle')) {
             figureObj.html.title = createLabelNumberTitleModel(figureObj.html.title.replace("<p>", '')
             .replace("</p>", ''), '', figureObj?.html?.subtitle?.replace("<p>", '')?.replace("</p>", ''));
             if (figureObj.hasOwnProperty('subtitle')) {
                delete figureObj.subtitle;
            }
        }

    let data = {};
     if(figureObj?.html && figureObj?.html?.title || figureObj?.html && figureObj?.html?.preformattedtext){
        figureObj.html.title = figureObj.html.title.replace(/(\r\n|\n|\r)/gm, '');
        data.formattedLabel = getTitleSubtitleModel(figureObj.html.title, "formatted-title", "figure").replace(/&nbsp;/g, "");
        data.formattedNumber = getTitleSubtitleModel(figureObj.html.title, "formatted-number", "figure").replace(/&nbsp;/g, "");
        data.formattedTitle = getTitleSubtitleModel(figureObj.html.title, "formatted-subtitle", "figure");
        data.preformattedText = getTitleSubtitleModel(figureObj.html.preformattedtext, "formatted-code-content", "figure");
     }
    return data;
}

export const checkHTMLdataInsideString = (htmlNode) => {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlNode;
    if (tempDiv?.firstChild && tempDiv?.firstChild?.innerHTML) {
        if (tempDiv.firstChild.innerHTML === "<br>" || tempDiv.firstChild.innerHTML === "</br>" || tempDiv.firstChild.innerHTML === "<br data-mce-bogus=\"1\">") {
            return '';
        } else {
            return tempDiv?.firstChild?.innerHTML;
        }
    } else {
        if(tempDiv?.firstChild?.textContent !== '' && String(tempDiv.innerHTML).includes(tempDiv.firstChild.textContent)) {
            return tempDiv.firstChild.textContent;
        } else {
            return '';
        }
    }
}

export const dropdownValueAtIntialize = (dropdownData, formattedLabel) => {
    let figureLabelFromApi = checkHTMLdataInsideString(formattedLabel);
    let figureLabelValue;
    if (dropdownData.indexOf(figureLabelFromApi.toLowerCase()) > -1) {
        figureLabelFromApi = figureLabelFromApi.toLowerCase();
        figureLabelValue = figureLabelFromApi.charAt(0).toUpperCase() + figureLabelFromApi.slice(1);
    } else if (figureLabelFromApi === '') {
        figureLabelValue = 'No Label';
    } else {
        figureLabelValue = 'Custom';
    }
    return figureLabelValue;
}

export const labelValueForFiguretype = (element) => {
    let labelValue;
    switch(element?.figuretype) {
        case "tableasmarkup":
            labelValue = "Table"
        break;
        case "authoredtext":
            labelValue = "Equation"
        break;
        case "codelisting":
            labelValue = "Exhibit"
        break;
        case "image":
        case "mathImage":
        case "table":
        default:
            labelValue = "No Label"
    }
    return labelValue;
}

export const dropdownValueForFiguretype = (element, figureDropdownData) => {
    let dropdownList;
    switch(element?.figuretype) {
        case "tableasmarkup":
            dropdownList = figureDropdownData.tableasmarkup ?? ["No Label", "Table", "Custom"]
        break;
        case "authoredtext":
            dropdownList = figureDropdownData.mathml ?? ["No Label", "Equation", "Custom"]
        break;
        case "codelisting":
            dropdownList = figureDropdownData.preformattedtext ?? ["No Label", "Exhibit", "Custom"]
        break;
        case "image":
        case "mathImage":
        case "table":
        default:
            dropdownList = figureDropdownData.image ?? ["No Label", "Figure", "Table", "Equation", "Custom"]
    }
    return dropdownList;
}

/** This is a list of HTML Entity code mapped to their HTML Entity name and Special Character |
 *  It is used for mapping special characters in Wiris data
 */
const htmlEntityList = {
    "§#160;": ["", "&nbsp;"],
    "§#945;": ["α", "&alpha;"],
    "§#946;": ["β", "&beta;"],
    "§#947;": ["γ", "&gamma;"],
    "§#948;": ["δ", "&delta;"],
    "§#949;": ["ε", "&epsilon;"],
    "§#950;": ["ζ", "&zeta;"],
    "§#951;": ["η", "&eta;"],
    "§#952;": ["θ", "&theta;"],
    "§#953;": ["ι", "&iota;"],
    "§#954;": ["κ", "&kappa;"],
    "§#955;": ["λ", "&lambda;"],
    "§#956;": ["μ", "&mu;"],
    "§#957;": ["ν", "&nu;"],
    "§#958;": ["ξ", "&xi;"],
    "§#959;": ["ο", "&omicron;"],
    "§#960;": ["π", "&pi;"],
    "§#961;": ["ρ", "&rho;"],
    "§#962;": ["ς", "&sigmaf;"],
    "§#963;": ["σ", "&sigma;"],
    "§#964;": ["τ", "&tau;"],
    "§#965;": ["υ", "&upsilon;"],
    "§#966;": ["φ", "&phi;"],
    "§#967;": ["χ", "&chi;"],
    "§#968;": ["ψ", "&psi;"],
    "§#969;": ["ω", "&omega;"],
    "§#977;": ["ϑ", "&thetasym;"],
    "§#978;": ["ϒ", "&upsih;"],
    "§#913;": ["Α", "&Alpha;"],
    "§#914;": ["Β", "&Beta;"],
    "§#915;": ["Γ", "&Gamma;"],
    "§#916;": ["Δ", "&Delta;"],
    "§#917;": ["E", "&Epsilon;"],
    "§#918;": ["Z", "&Zeta;"],
    "§#919;": ["Η", "&Eta;"],
    "§#920;": ["Θ", "&Theta;"],
    "§#921;": ["Ι", "&Iota;"],
    "§#922;": ["K", "&Kappa;"],
    "§#923;": ["Λ", "&Lambda;"],
    "§#924;": ["M", "&Mu;"],
    "§#925;": ["N", "&Nu;"],
    "§#926;": ["Ξ", "&Xi;"],
    "§#927;": ["Ο", "&Omicron;"],
    "§#928;": ["Π", "&Pi;"],
    "§#929;": ["P", "&Rho;"],
    "§#931;": ["Σ", "&Sigma;"],
    "§#932;": ["T", "&Tau;"],
    "§#933;": ["Y", "&Upsilon;"],
    "§#934;": ["Φ", "&Phi;"],
    "§#935;": ["X", "&Chi;"],
    "§#936;": ["Ψ", "&Psi;"],
    "§#937;": ["Ω", "&Omega;"],
    "§#982;": ["ϖ", "&piv;"],
    "§#8704;": ["∀", "&forall;"],
    "§#8706;": ["∂", "&part;"],
    "§#8707;": ["∃", "&exist;"],
    "§#8708;": ["∄", ""],
    "§#8709;": ["∅", "&empty;"],
    "§#8710;": ["Δ", ""],
    "§#8711;": ["∇", "&nabla;"],
    "§#8712;": ["∈", "&isin;"],
    "§#8713;": ["∉", "&notin;"],
    "§#8715;": ["∋", "&ni;"],
    "§#8716;": ["∌", ""],
    "§#8719;": ["∏", "&prod;"],
    "§#8720;": ["∐", ""],
    "§#8721;": ["∑", "&sum;"],
    "§#8722;": ["−", "&minus;"],
    "§#8723;": ["∓", ""],
    "§#8726;": ["∖", ""],
    "§#8728;": ["∘", ""],
    "§#8729;": ["∙", ""],
    "§#8733;": ["∝", "&prop;"],
    "§#8734;": ["∞", "&infin;"],
    "§#8736;": ["∠", "&ang;"],
    "§#8737;": ["∡", ""],
    "§#8738;": ["∢", ""],
    "§#8741;": ["∥", ""],
    "§#8742;": ["∦", ""],
    "§#8743;": ["∧", "&and;"],
    "§#8744;": ["∨", "&or;"],
    "§#8745;": ["∩", "&cap;"],
    "§#8746;": ["∪", "&cup;"],
    "§#8747;": ["∫", "&int;"],
    "§#8748;": ["∬", ""],
    "§#8749;": ["∭", ""],
    "§#8750;": ["∮", ""],
    "§#8751;": ["∯", ""],
    "§#8752;": ["∰", ""],
    "§#8756;": ["∴", "&there4;"],
    "§#8757;": ["∵", ""],
    "§#8764;": ["∼", "&sim;"],
    "§#8769;": ["≁", ""],
    "§#8770;": ["≂", ""],
    "§#8771;": ["≃", ""],
    "§#8773;": ["≅", "&cong;"],
    "§#8776;": ["≈", "&asymp;"],
    "§#8777;": ["≉", ""],
    "§#8800;": ["≠", "&ne;"],
    "§#8801;": ["≡", "&equiv;"],
    "§#8802;": ["≢", ""],
    "§#8804;": ["≤", "&le;"],
    "§#8805;": ["≥", "&ge;"],
    "§#8810;": ["≪", ""],
    "§#8811;": ["≫", ""],
    "§#8834;": ["⊂", "&sub;"],
    "§#8835;": ["⊃", "&sup;"],
    "§#8836;": ["⊄", "&nsub;"],
    "§#8838;": ["⊆", "&sube;"],
    "§#8839;": ["⊇", "&supe;"],
    "§#8847;": ["⊏", ""],
    "§#8848;": ["⊐", ""],
    "§#8849;": ["⊑", ""],
    "§#8850;": ["⊒", ""],
    "§#8851;": ["⊓", ""],
    "§#8852;": ["⊔", ""],
    "§#8853;": ["⊕", "&oplus;"],
    "§#8855;": ["⊗", "&otimes;"],
    "§#8857;": ["⊙", ""],
    "§#8859;": ["⊛", ""],
    "§#8861;": ["⊝", ""],
    "§#8869;": ["⊥", "&perp;"],
    "§#8900;": ["⋄", ""],
    "§#9674;": ["◊", "&loz;"],
    "§#8901;": ["⋅", "&sdot;"],
    "§#10808;": ["⨸", ""],
    "§#9633;": ["□", ""],
    "§#9645;": ["▭", ""],
    "§#9649;": ["▱", ""],
    "§#9651;": ["△", ""],
    "§#9675;": ["○", ""],
    "§#172;": ["¬", "&not;"],
    "§#10887;": ["⪇", ""],
    "§#10888;": ["⪈", ""],
    "§#8826;": ["≺", ""],
    "§#8827;": ["≻", ""],
    "§#8882;": ["⊲", ""],
    "§#8883;": ["⊳", ""],
    "§#10878;": ["⩾", ""],
    "§#10877;": ["⩽", ""],
    "§#176;": ["°", "&deg;"],
    "§#8245;": ["‵", ""],
    "§#177;": ["±", "&plusmn;"],
    "§#183;": ["·", "&middot;"],
    "§#215;": ["×", "&times;"],
    "§#247;": ["÷", "&divide;"],
    "§#10562;": ["⥂", ""],
    "§#10564;": ["⥄", ""],
    "§#10529;": ["⤡", ""],
    "§#10530;": ["⤢", ""],
    "§#10602;": ["⥪", ""],
    "§#10605;": ["⥭", ""],
    "§#10606;": ["⥮", ""],
    "§#10607;": ["⥯", ""],
    "§#8629;": ["↵", "&crarr;"],
    "§#8693;": ["⇵", ""],
    "§#8656;": ["⇐", "&lArr;"],
    "§#8657;": ["⇑", "&uArr;"],
    "§#8658;": ["⇒", "&rArr;"],
    "§#8659;": ["⇓", "&dArr;"],
    "§#8660;": ["⇔", "&hArr;"],
    "§#8661;": ["⇕", ""],
    "§#8651;": ["⇋", ""],
    "§#8652;": ["⇌", ""],
    "§#8644;": ["⇄", ""],
    "§#8645;": ["⇅", ""],
    "§#8646;": ["⇆", ""],
    "§#8640;": ["⇀", ""],
    "§#8641;": ["⇁", ""],
    "§#8636;": ["↼", ""],
    "§#8637;": ["↽", ""],
    "§#8617;": ["↩", ""],
    "§#8618;": ["↪", ""],
    "§#8612;": ["↤", ""],
    "§#8614;": ["↦", ""],
    "§#8592;": ["←", "&larr;"],
    "§#8593;": ["↑", "&uarr;"],
    "§#9594;": ["→", "&rarr;"],
    "§#8595;": ["↓", "&darr;"],
    "§#8596;": ["↔", "&harr;"],
    "§#8597;": ["↕", ""],
    "§#8598;": ["↖", ""],
    "§#8599;": ["↗", ""],
    "§#8560;": ["↘", ""],
    "§#8561;": ["↙", ""],
    "§#8942;": ["⋮", ""],
    "§#8943;": ["⋯", ""],
    "§#8944;": ["⋰", ""],
    "§#8945;": ["⋱", ""],
    "§#8230;": ["…", "&hellip;"],
    "§#8212;": ["—", "&mdash;"],
    "§#8208;": ["‐", ""],
    "§#8469;": ["ℕ", ""],
    "§#8473;": ["ℙ", ""],
    "§#8474;": ["ℚ", ""],
    "§#8477;": ["ℝ", ""],
    "§#8484;": ["ℤ", ""],
    "§#8450;": ["ℂ", ""],
    "§#8486;": ["Ω", "&ohm;"],
    "§#8487;": ["℧", "&mho;"],
    "§#9180;": ["⏜", ""],
    "§#9181;": ["⏝", ""],
    "§#9182;": ["⏞", ""],
    "§#9183;": ["⏟", ""],
}

/**
 * Removes blank/unused HTML tags from model
 * @param {String} htmlString HTML model string
 */
export const removeBlankTags = htmlString => {
    let domParsed = new DOMParser().parseFromString(htmlString, "text/html")
    let emptyNodes = domParsed.childNodes[0].lastChild.querySelectorAll("*:not(img):not(head):not(br):not(p):not(li):not(#blankLine):empty")
    if(emptyNodes && emptyNodes.length) {
        emptyNodes.forEach(x => x.remove())
        return removeBlankTags(domParsed.childNodes[0].lastChild.innerHTML)
    }
    else {
        return domParsed.childNodes[0].lastChild.innerHTML
    }
}

/**
 * Removes class from the string
 * @param {String} htmlString HTML string (model)
 */
export const removeUnoClass = (htmlString) => {
    let domParsed = new DOMParser().parseFromString(htmlString, "text/html")
    try {
        let requiredDode = domParsed.body.childNodes[0]
        let classToRemove = requiredDode.getAttributeNode('class')
        requiredDode.removeAttributeNode(classToRemove)
        return requiredDode.outerHTML
    }
    catch (error) {
        /** Probably 'classToRemove' would be null
         * So, returning input without processing
        */
        return htmlString
    }
}

/**
 * Returns the type of the slate
 * @param {Object} slateObj Slate data
 */
export const getSlateType = (slateObj) => {
    return slateObj && slateObj.type ? slateObj.type : null
}

/**
 * Replaces a class and attribute in wiris img tag to prevent conversion to XML
 * @param {*} currentTargetId current editor ID
 */
export const replaceWirisClassAndAttr = (currentTargetId) => {
    const currentTarget = document.getElementById(currentTargetId)
    let tempFirstContainerHtml = currentTarget && currentTarget.innerHTML
    if (typeof tempFirstContainerHtml === "string") {
        tempFirstContainerHtml = tempFirstContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula')
        .replace(/\sWirisformula/g, ' temp_Wirisformula');
        try {
            currentTarget.innerHTML = tempFirstContainerHtml
        }
        catch {
            currentTarget.innerHTML = tempFirstContainerHtml
            console.log("error in setting HTML")
        }
    }
}

export const defaultMathImagePath = "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/";

/**
 * Returns all id of elements present inside the showhide container
 * @param {Object} element Showhide element data
 */
export const getShowhideChildUrns = (element) => {

    try {
        const extractIdCallback = ({ id }) => id
        const interactivedataObj = element.interactivedata
        if (interactivedataObj) {
            return [
                ...interactivedataObj.show?.map?.(extractIdCallback) || [],
                ...interactivedataObj.hide?.map?.(extractIdCallback) || [],
                ...interactivedataObj.postertextobject?.map?.(extractIdCallback) || []
            ]
        }
    } catch (error) {
        console.error("Error in getting getShowhideChildUrns- returning fallback value", error)
        return []
    }
}

export const removeClassesFromHtml = (html, SD_DE_indent) => {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    if (!SD_DE_indent) {
        tinyMCE.$(tempDiv)?.find('p')?.removeAttr('class')
    }
    return replaceUnwantedtags(tempDiv.innerHTML);
}

export const replaceUnwantedtags = (html) => {
    if (!html) {
        return;
    }
    let tempDiv = document.createElement('div');
    // PCAT-2426 - calling function to remove tinymcespellchecker DOM attributes from innerHTML
    html = removeSpellCheckDOMAttributes(html);
    html = html.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula')
            .replace(/\uFEFF/g, "").replace(/>\s+</g, '><').replace(/data-mce-href="#"/g, '').replace(/ reset/g, '');
    html = html.trim();
    tempDiv.innerHTML = html;
    tinyMCE.$(tempDiv).find('br').remove();
    tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
    tinyMCE.$(tempDiv).find('span#_mce_caret').remove();
    tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-style');
    tinyMCE.$(tempDiv).find('img').removeAttr('data-custom-editor');
    tinyMCE.$(tempDiv).find('ol').removeAttr('data-mce-style');
    tinyMCE.$(tempDiv).find('ol').removeAttr('style');
    tinyMCE.$(tempDiv).find('img').removeAttr('style');
    tinyMCE.$(tempDiv).find('p').removeAttr('contenteditable');
    tinyMCE.$(tempDiv).find('blockquote').removeAttr('contenteditable');
    tinyMCE.$(tempDiv).find('blockquote').removeAttr(DATA_MCE_SELECTED);
    tinyMCE.$(tempDiv).find('code').removeAttr(DATA_MCE_SELECTED);
    tinyMCE.$(tempDiv).find('img').removeAttr(DATA_MCE_SELECTED);
    tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('height');
    tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('width');
    tinyMCE.$(tempDiv).find('.blockquoteMarginalia').removeAttr('contenteditable');
    tinyMCE.$(tempDiv).find('.paragraphNummerEins').removeAttr('contenteditable');
    tinyMCE.$(tempDiv).find('img').removeAttr('draggable');
    tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeClass('fr-draggable');
    tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-href');
    tinyMCE.$(tempDiv).find('a').removeAttr(DATA_MCE_SELECTED);
    tinyMCE.$(tempDiv).find('a').removeAttr('data-custom-editor');
    tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('src');
    tinyMCE.$(tempDiv).find('img.imageAssetContent').removeAttr('data-mce-src');
    tempDiv.innerHTML = removeBlankTags(tempDiv.innerHTML)
    return encodeHTMLInWiris(tempDiv.innerHTML);
}
export const prepareDialogueDom = (model) => {
    let ConvertedModel = model?.replace(/<p>/g, "")
    ConvertedModel = ConvertedModel && ConvertedModel.replace(/<\/p>/g, "")
    let lineModel = ConvertedModel ? ConvertedModel : '<span class="dialogueLine"><br /></span>'
    return lineModel;
}
// This function is use to add Playscript stageDirection class
export const prepareStageDirectionDom = (model) => {
    const ConvertedModel = model.includes('<p>') ? model?.replace(/<p>/g, "<p class ='stageDirectionLine'>") : model
    return ConvertedModel;
}

/**sets Owner key in localstorage
 * @param data - whether the checkout is checked or not
 */
export const releaseOwnerPopup=(data, projectSharingRole, isSubscribed)=>{
    if(data && isOwnerRole(projectSharingRole, isSubscribed)){
        localStorage.setItem('hasOwnerEdit', true);
    }else if( data && isSubscriberRole(projectSharingRole, isSubscribed)){
        localStorage.setItem('hasSubscriberView', true);
    }

}

/**It checks whether its a owner project or not
 * @param projectSharingRole - role of a user
 * @param isSubscribed- whether it is subscribed or not
 */
export const isOwnerRole = (projectSharingRole, isSubscribed) => {
    return projectSharingRole === "OWNER" && isSubscribed;
}

/**It checks whether its a Subscriber project or not
 * @param projectSharingRole - role of a user
 * @param isSubscribed- whether it is subscribed or not
 */
export const isSubscriberRole = (projectSharingRole, isSubscribed) => {
    return projectSharingRole === "SUBSCRIBER" && isSubscribed;
}

// function to remove tinymce spellcheck DOM attributes from innerHTML
export const removeSpellCheckDOMAttributes = (innerHTML) => {
    const spellCheckDiv = document.createElement('div');
    spellCheckDiv.innerHTML = innerHTML
    while(tinyMCE.$(spellCheckDiv).find('span.mce-spellchecker-annotation')?.length) {
        tinyMCE.$(spellCheckDiv).find('span.mce-spellchecker-annotation').each(function () {
            let innerHtml = this?.innerHTML;
            this.outerHTML = innerHtml;
        });
        if(tinyMCE.$(spellCheckDiv).find('span.mce-spellchecker-annotation')?.length === 0) {
            break;
        }
    }
    return spellCheckDiv?.innerHTML;
}

export const getDesignType = (classList) => {
    if(classList.includes("paragraphNumeroUnoIndentLevel1")) {
        return "indent-level1";
    } else if(classList.includes("paragraphNumeroUnoIndentLevel2")) {
        return "indent-level2";
    } else if(classList.includes("paragraphNumeroUnoIndentLevel3")) {
        return "indent-level3";
    } else {
        return null;
    }
}

/**Function to retun class to apply based on selectedOption & focused Button for AlfrescoPopup Component 'Select' button*/
export const getPrimaryButtonClass = (selectedOption, focusedButton) => {
    if(selectedOption !== '' && focusedButton === PRIMARY_BUTTON) {
        return "active-button-class primary";
    } else if(selectedOption !== '' && focusedButton !== PRIMARY_BUTTON) {
        return "active-button-class";
    } else if(selectedOption === '' && focusedButton === PRIMARY_BUTTON) {
        return "primary";
    } else {
        return null;
    }
}

// function to get cookie value by key name
export const getCookieByName = (name) => {
    var value = " " + document.cookie;
    var cStart = value.indexOf(" " + name + "=");
    if (cStart === -1) {
        value = null;
    }
    else {
        cStart = value.indexOf("=", cStart) + 1;
        var cEnd = value.indexOf(";", cStart);
        if (cEnd === -1) {
            cEnd = value.length;
        }
        value = unescape(value.substring(cStart, cEnd));
    }
    return value;
}

export const handleUnwantedFormattingTags = (element) => {
    let pastedTagsData = '';
    if (MATCH_CLASSES_DATA.some(el => element?.innerHTML?.match(el))) {
        let document = element?.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li')
        for (let i = 0; i < document?.length; i++) {
            pastedTagsData = pastedTagsData + " " + document[i]?.innerHTML
        }
    } else {
        let removedUnwantedTags = element?.innerHTML?.includes("</h1>") ? element?.innerHTML?.replace(/<h1>/g, ' ')?.replace(/<*\/h1>/g, '') : element?.innerHTML
        removedUnwantedTags = removedUnwantedTags.includes("</p>") ? removedUnwantedTags?.replace(/<p>/g, '')?.replace(/<*\/p>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</h2>") ? removedUnwantedTags?.replace(/<h2>/g, '')?.replace(/<*\/h2>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</h3>") ? removedUnwantedTags?.replace(/<h3>/g, '')?.replace(/<*\/h3>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</h4>") ? removedUnwantedTags?.replace(/<h4>/g, '')?.replace(/<*\/h4>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</h5>") ? removedUnwantedTags?.replace(/<h5>/g, '')?.replace(/<*\/h5>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</h6>") ? removedUnwantedTags?.replace(/<h6>/g, '')?.replace(/<*\/h6>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</li>") ? removedUnwantedTags?.replace(/<li>/g, '')?.replace(/<*\/li>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</ul>") ? removedUnwantedTags?.replace(/<ul>/g, '')?.replace(/<*\/ul>/g, ' ') : removedUnwantedTags
        removedUnwantedTags = removedUnwantedTags.includes("</ol>") ? removedUnwantedTags?.replace(/<ol>/g, '')?.replace(/<*\/ol>/g, ' ') : removedUnwantedTags
        pastedTagsData = removedUnwantedTags;
    }
    return pastedTagsData;
}

export const handleTextToRetainFormatting = (pastedContent, testElement, props) => {
    let tempData = pastedContent;
    if (MATCH_HTML_TAGS.some(el => tempData.match(el))) {
        tempData = handleUnwantedFormattingTags(testElement)
    }
    let convertTag = tempData?.includes('<b>') ? tempData?.replace(/<b>/g, "<strong>")?.replace(/<*\/b>/g, "</strong>") : tempData
    convertTag = convertTag?.includes('<span id=\"specialChar\"></span>') ? convertTag?.replace("<span id=\"specialChar\"></span>", '') : convertTag
    convertTag = convertTag?.includes('<strike>') ? convertTag?.replace(/<strike>/g, '<s>')?.replace(/<*\/strike>/g, '</s>') : convertTag
    convertTag = convertTag?.includes('</dfn>') ? convertTag?.replace(/<dfn.+?>/g, '')?.replace(/<*\/dfn>/g, '') : convertTag
    convertTag = convertTag?.includes('</abbr>') ? convertTag?.replace(/<abbr.+?>/g, '')?.replace(/<*\/abbr>/g, '') : convertTag
    convertTag = convertTag?.includes('<span>') ? convertTag?.replace(/<span>/g, '') : convertTag
    convertTag = convertTag?.includes('<span') ? convertTag?.replace(/<span.+?>/g, '') : convertTag
    convertTag = convertTag?.includes('</span>') ? convertTag?.replace(/<*\/span>/g, '') : convertTag
    convertTag = convertTag?.includes('</div>') ? convertTag?.replace(/<div.+?>/g, '')?.replace(/<*\/div>/g, '') : convertTag
    convertTag = convertTag?.includes('</a>') ? convertTag?.replace(/<a.+?>/g, '')?.replace(/<*\/a>/g, '') : convertTag
    convertTag = convertTag?.includes('<sup></sup>') ? convertTag?.replace(/<sup><\/sup>/g, '') : convertTag
    convertTag = convertTag?.includes('<br />') ? convertTag?.replace(/<br \/?>\ ?/g, ' ') : convertTag
    convertTag = convertTag?.includes('<br>') ? convertTag?.replace(/<br>/g, '') : convertTag
    let updatedText = convertTag.includes('<i>') ? convertTag?.replace(/<i>/g, "<em>")?.replace(/<*\/i>/g, "</em>") : convertTag

    if (props?.element?.elementdata?.headers || props?.element?.elementdata?.type === "pullquote" || (props?.element?.type === 'element-blockfeature'
        && props?.placeholder !== 'Attribution Text')) {
        updatedText = updatedText.includes('<strong>') ? updatedText?.replace(/<strong>/g, "")?.replace(/<*\/strong>/g, "") : updatedText
        updatedText = updatedText.includes('<u>') ? updatedText?.replace(/<u>/g, "")?.replace(/<*\/u>/g, "") : updatedText
        updatedText = updatedText.includes('<s>') ? updatedText?.replace(/<s>/g, "")?.replace(/<*\/s>/g, "") : updatedText
    } else if (props?.element?.type === 'element-learningobjectives') {
        updatedText = updatedText.includes('<strong>') ? updatedText?.replace(/<strong>/g, "")?.replace(/<*\/strong>/g, "") : updatedText
        updatedText = updatedText.includes('<u>') ? updatedText?.replace(/<u>/g, "")?.replace(/<*\/u>/g, "") : updatedText
        updatedText = updatedText.includes('<s>') ? updatedText?.replace(/<s>/g, "")?.replace(/<*\/s>/g, "") : updatedText
        updatedText = updatedText.includes('<em>') ? updatedText?.replace(/<em>/g, "")?.replace(/<*\/em>/g, "") : updatedText
    } else if (PLACEHOLDER_ARRAY.includes(props?.placeholder) || (props?.isAutoNumberingEnabled && AUTO_NUMBER_PLACEHOLDER.includes(props?.placeholder))) {
        let tempContent = testElement?.innerText?.replace(/&/g, "&amp;");
        updatedText = tempContent?.replace(/</g, "&lt;")?.replace(/>/g, "&gt;");
    } else if (!props?.isAutoNumberingEnabled && (props?.placeholder === "Label Name" || props.placeholder === "Label")) {
        updatedText = updatedText.includes('<code>') ? updatedText?.replace(/<code>/g, "")?.replace(/<*\/code>/g, "") : updatedText
    } else if (!props?.isAutoNumberingEnabled && props?.placeholder === "Number") {
        updatedText = updatedText.includes('<code>') ? updatedText?.replace(/<code>/g, "")?.replace(/<*\/code>/g, "") : updatedText
        updatedText = updatedText.includes('<sub>') ? updatedText?.replace(/<sub>/g, "")?.replace(/<*\/sub>/g, "") : updatedText
        updatedText = updatedText.includes('<sup>') ? updatedText?.replace(/<sup>/g, "")?.replace(/<*\/sup>/g, "") : updatedText
    } else if (props?.element?.type === "openerelement") {
        updatedText = updatedText.includes('<s>') ? updatedText?.replace(/<s>/g, "")?.replace(/<*\/s>/g, "") : updatedText
    } else if (props?.element?.type === "element-dialogue" || props?.element?.type === 'popup') {
        switch (props?.placeholder) {

            case "Enter Dialogue...": {
                updatedText = updatedText.includes('<code>') ? updatedText?.replace(/<code>/g, "")?.replace(/<*\/code>/g, "") : updatedText
                break;
            }
            case "Enter Stage Directions...": {
                updatedText = updatedText.includes('<code>') ? updatedText?.replace(/<code>/g, "")?.replace(/<*\/code>/g, "") : updatedText
                updatedText = updatedText.includes('<em>') ? updatedText?.replace(/<em>/g, "")?.replace(/<*\/em>/g, "") : updatedText
                break;
            }
            case "Enter Character Name...": {
                updatedText = updatedText.includes('<code>') ? updatedText?.replace(/<code>/g, "")?.replace(/<*\/code>/g, "") : updatedText
                updatedText = updatedText.includes('<strong>') ? updatedText?.replace(/<strong>/g, "")?.replace(/<*\/strong>/g, "") : updatedText
                break;
            }
            case "Enter call to action...": {
                updatedText = updatedText.includes('<sub>') ? updatedText?.replace(/<sub>/g, "")?.replace(/<*\/sub>/g, "") : updatedText
                updatedText = updatedText.includes('<sup>') ? updatedText?.replace(/<sup>/g, "")?.replace(/<*\/sup>/g, "") : updatedText
                updatedText = updatedText.includes('<s>') ? updatedText?.replace(/<s>/g, "")?.replace(/<*\/s>/g, "") : updatedText
                break;
            }
            default: break;
        }
    }

    if (ALLOWED_FORMATTING_TOOLBAR_TAGS.some(el => updatedText.match(el))) {
        if (ALLOWED_ELEMENT_IMG_PASTE.includes(props?.element?.type) && updatedText.match('<img ')) {
            if (updatedText.match('class="Wirisformula')) {
                pastedContent = handleWirisImgPaste(updatedText)
            } else if(props?.element?.type === 'element-blockfeature' && props.placeholder === "Attribution Text") {
                   pastedContent = handleImagePaste(updatedText)
            } else {
                pastedContent = updatedText;
            }
        } else {
            pastedContent = handleImagePaste(updatedText)
        }
    }
    else {
        let tempContent = testElement.innerText.replace(/&/g, "&amp;");
        pastedContent = tempContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return pastedContent;
}

// function to handle tinymce editor plugins based on config variable values
export const handleTinymceEditorPlugins = (plugins) => {
    let editorPlugins = plugins;
    if (config.ENABLE_WIRIS_PLUGIN) editorPlugins = `${editorPlugins} tiny_mce_wiris`;
    return editorPlugins;
}
/**
 * This function is used to restricts Pasting of Wiris Images
 * @param {*} updatedText
 * @returns
 */
export const handleWirisImgPaste = (updatedText) => {
    let updatePasteContent = updatedText.replace(/<img align="middle" class="Wirisformula"([\w\W]+?)>/g,'')
    return updatePasteContent;
}
/**
 * This function is used to restricts pasting of images inside title,caption,credit etc..
 * fields of figure (or other) elements
 * @param {*} updatedText
 * @returns
 */
export const handleImagePaste = (updatedText) => {
   let updatePasteContent = updatedText.replace(/<img ([\w\W]+?)>/g,'');
   return updatePasteContent;
}

/**Function to remove style attribute getting added to <u>, <em> and <strong> due to scenario mentioned in Bug PCAT-17429 */
export const removeStyleAttribute = (html) => {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tinyMCE.$(tempDiv).find('u').removeAttr('style');
    tinyMCE.$(tempDiv).find('em').removeAttr('style');
    tinyMCE.$(tempDiv).find('strong').removeAttr('style');
    tinyMCE.$(tempDiv).find('span').removeAttr('style');
    tinyMCE.$(tempDiv).find('s').removeAttr('style');
    return tempDiv.innerHTML;
}

export const getSelectionTextWithFormatting = (node) => {
    let tagName = node.tagName;
    let tempDiv = document.createElement(tagName);
    tempDiv.innerHTML = node.innerHTML;
    return tempDiv.outerHTML;
}

export const getParentNode = (node, stylingOrderList) => {
    let parentNode = node?.parentNode;
    if (parentNode && parentNode.tagName && validStylesTagList.indexOf(parentNode.tagName.toLowerCase()) > -1) {
        stylingOrderList.push(parentNode.tagName.toLowerCase());
        getParentNode(parentNode, stylingOrderList);
    }
}

export const findStylingOrder = (node) => {
    let stylingOrderList = [];
    if (node && node.tagName && validFirstNodeTags.indexOf(node.tagName.toLowerCase()) > -1) {
        getParentNode(node, stylingOrderList);
    }
    return stylingOrderList;
}

export const removeMarkedIndexDOMAttributes = (innerHTML, currentMarkedIndexId) => {
    const markedIndexDiv = document.createElement('div');
    markedIndexDiv.innerHTML = innerHTML
    while(tinyMCE.$(markedIndexDiv).find(`span[data-uri="${currentMarkedIndexId}"]`)?.length) {
        tinyMCE.$(markedIndexDiv).find(`span[data-uri="${currentMarkedIndexId}"]`).each(function () {
            let innerHtml = this?.innerHTML;
            this.outerHTML = innerHtml;
        });
    }
    return markedIndexDiv?.innerHTML;
}

export const removedDOMAttributes = (innerHTML, className) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = innerHTML
    while (tinyMCE.$(tempDiv).find(`span.${className}`)?.length) {
        tinyMCE.$(tempDiv).find(`span.${className}`).each(function () {
            let innerHtml = this?.innerHTML;
            this.outerHTML = innerHtml;
        });
        if (tinyMCE.$(tempDiv).find(`span.${className}`)?.length === 0) {
            break;
        }
    }
    return tempDiv?.innerHTML;
}

export const showNotificationOnCanvas = (message, type) => {
    let linkNotification = document.getElementById('link-notification');
    if (linkNotification) {
        if(type && type==='metadataUpdated')
        {
            linkNotification.style.background = '#000000'
            linkNotification.style.fontSize = '14px'
        }
        linkNotification.innerText = message;
        linkNotification.style.display = "block";
        setTimeout(() => {
            linkNotification.style.display = "none";
            linkNotification.innerText = "";
            if(type && type==='metadataUpdated'){
                linkNotification.style.background = '#444'
                linkNotification.style.fontSize = '12px'
            }
        }, 3000);
    }
}

// This function is use to handle Indentation for the Element
export const isElementIndent = (stanzaClassList) => {
    return (stanzaClassList?.contains('poetryLineLevel1') || stanzaClassList?.contains('poetryLineLevel2') || stanzaClassList?.contains('poetryLineLevel3')
    || stanzaClassList?.contains('DELineLevel1') || stanzaClassList?.contains('DELineLevel2') || stanzaClassList?.contains('DELineLevel3')
    || stanzaClassList?.contains('CNLineLevel1') || stanzaClassList?.contains('CNLineLevel2')|| stanzaClassList?.contains('CNLineLevel3'))
}

// This function is use to handle Indentation for Playscript
export const isDialogueIndent = (stanzaClassList) => {
    return (stanzaClassList?.contains('SDLineLevel1') || stanzaClassList?.contains('SDLineLevel2') || stanzaClassList?.contains('SDLineLevel3')
    || stanzaClassList?.contains('DELineLevel1') || stanzaClassList?.contains('DELineLevel2') || stanzaClassList?.contains('DELineLevel3')
    || stanzaClassList?.contains('CNLineLevel1') || stanzaClassList?.contains('CNLineLevel2')|| stanzaClassList?.contains('CNLineLevel3'))
}

// This function is use to return Playscript character class
export const getDEClassType = (classList) => {
    if(classList?.contains("CNLineLevel1")) {
        return 'class=\"CNLineLevel1\"';
    } else if(classList?.contains("CNLineLevel2")) {
        return 'class=\"CNLineLevel2\"';
    } else if(classList?.contains("CNLineLevel3")) {
        return 'class=\"CNLineLevel3\"';
    }
}
// This function is use to return Playscript character class
export const getDEClassName = (classList) => {
    if(classList?.includes("CNLineLevel1")) {
        return 'CNLineLevel1';
    } else if(classList?.includes("CNLineLevel2")) {
        return 'CNLineLevel2';
    } else if(classList?.includes("CNLineLevel3")) {
        return 'CNLineLevel3';
    } else {
        return "characterPS";
    }
}
/**
 * This function remove blankspaces and converters the provided string in lowercase
 * @param {String} string
 * @returns
 */
export const removeBlankSpaceAndConvertToLowercase = (string) => {
    if (string) return string.split(' ').join('').toLowerCase()
}
