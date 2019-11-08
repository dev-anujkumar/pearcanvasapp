import store from '../../appstore/store.js';
import {
  APO_SEARCH_SAVE,
  TOGGLE_APO_SEARCH,
  REMOVE_ASSET_LINK,
  SELECTED_FIGURE,
  IMAGES_FROM_API,
} from '../../constants/Action_Constants';
import config from '../../config/config.js'
const { STRUCTURE_APIKEY, ssoToken, GET_ASSETPOPOVER_ID, APO_API_KEY, GET_FIGURES } = config;

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
  return cb(mockData.images.filter((value, key) => {
    return value.entityUrn == id
  }))
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

    return dispatch => fetch(GET_FIGURES + 'manifest-api/v2/' + versionUrn + '/images', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'cache-control': 'no-cache',
        'apikey': STRUCTURE_APIKEY,
        'pearsonssosession': ssoToken
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
    let response = await fetch(GET_ASSETPOPOVER_ID + 'narrative/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PearsonSSOSession': ssoToken,
        'apikey': APO_API_KEY,
      }
    })

    let data = await response.json()
    return data.id
  } catch (err) {
    console.log('Error in Create assetpopover id Api', err)
  }
}