let config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
    LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/api/trackchanges` :"http://localhost:5000",
    TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    STRUCTURE_API_URL: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/" : "https://contentapis-staging.pearson.com/",
    LEARNING_OBJECTIVES_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/lo-api/" : "https://contentapis-staging.pearson.com/lo-api/",
    ASSET_POPOVER_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/manifest-api/" : "https://contentapis-staging.pearson.com/manifest-api/",
    PRODUCTAPI_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/product-api/" : "https://contentapis-staging.pearson.com/product-api/",
    PROJECTAPI_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/project-api/distributable/v2" : "https://contentapis-staging.pearson.com/project-api/distributable/v2",
    ASSESSMENT_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/assessment-api/" : "https://contentapis-staging.pearson.com/assessment-api/",
    ACON_API_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/acapi/" : "https://contentapis-staging.pearson.com/acapi/",
    AUDIO_NARRATION_URL: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/structure-api/" : 'https://contentapis-staging.pearson.com/structure-api/',
    PAGE_NUMBER_UPDATE_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/print-api" : "https://contentapis-staging.pearson.com/print-api",
    NARRATIVE_API_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/narrative-api/" : "https://contentapis-staging.pearson.com/narrative-api/",
    VCS_API_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/vcs-api/v1/content/" : 'https://contentapis-staging.pearson.com/vcs-api/v1/content/',
    LEARNOSITY_CONTENT_BRIDGE_API: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/learnositycontentbridge-api/lcb/v1/bank2projapi/" : 'https://contentapis-staging.pearson.com/learnositycontentbridge-api/lcb/v1/bank2projapi/',
    NARRATIVE_READONLY_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/narrativeapi-readonly/" : 'https://contentapis-staging.pearson.com/narrativeapi-readonly/',
    MANIFEST_READONLY_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/manifestapi-readonly/" : 'https://contentapis-staging.pearson.com/manifestapi-readonly/',
    STRUCTURE_READONLY_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/structureapi-readonly/" : 'https://contentapis-staging.pearson.com/structureapi-readonly/',
    PROJECT_READONLY_ENDPOINT: process.env.NODE_ENV === "production" ? "https://contentapis.pearson.com/projectapi-readonly/" : 'https://contentapis-staging.pearson.com/projectapi-readonly/',
    SLATE_PREVIEW_ARN: process.env.NODE_ENV === "production" ? "arn:aws:lambda:us-east-1:346147488134:function:c4-prod-publishSlate" : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishSlate',
    PROJECT_PREVIEW_ARN: process.env.NODE_ENV === "production" ? "arn:aws:lambda:us-east-1:346147488134:function:c4-prod-publishTitleInterimNonBroker" : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishTitleInterimNonBroker',
    BROKER_PREVIEW_ARN: process.env.NODE_ENV === "production" ? "arn:aws:lambda:us-east-1:346147488134:function:c4-prod-publishTitleInterim" : 'arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishTitleInterim',
    PROJECT_PREVIEW_ENDPOINT: process.env.NODE_ENV === "production" ? "https://tooling.pearson.com/aws-invoke/" : 'https://tooling-dev.pearson.com/aws-invoke/',
    SLATE_PREVIEW_ENDPOINT: process.env.NODE_ENV === "production" ? "https://tooling.pearson.com/aws-invoke/" : 'https://tooling-dev.pearson.com/aws-invoke/',
    MYCLOUD_END_POINT: 'https://mycloud.preprod.pearson.com/auth/json/pearson',
    ALFRESCO_CITE_API: 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000',
    ALFRESCO_EDIT_METADATA: process.env.NODE_ENV === "production" ? "https://uswip.cms.pearson.com/alfresco/" : "https://usppewip.cms.pearson.com/alfresco/",
    ALFRESCO_EDIT_ENDPOINT: process.env.NODE_ENV === "production" ? "https://uswip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/" : "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
    LOGOUT_API:'https://mycloud.preprod.pearson.com/auth/json/pearson/sessions?_action=logout',
    PREVIEW_ASSESSMENT_LO_ENDPOINT: process.env.NODE_ENV === "production" ? "https://pace.pearson.com/viewers/preview/#/" : "https://pace-qa.pearson.com/viewers/preview/#/",
    CYPRESS_PLUS_URL: process.env.NODE_ENV === "production" ? "https://pace.pearson.com/cypress-plus" : "http://localhost:3000/cypress-plus",
    GLOBAL_CO: process.env.NODE_ENV === "production" ? {
        "CITE_NODE_REF": "454d24af-cb37-48d8-abba-b0c3792d7e06",
        "CITE_REPO_INSTANCC": "https://api.pearson.com/content/cmis/uswip-aws",
        "CITE_REPO_NAME": "cite-generic-openers"
    } : {
        CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        CITE_REPO_INSTANCC:"https://staging.api.pearson.com/content/cmis/uswip-aws",
        CITE_REPO_NAME:"AWS US"
    },
    //c2 required keys and urls
    CMDS_APIKEY: process.env.NODE_ENV === "production" ? "sS0QYdzu9rCVA38pCuByTYjiPJGMAY82" : '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATABASE:  '?db=qa2',
    CMIS_REPO: process.env.NODE_ENV === "production" ?
        [{ "repo": "https://api.pearson.com/content/cmis/ukwip", "repoName": "UK" },
        {"repo": "https://api.pearson.com/content/cmis/uswip-aws","repoName": "AWSUS"},
        { "repo": "https://api.pearson.com/content/cmis/uswip", "repoName": "US" }] :
        [{ repo: "https://staging.api.pearson.com/content/cmis/ukwip", repoName: "UK" },
        { repo: "https://staging.api.pearson.com/content/cmis/uswip-aws", "repoName": "AWS US" },
        { "repo": "https://staging.api.pearson.com/content/cmis/uswip", "repoName": "US" }],
    CMDS_AUTHORIZATION: process.env.NODE_ENV === "production" ? "Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==" : 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
    EPS_API: process.env.NODE_ENV === "production" ? "https://us-school.pearsoned.com/school" : 'https://us-school-stg.pearsoned.com/school',
    REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
    JAVA_API_URL: process.env.NODE_ENV === "production" ? "https://pace.pearson.com/cypress/api/toc/app/toc-javaapp/" : "https://pace-dev.pearson.com/cypress/api/toc/app/toc-javaapp/",
    //c4 required keys
    CTOOL_APIKEY: process.env.NODE_ENV === "production" ? "rGeFx6GAhgAU7XylJjWlGEhtvmAMW4xj" : 'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
    OPENER_ELEMENT_COREAPI_KEY: process.env.NODE_ENV === "production" ? "DUPxYMW18z1BgT2s5Qe5nVjBFGPudP9u" : "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
    AUDIO_API_KEY: process.env.NODE_ENV === "production" ? "DUPxYMW18z1BgT2s5Qe5nVjBFGPudP9u" : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    STRUCTURE_APIKEY: process.env.NODE_ENV === "production" ? "DUPxYMW18z1BgT2s5Qe5nVjBFGPudP9u" : 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    APO_API_KEY: process.env.NODE_ENV === "production" ? "DUPxYMW18z1BgT2s5Qe5nVjBFGPudP9u" : "7ij8zrLkCNR9DtAXx3KJ6yutoYnk4SAx",
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
