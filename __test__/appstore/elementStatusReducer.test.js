import reducer from '../../src/appstore/elementStatusReducer'
import {
    SET_ELEMENT_STATUS
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}
describe('Test elemetStatusReducer', () => {
    it('SET_ELEMENT_STATUS', () => {
        reducer(INITIAL_STATE,{
            type:SET_ELEMENT_STATUS,
            payload: {
                elementWorkId: false

            }
        })
    })
    it(' IF Case for SET_ELEMENT_STATUS', () => {
        reducer(INITIAL_STATE,{
            type:SET_ELEMENT_STATUS,
            payload: {
                clearEntries: true

            }
        })
    })
    it(' else Case for SET_ELEMENT_STATUS', () => {
        reducer(INITIAL_STATE,{
            type:"test",
            payload: {
                clearEntries: true

            }
        })
    })
});