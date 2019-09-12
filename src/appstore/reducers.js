/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Developer - Abhay Singh
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    SET_ELEMENT_TAG,
    AUTHORING_ELEMENT_CREATED
} from '../constants/Action_Constants';
import config from './../config/config';
import mockdata from './mockdata'; 

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */

const initialState = {
    slateLevelData: {},
    elementsTag: {},
    activeElement: {}
};

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SLATE_DATA:
            return {
                ...state,
                slateLevelData: action.payload
            };
        case SET_ELEMENT_TAG:
            return {
                ...state,
                elementsTag: action.payload
            }
        case SET_ACTIVE_ELEMENT:
            return {
                ...state,
                activeElement: action.payload
            }
        case AUTHORING_ELEMENT_CREATED:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        default:
            return state;
    }
}