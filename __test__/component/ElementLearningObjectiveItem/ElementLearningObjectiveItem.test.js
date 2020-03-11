import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import ElementLearningObjectiveItem from '../../../src/component/ElementLearningObjectiveItem/ElementLearningObjectiveItem';
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
const store = mockStore({});
let props = {
    slateLockInfo: {
        isLocked: false
    }
}
let wrapper = mount(<Provider store={store}><ElementLearningObjectiveItem  {...props} /> </Provider>)

//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {

    it('render component', () => {
        expect(wrapper.find('ElementLearningObjectiveItem')).toHaveLength(1);
    })
});