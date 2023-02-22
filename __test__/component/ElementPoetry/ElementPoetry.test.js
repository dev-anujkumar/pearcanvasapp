import React from 'react';
import { mount } from 'enzyme';
import { poetryElem } from '../../../fixtures/ElementPoetryTestData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ElementPoetryStanza from '../../../src/component/ElementPoetry/ElementPoetryStanza';
import ElementPoetry from '../../../src/component/ElementPoetry';
import ElementContainerHOC from '../../../src/component/HOCs/ElementContainerHOC';

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
    keyboardReducer: {
        selectedElement: []
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

describe('Testing ElementPoetry', () => {
    let props = {
        element: poetryElem,
        model: poetryElem,
        onUpdate : jest.fn(),
        onStart : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus : jest.fn(),
        swapElement : jest.fn(),
        deleteElement: jest.fn(),
        slateLockInfo:{isLocked:false,userId:'c5test01'},
        index: "0-0-0"
    }  
    it('renderStanzaContainer', () => {
        const component = mount(<Provider store={store}><ElementPoetry {...props}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : index length != 3', () => {
        let props2 = {
            ...props,
            index: "0-0"
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : with groupeddata', () => {
        let props2 = {
            ...props,
            parentElement: {
                groupeddata: {
                    bodymatter: ["test"]
                }
            },        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : without groupeddata', () => {
        let props2 = {
            ...props,
            parentElement: {}
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : type === "element-aside"', () => {
        let props2 = {
            ...props,
            parentElement: {
                type: "element-aside"
            }
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : type === ElementConstants.MULTI_COLUMN', () => {
        let props2 = {
            ...props,
            parentElement: {
                type: "groupedcontent"
            }
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : type === showhide', () => {
        let props2 = {
            ...props,
            parentElement: {
                type: "showhide"
            }
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderStanzas : type === ElementConstants.MULTI_COLUMN & subtype = tab', () => {
        let props2 = {
            ...props,
            parentElement: {
                type: "groupedcontent",
                subtype: "tab"
            }
        }
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('renderBlankContainer', () => {
        let props2 = {
            ...props,
            model: {
                "contents": {
                    "bodymatter": []
                }
            }
        }  
        const component = mount(<Provider store={store}><ElementPoetry {...props2}/> </Provider>)
        component.find('ElementPoetry')
    })
    it('sortable testing', () => {
        const wrapper = mount(<Provider store={store}><ElementPoetry {...props}/> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onStart function testing', () => {
        const wrapper = mount(<Provider store={store}><ElementPoetry {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        instance.props.options.onStart()
        instance.props.onChange();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onUpdate function testing', () => {
        props.setActiveElement = jest.fn();
        const wrapper = mount(<Provider store={store}><ElementPoetry {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        let evt = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }
        document.querySelector = () => {
            return {
                className: "show-hide-active",
                classList: {
                    remove: jest.fn()
                }
            }
        }
        instance.props.options.onUpdate(evt);
    })
})