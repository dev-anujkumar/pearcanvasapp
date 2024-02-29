var axios = require('axios')
let IF_MATCH = "";
import store from '../appstore/store';
import config_object from '../config/config';
import { triggerCustomEventsGTM } from '../js/ga';
import {sendDataToIframe} from '../constants/utility';

export function publishTitleDelay(project, section, cite, callBack, isPreview, type) {
  try {
    const startTime = performance.now();
    var content_url = config_object.PROJECT_PREVIEW_ENDPOINT;
    let PREVIEW_ARN = (type === 'projectPreview') ? config_object.PROJECT_PREVIEW_ARN : config_object.BROKER_PREVIEW_ARN
    let content_data = {};
    content_data["projectManifest"] = project;
    content_data["sectionManifest"] = section;
    content_data["entityurn"] = config_object.projectEntityUrn;
    content_data["citeManifest"] = cite;
    content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
    content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
    if (isPreview == true) {
      content_data["preview"] = true;
    }
    // GTM event object
    let content_data_GTM = {};
    content_data_GTM["projectManifest"] = project;
    content_data_GTM["sectionManifest"] = section;
    if (isPreview) {
      content_data_GTM["preview"] = true;
    }

    axios.post(content_url, JSON.stringify(content_data), {
      headers: {
        'Content-Type': 'application/json',
        myCloudProxySession: config_object.myCloudProxySession,
        'aws-resource': config_object.AWS_RESOURCE,
        arn: PREVIEW_ARN,
        accept: 'application/json, text/plain, */*',
      },
    }).then((response) => {
        IF_MATCH = response.headers.etag
        let parsedResponse = response.data

        if (parsedResponse.data && parsedResponse.data.previewURL) {
          let previewURL = parsedResponse.data.previewURL
          const elapsedTime = performance.now() - startTime
          triggerCustomEventsGTM('preview-type', {
            elapsedTime,
            ...content_data_GTM
          });
          sendDataToIframe({ 'type': 'projectPreviewLunched', 'message': { status: true } }) // sending message to trigger enable project preview icon
          window.open(previewURL, '_blank');
          if (callBack) { callBack(); }
        } else {
          sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true, dialogText: "Title Preview failed to load." } });
          return false
        }
      }).catch((error) => {
        console.log("Error in publishTitleDelay function", error);
      })
  } catch (error) {
    console.log("Error in publishTitleDelay function", error)
  }
}

export const publishSlate = (project, section, cite) => {
  const startTime = performance.now()
  const content_url = config_object.SLATE_PREVIEW_ENDPOINT
  const proactiveSlatePreview = config_object?.PROACTIVE_SLATE_PREVIEW_STATUS || 'false'
  const content_data = {
    projectManifest: project,
    sectionManifest: section,
    citeManifest: cite,
    requester: config_object.userEmail,//"requester": "james.cooney@pearson.com",
    timestamp: new Date().toISOString(),//"timestamp": "2017-04-23T18:25:43.511Z"
    proactiveSlatePreview: proactiveSlatePreview,
  }
  // GTM event object
  const content_data_GTM = {
    projectManifest: project,
    sectionManifest: section,
    proactiveSlatePreview: proactiveSlatePreview,
  }
  let xApiKey = ''
  if (config_object.SLATE_PREVIEW_ARN !== undefined) {
    xApiKey = config_object.SLATE_PREVIEW_ARN
  } else {
    xApiKey = config_object.CTOOL_APIKEY
  }
  document.cookie = `CTOOL_APIKEY=${xApiKey}; domain=.pearson.com; path=/; secure=true`

  axios.post(content_url, JSON.stringify(content_data), {
    headers: {
      'Content-Type': 'application/json',
      myCloudProxySession: config_object.myCloudProxySession,
      'aws-resource': config_object.AWS_RESOURCE,
      arn: config_object.SLATE_PREVIEW_ARN,
      accept: 'application/json, text/plain, */*',
    },
  }).then((response) => {
      const parsedResponse = response.data
      console.log('parsedResponse in c4_module', parsedResponse)
      if (parsedResponse.data && parsedResponse.data.previewURL) {
        window.addEventListener('beforeunload', (e) => {
          if (store.getState().toolbar.editor_dirtyDoc) {
            e.returnValue = "You have unsaved changes. Please wait until the changes are being saved."
          }
        })
        const previewURL = parsedResponse.data.previewURL

        const elapsedTime = performance.now() - startTime
        triggerCustomEventsGTM('preview-type', {
          elapsedTime,
          ...content_data_GTM,
        })
        setTimeout(() => {
          sendDataToIframe({ 'type': 'slatePreviewLunched', 'message': { status: true } }) // sending message to trigger enable slate preview icon
          window.open(previewURL, '_blank')
        }, 1100)
      } else {
        sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true, dialogText: "Slate Preview failed to load" } })
      }
    })
    .catch((error) => {
      console.error('Error while making the POST request:', error)
      sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true, dialogText: "Slate Preview failed to load" } })
    })
}

export const publishTitle = (project, section, cite, callBack, isPreview, type) => {
  setTimeout(() => {
    publishTitleDelay(project, section, cite, callBack, isPreview, type)
  }, 150)
}
