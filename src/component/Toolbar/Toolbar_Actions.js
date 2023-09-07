import {
    TOGGLE_BORDERS, TOGGLE_PAGE_NUMBER, TOGGLE_SPELL_CHECK, TOGGLE_UNLOCK_SLATE
} from '../../constants/Action_Constants';

/**
 * Action for border toggle hide/show
 */
export const toggleElemBordersAction = (status) => (dispatch) =>{
    dispatch({
        type: TOGGLE_BORDERS,
        payload: status
    })
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

export const toggleUnlockSlateAction = (status) => (dispatch) =>{
    dispatch({
        type: TOGGLE_UNLOCK_SLATE,
        payload: status
    })
}