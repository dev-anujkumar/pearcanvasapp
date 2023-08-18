const ENV_NAME = 'dev'
let cypressConfig = {
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges` :"http://localhost:5000",
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"http://local-dev.pearson.com:7000/",
    TCM_SNAPSHOT_URL: process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges/tctxsnapshot` :"http://localhost:5000/tctxsnapshot",
    TCM_SRVR_STATUS_URL: process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges/tcstats/proj/` :"http://localhost:5000/tcstats/proj/",
    TCM_CANVAS_POPUP_DATA: process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges/tctx` :"http://localhost:5000/tctx",
    TCM_CUT_COPY_URL: process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges/cut-copy-snapshots` :"http://localhost:5000/cut-copy-snapshots",
    getENVConfig: process.env.NODE_ENV === "development" ? `https://${ENV_NAME}-structuredauthoring.pearson.com/cypress/canvas-srvr/cypress-api/` : '/cypress/api/canvas/cypress-api/',
    TINYMCE_SPELL_CHECKER_URL: process.env.NODE_ENV === "development" ? 'http://localhost:8080/ephox-spelling/': '/cypress/tinymce-srvr/ephox-spelling/',
    CYPRESS_API_ENDPOINT : `https://${ENV_NAME}-structuredauthoring.pearson.com/cypress/canvas-srvr/cypress-api/`,
    CYPRESS_TOC_JAVA_ENDPOINT : `https://${ENV_NAME}-structuredauthoring.pearson.com/cypress/toc-srvr/app/toc-javaapp/`,
    prodUrl : 'https://structuredauthoring.pearson.com',
    toolBarList : ['undo', 'redo','insertMedia','formatSelector','casechange', 'bold', 'italic', 'underline','strikethrough', 'removeformat', 'subscript', 'superscript', 'specialcharactor','alignment','calloutIcon', 'crossLinkingIcon', 'glossary','footnote','mathml','chemml','inlinecode', 'IndexEntry', 'orderedlist','unorderedlist','increaseindent','decreaseindent'],
    elementToolbar: [],
    revelToolbar : ['insertMedia','formatSelector', 'footnote','glossary','assetpopover','orderedlist','unorderedlist','alignment','calloutIcon', 'IndexEntry'],
    codeListingToolbarEnabled: ['insertMedia','formatSelector','strikethrough','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag', 'IndexEntry'],
    codeListingToolbarDisabled: ['insertMedia','formatSelector','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag', 'IndexEntry'],
    asideToolbar: ['insertMedia','formatSelector','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','alignment','calloutIcon','undo','redo','crossLinkingIcon','assetpopover','slatetag', 'IndexEntry'],
    labelToolbar:['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','footnote','decreaseindent','alignment','calloutIcon', 'IndexEntry'],
    figureImageLabelToolbar:['insertMedia', 'formatSelector', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml','chemml','inlinecode','orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent','IndexEntry'],
    figureNumberToolbar:['insertMedia','formatSelector', 'subscript', 'superscript', 'specialcharactor', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    labelToolbarAutonumberMode: ['insertMedia','formatSelector','bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'subscript', 'superscript', 'specialcharactor', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    numberToolbarAutonumberMode: ['insertMedia','formatSelector', 'casechange','bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'subscript', 'superscript', 'specialcharactor', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    figurImageCommonToolbar: ['insertMedia', 'formatSelector', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent','IndexEntry'],
    AsideLabel: ['insertMedia', 'formatSelector', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    AsideNumber: ['insertMedia', 'formatSelector', 'subscript', 'superscript', 'specialcharactor', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'mathml', 'chemml', 'inlinecode', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    AsideTitle: ['insertMedia', 'formatSelector', 'alignment', 'calloutIcon', 'crossLinkingIcon', 'glossary', 'footnote', 'orderedlist', 'unorderedlist', 'increaseindent', 'decreaseindent', 'IndexEntry'],
    smartlinkActionButtonToolbar: ['insertMedia', 'formatSelector', 'bold', 'italic', 'underline','strikethrough', 'removeformat', 'subscript', 'superscript', 'footnote', 'decreaseindent', 'glossary', 'crossLinkingIcon', 'assetpopover', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'alignment', 'calloutIcon', 'increaseindent', 'IndexEntry'],
    captionToolbar:['insertMedia','formatSelector','decreaseindent','glossary','crossLinkingIcon','assetpopover','alignment','calloutIcon', 'IndexEntry'],
    poetryLabelToolbar: ['insertMedia','formatSelector','footnote','decreaseindent','increaseindent','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','mathml','chemml','alignment','calloutIcon', 'IndexEntry'],
    popupCallToActionToolbar: ['insertMedia','formatSelector','strikethrough','footnote','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','increaseindent','decreaseindent','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment','calloutIcon', 'IndexEntry'],
    poetryCaptionToolbar:['insertMedia','formatSelector','decreaseindent','increaseindent','glossary','crossLinkingIcon','assetpopover','orderedlist','unorderedlist','alignment','calloutIcon', 'IndexEntry'],
    poetryStanzaToolbar:['insertMedia','formatSelector','orderedlist','unorderedlist','alignment','calloutIcon', 'IndexEntry'],
    playScriptToolbar:['insertMedia','formatSelector','decreaseindent','increaseindent','crossLinkingIcon', 'footnote', 'assetpopover','orderedlist','unorderedlist','alignment','calloutIcon', 'IndexEntry'],
    playScriptToolbarForIndent:['insertMedia','formatSelector','crossLinkingIcon', 'footnote', 'assetpopover','orderedlist','unorderedlist','alignment','calloutIcon', 'IndexEntry'],
    blockListToolbar:['formatSelector','alignment', 'IndexEntry','crossLinkingIcon', 'decreaseindent','increaseindent'],
    openerElementToolbar: ['undo', 'redo', 'insertMedia','formatSelector','casechange', 'alignment','calloutIcon', 'crossLinkingIcon', 'glossary','footnote', 'assetpopover', 'mathml','chemml', 'strikethrough', 'IndexEntry', 'orderedlist','unorderedlist','increaseindent','decreaseindent', 'slatetag', 'calloutIcon',],
    tabTitleToolbar: ['undo', 'redo', 'insertMedia','formatSelector','casechange', 'alignment','calloutIcon', 'crossLinkingIcon', 'glossary','footnote', 'assetpopover', 'mathml','chemml', 'specialcharactor', 'IndexEntry', 'orderedlist','unorderedlist','increaseindent','decreaseindent', 'slatetag', 'calloutIcon',],
    figureFieldsPlaceholders: ['Number', 'Label', 'Label Name', 'Title', 'Caption', 'Credit', 'Math Block Content','Code Block Content'],
    smartlinkContexts: ['3rd-party', 'pdf', 'web-link', 'pop-up-web-link', 'table', 'fpo'],
    ctaButtonSmartlinkContexts: ['pdf', 'web-link', 'pop-up-web-link'],
    colors : ["#005A70", "#003057", "#006128", "#505759", "#000000"],
    // textcolors:["#ffffff", "#000000"],
    textcolors:["option1", "option2"],
    parentOfParentItem:[],
    ssoToken: "7WpBpWgu4SZMGX3Zav05HbfEj6JCGSAd6F99ZnvJ1S8VuOfuVrGZNE1tFctKNcRYPHAU4b4vP0fCwep6UXmxW0TqzUqDVbYSurqTEGaFTbc3ZQj94Z",
    myCloudProxySession:"PilpXKVfaH0t4Spy7wTeSaitoXfeN2c6L7QPZDvY2hhPJLwEbDFYACKQpVwKirL3PMR9AGOec9a91C4escwMupBpGdBjbBfYaPXMAGjESaRDBpLDk3",
    projectUrn: "urn:pearson:distributable:cbcd2b0c-7a44-423d-9b8a-61be2dd7b9d1",
    projectEntityUrn:"urn:pearson:entity:b22320ea-3141-45ab-b45a-63b65886fe49",
    slateEntityURN : "urn:pearson:entity:5c77d3b2-bcad-4470-ba8f-018730070bf1",
    slateManifestURN : "urn:pearson:manifest:a52fe32a-a3fc-47ca-b997-d80c874f2f74",
    citeUrn:"urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
    book_title:"ELMTEST_StgEnv_Krajewski Test",
    APO_API_KEY : '7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx',
    slateType : 'section',
    sitePointing : `${ENV_NAME}`,
    fullName:'c5test01',
    CYPRESS_PLUS_WINDOW:'',
    parentContainerUrn:"",
    parentEntityUrn:"",
    staleTitle : "",
    editorRefID:"",
    lastActiveElementId:'',
    tcmslatemanifest:"",
    assessmentId: "",
    currentElementUrn: '',
    alfrescoMetaData : {},
    cachedActiveElement : {},
    elementStatus: {},
    popupParentElement : {},
    scrollPosition : 0,
    currentInsertedIndex : 0,
    releaseCallCount: 0,
    page : 0,
    totalPageCount : 0,
    pageLimit : 0,
    tempSlateManifestURN : null,
    tempSlateEntityURN : null,
    isPopupSlate : false,
    disableNext : false,
    disablePrev : false,
    tcmStatus : false,
    isCO : false,
    isLOL:false,
    scrolling : true,
    fromTOC : false,
    conversionInProcess : false,
    savingInProgress: false,
    citationFlag: false,
    popupCreationCallInProgress : false,
    pageNumberInProcess: true,
    poetryElementCreationInProgress: false,
    isDefaultElementInProgress:true,
    isCreateGlossary:false,
    isCreateFootnote:false,
    isSavingElement:false,
    saveElmOnAS: false,
    isCypressPlusEnabled:true,
    updateInlineImage: false,
    figureDataToBeFetched:false,
    glossaryCreated: false,
    elementSlateRefresh: false,
    tcmStatusPopupGlossary: false,
    pendingTcmStatus: false
}

export default cypressConfig;
