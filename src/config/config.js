let config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    REACT_APP_API_URL :"https://10.11.7.24:8443/cypress-api/",
    STRUCTURE_API_URL :"https://staging.api.pearson.com/",
    LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
    ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
    PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
    PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
    ELM_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
    LERNOSITY_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
    SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
    AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
    PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
    OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
    AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    API_URL: "./api",
    COREAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/core-api",
    CONTENT_SCAPI_ENDPOINT : "https://staging.api.pearson.com/content/scapi",
    JAVA_API_URL: "https://10.11.7.24:8443/app/toc-javaapp/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    TCM_DASHBOARD_URL:  'http://localhost:3000',
    //c2 required keys and urls
    CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATA_ENDPOINT: 'https://staging.data.pearson.com',
    CMDS_SCHEMA_ENDPOINT: 'https://staging.schema.pearson.com',
    CMDS_DATABASE:  '?db=qa2',
    CMIS_REPO   : '[{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}]',
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
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://localhost:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/dashboard-srvr` : 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    PATTERNS: {
        PATTERN_ADD_ASSET: 'https://component-lib-stg.pearson.com/c2/654b2512-649f-42ab-9c14-72cf4ce380f7/PatternAddAnAsset.js',
        PATTERN_BROKER: 'https://component-lib-stg.pearson.com/c2/7a03593e-61b0-4d72-ab3c-4fdd5d14ad06/PatternBroker.js',
        PATTERN_PRODUCT_LINK:'https://component-lib-stg.pearson.com/c2/4e6724b9-b65e-41ac-a132-de949cec3948/PatternProductLink.js',
        PATTERN_VENDOR: 'https://component-lib-stg.pearson.com/c2/6004cda8-7f38-4377-b7a6-5d06184a5de5/Patternvendor.js',
        PATTERN_SEARCH_SELECT: 'https://component-lib-stg.pearson.com/c2/854fdf48-456c-4021-8ffb-2d9c969e50d4/PatternSearchSelect.js',
    },
    IDENTITY_URL: "/auth",
    GET_FIGURES : 'https://contentapis-staging.pearsoncms.net/',
    PREVIEW_ASSESSMENT_LO_ENDPOINT : "https://cite-stg.pearson.com/"
};

if (process.env.NODE_ENV === "development") {
    config.userName = 'c5test01';
    config.userId= 'c5test01';
    config.userEmail = 'c5test01@mctest.local';
    config.assignee='c5test01';
}

export default config;
