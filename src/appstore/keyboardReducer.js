import {SELECT_ELEMENT} from "../constants/Action_Constants";
const initialState =  {
    selectedElement: 'cypress-keyboard-1',
    cursorPosition : 0,
    elementList : []
}
export const selectElement = (elementId) => ({
    type: SELECT_ELEMENT,
    payload: elementId
})
export const keyboardReducer = (state = initialState, action) => {
    if(action.type === SELECT_ELEMENT) {
        return {
            ...state,
            selectedElement:  action.payload
        }
    }
    else return state;
}
