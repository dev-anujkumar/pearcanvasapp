let cypressConfig = {
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*",
    alfrescoMetaData : {},
    slateEntityURN : "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    slateManifestURN : null,
    tempSlateManifestURN : null,
    tempSlateEntityURN : null,
    cachedActiveElement : {},
    isPopupSlate : false,
    scrollPosition : 0,
    parentContainerUrn:"",
    parentEntityUrn:"",
    slateType : 'section',
    currentInsertedIndex : 0,
    disableNext : false,
    disablePrev : false,
    tcmStatus : false,
    staleTitle : "",
    book_title:"ELMTEST_StgEnv_Krajewski Test",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    citeUrn:"urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
    colors : ["#005A70", "#003057", "#006128", "#505759", "#000000"],
    // textcolors:["#ffffff", "#000000"],
    textcolors:["option1", "option2"],
    isCO : false,
    isLOL:false,
    toolBarList : ['undo', 'redo', 'insertMedia', 'formatSelector','bold', 'italic', 'underline','strikethrough', 'removeformat', 'subscript', 'superscript', 'specialcharactor','alignment','calloutIcon', 'crossLinkingIcon', 'glossary','footnote','mathml','chemml','inlinecode', 'orderedlist','unorderedlist','increaseindent','decreaseindent'],
    elementToolbar: [],
    showHideToolbar: ['insertMedia','formatSelector', 'footnote','glossary','assetpopover','alignment','calloutIcon'],
    revelToolbar : ['insertMedia','formatSelector', 'footnote','glossary','assetpopover','orderedlist','unorderedlist','alignment','calloutIcon'],
    headingToolbar : ['insertMedia','formatSelector','italic','clearformatting','increaseindent','footnote','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag'],
    codeListingToolbarEnabled: ['insertMedia','formatSelector','strikethrough','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag'],
    codeListingToolbarDisabled: ['insertMedia','formatSelector','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag'],
    asideToolbar: ['insertMedia','formatSelector','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag'],
    labelToolbar:['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','footnote','decreaseindent','alignment','calloutIcon'],
    figureNumberToolbar:['insertMedia','formatSelector', 'subscript', 'superscript', 'specialcharactor', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent'],
    captionToolbar:['insertMedia','formatSelector','decreaseindent','glossary','crossLinkingIcon','assetpopover','alignment','calloutIcon'],
    poetryLabelToolbar:['insertMedia','formatSelector','footnote','decreaseindent','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','mathml','chemml','alignment','calloutIcon'],
    popupCallToActionToolbar: ['insertMedia','formatSelector','strikethrough','footnote','decreaseindent','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','increaseindent','decreaseindent','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment','calloutIcon'],
    poetryCaptionToolbar:['insertMedia','formatSelector','decreaseindent','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','alignment','calloutIcon'],
    poetryStanzaToolbar:['insertMedia','formatSelector','increaseindent','decreaseindent','orderedlist','unorderedlist','alignment','calloutIcon'],
    sdToolbar: ['insertMedia','formatSelector','crossLinkingIcon', 'italic', 'assetpopover', 'footnote', 'glossary','decreaseindent','alignment','calloutIcon'],
    deCharacterToolbar: ['insertMedia', 'formatSelector', 'crossLinkingIcon', 'bold', 'assetpopover', 'footnote', 'glossary', 'decreaseindent','alignment','calloutIcon'],
    playScriptToolbar:['insertMedia','formatSelector','decreaseindent','increaseindent','crossLinkingIcon', 'footnote', 'assetpopover','orderedlist','unorderedlist','alignment','calloutIcon'],
    APO_API_KEY : '7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx',
    editorRefID:"",
    releaseCallCount: 0,
    exemptedElementClass : "heading1NummerEins heading2NummerEins heading3NummerEins heading4NummerEins heading5NummerEins heading6NummerEins paragraphNumeroUno pullQuoteNumeroUno heading2learningObjectiveItem",
    page : 0,
    scrolling : true,
    totalPageCount : 0,
    pageLimit : 0,
    fromTOC : false,
    CYPRESS_API_ENDPOINT : 'https://10.11.1.242:8081/cypress-api/',
    CYPRESS_TOC_JAVA_ENDPOINT : 'https://10.11.7.24:8443/app/toc-javaapp/',
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"http://localhost:7000/",
    TCM_SNAPSHOT_URL: process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr/tctxsnapshot` :"http://localhost:5000/tctxsnapshot",
    TCM_SRVR_STATUS_URL: process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr/tcstats/proj/` :"http://localhost:5000/tcstats/proj/",
    TCM_CANVAS_POPUP_DATA: process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr/tctx` :"http://localhost:5000/tctx",
    getENVConfig: process.env.NODE_ENV === "development" ? 'https://10.11.1.242:8081/cypress-api/' : '/cypress/canvas-srvr/cypress-api/',
    prodUrl : 'https://structuredauthoring.pearson.com',
    sitePointing : 'dev',
    conversionInProcess : false,
    savingInProgress: false,
    citationFlag: false,
    lastActiveElementId:'',
    popupCreationCallInProgress : false,
    pageNumberInProcess: true,
    poetryElementCreationInProgress: false,
    elementStatus: {},
    popupParentElement : {},
    isDefaultElementInProgress:true,
    isCreateGlossary:false,
    isCreateFootnote:false,
    isSavingElement:false,
    tcmslatemanifest:"",
    saveElmOnAS: false,
    fullName:'c5test01'
}


if (process.env.NODE_ENV === "development") {
    cypressConfig.userName = 'c5test01';
    cypressConfig.userId= 'c5test01';
    cypressConfig.userEmail = 'c5test01@mctest.local';
    cypressConfig.assignee='c5test01';
}

export default cypressConfig;