const INITIAL_STATE = {}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function reducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch(action.type){
        case 'GET_CITE_TDX_RESOURCES' :
            return {
               ...state,
               citeTdxData : action.payload.data,
               assessmenterrFlag : action.payload.errFlag
            }
        default:
            return state
    }
}