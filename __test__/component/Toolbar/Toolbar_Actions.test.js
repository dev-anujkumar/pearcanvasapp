import {
    TOGGLE_BORDERS
} from '../../../src/constants/Action_Constants';

function toggleElemBordersAction () {
    return {"type": "TOGGLE_BORDERS"};
}

const mock = jest.fn(toggleElemBordersAction);

it('Call the reducer function', () => {
    mock.mockReturnValue({"type": "TOGGLE_BORDERS"});
})