import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import ElementLearningObjectiveItem from '../../../src/component/ElementLearningObjectiveItem/ElementLearningObjectiveItem';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
let props={
    slateLockInfo:{
        isLocked:false
    }
}
    let wrapper = mount(<Provider store={store}><ElementLearningObjectiveItem  {...props}/> </Provider>)
    let elementLOItemInstance = wrapper.find('ElementLearningObjectiveItem').instance();

//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {
   
    it('render component', () => {
        expect(wrapper.find('ElementLearningObjectiveItem')).toHaveLength(1);
    })
    it('onClick', () => {
        elementLOItemInstance.onClick();
    })
    it('onBlur', () => {
        elementLOItemInstance.onBlur();
    })
    it('onKeyup', () => {
        elementLOItemInstance.onKeyup();
    })

    it('onFocus', () => {
        elementLOItemInstance.onFocus();
    })
});