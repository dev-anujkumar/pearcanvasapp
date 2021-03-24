import {
  ADD_SCRIPT_ELEMENT,
  EDIT_SCRIPT_ELEMENT,
  DELETE_SCRIPT_ELEMENT,
} from "../../constants/Action_Constants";

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

