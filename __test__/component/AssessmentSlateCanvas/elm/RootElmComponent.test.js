import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
import RootElmComponent from '../../../../src/component/AssessmentSlateCanvas/elm/RootElmComponent.jsx';
import {DefaultSaletData} from '../../../../fixtures/AssessmentSlateCanvasTestingData';
const mockStore = configureMockStore(middlewares);
let initialState = {
   elmReducer:{ 
        elmData:{
           numberOfResources: 88,
           contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
},
    errFlag:false,
    errorStatu:""
},
appStore : {
    pageNumberData:{},
    slateLevelData: DefaultSaletData
}};

describe('ELM root component test', () => {
    test('renders without crashing', () => {
        let store = mockStore(initialState);
        let props ={
            openedFrom: 'slateAssessment',
            usageTypeMetadata: 'Quiz',
            closeElmWindow: function(){},
            addPufFunction: function(){},
            elmResource: function(){},
       }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><RootElmComponent {...props}/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    test('hide PopUp', () => {
        let store = mockStore(() => initialState);
        let props ={
            openedFrom: 'slateAssessment',
            usageTypeMetadata: 'Quiz',
            closeElmWindow: function(){},
            addPufFunction: function(){},
        }
        const elmComponent = mount(<Provider store={store}><RootElmComponent {...props}/></Provider>);
        const elmComponentInstance = elmComponent.find('RootElmComponent').instance();
        elmComponentInstance.hidePufPopup();
        elmComponentInstance.setState({
            hidePopup: true,
          })
          elmComponentInstance.forceUpdate();
          elmComponent.update();
    });
    test('Navigate Back Function', () => {
        let store = mockStore(() => initialState);
        let props ={
            openedFrom: 'slateAssessment',
            usageTypeMetadata: 'Quiz',
            closeElmWindow: function(){},
            addPufFunction: function(){},

        }
        const elmComponent = mount(<Provider store={store}><RootElmComponent {...props}/></Provider>);
        const elmComponentInstance = elmComponent.find('RootElmComponent').instance();
        elmComponentInstance.navigateBack(2);
        elmComponentInstance.setState({
            previousTableLength: 2,
          })
          elmComponentInstance.forceUpdate();
          elmComponent.update();
    });
});