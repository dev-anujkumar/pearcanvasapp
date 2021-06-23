import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElementAsideContainer from '../../../src/component/ElementAsideContainer/ElementAsideContainer';
import { elementAsideWorkExample, elementAside, element, section } from '../../../fixtures/elementAsideData';
import { threeMultiColumnContainer } from '../../../fixtures/multiColumnContainer';
import { swapElement} from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { Provider } from 'react-redux';
import config from '../../../src/config/config.js';
import tinyMCE from "tinymce"

config["elementStatus"] = {}
jest.mock('../../../src/component/ElementSaprator/ElementSaprator.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
});
jest.mock('../../../src/component/tinyMceEditor.js',()=>{
    return function () {
        return (<div>null</div>)
    }
})
config.asideToolbar = ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag']
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
    },
    tcmReducer:{
        tcmSnapshot:{}
    },
    elementStatusReducer: {
        "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip"       
    },
    searchReducer: {
        searchTerm: "",
        parentId: "",
        deeplink: true,
        scroll: false,
        scrollTop: 0
    },
    commentSearchReducer: {
        commentSearchTerm: "",
        parentId: "",
        scroll: false,
        scrollTop: 0
    },
    selectionReducer: {
        selection: {
            activeAnimation: true,
            deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
            element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
            inputSubType: "NA",
            inputType: "AUTHORED_TEXT",
            operationType: "copy",
            sourceElementIndex: 2,
            sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
            sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
        }
    }
};
jest.mock('../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
    return {
        getElementStatus: function () {
            return (<div>null</div>)
        }
    }
});
let store = mockStore(initialState);

describe('Testing ElementAside component with props', () => {
    let props = {
        element: elementAsideWorkExample,
        swapElement : swapElement,
        onUpdate : jest.fn(),
        onStart : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus : jest.fn(),
        swapElement : jest.fn(),
        deleteElement: jest.fn(),
        slateLockInfo:{isLocked:false,userId:'c5test01'},
        elementSepratorProps : jest.fn(),
        permissions: []
    }  

    const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} esProps={props.elementSepratorProps}/> </Provider>);
    const instance = wrapper.find('ElementAsideContainer').instance();

    describe('Testing ElementAside component', () => {

        it('should have element Aside', () => {
            expect(wrapper.find(".aside-container")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-horizotal-break")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-break-bottom")).toHaveLength(1)
        })

    })
    describe('Testing functions with props', () => {
        it('should render section function', () => {
            instance.renderContainer({ ...props })
            expect(wrapper.find(".container-aside")).toHaveLength(1)
        })
        it('should render  section function correctly', () => {
            let sectiondata = instance.section(section)
            expect(sectiondata.props.className).toEqual('section');
        })

        it('should render  sectionBreak function correctly', () => {
            let sectionBreak = instance.sectionBreak(section)
            expect((sectionBreak.props.className).trim()).toEqual('aside-section-break');
        })

        it('should render  renderElement function correctly', () => {
            let parentEntityUrn = "urn:pearson:entity:b4cbda8f-7a22-4df5-965a-18623a581ec1"
            instance.renderElement(element, parentEntityUrn)
            expect(instance.props.className).toEqual(undefined);
        })

        it('should render  renderAside  function correctly', () => {
            let designType = "asideSidebar01"
            let renderAside = instance.renderAside(designType)
            expect(renderAside.props.children[0].props.className).toEqual('asideSidebar01BorderTop');
        })
        it('should render  handle focus function correctly', () => {
            const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>);
            const instance = wrapper.find('ElementAsideContainer').instance();
            let el = document.createElement('div');
            el.classList.add("elemDiv-hr");
            let event = {
                target:el
            };
            wrapper.setProps ({
                slateLockInfo:{isLocked:true}
            })
            
            instance.handleFocus(event);
            expect(instance.props.slateLockInfo).toEqual(props.slateLockInfo);
        })

        it('should render  renderWorkExample  function correctly', () => {
            let designType = "workedexample2"
            let renderWorkExample = instance.renderWorkExample(designType)
            expect(renderWorkExample.props.children[0].props.className).toEqual('aside-horizotal-break aside-horizotal-break-green');
        })
    })
    describe('Testing functions with props', () => {
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar01"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar01BorderTop');
        })
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar02"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar02BorderTop');
        })
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar03"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar03BorderTop');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideTacticBox"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideTacticBoxBorderTop');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar04"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar04');
        })


        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar05"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.children[0].props.className).toEqual('asideSidebar05');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideActivity"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.children[0].props.className).toEqual('asideActivity');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideFeature"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideFeatureBorderTop');
        })

        it(' handleFocus function testing', () => {
            const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
            const instance = wrapper.find('ElementAsideContainer').instance();
            let el = document.createElement('div');
            el.classList.add("elemDiv-ha");
            let event = {
                target:el
            };
            instance.handleFocus(event);
            let el2 = document.createElement('div');
            el2.classList.add('aside-container');
            let event2 = {
                target:el
            };
            instance.handleFocus(event2);
            let booleanCheck = event.target === event2.target;
            expect(booleanCheck).toEqual(true);
        })

    
        it("onSectionDragUpdate test for section", () => {
            const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
            const instance = wrapper.find('ElementAsideContainer').instance();
            const spyOnSectionDragUpdate = jest.spyOn(instance, 'onSectionDragUpdate');

            let event = {
                oldDraggableIndex: 0,
                newDraggableIndex: 1
            }
            let containerBodyMatter = props.element.elementdata
            instance.onSectionDragUpdate(event, containerBodyMatter, 2, "section");
            expect(spyOnSectionDragUpdate).toHaveBeenCalled();
        })
        it("onSectionDragUpdate test for section-break", () => {
            const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
            const instance = wrapper.find('ElementAsideContainer').instance();
            const spyOnSectionDragUpdate = jest.spyOn(instance, 'onSectionDragUpdate');

            let event = {
                oldDraggableIndex: 0,
                newDraggableIndex: 1
            }
            let containerBodyMatter = props.element.elementdata
            instance.onSectionDragUpdate(event, containerBodyMatter, 2, "section-break");
            expect(spyOnSectionDragUpdate).toHaveBeenCalled();
        })
    })
})

describe('Testing ElementAside component with props', () => {
    let props = {
        element: elementAsideWorkExample,
        swapElement : swapElement,
        onUpdate : jest.fn(),
        onStart : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus : jest.fn(),
        swapElement : jest.fn(),
        deleteElement: jest.fn(),
        slateLockInfo:{isLocked:false,userId:'c5test01'}
    }  
    it('sortable testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props}/> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onStart function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        instance.props.options.onStart()
        instance.props.onChange();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it(' Sortable onUpdate function testing', () => {
        props.setActiveElement = jest.fn();
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        let evt = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }
        
        instance.props.options.onUpdate(evt);
        expect(instance.props.options.onUpdate).toHaveLength(1);
    })
    it('aside/WE inside 3c data testing for column 0', () => {
        let props = {
            element: elementAsideWorkExample,
            parentElement: threeMultiColumnContainer,
            index: "0-0-0"
        }  
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props}/> </Provider>)
    })
    it('aside/WE inside 3c data testing for column 1', () => {
        let props = {
            element: elementAsideWorkExample,
            parentElement: threeMultiColumnContainer,
            index: "0-1-0"
        }  
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props}/> </Provider>)
    })
    it('aside/WE inside 3c data testing for column 2', () => {
        let props = {
            element: elementAsideWorkExample,
            parentElement: threeMultiColumnContainer,
            index: "0-2-0"
        }  
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props}/> </Provider>)
    })
})