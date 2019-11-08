let config = {
    REACT_APP_API_URL : process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "https://10.11.7.24:8443/cypress-api/",
    STRUCTURE_API_URL : process.env.NODE_ENV === 'production' ? process.env.STRUCTURE_API_URL : "https://staging.api.pearson.com/",
    LEARNING_OBJECTIVES_ENDPOINT: process.env.NODE_ENV === "production" ? process.env.LEARNING_OBJECTIVES_ENDPOINT : "https://contentapis-staging.pearsoncms.net/lo-api/",
    ASSET_POPOVER_ENDPOINT: process.env.NODE_ENV === "production" ? process.env.ASSET_POPOVER_ENDPOINT : "https://contentapis-staging.pearsoncms.net/manifest-api/",
    PRODUCTAPI_ENDPOINT:process.env.NODE_ENV === "production" ? process.env.PRODUCTAPI_ENDPOINT : "https://contentapis-staging.pearsoncms.net/product-api/",
    ELM_ENDPOINT: process.env.NODE_ENV === "production" ? process.env.ELM_ENDPOINT : "https://contentapis-staging.pearsoncms.net/manifest-api/",
    SLATE_REFRESH_URL :process.env.NODE_ENV === "production" ? process.env.SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
    API_URL: "./api",
    NODE_ENV: process.env.NODE_ENV || 'development',
    COREAPI_ENDPOINT: process.env.NODE_ENV === "production" ? process.env.COREAPI_ENDPOINT : "https://contentapis-staging.pearsoncms.net/core-api",
    JAVA_API_URL: process.env.NODE_ENV === 'production' ? process.env.JAVA_API_URL : "https://10.11.7.24:8443/app/toc-javaapp/",
    NARRATIVE_API_URL: "https://10.11.7.24:8443/app/toc-javaapp/v1/",
    STRUCTURE_APIKEY: process.env.STRUCTURE_APIKEY || 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    MANIFEST_APIKEY: process.env.MANIFEST_APIKEY || 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
    ssoToken: "i2KQRvTIpS5MCcQniBc38hsfEgc.*AAJTSQACMDIAAlNLABx6ODZncW9ZcmlwMGlsN2IwUHNlK0lVeEk4TlE9AAJTMQACMDE.*",
    alfrescoMetaData : {},
    slateEntityURN : "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    slateManifestURN : "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    parentContainerUrn:"",
    parentEntityUrn:"",
    slateType : 'section',
    currentInsertedIndex : 0,
    currentInsertedType : "",
    disableNext : false,
    disablePrev : false,
    //c2 required keys and urls
    CMDS_APIKEY: process.env.CMDS_APIKEY || '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATA_ENDPOINT: process.env.NODE_ENV === 'production' ? process.env.CMDS_DATA_ENDPOINT : 'https://staging.data.pearson.com',
    CMDS_SCHEMA_ENDPOINT: process.env.NODE_ENV === 'production' ? process.env.CMDS_SCHEMA_ENDPOINT : 'https://staging.schema.pearson.com',
    CMDS_DATABASE: process.env.NODE_ENV === 'production' ? process.env.CMDS_DATABASE : '?db=qa2',
    CMIS_REPO   : process.env.NODE_ENV === 'production' ? process.env.CMIS_REPO : '[{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}]',
    EPS_API: process.env.NODE_ENV === 'production' ? process.env.EPS_API : 'https://us-school-stg.pearsoned.com/school',
    //c4 required keys and urls
    CTOOL_APIKEY: process.env.NODE_ENV === 'production' ? process.env.CTOOL_APIKEY : 'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
    CTOOL_PUBSLATE: process.env.NODE_ENV === 'production' ? process.env.CTOOL_PUBSLATE : 'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
    CTOOL_PUBTITLE: process.env.NODE_ENV === 'production' ? process.env.CTOOL_PUBTITLE : 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
    CTOOL_PUBTITLES3: process.env.NODE_ENV === 'production' ? process.env.CTOOL_PUBTITLES3 : 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitles3/v1/',
    CTOOL_DISCIPLINEID: process.env.NODE_ENV === 'production' ? process.env.CTOOL_DISCIPLINEID : 'https://staging.api.pearson.com/content/tools/printondemand/disciplineid/v1/',
    CTOOL_REGISTERPOD: process.env.NODE_ENV === 'production' ? process.env.CTOOL_REGISTERPOD : 'https://staging.api.pearson.com/content/tools/printondemand/registerpod/v1/',
    CTOOL_DASHBOARD: process.env.NODE_ENV === 'production' ? process.env.CTOOL_DASHBOARD : 'https://staging.api.pearson.com/content/tools/chaucerdashboard/v1', 
    EPUB_ENDPOINT: process.env.NODE_ENV === 'production' ? process.env.EPUB_ENDPOINT : 'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
    C6PUB_ENDPOINT: process.env.NODE_ENV === 'production' ? process.env.C6PUB_ENDPOINT : 'https://staging.api.pearson.com/content/delivery/publish/v2/',
    C6PUB_API_KEY: process.env.NODE_ENV === 'production' ? process.env.C6PUB_API_KEY : '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    C6REDIS_SERVER_UPDATE: 'api/projects/',
    C4_API_URL: "./api",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    citeUrn:"urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    book_title:"ELMTEST_StgEnv_Krajewski Test",
    IDENTITY_URL: process.env.NODE_ENV === 'production' ? process.env.IDENTITY_URL : "/auth",
    //parentUrl: window.location.origin
    // https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    PATTERNS: {
        PATTERN_ADD_ASSET: process.env.NODE_ENV === 'production' ? process.env.PATTERN_ADD_ASSET : 'https://component-lib-stg.pearson.com/c2/654b2512-649f-42ab-9c14-72cf4ce380f7/PatternAddAnAsset.js',
        PATTERN_BROKER: process.env.NODE_ENV === 'production' ? process.env.PATTERN_BROKER : 'https://component-lib-stg.pearson.com/c2/7a03593e-61b0-4d72-ab3c-4fdd5d14ad06/PatternBroker.js',
        PATTERN_PRODUCT_LINK: process.env.NODE_ENV === 'production' ? process.env.PATTERN_PRODUCT_LINK : 'https://component-lib-stg.pearson.com/c2/4e6724b9-b65e-41ac-a132-de949cec3948/PatternProductLink.js',
        PATTERN_VENDOR: process.env.NODE_ENV === 'production' ? process.env.PATTERN_VENDOR : 'https://component-lib-stg.pearson.com/c2/6004cda8-7f38-4377-b7a6-5d06184a5de5/Patternvendor.js',
        PATTERN_SEARCH_SELECT: process.env.NODE_ENV === 'production' ? process.env.PATTERN_SEARCH_SELECT : 'https://component-lib-stg.pearson.com/c2/854fdf48-456c-4021-8ffb-2d9c969e50d4/PatternSearchSelect.js',
    },
    colors : ["#000000", "#003057", "#505759", "#005A70", "#006128"],
    isCO : false,
    isLOL:false,
    toolBarList : ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    elementToolbar: [],
    headingToolbar : ['italic','clearformatting','increaseindent','footnote','mathml','chemml','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    codeListingToolbar: ['bold','italic','underline','strikethrough','clearformatting','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    asideToolbar: ['bold','italic','underline','strikethrough','clearformatting','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
    labelToolbar:['footnote','decreaseindent'],
    captionToolbar:['decreaseindent'],
    GET_FIGURES : 'https://contentapis-qa.pearsoncms.net/',
    GET_ASSETPOPOVER_ID : 'https://staging.api.pearson.com/',
    APO_API_KEY : '7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx'
};
if (process.env.NODE_ENV === "development") {
    config.userName = 'c5test01';
    config.userId= 'c5test01';
    config.userEmail = 'c5test01@mctest.local';
    config.assignee='c5test01';
}

export default config;
