import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElmTable from '../../../../src/component/AssessmentSlateCanvas/elm/Components/ElmTable';
import {DefaultSaletData,mockELMResponse} from '../../../../fixtures/AssessmentSlateCanvasTestingData';
// import {  } from '../../../../fixtures/AssessmentSlateCanvasTestingData';

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
describe('ELM Actions test', () => {
    it('renders without crashing', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:false,
            errorStatus:"404",
            apiData:{},
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
        }
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><ElmTable {...props}/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);

    });
    it('TEST- render table', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:true,
            errorStatus:"404",
            apiData:{},
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  function(){},
            closeElmWindow: function(){},
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.renderTableData = (param)=>{return}
        component.update();
    });
    it('TEST- sortinf functions', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:true,
            errorStatus:"404",
            apiData:{
                contents:[]
            },
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  function(){},
            closeElmWindow: function(){},
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        //elmTableInstance.renderTableData = ()=>{return;}
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            apiData :{},
            renderTableData : ()=>{return;}
        })

        elmTableInstance.forceUpdate();
        
        component.update();  
       elmTableInstance.dynamicSort("title");
       elmTableInstance.setSort();
    });
    it('TEST-Functions', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:true,
            errorStatus:"404",
            apiData:{
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  (obj)=>{},
            closeElmWindow: function(){},
            openedFrom :"slateAssessment"
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData :{}  ,
            renderTableData : ()=>{return;},
            addFlag:true,
            currentAssessmentSelected:{
                urn:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })
        let firstName="ELMTEST_StgEnv_Krajewski Test";
        elmTableInstance.forceUpdate();
        elmTableInstance.getFolderLabel('part'); 
        component.update();  
        elmTableInstance.sendPufAssessment();
        elmTableInstance.addAssessment(pufObj);
        elmTableInstance.filterData("urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab",mockELMResponse,"urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f");
        elmTableInstance.getResourcefromFilterData(mockELMResponse,"urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
        elmTableInstance.toggleActive(2);
        elmTableInstance.navigateBack();
        elmTableInstance.showNewValueList({},"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5" )
        elmTableInstance.filterSubData(mockELMResponse,"urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab","urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
    });
    it('TEST- switch case for getFolderLabel', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:true,
            errorStatus:"404",
            apiData:{
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  (obj)=>{},
            closeElmWindow: function(){},
            openedFrom :"slateAssessment"
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData :{}  ,
            renderTableData : ()=>{return;},
            addFlag:true,
            currentAssessmentSelected:{
                urn:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })
        let firstName="ELMTEST_StgEnv_Krajewski Test";
        elmTableInstance.forceUpdate();
        elmTableInstance.getFolderLabel('part'); 
        elmTableInstance.getFolderLabel('chapter'); 
        elmTableInstance.getFolderLabel('module'); 
        elmTableInstance.getFolderLabel('section'); 
        elmTableInstance.getFolderLabel('assessment'); 
        elmTableInstance.getFolderLabel('container-introduction'); 
        elmTableInstance.getFolderLabel('introductry-slate');
        elmTableInstance.getFolderLabel('introduction');
        component.update();  
        });
    it('TEST-filterSubData function', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:false,
            errorStatus:"404",
            apiData:{
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  (obj)=>{},
            closeElmWindow: function(){},
            openedFrom :"slateAssessment"
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        Window.testCookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData :{}  ,
            renderTableData : ()=>{return;},
            addFlag:true,
            currentAssessmentSelected:{
                urn:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })
        let firstName="ELMTEST_StgEnv_Krajewski Test";
        elmTableInstance.forceUpdate();
        component.update();  
        elmTableInstance.filterSubData(mockELMResponse,"urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef","urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29")
       
    });
});
