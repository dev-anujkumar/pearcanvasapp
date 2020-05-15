import React from 'react';
import { mount } from 'enzyme';
import ElementPoetry from '../../../src/component/ElementPoetry/ElementPoetry';
import { poetryElem } from '../../../fixtures/ElementPoetryTestData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    appStore: {
        pageNumberData: {},
        slateLevelData: {},
        permissions: [],
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            index: "1-0",
            tag: "H1",
            toolbar: ['bold']
        }
    },
    toolbarReducer: {
        elemBorderToggle: "true"
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        }
    },
    metadataReducer: {
        currentSlateLOData: {}
    },
    glossaryFootnoteReducer : {
        glossaryFootnoteValue : {"type":"","popUpStatus":false}
    },
    commentsPanelReducer:{
        allComments: []
    }
};
let store = mockStore(initialState);
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
});

describe('Testing ElementPoetry component', () => {
    let props = {
        hasOwnProperty: jest.fn(),
        deleteElement: jest.fn(),
        permissions : [],
        index: 1,
        model : {
            html : {
                title: '',
                text: '<p><span></span></p>'
            },
            contents: {
                'formatted-title': {
                    html : {
                        text: "<p>test title</p>"
                    }
                }
            }
        },
        element : {
            html : {
                title: '',
                text: '<p><span></span></p>'
            },
            contents: {
                'formatted-subtitle': {}
            }
        },
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    }
    const component = mount(<Provider store={store}><ElementPoetry {...props}/></Provider>);
    const instance = component.instance();
    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
    });
})

describe('Testing ElementAside component with props', () => {
    let props = {
        element: poetryElem,
        model: poetryElem,
        // swapElement : swapElement,
        onUpdate : jest.fn(),
        onStart : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus : jest.fn(),
        swapElement : jest.fn(),
        deleteElement: jest.fn(),
        slateLockInfo:{isLocked:false,userId:'c5test01'}
    }  
    it('sortable testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementPoetry {...props}/> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onStart function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementPoetry {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        instance.props.options.onStart()
        instance.props.onChange();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onUpdate function testing', () => {
        props.setActiveElement = jest.fn();
        const wrapper = mount(<Provider store={store}>< ElementPoetry {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        let evt = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }
        
        instance.props.options.onUpdate(evt);
        expect(instance.props.options.onUpdate).toHaveLength(1);
    })
})