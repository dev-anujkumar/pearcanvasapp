import React from 'react';
import { mount } from 'enzyme';
import config from '../../../src/config/config';
import ElementMetaDataAnchor from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    metadataReducer: {
        currentSlateLOData: {
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        },
        currentSlateLF: 'cypressLF'
    }
});
let props = {
    slateLockInfo: {
        isLocked: false
    },
    permissions: ['lo_edit_metadata'],
    currentSlateLOData: {
        "lourn": "urn:5567809876",
        "label": { en: "test data" }
    },
    model: { text: "<p>Meatada</p>" },
    handleFocus: jest.fn(),
    showBlocker: jest.fn()
}

//Rendering component
/** Test cases for Cypress LO */
describe('Test Rendering of metadaanchor on slate', () => {
    let wrapper = mount(<Provider store={store}><ElementMetaDataAnchor  {...props} /> </Provider>)
    let elementMetaAnchorInstance = wrapper.find('ElementMetaDataAnchor').instance();
    
    it('render component', () => {
        expect(wrapper.find('ElementMetaDataAnchor')).toHaveLength(1);
    })
    it('on lo click', () => {
        let data =
        {
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        }
        let event = { target: { id: "aefeqrwq" }, stopPropagation: jest.fn() }
        elementMetaAnchorInstance.onLOClickHandle(props.currentSlateLOData, event)
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
    it('on call of prepareLOData',()=>{
        let loData={
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        };
        let div = document.createElement('div');
        div.setAttribute('class','learningObjectiveinnerText');
        document.body.appendChild(div);
        elementMetaAnchorInstance.prepareLOData(loData);
    })

});

/** Test cases for External LO */
describe('External LO -Test Rendering of metadaanchor on slate', () => {
    const newStore = mockStore({
        metadataReducer: {
            currentSlateLOData: [{
                "lourn": "urn:5567809876",
                "label": { en: "test data" }
            }],
            currentSlateLF: 'externalLF',
            projectLearningFrameworks: {
                externalLF: [{ urn: "external:urn" }]
            }
        }
    });
    let externalLOprops = {
        slateLockInfo: {
            isLocked: false
        },
        permissions: ['lo_edit_metadata'],
        currentSlateLOData: [{
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        }],
        model: { text: "<p>Meatada</p>" },
        handleFocus: jest.fn(),
        showBlocker: jest.fn(),
        element: { elementdata: { loref: "urn:5567809876" } }
    }
    let wrapper = mount(<Provider store={newStore}><ElementMetaDataAnchor  {...externalLOprops} /> </Provider>)
    let elementMetaAnchorInstance = wrapper.find('ElementMetaDataAnchor').instance();
    it('render component', () => {
        expect(wrapper.find('ElementMetaDataAnchor')).toHaveLength(1);
    })
    it('onLOClickHandle config.editorRefID == e.target.id', () => {
        config.editorRefID = "aefeqrwq"
        let data =
            [{
                "lourn": "urn:5567809876",
                "label": { en: "test data" }
            }]
        let event = { target: { id: "aefeqrwq" }, stopPropagation: jest.fn() }
        elementMetaAnchorInstance.onLOClickHandle(props.currentSlateLOData, event)
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
    it('onLOClickHandle ', () => {
        let data =
            [{
                "lourn": "urn:5567809876",
                "label": { en: "test data" }
            }]
        let event = { target: { id: "aefeqrwq" }, stopPropagation: jest.fn() }
        elementMetaAnchorInstance.onLOClickHandle(data, event)
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
    it('on call of prepareLOData', () => {
        let loData = {
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        };
        let div = document.createElement('div');
        div.setAttribute('class', 'learningObjectiveinnerText');
        document.body.appendChild(div);
        const spyFunction = jest.spyOn(elementMetaAnchorInstance, 'prepareLOData');
        elementMetaAnchorInstance.prepareLOData(loData);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it("externalLF list not present", () => {
        const newStore1 = mockStore({
            metadataReducer: {
                currentSlateLOData: [{
                    "lourn": "urn:5567809876",
                    "label": { en: "test data" }
                }],
                currentSlateLF: 'externalLF',
            }
        });
        let externalLOprops2 = {
            slateLockInfo: {
                isLocked: false
            },
            permissions: ['lo_edit_metadata'],
            model: { text: "<p>Meatada</p>" },
            handleFocus: jest.fn(),
            showBlocker: jest.fn(),
            element: { elementdata: { loref: "urn:5567809876" } }
        }
        let wrapper2 = mount(<Provider store={newStore1}><ElementMetaDataAnchor  {...externalLOprops2} /> </Provider>)
        let elementMetaAnchorInstance2 = wrapper2.find('ElementMetaDataAnchor').instance();
        expect(wrapper2.find('ElementMetaDataAnchor')).toHaveLength(1);
        let loData = {
            "loUrn": "urn:5567809876",
            "label": { en: "test data" }
        };
        let div = document.createElement('div');
        div.setAttribute('class', 'learningObjectiveinnerText');
        document.body.appendChild(div);
        const spyFunction = jest.spyOn(elementMetaAnchorInstance2, 'prepareLOData');
        elementMetaAnchorInstance2.prepareLOData(loData);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
});