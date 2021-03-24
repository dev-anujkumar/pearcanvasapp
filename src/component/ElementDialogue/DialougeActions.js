import {
  ADD_SCRIPT_ELEMENT,
  EDIT_SCRIPT_ELEMENT,
  DELETE_SCRIPT_ELEMENT,
  SET_LAST_PS_ELEMENT
} from "../../constants/Action_Constants";

import config from '../../config/config';
/**
 *
 * @param {number} psIndex : Index of ps element
 * @param {number} psElementIndex : index of sd/de inside ps
 * @param {Object} data: object to be updated: sd/de
 */
export const addScriptElement = (psIndex, psElementIndex, data) => ({
  type: ADD_SCRIPT_ELEMENT,
  payload: {
    psIndex,
    psElementIndex,
    data,
  },
});

/**
 *
 * @param {number} psIndex : Index of ps element
 * @param {number} psElementIndex : index of sd/de inside ps
 */

export const deleteScriptElement = (psIndex, psElementIndex) => ({
  type: DELETE_SCRIPT_ELEMENT,
  payload: {
    psIndex,
    psElementIndex,
  },
});

/**
 *
 * @param {number} psIndex : Index of ps element
 * @param {number} psElementIndex : index of sd/de inside ps
 * @param {Object} data: object to be updated: sd/de
 */

export const editScriptElement = (psIndex, psElementIndex, data) => ({
  type: EDIT_SCRIPT_ELEMENT,
  payload: {
    psIndex,
    psElementIndex,
    data,
  },
});


export const updatePSElementinStore = (psElementIndex, newPSData) => async (dispatch, getState) => {
  const appStore = getState().appStore
  const newPSElementData = {...newPSData}
  newPSElementData['slateVersionUrn'] = config.slateManifestURN
  const updateArgs = {
    updatedData: newPSElementData,
    asideData: appStore.asideData,
    parentUrn: appStore.parentUrn,
    dispatch,
    elementIndex: psElementIndex,
    showHideType: null,
    parentElement: null,
    newslateData: appStore.slateLevelData
    }

  const { updateElementInStore } = (await import("../ElementContainer/ElementContainerUpdate_helpers.js"))
  updateElementInStore(updateArgs)
}

export const setLastSavedPSData = (psElementData) => ({
  type: SET_LAST_PS_ELEMENT,
  payload: psElementData
})
