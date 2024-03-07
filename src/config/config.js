let config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges` :"http://localhost:5000",
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
    LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
    ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
    PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
    PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
    ASSESSMENT_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/assessment-api/",
    ACON_API_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/acapi/",
    AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
    PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
    NARRATIVE_API_ENDPOINT:"https://contentapis-staging.pearsoncms.net/narrative-api/",
    VCS_API_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/vcs-api/v1/content/',
    LEARNOSITY_CONTENT_BRIDGE_API: 'https://contentapis-staging.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/',
    NARRATIVE_READONLY_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/narrativeapi-readonly/',
    MANIFEST_READONLY_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/manifestapi-readonly/',
    STRUCTURE_READONLY_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/structureapi-readonly/',
    PROJECT_READONLY_ENDPOINT: 'https://contentapis-staging.pearsoncms.net/projectapi-readonly/',
    SLATE_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishSlate',
    PROJECT_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishTitleInterimNonBroker',
    BROKER_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishTitleInterim',
    PROJECT_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
    SLATE_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
    MYCLOUD_END_POINT: 'https://mycloud.preprod.pearson.com/auth/json/pearson',
    ALFRESCO_CITE_API: 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000',
    ALFRESCO_EDIT_METADATA:"https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/",
    ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
    LOGOUT_API:'https://mycloud.preprod.pearson.com/auth/json/pearson/sessions?_action=logout',
    PREVIEW_ASSESSMENT_LO_ENDPOINT : "https://cite-qa.pearson.com/",
    CYPRESS_PLUS_URL:"http://localhost:3000/cypress-plus",
    GLOBAL_CO: {
        CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        CITE_REPO_INSTANCC:"https://staging.api.pearson.com/content/cmis/uswip-aws",
        CITE_REPO_NAME:"AWS US"
    },
    //c2 required keys and urls
    CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATABASE:  '?db=qa2',
    CMIS_REPO   : [{repo:"https://staging.api.pearson.com/content/cmis/ukwip",repoName:"UK"},{repo:"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},
                    {"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}],
    CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
    EPS_API: 'https://us-school-stg.pearsoned.com/school',
    REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
    JAVA_API_URL: "https://10.11.7.24:8081/app/toc-javaapp/",
    //c4 required keys
    CTOOL_APIKEY:'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
    OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
    AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    APO_API_KEY:"7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx",
    IDENTITY_URL: "/auth",
    AWS_RESOURCE : 'lambda',
    ENABLE_WIRIS_PLUGIN: true,
    ENABLE_TAB_ELEMENT:false,
    PROACTIVE_SLATE_PREVIEW_STATUS: false,
    SHOW_CYPRESS_PLUS:true,
    ENABLE_AUTO_NUMBER_CONTENT: false,
    LOCK_DURATION: 0,
    VERSIONING_DELAY_INTERVAL:5000
};

if (process.env.NODE_ENV === "development") {
    config.userId = 'c5test01';
}

export default config;
