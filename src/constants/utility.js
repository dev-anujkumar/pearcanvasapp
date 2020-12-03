/**
 * Module - utility
 * Description - This file contains utility functions to be shared across
 */

// IMPORT - Module dependencies
import config from '../config/config';
import cypressConfig from '../config/cypressConfig';
import store from '../appstore/store'
import { handleBlankLineDom } from '../component/ElementContainer/UpdateElements';

// DECLARATION - const or variables 
const WRAPPER_URL = config.WRAPPER_URL; // TO BE IMPORTED

export const requestConfigURI = () => {
    let uri = '';
    if(process.env.NODE_ENV === "development"){
        uri = cypressConfig.sitePointing;
        // projectDetailsRes.currentOrigin = uri;
        // this.ifrmaeData();
    }else{
        let originUrl  = window.location.origin;
        if(originUrl === cypressConfig.prodUrl) {
            uri = 'prod';
        }else{
            let splitOriginUri = originUrl.split("-")[0];
            uri = splitOriginUri.split("//")[1]
        }
    }
    return uri;
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
    let permissions = authStore && authStore.appStore.permissions;
    let hasPermissions = permissions && permissions.includes(value)
    return hasPermissions;
}


export const hasReviewerRole = (value) => {
    if (value) {
        return !(hasProjectPermission(value) ? true : false)
    }
    const authStore = store.getState();
    let hasRole = authStore.appStore && (authStore.appStore.roleId === "comment_only"
        && (hasProjectPermission('note_viewer'))) ? true : false;
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
const removeTagsforSubTitle = (htmlText) => {
    return htmlText.replace(/<label>?.+<\/label>/g, "").replace(/<p>|<\/p>/g, "")
}


/**
 * Separates label and title from the unified HTML content and maps it to UI
 * @param {*} model label or title HTML content
 * @param {*} modelType type - label or title
 */
export const getTitleSubtitleModel = (model, modelType) => {
    let modelDocDom = model && new DOMParser().parseFromString(model, "text/html")
    let modelDom = modelDocDom && modelDocDom.body && modelDocDom.body.children[0]
    let modelToReturn
    if(modelType){
        if(modelType === "formatted-title"){
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
        }
        else if(modelType === "formatted-subtitle"){
            try{
                let modelInnerHTML = modelDom.innerHTML
                let modelWithRemovedTags = removeTagsforSubTitle(modelInnerHTML)
                modelToReturn = `<p class="paragraphNumeroUno">${modelWithRemovedTags}</p>`
            }
            catch (error) {
                modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
            }
        }
        else{
            modelToReturn = `<p class="paragraphNumeroUno"><br/></p>`
        }
    }
    return modelToReturn
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
        tempFirstContainerHtml = tempFirstContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
        currentTarget.innerHTML = tempFirstContainerHtml
    }
}

export const defaultMathImagePath = "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/";
/**
 * This object contains API-endpoints for Content-Enrichment SPA
 */
export const apiKeys_LO = {
    'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
    'strApiKey': config.STRUCTURE_APIKEY,
    'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
    'productApiUrl': config.PRODUCTAPI_ENDPOINT,
    'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
    'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
}