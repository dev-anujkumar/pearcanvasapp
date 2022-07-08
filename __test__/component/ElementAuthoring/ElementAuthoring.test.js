import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import ElementAuthoring from '../../../src/component/ElementAuthoring/ElementAuthoring';
import KeyboardWrapper from '../../../src/component/Keyboard/KeyboardWrapper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    appStore:{
        slateLevelData:{},
        asideData:{},
        caretPosition:''
    },
    keyboardReducer: {
        selectedElement: []
    },
    alfrescoReducer: {
        Permission: [],
        editor:{},
        alfrescoAssetData:{},
        elementId:""
    },
    autoNumberReducer: {
        isAutoNumberingEnabled: false,
        autoNumberedElements: {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList:[],
            videosList:[]
        },
        autoNumberingDetails: {},
        autoNumberElementsIndex: {
            figureImageIndex: {},
            tableIndex: {},
            equationsIndex: {},
            audioIndex: {},
            videoIndex: {}
        },
        slateFigureList:[],
        autoNumberOption: ''
    },
    toolbarReducer: {
        spellCheckToggle:true
    }
})
describe('Testing Element  component with props', () => {
    let useSelectorStub;
    let useDispatchStub;
    let dispatchSpy; 
    beforeEach(() => {
        // Mock useSelector hook
        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.returns({ id: 1, text: 'Old Item' });
    
        // Mock useDispatch hook
        useDispatchStub = sinon.stub(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        dispatchSpy = sinon.spy();
        useDispatchStub.returns(dispatchSpy);
      });
      afterEach(() => {
        sinon.restore();
      });
    const div = document.createElement('div');
    let type = "element-authoredtext";
    let props= {
        "slateLockInfo": {
            "isLocked": false,
            "userId": ""
        },
    }
    const elementAuthoring = mount(<Provider store={store}><ElementAuthoring {...props} type={type} /></Provider>);
    let elementAuthoringInstance = elementAuthoring.find('ElementAuthoring').instance();
    it('render Element component ', () => {  
        ReactDOM.render(<Provider store={store}><ElementAuthoring {...props}/></Provider>, div);
    })
    it('render Element component when placeholder is given', () => {  
        let props2 = {
            ...props,
            placeholder: "Type Something..."
        }
        ReactDOM.render(<Provider store={store}><ElementAuthoring {...props2}/></Provider>, div);
    })


})