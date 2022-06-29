import * as actions from '../../../src/component/CanvasWrapper/subscription_Actions';
import { 
    OWNERS_SUBSCRIBED_SLATE,
} from '../../../src/constants/Action_Constants';

describe('Test Subscription Action', () => {
    it('Test: isOwnersSubscribedSlate function', () => {
    const expectedActions = {
        type: OWNERS_SUBSCRIBED_SLATE,
        payload: true
    };
    const showPopup = true
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(actions,'isOwnersSubscribedSlate')
    actions.isOwnersSubscribedSlate(showPopup)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})
})