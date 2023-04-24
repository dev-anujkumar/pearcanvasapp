import React from 'react';
import { mount } from 'enzyme';
import config from '../../../src/config/config';
import ElementTCC from '../../../src/component/LtiSlate/ElementTCC';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const initialState = {
    appStore: {
        slateTitleUpdated:'<p>Slate Title</p>'
    }
}
const store = mockStore(initialState);
const elementTccInstance = (props) => {
    const component= mount(<Provider store={store}><ElementTCC {...props} /></Provider>)
    return component.find('ElementTCC').instance();
}


describe('1. LTI Slate test cases', () => {
    let props = {
        currentSlateAncestorData: {
            title:"Course Vocabulary 1"
        },
        element: {
            id: "urn:pearson:work:e86d43e6-db98-4a79-8fef-a8ce7fc1c012",
            type: "element-tcc",
            subtype: "edynamic",
            elementdata:{
                'secure_launch_url':'url'
            },
            "versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
            "contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
            schema:"http://schemas.pearson.com/wip-authoring/element/1"
        }
    };
    it('1.1 LTI Slate Component render successfully', () => {
        const component= mount(<Provider store={store}><ElementTCC {...props} /></Provider>)
        expect(component).toHaveLength(1);
        const compInstance = elementTccInstance(props);
        expect(compInstance).toBeDefined();
    });
    it('1.1 LTI Slate Component render successfully and handle url click', () => {
        const component= mount(<Provider store={store}><ElementTCC {...props} /></Provider>)
        expect(component).toHaveLength(1);
        component.find('.slate_lti_data_link').at(0).simulate('click')
    });
    it('1.1 LTI Slate Component render successfully and handle url click when no url provided', () => {
        let props = {
            currentSlateAncestorData: {
                title:"Course Vocabulary 1"
            },
            element: {
                id: "urn:pearson:work:e86d43e6-db98-4a79-8fef-a8ce7fc1c012",
                type: "element-tcc",
                subtype: "edynamic",
                elementdata:{
                },
                "versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
                "contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
                schema:"http://schemas.pearson.com/wip-authoring/element/1"
            }
        }
        const component= mount(<Provider store={store}><ElementTCC {...props} /></Provider>)
        expect(component).toHaveLength(1);
        component.find('.slate_lti_data_link').at(0).simulate('click')
    });
});
