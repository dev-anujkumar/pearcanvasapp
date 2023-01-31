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
    UPDATE_POPUP_PARENT_SLATE,
    GET_SLATE_LIST_IN_CONTAINER,
    SET_POPUP_PARENT_CUT_COPY
} from '../../src/constants/Action_Constants';

const initialState = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imageList: [],
        tableList: [],
        equationList: [],
        audioList: [],
        videoList: [],
        asideList: [],
        workedExampleList: [],
        interactiveList: [],
        exhibitList: []
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationIndex: {},
        audioIndex: {},
        videoIndex: {},
        asideIndex: {},
        workedExampleIndex: {},
        interactiveIndex: {},
        exhibitIndex: {}
    },
    slateFigureList:[],
    autoNumberOption: '',
    popupParentSlateData: {},
    popupCutCopyParentData: {},
    tocContainerSlateList:[],
    autoNumber_KeyMapper: {
        'Figure': 'figureImageIndex',
        'Table': 'tableIndex',
        'Equation': 'equationIndex',
        'Audio': 'audioIndex',
        'Video': 'videoIndex',
        "Interactive": 'interactiveIndex',
        "Aside": "asideIndex",
        "Worked Example": "workedExampleIndex",
        'Exhibit': 'exhibitIndex'
    },
    autoNumber_ElementTypeKey: {
        'Figure': 'imageList',
        'Table': 'tableList',
        'Equation': 'equationList',
        'Audio': 'audioList',
        'Video': 'videoList',
        'Interactive': 'interactiveList',
        "Aside": "asideList",
        "Worked Example": "workedExampleList",
        'Exhibit': 'exhibitList'
    },
    autoNumber_response_ElementType_mapper: {
        "figure": "imageList",
        "table": "tableList",
        "equation": "equationList",
        "audio": "audioList",
        "video": "videoList",
        "interactive": "interactiveList",
        "aside": "asideList",
        "workedexample": "workedExampleList",
        'exhibit': 'exhibitList'
    },
    autoNumber_IndexMapper: {
        'imageList': 'figureImageIndex',
        'tableList': 'tableIndex',
        'equationList': 'equationIndex',
        'audioList': 'audioIndex',
        'videoList': 'videoIndex',
        'interactiveList': 'interactiveIndex',
        'asideList': 'asideIndex',
        'workedExampleList': 'workedExampleIndex',
        'exhibitList': 'exhibitIndex'
    },
    autoNumber_FigureTypeKey_Mapper: {
        'image': 'IMAGE',
        'video': 'AUDIO',
        'audio': 'VIDEO',
        'interactive': 'INTERACTIVE',
        'tableasmarkup': 'TABLE',
        "authoredtext": 'AUTHOREDTEXT',
        'codelisting': 'CODELISTING',
    },
    popupElementsData: []
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
                imageList: [],
                tableList: [],
                equationList: [],
                audioList: {id: 1},
                videoList:[],
                interactiveList: [],
                asideList:[],
                workedExampleList:[],
                exhibitList: [],
            }
        };
        let mockData = {
            numberedElements : { 
                audioList: {id: 1}
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
                equationIndex: {},
                audioIndex: {id:2},
                videoIndex: {},
                interactiveIndex: {},
                workedExampleIndex:{},
                asideIndex:{},
                exhibitIndex: {}
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
                imageList: [],
                tableList: [],
                equationList: [],
                audioList:[],
                videoList:[5],
                interactiveList: [],
                asideList:[],
                workedExampleList:[],
                exhibitList:[]
            }, 
        };

        const data = {mediaType: 'videoList', mediaList: [5]}

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

    it('case 10- GET_SLATE_LIST_IN_CONTAINER', () => {
        let output = {
            ...initialState,
            tocContainerSlateList: {
                id: 12
            }
        };

        const mockData = {
            tocContainerSlateList: {
                id: 12
            }
        }

        let result = autoNumberReducer(initialState, {
            type: GET_SLATE_LIST_IN_CONTAINER,
            payload: mockData.tocContainerSlateList
        })
        expect(result).toEqual(output)
    });

    it('case 11- SET_POPUP_PARENT_CUT_COPY', () => {
        let output = {
            ...initialState,
            popupCutCopyParentData: {
                id: 12
            }
        };

        const mockData = {
            popupCutCopyParentData: {
                id: 12
            }
        }

        let result = autoNumberReducer(initialState, {
            type: SET_POPUP_PARENT_CUT_COPY,
            payload: mockData.popupCutCopyParentData
        })
        expect(result).toEqual(output)
    });
})