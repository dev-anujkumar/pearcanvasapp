let config = {
    REACT_APP_API_URL : "https://10.11.3.7:8443/cypress-api/",
    STRUCTURE_API_URL :"https://staging.api.pearson.com/",
    JAVA_API_URL: "https://10.11.3.7:8443/app/toc-javaapp/",
    NARRATIVE_API_URL: "https://10.11.3.7:8443/app/toc-javaapp/v1/",
    ssoToken: "8XMijWh0-GeeBzuuGQrmBvu0SDg.*AAJTSQACMDIAAlNLABxxSThJU2hMSStLWUdFZHZBN003Qkkra0djN0k9AAJTMQACMDk.*",
    userId: 'c5test01',
    slateURN : "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateList: [
        'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e',
        'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c'
    ],
    WRAPPER_URL : 'https://localhost:4000' // TO BE CONFIGURED WITH TASKDEF
    //parentUrl: window.location.origin
};

export default config;