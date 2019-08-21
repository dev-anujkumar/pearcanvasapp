/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Developer - Abhay Singh
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */
const initialState = {
    slateLevelData: [1, 2, 3, 4, 5]
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
        default:
            return state;
    }
}