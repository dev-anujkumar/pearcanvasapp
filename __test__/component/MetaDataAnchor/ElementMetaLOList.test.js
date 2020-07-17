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
    showBlocker: jest.fn(),
    reRenderLO: jest.fn()
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
            },
            stopPropagation:()=>{}
        }
        elementMetaAnchorInstance.onLOLClickHandle(data, e);
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })

    it('on lo click with not empty data', () => {
        let data = ["Test"];
        let e = {
            target: {
                id: ""
            },
            stopPropagation:()=>{}
        }

        store = mockStore({
            metadataReducer:{
                currentSlateLOData:["Test"],
                isRenderMetdataLO: true
            },
            
        });

        wrapper = mount(<Provider store={store}><ElementMetaLOList  model ={{}} {...props}/> </Provider>)
        elementMetaAnchorInstance = wrapper.find('ElementMetaLOList').instance();

        elementMetaAnchorInstance.onLOLClickHandle(data, e);
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
    it('componentDidUpdate', () => {
        const spyFunction = jest.spyOn(elementMetaAnchorInstance, 'componentDidUpdate')
        wrapper.setProps({ ...props, isRenderMetdataLO: true })
        wrapper.update()
        elementMetaAnchorInstance.componentDidUpdate({ isRenderMetdataLO: false })
        expect(elementMetaAnchorInstance.props.isRenderMetdataLO).toEqual(true)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('renderCurrentModule', () => {
        let newProps={
            slateLockInfo:{
                isLocked:false,
                userId : 'c5test01'
            },
            element: {
                elementdata: {
                    groupby: ""
                }
            },
            currentSlateLOData: jest.fn(),
            handleFocus: jest.fn(),
            showBlocker: jest.fn(),
            reRenderLO: jest.fn()
        }
        wrapper = mount(<Provider store={store}><ElementMetaLOList  model ={{}} {...newProps}/> </Provider>)
        elementMetaAnchorInstance = wrapper.find('ElementMetaLOList').instance();
        const spyFunction = jest.spyOn(elementMetaAnchorInstance, 'renderCurrentModule')
        elementMetaAnchorInstance.renderCurrentModule()
        expect(spyFunction).toHaveBeenCalled()
    })
});