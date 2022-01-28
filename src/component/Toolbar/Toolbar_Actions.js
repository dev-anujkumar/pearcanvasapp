import {
    TOGGLE_BORDERS, TOGGLE_PAGE_NUMBER, TOGGLE_SPELL_CHECK
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