let localConfig = {
    REACT_APP_API_URL : "https://10.11.7.24:8443/cypress-api/",
    STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
    LEARNING_OBJECTIVES_ENDPOINT: "https://contentapis-staging.pearsoncms.net/lo-api/",
    ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
    PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
    ELM_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
    SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
    AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
    PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
    OPENER_ELEMENT_COREAPI_KEY: "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
    AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    API_URL: "./api",
    COREAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/core-api",
    CONTENT_SCAPI_ENDPOINT : "https://staging.api.pearson.com/content/scapi",
    JAVA_API_URL: "https://10.11.7.24:8443/app/toc-javaapp/",
    STRUCTURE_APIKEY: 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    TCM_DASHBOARD_URL: 'http://localhost:3000',
    CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATA_ENDPOINT: 'https://staging.data.pearson.com',
    CMDS_SCHEMA_ENDPOINT: 'https://staging.schema.pearson.com',
    CMDS_DATABASE: '?db=qa2',
    CMIS_REPO   : '[{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}]',
    CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
    EPS_API: 'https://us-school-stg.pearsoned.com/school',
    CTOOL_APIKEY: 'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
    CTOOL_PUBSLATE: 'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
    CTOOL_PUBTITLE:  'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
    CTOOL_PUBTITLES3: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitles3/v1/',
    CTOOL_DISCIPLINEID: 'https://staging.api.pearson.com/content/tools/printondemand/disciplineid/v1/',
    CTOOL_REGISTERPOD: 'https://staging.api.pearson.com/content/tools/printondemand/registerpod/v1/',
    CTOOL_DASHBOARD: 'https://staging.api.pearson.com/content/tools/chaucerdashboard/v1', 
    EPUB_ENDPOINT: 'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
    C6PUB_ENDPOINT: 'https://staging.api.pearson.com/content/delivery/publish/v2/',
    C6PUB_API_KEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    C6REDIS_SERVER_UPDATE: 'api/projects/',
    C4_API_URL: "./api",
    // WRAPPER_URL: 'https://localhost:4000',
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    IDENTITY_URL: "/auth",
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    PATTERNS: {
        PATTERN_ADD_ASSET: 'https://component-lib-stg.pearson.com/c2/654b2512-649f-42ab-9c14-72cf4ce380f7/PatternAddAnAsset.js',
        PATTERN_BROKER:'https://component-lib-stg.pearson.com/c2/7a03593e-61b0-4d72-ab3c-4fdd5d14ad06/PatternBroker.js',
        PATTERN_PRODUCT_LINK: 'https://component-lib-stg.pearson.com/c2/4e6724b9-b65e-41ac-a132-de949cec3948/PatternProductLink.js',
        PATTERN_VENDOR: 'https://component-lib-stg.pearson.com/c2/6004cda8-7f38-4377-b7a6-5d06184a5de5/Patternvendor.js',
        PATTERN_SEARCH_SELECT: 'https://component-lib-stg.pearson.com/c2/854fdf48-456c-4021-8ffb-2d9c969e50d4/PatternSearchSelect.js',
    },
    GET_FIGURES :'https://contentapis-staging.pearsoncms.net/',
    GET_ASSETPOPOVER_ID :'https://contentapis-staging.pearsoncms.net/',
    APO_API_KEY : '7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx',
    editorRefID:"",
    colors : ["#000000", "#003057", "#505759", "#005A70", "#006128"],
    isCO : false,
    isLOL:false,
    toolBarList : ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    elementToolbar: [],
    headingToolbar : ['italic','clearformatting','increaseindent','footnote','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    codeListingToolbar: ['bold','italic','underline','strikethrough','clearformatting','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    asideToolbar: ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    labelToolbar:['footnote','decreaseindent','glossary'],
    captionToolbar:['decreaseindent','glossary'],
    book_title:"ELMTEST_StgEnv_Krajewski Test",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    citeUrn:"urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
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
};

export default localConfig;

