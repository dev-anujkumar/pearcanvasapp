import reducer from '../../src/appstore/elmReducer';

const INITIAL_STATE = {
    isLoading:true,
    elmLoading:true,
    openSearch:false,
    searchTerm:''
}

const mockELMData = {

}
const mockElmItemData = {

}

describe('testing elm reducer cases --', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('get elm resources from api', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: {},
                errFlag: false,
                apiStatus: "200",
                // elmLoading:false
            }
        })).toEqual({
            elmData: {},
            errFlag: false,
            apiStatus: "200",
            elmLoading:true,
            openSearch:false,
            searchTerm:'',
            isLoading: true,
        })
    })
    it('get elm items from api', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'GET_ELM_ITEMS',
            payload: {
                data: {},
                errFlag: false,
                apiStatus: 200,
                isLoading:false,
                openSearch:false
            }
        })).toEqual({
            elmItemData:{},
            itemErrorFlag:false,
            itemApiStatus:200,
            isLoading:false,
            openSearch:false,
            searchTerm:'',
            elmLoading:true
        })
    })
    it('set SET_LOADING_TRUE true', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'SET_LOADING_TRUE',
            payload: {
                isLoading:true
            }
        })).toEqual({
            isLoading: true,
            elmLoading: true,
            openSearch: false,
            searchTerm:''
        })
    })
    it('set SET_ELM_LOADING_TRUE true', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'SET_ELM_LOADING_TRUE',
            payload: {
                elmLoading:true
            }
        })).toEqual({
            isLoading: true,
            elmLoading: true,
            openSearch: false,
            searchTerm:''
        })
    })
    it('set SET_SEARCH_FLAG true', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'SET_SEARCH_FLAG',
            payload: {
                openSearch:true
            }
        })).toEqual({
            elmLoading: true,
            isLoading: true,
            openSearch: true,
            searchTerm:''
        })
    })
    it('set SET_SEARCH_TERM true', () => {
        expect(reducer(INITIAL_STATE, {
            type: 'SET_SEARCH_TERM',
            payload: {
                searchTerm: 'test'
            }
        })).toEqual({
            elmLoading: true,
            isLoading: true,
            openSearch: false,
            searchTerm: 'test'
        })
    })
});