import {
    TOGGLE_BORDERS, TOGGLE_PAGE_NUMBER, TOGGLE_SPELL_CHECK, SET_GRAMMARLY_FLAG
} from '../../constants/Action_Constants';

/**
 * Action for border toggle hide/show
 */
export const toggleElemBordersAction = () => {
    return {
        type: TOGGLE_BORDERS
    }
}
export const togglePageNumberAction = () => {
    return {
        type: TOGGLE_PAGE_NUMBER
    }
}
export const toggleSpellCheckAction = () => {
    return {
        type : TOGGLE_SPELL_CHECK
    }
}

/**
 * Action for Grammarly toggle on/off
 */

export const setGrammarlyFlag = (flag) => (dispatch, getState) => {
    return dispatch({
        type: SET_GRAMMARLY_FLAG,
        payload: flag
    })
}