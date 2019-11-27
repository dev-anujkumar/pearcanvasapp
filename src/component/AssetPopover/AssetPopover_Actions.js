import store from '../../appstore/store.js';
import {
  APO_SEARCH_SAVE,
  TOGGLE_APO_SEARCH,
  REMOVE_ASSET_LINK,
  SELECTED_FIGURE,
  IMAGES_FROM_API
} from '../../constants/Action_Constants';
import config from '../../config/config.js'
const { STRUCTURE_APIKEY, GET_ASSETPOPOVER_ID, APO_API_KEY, GET_FIGURES,COREAPI_ENDPOINT } = config;
import axios from 'axios';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader , HideLoader} from '../../constants/IFrameMessageTypes.js';

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

export const getCurrentlyLinkedImage = (id, cb) => {

  let url = config.COREAPI_ENDPOINT+"/entity/" + id + "/versions";
  let currentlyLinkedData = {};

  sendDataToIframe({'type': ShowLoader,'message': { status: true }});

  return axios.get(url, {
    headers: {
      ApiKey: config.STRUCTURE_APIKEY,
      PearsonSSOSession: config.ssoToken
    }
  }).then((res) => {
    if (res.data.length) {

      let workId = res.data[res.data.length - 1].versionUrn;

      let workUrl = config.GET_FIGURES+"narrative-api/v2/" + workId + "/content"
      axios.get(workUrl, {
        headers: {
          ApiKey: config.STRUCTURE_APIKEY,
          PearsonSSOSession: config.ssoToken
        }
      }).then((res1) => {
        sendDataToIframe({'type': HideLoader,'message': { status: false }});
        currentlyLinkedData.id=res1.data.id;
        currentlyLinkedData.title=res1.data.title.text;
        cb(currentlyLinkedData)
      }).catch((err) => {
        sendDataToIframe({'type': HideLoader,'message': { status: false }});
        cb(currentlyLinkedData);
        console.log("err from narrative api", err)
      })

    }
    else{
      sendDataToIframe({'type': HideLoader,'message': { status: false }});
      cb(currentlyLinkedData);
    }

  }).catch((err) => {
    sendDataToIframe({'type': HideLoader,'message': { status: false }});
    cb(currentlyLinkedData);
    console.log("err from vesion api", err)
  })

  // return cb(mockData.images.filter((value, key) => {
  //   return value.entityUrn == id
  // }))
}

/**
 * Get images from manifest Api
 */
export const searchForFiguresAction = (searchTerm, stateImageData) => {

  if (stateImageData && stateImageData.length > 0) { // hit api and store data in imageData
    //We have image data now dispatch an action for render filter data 
    return store.dispatch({
      type: 'USE_STATE_IMAGE_DATA',
      payload: {
        searchTerm: searchTerm
      }
    })
  } else {
    let versionUrn, time1;
    time1 = performance.now();
    versionUrn = config.projectUrn;

    return dispatch => fetch(config.GET_FIGURES + 'manifest-api/v2/' + versionUrn + '/images', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'cache-control': 'no-cache',
        'apikey': config.STRUCTURE_APIKEY,
        'pearsonssosession': config.ssoToken
      }
    }).then(res => res.json()).then(
      data => dispatch({
        type: IMAGES_FROM_API,
        payload: {
          images: data.images,
          searchTerm: searchTerm,
          timeByAPI: performance.now() - time1
        }
      }),
      err => dispatch({
        type: IMAGES_FROM_API_FAIL,
        payload: err
      })
    ).catch(error => console.log('Error while getting data from Asset popover API', error))
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
    let response = await fetch(config.GET_ASSETPOPOVER_ID + 'narrative-api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PearsonSSOSession': config.ssoToken,
        'apikey': config.APO_API_KEY,
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
