let config = {
    REACT_APP_API_URL : "https://10.11.7.24:8443/cypress-api/",
    STRUCTURE_API_URL :"https://staging.api.pearson.com/",
    JAVA_API_URL: "https://10.11.7.24:8443/app/toc-javaapp/",
    NARRATIVE_API_URL: "https://10.11.7.24:8443/app/toc-javaapp/v1/",
    STRUCTURE_APIKEY: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    ssoToken: "eRYcxfnS4TPJ88yWxednixaDj2Q.*AAJTSQACMDIAAlNLABx0SzBkdnF0cDQ2RmRuQ2NDeFpRSWw1ZzhpQ009AAJTMQACMDQ.*",
    userId: 'c5test01',
    assignee:'c5test01',
    slateEntityURN : "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    slateManifestURN : "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateType : 'section',
    currentInsertedIndex : 0,
    slateList: [
        'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e',
        'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c'
    ],
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    WRAPPER_URL : 'https://localhost:4000', // TO BE CONFIGURED WITH TASKDEF
    //parentUrl: window.location.origin
    LOCK_API_BASE_URL : process.env.LOCK_API_BASE_URL || 'https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr',
    CMDS_APIKEY: process.env.CMDS_APIKEY || '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
    CMDS_DATA_ENDPOINT: process.env.CMDS_DATA_ENDPOINT || 'https://staging.data.pearson.com',
    CMDS_SCHEMA_ENDPOINT: process.env.CMDS_SCHEMA_ENDPOINT || 'https://staging.schema.pearson.com',
    CMDS_DATABASE: process.env.CMDS_DATABASE || '?db=qa2',
    CMIS_REPO   : process.env.CMIS_REPO || '[{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}]',
    EPS_API: process.env.EPS_API || 'https://us-school-stg.pearsoned.com/school',
    PATTERNS: {
        PATTERN_ADD_ASSET: process.env.PATTERN_ADD_ASSET || 'https://component-lib-stg.pearson.com/c2/654b2512-649f-42ab-9c14-72cf4ce380f7/PatternAddAnAsset.js',
        PATTERN_BROKER: process.env.PATTERN_BROKER || 'https://component-lib-stg.pearson.com/c2/7a03593e-61b0-4d72-ab3c-4fdd5d14ad06/PatternBroker.js',
        PATTERN_PRODUCT_LINK: process.env.PATTERN_PRODUCT_LINK || 'https://component-lib-stg.pearson.com/c2/4e6724b9-b65e-41ac-a132-de949cec3948/PatternProductLink.js',
        PATTERN_VENDOR: process.env.PATTERN_VENDOR || 'https://component-lib-stg.pearson.com/c2/6004cda8-7f38-4377-b7a6-5d06184a5de5/Patternvendor.js',
        PATTERN_SEARCH_SELECT: process.env.PATTERN_SEARCH_SELECT || 'https://component-lib-stg.pearson.com/c2/854fdf48-456c-4021-8ffb-2d9c969e50d4/PatternSearchSelect.js',
    }
};

export default config;