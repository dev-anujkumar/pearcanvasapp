import autoNumberReducer from "../../src/appstore/autoNumberReducer";
import {
    SLATE_FIGURE_ELEMENTS,
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
    UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
    UPDATE_POPUP_PARENT_SLATE
} from '../../src/constants/Action_Constants';

const initialState = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imagesList: [],
        tablesList: [],
        equationsList: [],
        audiosList:[],
        videosList:[],
        interactiveList: [],
        asidesList:[],
        workedExamplesList:[]
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationsIndex: {},
        audioIndex: {},
        videoIndex: {},
        interactiveIndex: {},
        workedExampleIndex:{},
        asideIndex:{}
    },
    slateFigureList:[],
    autoNumberOption: '',
    popupParentSlateData: {}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

describe('testing for autoNumberReducer file --->', () => {
   
    it('should return the innitial stage',() => {
        expect(autoNumberReducer(undefined, {})).toEqual(initialState);
    });

    it('case 1- GET_ALL_AUTO_NUMBER_ELEMENTS', () => {
        let output = {
            ...initialState,
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList: {id: 1},
                videosList:[],
                interactiveList: [],
                asidesList:[],
                workedExamplesList:[]
            }
        };
        let mockData = {
            numberedElements : { 
                audiosList: {id: 1}
            }
        }
        let result = autoNumberReducer(initialState, {
            type: GET_ALL_AUTO_NUMBER_ELEMENTS,
            payload: mockData
        })
        expect(result).toEqual(output);
    });

    it('case 2- SET_AUTO_NUMBER_TOGGLE', () => {
        let output = {
            ...initialState,
            isAutoNumberingEnabled: true
        };
        let mockData = {
            isAutoNumberingEnabled : true
        }
        expect(autoNumberReducer(initialState, {
            type: SET_AUTO_NUMBER_TOGGLE,
            payload: mockData
        })).toEqual(output)
    });

    it('case 3- GET_TOC_AUTO_NUMBERING_LIST', () => {
        let output = {
            ...initialState,
            autoNumberingDetails: {id: 2}
        };
        let mockData = {
            autoNumberingDetails : { id: 2}
        }
        let result = autoNumberReducer(initialState, {
            type: GET_TOC_AUTO_NUMBERING_LIST,
            payload: mockData.autoNumberingDetails
        })
        expect(result).toEqual(output)
    });

    it('case 4- SET_AUTO_NUMBER_SEQUENCE', () => {
        let output = {
            ...initialState,
            autoNumberElementsIndex: { 
                figureImageIndex: {},
                tableIndex: {},
                equationsIndex: {},
                audioIndex: {id:2},
                videoIndex: {},
                interactiveIndex: {},
                workedExampleIndex:{},
                asideIndex:{}
            }
        };
        let mockData = {
            autoNumberElementsIndex : { 
                audioIndex: {id:2},
            }
        }
        expect(autoNumberReducer(initialState, {
            type: SET_AUTO_NUMBER_SEQUENCE,
            payload: mockData
        })).toEqual(output)
    });
    
    it('case 5- UPDATE_AUTO_NUMBER_ELEMENTS_LIST', () => {
        let output = {
            ...initialState,
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList:[],
                videosList:[5],
                interactiveList: [],
                asidesList:[],
                workedExamplesList:[]
            }, 
        };

        const data = {mediaType: 'videosList', mediaList: [5]}

        expect(autoNumberReducer(initialState, {
            type: UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
            payload : data
        })).toEqual(output)
    });

    it('case 7- UPDATE_AUTONUMBERING_DROPDOWN_VALUE', () => {
        let output = {
            ...initialState,
            autoNumberOption: 'resume-numbering'
        };

        const mockData = {
            autoNumberOption: 'resume-numbering'
        }

        let result = autoNumberReducer(initialState, {
            type: UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
            payload: mockData.autoNumberOption
        })
        expect(result).toEqual(output)
    });

    it('case 8- SLATE_FIGURE_ELEMENTS', () => {
        let output = {
            ...initialState,
            slateFigureList: [100]
        };

        const mockData = {
            slateFigures: [100]
        }

        let result = autoNumberReducer(initialState, {
            type: SLATE_FIGURE_ELEMENTS,
            payload: mockData
        })
        expect(result).toEqual(output)
    });

    it('case 9- UPDATE_POPUP_PARENT_SLATE', () => {
        let output = {
            ...initialState,
            popupParentSlateData: {
                id: 12
            }
        };

        const mockData = {
            popupParentSlateData: {
                id: 12
            }
        }

        let result = autoNumberReducer(initialState, {
            type: UPDATE_POPUP_PARENT_SLATE,
            payload: mockData.popupParentSlateData
        })
        expect(result).toEqual(output)
    });


})