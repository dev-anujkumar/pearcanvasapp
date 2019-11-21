import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementMetaLOList from '../../../src/component/ElementMetaLOList/ElementMetaLOList';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    metadataReducer:{
        currentSlateLOData:""
    }
});
let props={
    slateLockInfo:{
        isLocked:false
    },
    currentSlateLOData:""
}
    //let wrapper = mount(<Provider store={store}><ElementMetaLOList  model ={{}} {...props}/> </Provider>)
    //let elementMetaAnchorInstance = wrapper.find('ElementMetaLOList').instance();

//Rendering component
xdescribe('Test Rendering of metadaanchor on slate', () => {
   
    it('render component', () => {
        expect(wrapper.find('ElementMetaLOList')).toHaveLength(1);
    })
    it('on lo click', () => {
        let data = "";
        elementMetaAnchorInstance.onLOLClickHandle(data);
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
  
   
    
});