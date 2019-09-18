let config = {
    REACT_APP_API_URL : "https://10.11.3.7:8443/cypress-api/",
    STRUCTURE_API_URL :"https://staging.api.pearson.com/",
    JAVA_API_URL: "https://10.11.3.7:8443/app/toc-javaapp/",
    NARRATIVE_API_URL: "https://10.11.3.7:8443/app/toc-javaapp/v1/",
    STRUCTURE_APIKEY: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
    ssoToken: "1QOFe0ICe7g2l4jr8fIvU7Wr3zM.*AAJTSQACMDIAAlNLABxZaTNwQnU0aCt5WVFGdVJDbDlhTzRXZ2RLREE9AAJTMQACMDk.*",
    userId: 'c5test01',
    assignee:'c5test01',
    slateURN : "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateList: [
        'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e',
        'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c'
    ],
    projectUrn: "urn:pearson:distributable:e80d2cea-a0d2-474f-8896-82caa92a66d3",
    project_ENTITY_URN:"urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    WRAPPER_URL : 'https://localhost:4000', // TO BE CONFIGURED WITH TASKDEF
    //parentUrl: window.location.origin
    LOCK_API_BASE_URL : 'http://localhost:3000'
};

export default config;