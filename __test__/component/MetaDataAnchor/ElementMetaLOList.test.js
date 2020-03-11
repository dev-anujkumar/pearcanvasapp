import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementMetaLOList from '../../../src/component/ElementMetaLOList/ElementMetaLOList';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

jest.mock('../../../src/config/config.js', () => ({
    editorRefID: ""
}))

const mockStore = configureMockStore(middlewares);
let store = mockStore({
    metadataReducer:{
        currentSlateLOData:[]
    }
});

let props={
    slateLockInfo:{
        isLocked:false,
        userId : 'c5test01'
    },
    element: {
        elementdata: {
            groupby: "module"
        }
    },
    currentSlateLOData: jest.fn(),
    handleFocus: jest.fn(),
    showBlocker: jest.fn()
}

let wrapper = mount(<Provider store={store}><ElementMetaLOList  model ={{}} {...props}/> </Provider>)
let elementMetaAnchorInstance = wrapper.find('ElementMetaLOList').instance();

jest.useFakeTimers();

//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {
   
    it('render component', () => {
        wrapper.find('#introslateLOL').simulate('click');
        expect(wrapper.find('ElementMetaLOList')).toHaveLength(1);
    })

    it('on lo click', () => {
        let data = [];
        let e = {
            target: {
                id: ""
            }
        }
        elementMetaAnchorInstance.onLOLClickHandle(data, e);
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })

    it('on lo click with not empty data', () => {
        let data = ["Test"];
        let e = {
            target: {
                id: ""
            }
        }

        store = mockStore({
            metadataReducer:{
                currentSlateLOData:["Test"]
            }
        });

        wrapper = mount(<Provider store={store}><ElementMetaLOList  model ={{}} {...props}/> </Provider>)
        elementMetaAnchorInstance = wrapper.find('ElementMetaLOList').instance();

        elementMetaAnchorInstance.onLOLClickHandle(data, e);
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
});