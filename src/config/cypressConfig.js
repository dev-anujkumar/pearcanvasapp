let cypressConfig = {
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*",
    alfrescoMetaData : {},
    slateEntityURN : "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    slateManifestURN : null,
    parentContainerUrn:"",
    parentEntityUrn:"",
    slateType : 'section',
    currentInsertedIndex : 0,
    currentInsertedType : "",
    disableNext : false,
    disablePrev : false,
    tcmStatus : false,
    staleTitle : "",
    book_title:"ELMTEST_StgEnv_Krajewski Test",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    citeUrn:"urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
    colors : ["#000000", "#003057", "#505759", "#005A70", "#006128"],
    isCO : false,
    isLOL:false,
    toolBarList : ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    elementToolbar: [],
    headingToolbar : ['italic','clearformatting','increaseindent','footnote','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    codeListingToolbar: ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    asideToolbar: ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    labelToolbar:['footnote','decreaseindent','glossary'],
    captionToolbar:['decreaseindent','glossary'],
    APO_API_KEY : '7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx',
    editorRefID:"",
    releaseCallCount: 0,
    exemptedElementClass : "heading1NummerEins heading2NummerEins heading3NummerEins heading4NummerEins heading5NummerEins heading6NummerEins paragraphNumeroUno pullQuoteNumeroUno heading2learningObjectiveItem",
    page : 0,
    scrolling : true,
    totalPageCount : 0,
    pageLimit : 0,
    fromTOC : false,
    CYPRESS_API_ENDPOINT : 'https://10.11.7.24:8443/cypress-api/',
    CYPRESS_TOC_JAVA_ENDPOINT : 'https://10.11.7.24:8443/app/toc-javaapp/',
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://dev-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    getENVConfig: process.env.NODE_ENV === "development" ? 'https://10.11.7.24:8443/cypress-api/' : '/cypress/canvas-srvr/cypress-api/',
    prodUrl : 'https://structuredauthoring.pearson.com',
    sitePointing : 'test'
}


if (process.env.NODE_ENV === "development") {
    cypressConfig.userName = 'c5test01';
    cypressConfig.userId= 'c5test01';
    cypressConfig.userEmail = 'c5test01@mctest.local';
    cypressConfig.assignee='c5test01';
}

export default cypressConfig;