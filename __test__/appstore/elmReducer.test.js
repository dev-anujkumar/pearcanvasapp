import reducer from '../../src/appstore/elmReducer';

const INITIAL_STATE = {};

const mockELMData = {

}
const mockElmItemData = {

}
describe('testing elm reducer cases --', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({...INITIAL_STATE, isLoading:true});
    });
    it('get elm resources from api', () => {
        reducer(INITIAL_STATE, {
            type: 'GET_ELM_RESOURCES',
            payload: {
                elmData: mockELMData,
                errFlag: false,
                apiStatus: 200
            }
        })
    })
    it('get elm items from api', () => {
        reducer(INITIAL_STATE, {
            type: 'GET_ELM_ITEMS',
            payload: {
                elmData: mockElmItemData,
                errFlag: false,
                apiStatus: 200,
                isLoading:true
            }
        })
    })
    it('set isLoading true', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'SET_LOADING_TRUE',
            payload: {
                isLoading:true
            }
        })).toEqual({ isLoading:true})
    })

});