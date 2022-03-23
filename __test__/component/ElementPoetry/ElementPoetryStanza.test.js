import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ElementPoetryStanza from '../../../src/component/ElementPoetry/ElementPoetryStanza';
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState={
    keyboardReducer: {
        selectedElement: [],
      },
}
describe('Testing ElementPoetryStanza component', () => {
    let store = mockStore(initialState);
    let props = {
        divClass : '',
        figureClass : '',
        figLabelClass:'',
        figTitleClass:'',
        dataType:'',
        figCaptionClass:'',
        figCreditClass: '',
        permissions : [],
        index: 1,
        model : {
            html : {
                title: '',
                text: '<p><span></span></p>'
            }
        },
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    }
    const component = mount(<Provider store={store}><ElementPoetryStanza {...props}/></Provider>);
    const instance = component.instance();
    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
    });
})