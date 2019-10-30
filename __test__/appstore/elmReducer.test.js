import reducer from '../../src/appstore/elmReducer';

const INITIAL_STATE = {};

const mockELMData = {

}

describe('testing elm reducer cases --', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
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

});