import moment from 'moment';
import store from '../../appstore/store.js';
import {
  APO_SEARCH_SAVE,
  TOGGLE_APO_SEARCH,
  REMOVE_ASSET_LINK,
  SELECTED_FIGURE,
  IMAGES_FROM_API,
  IMAGES_FROM_API_FAIL
} from '../../constants/Action_Constants';
import config from '../../config/config.js'
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader , HideLoader} from '../../constants/IFrameMessageTypes.js';
import { slateLinkDetails } from '../TcmSnapshots/TcmSnapshot_Actions.js';
import { CONTENT_TYPE } from '../../constants/Element_Constants.js';
let currentlySearching = false;
let searchterm = "";

//Action for render currently linked figure data
export const apoSearchCloseAction = () => {
  return {
    type: TOGGLE_APO_SEARCH,
    payload: {
      apoObject: {},
      toggleApo: false,
    }
  }
}

export const removeAssetLinkAction = () => {
  return {
    type: REMOVE_ASSET_LINK,
    payload: {
      removeAssetLink: true
    }
  }
}

//Action for selected figure
export const selectedFigureAction = (selectedFigure) => {
  return {
    type: SELECTED_FIGURE,
    payload: {
      selectedFigure: selectedFigure
    }
  }
}

//Action to save the links to a figure
export const apoSearchSaveAction = (apoObject, args) => {
  return {
    type: APO_SEARCH_SAVE,
    payload: {
      apoObject: apoObject,
      imageData: args
    }
  }
}
export const assetIdForSnapshot = (assetID) => {
  return {
    type: 'ASSET_ID_SNAPSHOT',
    payload: {
      assetID: assetID
    }
  }
}
/**
 * Get images from manifest Api
 */
export const searchForFiguresAction = (searchTerm, stateImageData) => {

  searchterm = searchTerm;
  if (stateImageData && stateImageData.length > 0) { // hit api and store data in imageData
    //We have image data now dispatch an action for render filter data
    return store.dispatch({
      type: 'USE_STATE_IMAGE_DATA',
      payload: {
        searchTerm: searchterm
      }
    })
  } else if (!currentlySearching) {
    let versionUrn, time1;
    time1 = performance.now();
    versionUrn = config.projectUrn;

    currentlySearching = true;
    return dispatch => fetch(config.REACT_APP_API_URL + 'v1/slate/' + versionUrn + '/assets', {
      method: 'GET',
      headers: {
        myCloudProxySession: config.myCloudProxySession
      }
    }).then(res => res.json()).then(
      (data) => {
        currentlySearching = false;
        dispatch({
          type: IMAGES_FROM_API,
          payload: {
            figures: [...(data.images ?? [])],
            audios: [...(data.audios ?? [])],
            videos: [...(data.videos ?? [])],
            interactives: [...(data.interactives ?? [])],
            smartLinkInteractives: [...(data.smartLinkInteractives ?? [])],
            asides: [...(data.elementAsides ?? [])],
            tables: [...(data.tables ?? [])],
            workedExamples: [...(data.workedExamples ?? [])],
            searchTerm: searchterm,
            timeByAPI: performance.now() - time1
          }
        })
      },
      (err) => {
        currentlySearching = false;
        dispatch({
          type: IMAGES_FROM_API_FAIL,
          payload: err
        })
      }
    ).catch(error => console.log('Error while getting data from Asset popover API', error))
  } else {
    return store.dispatch({
      type: 'ASSET_SEARCH_IN_PROGRESS',
    })
  }
}

export const assetPopoverPopup = (args) => {
  return {
    type: TOGGLE_APO_SEARCH,
    payload: {
      apoObject: {},
      toggleApo: args,
      showApoCurrentlyLinked: false
    }
  }
}

/**
 * create asset pop over ID api
 */
export async function getAssetPopoverId(workUrn) {
  try {
    sendDataToIframe({'type': ShowLoader,'message': { status: true }});
    let response = await fetch(config.NARRATIVE_API_ENDPOINT + 'v2', {
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE,
        'apikey': config.APO_API_KEY,
        myCloudProxySession: config.myCloudProxySession
      }
    })

    let data = await response.json()
    sendDataToIframe({'type': HideLoader,'message': { status: false }});
    return data.id
  } catch (err) {
    sendDataToIframe({'type': HideLoader,'message': { status: false }});
    console.log('Error in Create assetpopover id Api', err)
  }
}

export const getCurrentlyLinkedImage = async (id, cb) => {

  let url = config.NARRATIVE_READONLY_ENDPOINT + "entity/" + id + "/versions";
  let currentlyLinkedData = {};

  try {
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': CONTENT_TYPE,
        'apikey': config.APO_API_KEY,
        myCloudProxySession: config.myCloudProxySession
      }

    })
    let data = await response?.json()
    if (data.length && response?.status == 200) {
      let latestIndex = 0;
      for (let index = 1; index < data.length; index++) {
        let isAfter = moment(data[index].createdDate).isAfter(data[latestIndex].createdDate);
        if (isAfter) {
          latestIndex = index;
        }
      }
      let workId = data[latestIndex].versionUrn;

      currentlyLinkedData = await getElementVersionContent(workId)
      cb(currentlyLinkedData)

    } else {
      try {
        currentlyLinkedData = await getElementVersionContent(id)
        cb(currentlyLinkedData)
      } catch (err1) {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        cb(currentlyLinkedData);
        console.error("err from narrative api 1", err1)
      }
    }
  } catch (err) {
    try {
      currentlyLinkedData = await getElementVersionContent(id)
      cb(currentlyLinkedData)
    } catch (err1) {
      sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
      cb(currentlyLinkedData);
      console.error("err from narrative api 2", err1)
    }
  }
}

export const getElementVersionContent = async (elementId) =>{

  let currentlyLinkedData = {};
  if(elementId?.match(/work/g)){
    try {
      let workUrl = config.NARRATIVE_READONLY_ENDPOINT+"v2/" + elementId + "/content"
      sendDataToIframe({'type': ShowLoader,'message': { status: true }});
      let response = await fetch(workUrl, {
        method: 'GET',
        headers: {
          'Content-Type': CONTENT_TYPE,
          'apikey': config.APO_API_KEY,
          myCloudProxySession: config.myCloudProxySession
        }
      })
      let data = await response.json()
          sendDataToIframe({'type': HideLoader,'message': { status: false }});
          currentlyLinkedData["id"] = data?.id ? data.id : "";
          currentlyLinkedData["title"] = data?.title?.text ? data.title.text : "";
          currentlyLinkedData["caption"] = data?.captions?.text ? data.captions.text : "";
          return currentlyLinkedData
    } catch (err) {
      sendDataToIframe({'type': HideLoader,'message': { status: false }});
      console.log("err from narrative api 3", err)
      return currentlyLinkedData
    }
  }else{
    try {
      sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
      const apiRespponse = await slateLinkDetails(elementId)
      sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
      if (apiRespponse) {
        currentlyLinkedData.id = apiRespponse?.containerUrn;
        currentlyLinkedData.title = apiRespponse?.unformattedTitle?.en;
      }
      return currentlyLinkedData
    } catch (err) {
      sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
      console.log("err from narrative api 4", err)
      return currentlyLinkedData
    }
  }
}
