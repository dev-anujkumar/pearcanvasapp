const INITIAL_STATE = {}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

const elementStatusReducer = (state = INITIAL_STATE, action = INITIAL_ACTION) => {
    
    if (action.type === 'SET_ELEMENT_STATUS') {
        if (action.payload.clearEntries) {
            return {}
        }

        return {
            ...state,
            [action.payload.elementWorkId]: action.payload.elementVersioningStatus
        }
    } else {
        return state
    }
}

export default elementStatusReducer