
const initialState =  {
    selectedElement: 'cypress-keyboard-1',
    cursorPosition : 0,
    elementList : []
}
const SELECT_ELEMENT = 'SELECT_ELEMENT';
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