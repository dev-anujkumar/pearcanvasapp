import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElmTable from '../../../../src/component/AssessmentSlateCanvas/elm/Components/ElmTable';
import {DefaultSlateData,mockELMResponse} from '../../../../fixtures/AssessmentSlateCanvasTestingData';


jest.mock('../../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
}))

const mockStore = configureMockStore(middlewares);

let initialState = {
    elmReducer:{ 
         elmData:{
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
             versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
 },
     errFlag:false,
     errorStatu:""
 },
 appStore : {
     pageNumberData:{},
     slateLevelData: DefaultSlateData
 }};

describe('ELM Actions test', () => {
    let store ={};
    beforeEach(() => {
        store = mockStore(initialState);
    })
    it('renders without crashing', () => {
        let props ={
            errFlag:false,
            errorStatus:"404",
            apiData:{},
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            }
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();

    });
    it('TEST- render table', () => {
        let store = mockStore(initialState);
        let props ={
            errFlag:true,
            errorStatus:"404",
            apiData:mockELMResponse,
            navigateBack: function(){},
            hidePufPopup:  function(){},
            usageTypeMetadata: 'Quiz',
            addPufFunction:  function(){},
            closeElmWindow: function(){},
        }

        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        expect(elmTableInstance).toBeDefined();
        const spy = jest.spyOn(elmTableInstance, 'renderTableData')
        elmTableInstance.renderTableData(props);
        elmTableInstance.forceUpdate()
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    });
    it('TEST- sorting functions', () => {
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
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            apiData :{},
            renderTableData : ()=>{return;}
        })
        const spy1 = jest.spyOn(elmTableInstance, 'dynamicSort')
        const spy2 = jest.spyOn(elmTableInstance, 'setSort')
        elmTableInstance.forceUpdate();
        component.update();  
        elmTableInstance.dynamicSort("title");
        elmTableInstance.setSort();
        expect(spy1).toHaveBeenCalled()
        spy1.mockClear()
        expect(spy2).toHaveBeenCalled()
        spy2.mockClear()
    });
    it('TEST- setSort function', () => {
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
        const component = mount(<Provider store={store}><ElmTable {...props}/></Provider>);   
        const elmTableInstance= component.find('ElmTable').instance();
        elmTableInstance.setState({
            parentUrn :"urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            apiData :{},
            renderTableData : ()=>{return;},
            sortFlag: false
        })
        const spy1 = jest.spyOn(elmTableInstance, 'dynamicSort')
        const spy2 = jest.spyOn(elmTableInstance, 'setSort')
        elmTableInstance.forceUpdate();
        component.update();  
        elmTableInstance.dynamicSort("title");
        elmTableInstance.setSort();
        expect(spy1).toHaveBeenCalled()
        spy1.mockClear()
        expect(spy2).toHaveBeenCalled()
        spy2.mockClear()
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

        elmTableInstance.getFolderLabel('part'); 
        const spygetFolderLabel = jest.spyOn(elmTableInstance, 'getFolderLabel')
        elmTableInstance.forceUpdate();
        component.update();
        elmTableInstance.getFolderLabel('part'); 
        expect(spygetFolderLabel).toHaveBeenCalledWith('part')     
        elmTableInstance.getFolderLabel('chapter'); 
        expect(spygetFolderLabel).toHaveBeenCalledWith('chapter')  
        elmTableInstance.getFolderLabel('module'); 
        expect(spygetFolderLabel).toHaveBeenCalledWith('module')  
        elmTableInstance.getFolderLabel('section'); 
        expect(spygetFolderLabel).toHaveBeenCalledWith('section')  
        elmTableInstance.getFolderLabel('assessment'); 
        expect(spygetFolderLabel).toHaveBeenCalledWith('assessment')  
        elmTableInstance.getFolderLabel('container-introduction');
        expect(spygetFolderLabel).toHaveBeenCalledWith('container-introduction')   
        elmTableInstance.getFolderLabel('introductry-slate');
        expect(spygetFolderLabel).toHaveBeenCalledWith('introductry-slate')  
        elmTableInstance.getFolderLabel('introduction');
        expect(spygetFolderLabel).toHaveBeenCalledWith('introduction')  
        component.update();  
        spygetFolderLabel.mockClear()
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
        const spyfilterSubData = jest.spyOn(elmTableInstance, 'filterSubData')
        elmTableInstance.forceUpdate();
        component.update();  
        elmTableInstance.filterSubData(mockELMResponse,"urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef","urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29")
        expect(spyfilterSubData).toHaveBeenCalled()
        expect(spyfilterSubData).toHaveBeenCalledWith(mockELMResponse,"urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef","urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29")
        spyfilterSubData.mockClear()
    });
    describe('TEST-Functions',()=>{
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
        it('TEST-getFolderLabel',()=>{
            const spygetFolderLabel = jest.spyOn(elmTableInstance, 'getFolderLabel')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.getFolderLabel('part');
            expect(spygetFolderLabel).toHaveBeenCalled()
            spygetFolderLabel.mockClear() 
        })
        it('TEST-sendPufAssessment',()=>{
            const spysendPufAssessment = jest.spyOn(elmTableInstance, 'sendPufAssessment')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.sendPufAssessment();
            expect(spysendPufAssessment).toHaveBeenCalled()
            spysendPufAssessment.mockClear() 
        })
        it('TEST-addAssessment',()=>{
            const spyaddAssessment = jest.spyOn(elmTableInstance, 'addAssessment')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.addAssessment(pufObj);
            expect(spyaddAssessment).toHaveBeenCalled()
            spyaddAssessment.mockClear() 
        })
        it('TEST-filterData case-1',()=>{
            const spyfilterData = jest.spyOn(elmTableInstance, 'filterData')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.filterData("urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab",mockELMResponse,"urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f");
            expect(spyfilterData).toHaveBeenCalled()
            spyfilterData.mockClear() 
        })
        it('TEST-filterData case 2',()=>{
            const spyfilterData = jest.spyOn(elmTableInstance, 'filterData')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.filterData("urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab",mockELMResponse,"urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab");
            expect(spyfilterData).toHaveBeenCalled()
            spyfilterData.mockClear() 
        })
        it('TEST-getResourcefromFilterData',()=>{
            const spygetResourcefromFilterData = jest.spyOn(elmTableInstance, 'getResourcefromFilterData')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.getResourcefromFilterData(mockELMResponse,"urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
            expect(spygetResourcefromFilterData).toHaveBeenCalled()
            spygetResourcefromFilterData.mockClear() 
        })
        it('TEST-toggleActive',()=>{
            const spytoggleActive = jest.spyOn(elmTableInstance, 'toggleActive')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.toggleActive(2);
            expect(spytoggleActive).toHaveBeenCalled()
            spytoggleActive.mockClear() 
        })
        it('TEST-navigateBack',()=>{
            const spynavigateBack = jest.spyOn(elmTableInstance, 'navigateBack')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.navigateBack();
            expect(spynavigateBack).toHaveBeenCalled()
            spynavigateBack.mockClear()
        })
        it('TEST-showNewValueList',()=>{
            const spyshowNewValueList = jest.spyOn(elmTableInstance, 'showNewValueList')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.showNewValueList({},"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5" )
            expect(spyshowNewValueList).toHaveBeenCalled()
            spyshowNewValueList.mockClear() 
        })
        it('TEST-filterSubData',()=>{
            const spyfilterSubData = jest.spyOn(elmTableInstance, 'filterSubData')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.filterSubData(mockELMResponse,"urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab","urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
            expect(spyfilterSubData).toHaveBeenCalled()
            spyfilterSubData.mockClear() 
        })
        it('TEST-componentWillUnmount',()=>{
            const spycomponentWillUnmount = jest.spyOn(elmTableInstance, 'componentWillUnmount')
            elmTableInstance.forceUpdate();
            component.update();  
            elmTableInstance.componentWillUnmount()
            expect(spycomponentWillUnmount.mock.calls.length).toBe(1)
        })
    })
});
