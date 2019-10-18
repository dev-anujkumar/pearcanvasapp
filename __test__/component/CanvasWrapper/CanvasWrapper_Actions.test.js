import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
const middlewares = [thunk];
import wip from '../../component/ElementContainer/wipData'
import { spy, stub } from 'sinon';
import moxios from 'moxios';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
} from '../../../src/constants/Action_Constants';
import { slateData } from '../../../fixtures/slateTestingData'
const mockStore = configureMockStore(middlewares);
let initialState = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {}
};
describe('action file test', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            slateLevelData: {},
            // elementsTag: {},
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {}
        };

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing---Fetch comment action', () => {
        store = mockStore(() => initialState);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: FETCH_SLATE_DATA,
            payload: { slateData }

        }];
        let data = slateData
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: data
            });
        });
        console.log(store)
        return store.dispatch(selectActions.fetchSlateData(manifestURN)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(FETCH_SLATE_DATA);
        });
    })


    it('fetchSlateData', () => {
        const manifestURN = 'urn:9324dsfds23432dsf45'
        let store = mockStore();
        store.dispatch(selectActions.fetchSlateData(manifestURN));

    });
    it('fetchAuthUser', () => {
        let store = mockStore();
        store.dispatch(selectActions.fetchAuthUser());
    });
    it('setActiveElement for paragraph', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.paragraph, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-paragraph',
                'secondaryOption': 'secondary-paragraph',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'P'
            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with headers', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip["heading-1"], 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-heading',
                'secondaryOption': 'secondary-heading-1',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'H1'
            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with blockfeature', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.pullquote, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-pullquote',
                'elementId': 'urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ'
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with margilinia', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.marginalia, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-marginalia',
                'elementId': 'urn:pearson:work:3a87a270-5d35-4714-877e-9bca2eb25271',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ'
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('setActiveElement for paragraph with margilinia with attribution', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip["marginalia-attribution"], 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-marginalia-attribution',
                'elementId': 'urn:pearson:work:9c2d0567-c24d-44f5-8e8e-5b7d9859a26d',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ'
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });
    describe('action file test casses for figure', () => {


        it('setActiveElement test cases------------- figure', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.figure, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-width',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        it('setActiveElement test cases------------- figure image50Text', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-image50Text"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-half',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        it('setActiveElement test cases------------- figure imageWiderThanText', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-imageWiderThanText"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-wider',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        it('setActiveElement test cases------------- figure imageFullscreen', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-imageFullscreen"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-full',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        
        it('setActiveElement test cases------------- figure image25Text', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-image25Text"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-quarter',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })


    describe('action file test casses for table', () => {
        it('setActiveElement  with table', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.table, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-half',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with table imageTextWidthTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageTextWidthTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-width',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        it('setActiveElement  with table imageWiderThanTextTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageWiderThanTextTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-wider',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        it('setActiveElement  with table imageFullscreenTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageFullscreenTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-full',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    
    })
    
    describe('action file test casses for mathImage', () => {
        it('setActiveElement for   ------------------mathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.mathImage, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-half',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement for  -------------- mathImage imageTextWidthMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageTextWidthMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-width',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement for  -------------- mathImage imageWiderThanTextMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageWiderThanTextMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-wider',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement for  -------------- mathImage imageFullscreenMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageFullscreenMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-full',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })

    describe('action file test casses for eqation', () => {
        it('setActiveElement for eqation', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.equation, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-mathml-equation',
                    'secondaryOption': 'secondary-mathml-equation',
                    'elementId': 'urn:pearson:work:46a8d1a5-e664-4d6e-928a-a86e951d03bb',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'MML'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })

    describe('action file test casses for codelisting', () => {
        it('setActiveElement for with codelisting', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.codeEditor, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Default',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'BCE'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
/*         it('setActiveElement  with C++', () => {
            let store = mockStore();
            let element = {
                "figuretype" : "codelisting",
                "figuredata": {
                    "programlanguage": "C++",
                }
            }
            store.dispatch(selectActions.setActiveElement(element, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-C++',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'BCE'
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); */
    })
   


});