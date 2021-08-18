import { OWNERS_SUBSCRIBED_SLATE } from '../../src/constants/Action_Constants';

var isOwnerKeyExist= localStorage.getItem('hasOwnerEdit');
const INITIAL_STATE = {
    isOwnersSubscribedSlateChecked: isOwnerKeyExist ? false : true,
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function subscriptionReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case OWNERS_SUBSCRIBED_SLATE:
            return {
                ...state,
                isOwnersSubscribedSlateChecked: action.payload
            }
        default:
            return state
    }
}