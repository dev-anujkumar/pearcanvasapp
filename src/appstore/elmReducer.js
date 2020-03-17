const INITIAL_STATE = {}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function elmReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    if (action.type === 'GET_ELM_RESOURCES') {
        return {
            ...state,
            elmData: action.payload.data,
            errFlag: action.payload.errFlag,
            apiStatus: action.payload.apiStatus
        }
    } else {
        return state
    }
}