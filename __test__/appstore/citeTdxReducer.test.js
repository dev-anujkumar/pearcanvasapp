import citeTdxReducer from "../../src/appstore/citeTdxReducer"

const INIT_STATE = {
    citeData: [],
    tdxData: [],
    mmiData: [],
    assessmenterrFlag: false,
    isLoading: true,
    currentAssessmentSelected:{},
    singleAssessmentData:[],
    currentSingleAssessmentSelected:{},
    sortOrder:'',
    sortBy:'',
    searchUuidVal:"",
    searchTitleVal:"",
    singleAssessmentTitle:{}
}

const currentSlateLOData = { currentSlateLOData: "",
slateTagEnable: false,
showModule:false,
currentSlateLODataMath:"",
showSlateLockPopup: false,
isRenderMetdataLO:false
}
const INIT_STATE2 = {
    citeData: [],
    tdxData: [],
    mmiData: [],
    assessmenterrFlag: true,
    isLoading: true,
    currentAssessmentSelected:{},
    singleAssessmentData: {
            isLoading: false,
            errFlag: true
    },
    currentSingleAssessmentSelected:{},
    sortOrder:'',
    sortBy:'',
    searchUuidVal:"",
    searchTitleVal:""
}


const INITIAL_ACTION = {
    type: '',
    payload: {}
}

describe('testing meta data Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(citeTdxReducer(undefined, INITIAL_ACTION)).toEqual(INIT_STATE);
    });
    it('SET_LOADING_TRUE', () => {
        let state1 = INIT_STATE;
        state1.isLoading = false;
        expect(citeTdxReducer(INIT_STATE, {
            type: 'SET_LOADING_TRUE',
            payload: {isLoading: false}
            
        })).toEqual(state1);
    })
    it('CURRENT_SELECTED_ASSESSMENT', () => {
        let state1 = INIT_STATE;
        state1.currentAssessmentSelected = true;
        expect(citeTdxReducer(INIT_STATE, {
            type: 'CURRENT_SELECTED_ASSESSMENT',
            payload: true
            
        })).toEqual(state1);
    })
    it('CURRENT_SELECTED_SINGLE_ASSESSMENT', () => {
        let state1 = INIT_STATE;
        state1.currentSingleAssessmentSelected = true;
        expect(citeTdxReducer(INIT_STATE, {
            type: 'CURRENT_SELECTED_SINGLE_ASSESSMENT',
            payload: true
            
        })).toEqual(state1);
    })
    it('GET_CITE_RESOURCES', () => {
        let output = {
            ...INIT_STATE,
            citeData: true,
            assessmenterrFlag: true,
            isLoading: true
        }
        expect(citeTdxReducer(INIT_STATE, {
            type: 'GET_CITE_RESOURCES',
            payload: {
                data: true,
                errFlag: true,
                isLoading: true
            }
        })).toEqual(output)
    });
    it('GET_TDX_RESOURCES', () => {
        let output = {
            ...INIT_STATE,
            tdxData: true,
            assessmenterrFlag: true,
            isLoading: true
        }
        expect(citeTdxReducer(INIT_STATE, {
            type: 'GET_TDX_RESOURCES',
            payload: {
                data: true,
                errFlag: true,
                isLoading: true
            }
        })).toEqual(output)
    });
    it('GET_MMI_RESOURCES', () => {
        let output = {
            ...INIT_STATE,
            mmiData: true,
            assessmenterrFlag: true,
            isLoading: true
        }
        expect(citeTdxReducer(INIT_STATE, {
            type: 'GET_MMI_RESOURCES',
            payload: {
                data: true,
                errFlag: true,
                isLoading: true
            }
        })).toEqual(output)
    });
    it('ASSESSMENT_SORTING', () => {
        let output = {
            ...INIT_STATE,
            sortBy: true,
            sortOrder: true
        }
        expect(citeTdxReducer(INIT_STATE, {
            type: 'ASSESSMENT_SORTING',
            payload: {
                sortBy: true,
                sortOrder: true
            }
        })).toEqual(output)
    });
    it('SET_SEARCH_PARAMS', () => {
        let output = {
            ...INIT_STATE,
            searchUuidVal: true,
            searchTitleVal: true
        }
        expect(citeTdxReducer(INIT_STATE, {
            type: 'SET_SEARCH_PARAMS',
            payload: {
                searchUUID: true,
                searchTitle: true
            }
        })).toEqual(output)
    });
        it('GET_SINGLE_ASSESSMENT_DATA', () => {
            let state1 = INIT_STATE2;
            state1.isLoading = false;
            expect(citeTdxReducer(INIT_STATE2, {
                type: 'GET_SINGLE_ASSESSMENT_DATA',
                payload: {
                    isLoading: false,
                    errFlag: true
                } 
            })).toEqual(state1);
        });
        it('GET_SINGLE_ASSESSMENT_TITLE', () => {
            expect(citeTdxReducer(INIT_STATE, {
                type: 'GET_SINGLE_ASSESSMENT_TITLE',
            })).toBeDefined
        });
});