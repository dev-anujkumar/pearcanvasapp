/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Developer - Abhay Singh
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA,
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
    authoringData : {}
    
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
        case AUTHORING_ELEMENT_CREATED:
            return {
                ...state,
                authoringData: action.payload.authoringData
            };
        default:
            return state;
    }
}