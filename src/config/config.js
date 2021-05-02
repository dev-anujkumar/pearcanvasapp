let config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
    STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
    LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
    ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
    PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
    PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
    ELM_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
    ASSESSMENT_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/assessment-api/",
    LERNOSITY_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
    SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
    AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
    PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
    NARRATIVE_API_ENDPOINT:"https://contentapis-staging.pearsoncms.net/narrative-api/",
    OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
    AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    API_URL: "./api",
    COREAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/core-api",
    CONTENT_SCAPI_ENDPOINT : "https://staging.api.pearson.com/content/scapi",
    JAVA_API_URL: "https://10.11.7.24:8081/app/toc-javaapp/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    TCM_DASHBOARD_URL:  'http://localhost:3000',
    //c2 required keys and urls
    CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATA_ENDPOINT: 'https://staging.data.pearson.com',
    CMDS_SCHEMA_ENDPOINT: 'https://staging.schema.pearson.com',
    CMDS_DATABASE:  '?db=qa2',
    CMIS_REPO   : [{repo:"https://staging.api.pearson.com/content/cmis/ukwip",repoName:"UK"},{repo:"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}],
    CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
    EPS_API: 'https://us-school-stg.pearsoned.com/school',
    //c4 required keys and urls
    CTOOL_APIKEY:'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
    CTOOL_PUBSLATE:'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
    CTOOL_PUBTITLE: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
    CTOOL_PUBTITLES3: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitles3/v1/',
    CTOOL_DISCIPLINEID: 'https://staging.api.pearson.com/content/tools/printondemand/disciplineid/v1/',
    CTOOL_REGISTERPOD: 'https://staging.api.pearson.com/content/tools/printondemand/registerpod/v1/',
    CTOOL_DASHBOARD:'https://staging.api.pearson.com/content/tools/chaucerdashboard/v1', 
    EPUB_ENDPOINT:  'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
    C6PUB_ENDPOINT: 'https://staging.api.pearson.com/content/delivery/publish/v2/',
    C6PUB_API_KEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    C6REDIS_SERVER_UPDATE: 'api/projects/',
    C4_API_URL: "./api",
    DISCUSSION_URL: 'narrative/v1/discussion/discussions',
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    PATTERNS: {
        PATTERN_ADD_ASSET: 'https://component-lib-stg.pearson.com/c2/9f01f722-2a2e-4766-b55a-56043cb289cb/PatternAddAnAsset.js',
        PATTERN_BROKER: 'https://component-lib-stg.pearson.com/c2/834288f8-7e30-45cf-b41f-a1f422222aa8/PatternBroker.js',
        PATTERN_PRODUCT_LINK:'https://component-lib-stg.pearson.com/c2/d70a64ad-5659-408e-81bb-6b558cda5ce0/PatternProductLink.js',
        PATTERN_VENDOR: 'https://component-lib-stg.pearson.com/c2/20e323b7-9421-410b-a1e5-e10be6c27549/Patternvendor.js',
        PATTERN_SEARCH_SELECT: 'https://component-lib-stg.pearson.com/c2/0fc70e54-e5c7-42ae-9e26-5f8abb1b8f2f/PatternSearchSelect.js'
    },
    IDENTITY_URL: "/auth",
    GET_FIGURES : 'https://contentapis-staging.pearsoncms.net/',
    GET_ASSETPOPOVER_ID :'https://contentapis-staging.pearsoncms.net/',
    PREVIEW_ASSESSMENT_LO_ENDPOINT : "https://cite-qa.pearson.com/",
    APO_API_KEY:"7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx",
    dashboardUrl:"https://dev-structuredauthoring.pearson.com",
    GLOBAL_CO: {
        CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        CITE_REPO_INSTANCC:"https://staging.api.pearson.com/content/cmis/uswip-aws",
        CITE_REPO_NAME:"AWS US"
    },
    VCS_API_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/vcs-api/v1/content/',
    LEARNOSITY_CONTENT_BRIDGE_API: 'https://contentapis-staging.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/'
};

if (process.env.NODE_ENV === "development") {
    config.userName = 'c5test01';
    config.userId= 'c5test01';
    config.userEmail = 'c5test01@mctest.local';
    config.assignee='c5test01';
}

export default config;
