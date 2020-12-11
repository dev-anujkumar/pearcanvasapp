import {
    SHOW_TOAST_MESSAGE,
    SET_TOAST_MESSAGE
} from '../../constants/Action_Constants';

/** Action handlers for Toast Component */

/** This action is used to show/hide Toast component */
export const showToastMessage = (value) => {
    return {
        type: SHOW_TOAST_MESSAGE,
        payload: value
    }
}

/** This action is used to set Toast Message */
export const setToastMessage = (message) => {
    return {
        type: SET_TOAST_MESSAGE,
        payload: message
    }
}