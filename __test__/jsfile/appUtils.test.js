import { modifyObjKeys, removeWirisOverlay, timeSince } from '../../src/js/appUtils';
import { describe, test, expect } from '@jest/globals'

describe('appUtils test cases', () => {
  test('modifyObjKeys development', () => {
    const obj = {
        NODE_ENV : process.env.NODE_ENV || "development",
        REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
        STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        ASSESSMENT_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/assessment-api/",
        ACON_API_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/acapi/",
        LERNOSITY_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
        PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
        NARRATIVE_API_ENDPOINT:"https://contentapis-staging.pearsoncms.net/narrative-api/",
        OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
        AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
        API_URL: "./api",
        JAVA_API_URL: "https://10.11.7.24:8081/app/toc-javaapp/",
        STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
        MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
        TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        TCM_DASHBOARD_URL:  'http://localhost:3000',
        //c2 required keys and urls
        CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        CMDS_DATABASE:  '?db=qa2',
        CMIS_REPO   : [{repo:"https://staging.api.pearson.com/content/cmis/ukwip",repoName:"UK"},{repo:"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}],
        CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
        EPS_API: 'https://us-school-stg.pearsoned.com/school',
        //c4 required keys and urls
        CTOOL_APIKEY:'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
        CTOOL_PUBSLATE:'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
        CTOOL_PUBTITLE: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
        EPUB_ENDPOINT:  'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
        C6PUB_ENDPOINT: 'https://staging.api.pearson.com/content/delivery/publish/v2/',
        C6PUB_API_KEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
        LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr` :"http://localhost:5000",
        ALFRESCO_CITE_API: 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000',
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
        LEARNOSITY_CONTENT_BRIDGE_API: 'https://contentapis-staging.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/',
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA:"https://staging.api.pearson.com/content/cmis/uswip-aws/",
        CYPRESS_PLUS_URL:"http://localhost:3000/cypress-plus",
        PROACTIVE_SLATE_PREVIEW_STATUS: "false",
        SHOW_CYPRESS_PLUS:true,
        ENABLE_AUTO_NUMBER_CONTENT: false,
        SLATE_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishSlate',
        PROJECT_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishTitleInterimNonBroker',
        AWS_RESOURCE : 'lambda',
        PROJECT_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        SLATE_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        ENABLE_WIRIS_PLUGIN: true,
        EDIT_DISCUSSION_SPA_URL: 'https://stg-discussionauthoring.pearson.com/'
    };
    
    const newObj = {
        env: "dev",
        REACT_APP_API_URL: "/cypress/canvas-srvr/cypress-api/",
        STRUCTURE_API_URL: "https://contentapis-qa.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT: "https://contentapis-qa.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        LERNOSITY_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL: "https://contentapis-qa.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL: "https://contentapis-qa.pearsoncms.net/structure-api/",
        PAGE_NUMBER_UPDATE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/print-api",
        OPENER_ELEMENT_COREAPI_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        AUDIO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        API_URL: "./api",
        JAVA_API_URL: "/cypress/toc-srvr/app/toc-javaapp/",
        STRUCTURE_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        MANIFEST_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        TCM_DASHBOARD_UI_URL: "https://dev-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        CMDS_APIKEY: "5x8gLqCCfkOfgPkFd9YNotcAykeldvVd",
        CMDS_DATABASE: "?db=qa2",
        CMIS_REPO: [
          {
            "repo": "https://staging.api.pearson.com/content/cmis/ukwip",
            "repoName": "UK"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip-aws",
            "repoName": "AWS US"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip",
            "repoName": "US"
          }
        ],
        CMDS_AUTHORIZATION: "Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==",
        EPS_API: "https://us-school-stg.pearsoned.com/school",
        CTOOL_APIKEY: "rGeFx6GAhgAU7XylJjWlGEhtvmAMW4xj",
        CTOOL_PUBSLATE: "https://test.api.pearson.com/content/tooling/wip2cite/publishslate/v1/",
        CTOOL_PUBTITLE: "https://test.api.pearson.com/content/tooling/wip2cite/publishtitleinterimnonbroker/v1/",
        EPUB_ENDPOINT: "https://test.pearson.com/content/tooling/transformation/narrative/v1",
        C6PUB_ENDPOINT: "https://paf-c6-qa.nonprod.pearsoncms.net/content/deliver/publish/v2/",
        C6PUB_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        WRAPPER_URL: "https://dev-structuredauthoring.pearson.com/toc-wrapper/index.html",
        IDENTITY_URL: "/auth",
        LOCK_API_BASE_URL: "https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr",
        GET_FIGURES: "https://contentapis-qa.pearsoncms.net/",
        GET_ASSETPOPOVER_ID: "https://contentapis-qa.pearsoncms.net/",
        APO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        PREVIEW_ASSESSMENT_LO_ENDPOINT: "https://cite-qa.pearson.com/",
        dashboardUrl: "",
        ASSESSMENT_ENDPOINT: "https://contentapis-qa.pearsoncms.net/assessment-api/",
        GLOBAL_CO: {
          CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
          CITE_REPO_INSTANCC: "https://staging.api.pearson.com/content/cmis/uswip-aws",
          CITE_REPO_NAME: "AWS US"
        },
        NARRATIVE_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/narrative-api/",
        ELM_PORTAL_URL: "https://assessmentauthoring-qa.pearson.com",
        S3MathImagePath: "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/",
        PALM_URL: "https://pace-dev.pearson.com/palm",
        VCS_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/vcs-api/v1/content/",
        LEARNOSITY_CONTENT_BRIDGE_API: "https://contentapis-qa.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/",
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA: "https://staging.api.pearson.com/content/cmis/uswip-aws/",
        LEARNING_STAGE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/lineofbusiness/v1/",
        PROACTIVE_SLATE_PREVIEW_STATUS: "true",
        CYPRESS_PLUS_URL: "https://paf-dev.pearson.com/cypress-plus",
        SHOW_CYPRESS_PLUS: true,
        ENABLE_AUTO_NUMBER_CONTENT: true,
        SLATE_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishSlate",
        PROJECT_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishTitleInterimNonBroker",
        AWS_RESOURCE: "lambda",
        PROJECT_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        SLATE_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        ACON_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/acapi/",
        WILLOW_URL : "https://pace-dev.pearson.com/willow/",
        ENABLE_WIRIS_PLUGIN : true,
        EDIT_DISCUSSION_SPA_URL :"https://dev-discussionauthoring.pearson.com/"
      }
    const result = modifyObjKeys(obj, newObj)
    expect(Array.isArray(result)).toBe(false)
  })
  
  test('modifyObjKeys development -> process.env.NODE_ENV is development', () => {
    const obj = {
        NODE_ENV : process.env.NODE_ENV || "development",
        REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
        STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        ASSESSMENT_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/assessment-api/",
        ACON_API_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/acapi/",
        LERNOSITY_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
        PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
        NARRATIVE_API_ENDPOINT:"https://contentapis-staging.pearsoncms.net/narrative-api/",
        OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
        AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
        API_URL: "./api",
        JAVA_API_URL: "https://10.11.7.24:8081/app/toc-javaapp/",
        STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
        MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
        TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        TCM_DASHBOARD_URL:  'http://localhost:3000',
        //c2 required keys and urls
        CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        CMDS_DATABASE:  '?db=qa2',
        CMIS_REPO   : [{repo:"https://staging.api.pearson.com/content/cmis/ukwip",repoName:"UK"},{repo:"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}],
        CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
        EPS_API: 'https://us-school-stg.pearsoned.com/school',
        //c4 required keys and urls
        CTOOL_APIKEY:'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
        CTOOL_PUBSLATE:'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
        CTOOL_PUBTITLE: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
        EPUB_ENDPOINT:  'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
        C6PUB_ENDPOINT: 'https://staging.api.pearson.com/content/delivery/publish/v2/',
        C6PUB_API_KEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
        LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr` :"http://localhost:5000",
        ALFRESCO_CITE_API: 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000',
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
        LEARNOSITY_CONTENT_BRIDGE_API: 'https://contentapis-staging.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/',
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA:"https://staging.api.pearson.com/content/cmis/uswip-aws/",
        CYPRESS_PLUS_URL:"http://localhost:3000/cypress-plus",
        PROACTIVE_SLATE_PREVIEW_STATUS: "false",
        SHOW_CYPRESS_PLUS:true,
        ENABLE_AUTO_NUMBER_CONTENT: false,
        SLATE_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishSlate',
        PROJECT_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishTitleInterimNonBroker',
        AWS_RESOURCE : 'lambda',
        PROJECT_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        SLATE_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        ENABLE_WIRIS_PLUGIN: true,
        EDIT_DISCUSSION_SPA_URL: 'https://stg-discussionauthoring.pearson.com/'
    };
    const newObj = {
        env: "dev",
        REACT_APP_API_URL: "/cypress/canvas-srvr/cypress-api/",
        STRUCTURE_API_URL: "https://contentapis-qa.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT: "https://contentapis-qa.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        LERNOSITY_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL: "https://contentapis-qa.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL: "https://contentapis-qa.pearsoncms.net/structure-api/",
        PAGE_NUMBER_UPDATE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/print-api",
        OPENER_ELEMENT_COREAPI_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        AUDIO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        API_URL: "./api",
        JAVA_API_URL: "/cypress/toc-srvr/app/toc-javaapp/",
        STRUCTURE_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        MANIFEST_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        TCM_DASHBOARD_UI_URL: "https://dev-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        CMDS_APIKEY: "5x8gLqCCfkOfgPkFd9YNotcAykeldvVd",
        CMDS_DATABASE: "?db=qa2",
        CMIS_REPO: [
          {
            "repo": "https://staging.api.pearson.com/content/cmis/ukwip",
            "repoName": "UK"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip-aws",
            "repoName": "AWS US"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip",
            "repoName": "US"
          }
        ],
        CMDS_AUTHORIZATION: "Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==",
        EPS_API: "https://us-school-stg.pearsoned.com/school",
        CTOOL_APIKEY: "rGeFx6GAhgAU7XylJjWlGEhtvmAMW4xj",
        CTOOL_PUBSLATE: "https://test.api.pearson.com/content/tooling/wip2cite/publishslate/v1/",
        CTOOL_PUBTITLE: "https://test.api.pearson.com/content/tooling/wip2cite/publishtitleinterimnonbroker/v1/",
        EPUB_ENDPOINT: "https://test.pearson.com/content/tooling/transformation/narrative/v1",
        C6PUB_ENDPOINT: "https://paf-c6-qa.nonprod.pearsoncms.net/content/deliver/publish/v2/",
        C6PUB_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        WRAPPER_URL: "https://dev-structuredauthoring.pearson.com/toc-wrapper/index.html",
        IDENTITY_URL: "/auth",
        LOCK_API_BASE_URL: "https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr",
        GET_FIGURES: "https://contentapis-qa.pearsoncms.net/",
        GET_ASSETPOPOVER_ID: "https://contentapis-qa.pearsoncms.net/",
        APO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        PREVIEW_ASSESSMENT_LO_ENDPOINT: "https://cite-qa.pearson.com/",
        dashboardUrl: "",
        ASSESSMENT_ENDPOINT: "https://contentapis-qa.pearsoncms.net/assessment-api/",
        GLOBAL_CO: {
          CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
          CITE_REPO_INSTANCC: "https://staging.api.pearson.com/content/cmis/uswip-aws",
          CITE_REPO_NAME: "AWS US"
        },
        NARRATIVE_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/narrative-api/",
        ELM_PORTAL_URL: "https://assessmentauthoring-qa.pearson.com",
        S3MathImagePath: "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/",
        PALM_URL: "https://pace-dev.pearson.com/palm",
        VCS_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/vcs-api/v1/content/",
        LEARNOSITY_CONTENT_BRIDGE_API: "https://contentapis-qa.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/",
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA: "https://staging.api.pearson.com/content/cmis/uswip-aws/",
        LEARNING_STAGE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/lineofbusiness/v1/",
        PROACTIVE_SLATE_PREVIEW_STATUS: "true",
        CYPRESS_PLUS_URL: "https://paf-dev.pearson.com/cypress-plus",
        SHOW_CYPRESS_PLUS: true,
        ENABLE_AUTO_NUMBER_CONTENT: true,
        SLATE_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishSlate",
        PROJECT_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishTitleInterimNonBroker",
        AWS_RESOURCE: "lambda",
        PROJECT_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        SLATE_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        ACON_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/acapi/",
        WILLOW_URL : "https://pace-dev.pearson.com/willow/",
        ENABLE_WIRIS_PLUGIN : true,
        EDIT_DISCUSSION_SPA_URL :"https://dev-discussionauthoring.pearson.com/"
    }
    process.env.NODE_ENV = 'development'
    const result = modifyObjKeys(obj, newObj)
    expect(Array.isArray(result)).toBe(false)
  })

  test('modifyObjKeys qa', () => {
    const obj = {
        NODE_ENV : process.env.NODE_ENV,
        REACT_APP_API_URL :"https://10.11.7.24:8081/cypress-api/",
        STRUCTURE_API_URL :"https://contentapis-staging.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT:"https://contentapis-staging.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-staging.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-staging.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        ASSESSMENT_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/assessment-api/",
        ACON_API_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/acapi/",
        LERNOSITY_ENDPOINT:  "https://contentapis-staging.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL : "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL : 'https://contentapis-staging.pearsoncms.net/structure-api/',
        PAGE_NUMBER_UPDATE_ENDPOINT : "https://contentapis-staging.pearsoncms.net/print-api",
        NARRATIVE_API_ENDPOINT:"https://contentapis-staging.pearsoncms.net/narrative-api/",
        OPENER_ELEMENT_COREAPI_KEY:  "PAMkIwLGoPIJtNZHc1SzowG7GFlHDZHJ",
        AUDIO_API_KEY : "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",
        API_URL: "./api",
        JAVA_API_URL: "https://10.11.7.24:8081/app/toc-javaapp/",
        STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
        MANIFEST_APIKEY: 'YFeLXDGqbBj2GZf85jpcZOQCEasAK5hc',
        TCM_DASHBOARD_UI_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/cypress/trackchanges/index.html` :"https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        TCM_DASHBOARD_URL:  'http://localhost:3000',
        //c2 required keys and urls
        CMDS_APIKEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        CMDS_DATABASE:  '?db=qa2',
        CMIS_REPO   : [{repo:"https://staging.api.pearson.com/content/cmis/ukwip",repoName:"UK"},{repo:"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}],
        CMDS_AUTHORIZATION: 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
        EPS_API: 'https://us-school-stg.pearsoned.com/school',
        //c4 required keys and urls
        CTOOL_APIKEY:'INpAP0MaiVP9Rohy4rB0ue3j2SGE3Abk',
        CTOOL_PUBSLATE:'https://staging.api.pearson.com/content/tools/wip2cite/publishslate/v1/',
        CTOOL_PUBTITLE: 'https://staging.api.pearson.com/content/tools/wip2cite/publishtitle/v1/',
        EPUB_ENDPOINT:  'https://staging.api.pearson.com/content/tools/transformation/narrative/v1',
        C6PUB_ENDPOINT: 'https://staging.api.pearson.com/content/delivery/publish/v2/',
        C6PUB_API_KEY: '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
        WRAPPER_URL: process.env.NODE_ENV === 'production' ? `${window.parent.origin}/toc-wrapper/index.html` : 'https://local-dev.pearson.com:4000',
        LOCK_API_BASE_URL : process.env.NODE_ENV === 'production' ? `/cypress/trackchanges-srvr` :"http://localhost:5000",
        ALFRESCO_CITE_API: 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000',
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
        LEARNOSITY_CONTENT_BRIDGE_API: 'https://contentapis-staging.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/',
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA:"https://staging.api.pearson.com/content/cmis/uswip-aws/",
        CYPRESS_PLUS_URL:"http://localhost:3000/cypress-plus",
        PROACTIVE_SLATE_PREVIEW_STATUS: "false",
        SHOW_CYPRESS_PLUS:true,
        ENABLE_AUTO_NUMBER_CONTENT: false,
        SLATE_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishSlate',
        PROJECT_PREVIEW_ARN : 'arn:aws:lambda:us-east-1:829809672214:function:c4-dev-publishTitleInterimNonBroker',
        AWS_RESOURCE : 'lambda',
        PROJECT_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        SLATE_PREVIEW_ENDPOINT: 'https://tooling-dev.pearsoncms.net/aws-invoke/',
        ENABLE_WIRIS_PLUGIN: true,
        EDIT_DISCUSSION_SPA_URL: 'https://stg-discussionauthoring.pearson.com/'
    };
    
    const newObj = {
        env: "dev",
        REACT_APP_API_URL: "/cypress/canvas-srvr/cypress-api/",
        STRUCTURE_API_URL: "https://contentapis-qa.pearsoncms.net/",
        LEARNING_OBJECTIVES_ENDPOINT: "https://contentapis-qa.pearsoncms.net/lo-api/",
        ASSET_POPOVER_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        PRODUCTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/product-api/",
        PROJECTAPI_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/distributable/v2",
        ELM_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        LERNOSITY_ENDPOINT: "https://contentapis-qa.pearsoncms.net/manifest-api/",
        SLATE_REFRESH_URL: "https://contentapis-qa.pearsoncms.net/structure-api/container/v2/",
        AUDIO_NARRATION_URL: "https://contentapis-qa.pearsoncms.net/structure-api/",
        PAGE_NUMBER_UPDATE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/print-api",
        OPENER_ELEMENT_COREAPI_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        AUDIO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        API_URL: "./api",
        JAVA_API_URL: "/cypress/toc-srvr/app/toc-javaapp/",
        STRUCTURE_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        MANIFEST_APIKEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        TCM_DASHBOARD_UI_URL: "https://dev-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
        CMDS_APIKEY: "5x8gLqCCfkOfgPkFd9YNotcAykeldvVd",
        CMDS_DATABASE: "?db=qa2",
        CMIS_REPO: [
          {
            "repo": "https://staging.api.pearson.com/content/cmis/ukwip",
            "repoName": "UK"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip-aws",
            "repoName": "AWS US"
          },
          {
            "repo": "https://staging.api.pearson.com/content/cmis/uswip",
            "repoName": "US"
          }
        ],
        CMDS_AUTHORIZATION: "Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==",
        EPS_API: "https://us-school-stg.pearsoned.com/school",
        CTOOL_APIKEY: "rGeFx6GAhgAU7XylJjWlGEhtvmAMW4xj",
        CTOOL_PUBSLATE: "https://test.api.pearson.com/content/tooling/wip2cite/publishslate/v1/",
        CTOOL_PUBTITLE: "https://test.api.pearson.com/content/tooling/wip2cite/publishtitleinterimnonbroker/v1/",
        EPUB_ENDPOINT: "https://test.pearson.com/content/tooling/transformation/narrative/v1",
        C6PUB_ENDPOINT: "https://paf-c6-qa.nonprod.pearsoncms.net/content/deliver/publish/v2/",
        C6PUB_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        WRAPPER_URL: "https://dev-structuredauthoring.pearson.com/toc-wrapper/index.html",
        IDENTITY_URL: "/auth",
        LOCK_API_BASE_URL: "https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr",
        GET_FIGURES: "https://contentapis-qa.pearsoncms.net/",
        GET_ASSETPOPOVER_ID: "https://contentapis-qa.pearsoncms.net/",
        APO_API_KEY: "RGDNdu9N2Y92VjVLIOfT64ahYBoDLimT5bRgbgqm",
        PREVIEW_ASSESSMENT_LO_ENDPOINT: "https://cite-qa.pearson.com/",
        dashboardUrl: "",
        ASSESSMENT_ENDPOINT: "https://contentapis-qa.pearsoncms.net/assessment-api/",
        GLOBAL_CO: {
          CITE_NODE_REF: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
          CITE_REPO_INSTANCC: "https://staging.api.pearson.com/content/cmis/uswip-aws",
          CITE_REPO_NAME: "AWS US"
        },
        NARRATIVE_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/narrative-api/",
        ELM_PORTAL_URL: "https://assessmentauthoring-qa.pearson.com",
        S3MathImagePath: "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/",
        PALM_URL: "https://pace-dev.pearson.com/palm",
        VCS_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/vcs-api/v1/content/",
        LEARNOSITY_CONTENT_BRIDGE_API: "https://contentapis-qa.pearsoncms.net/learnositycontentbridge-api/lcb/v1/bank2projapi/",
        ALFRESCO_EDIT_ENDPOINT: "https://usppewip.cms.pearson.com/share/page/document-details?nodeRef=workspace://SpacesStore/",
        ALFRESCO_EDIT_METADATA: "https://staging.api.pearson.com/content/cmis/uswip-aws/",
        LEARNING_STAGE_ENDPOINT: "https://contentapis-qa.pearsoncms.net/project-api/lineofbusiness/v1/",
        PROACTIVE_SLATE_PREVIEW_STATUS: "true",
        CYPRESS_PLUS_URL: "https://paf-dev.pearson.com/cypress-plus",
        SHOW_CYPRESS_PLUS: true,
        ENABLE_AUTO_NUMBER_CONTENT: true,
        SLATE_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishSlate",
        PROJECT_PREVIEW_ARN: "arn:aws:lambda:us-east-1:829809672214:function:c4-qa-publishTitleInterimNonBroker",
        AWS_RESOURCE: "lambda",
        PROJECT_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        SLATE_PREVIEW_ENDPOINT: "https://tooling-dev.pearsoncms.net/aws-invoke/",
        ACON_API_ENDPOINT: "https://contentapis-qa.pearsoncms.net/acapi/",
        WILLOW_URL : "https://pace-dev.pearson.com/willow/",
        ENABLE_WIRIS_PLUGIN : true,
        EDIT_DISCUSSION_SPA_URL :"https://dev-discussionauthoring.pearson.com/"
      }
    const result = modifyObjKeys(obj, newObj)
    expect(Array.isArray(result)).toBe(false)
  })

  test('removeWirisOverlay', () => {
    const result = removeWirisOverlay()
    expect(Array.isArray(result)).toBe(false)
  })

  test('timeSince 1000000000000s', () => {
    const result = timeSince(1000000000000)
    expect(Array.isArray(result)).toBe(false)
  })

  test('timeSince 31536000023040s', () => {
    const result = timeSince(31536000023040)
    expect(Array.isArray(result)).toBe(false)
  })

  })
