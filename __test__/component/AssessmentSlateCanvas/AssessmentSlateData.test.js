import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import { AssessmentSlateData } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateData';
import { assessmentSlateDefault, assessmentSlateWithData, DefaultSlateData } from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);

let initialState = {
    elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
        },
        errFlag: false,
        errorStatus: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: DefaultSlateData
    }
};
const mockGetDiscipline= jest.mock('../../../src/component/AssessmentSlateCanvas/learningTool/learningToolActions', () => {
    return {
        getDiscipline: function () {
            return {
                type: 'GET_DISCIPLINE', 
                payload: {
                  showDisFilterValues: true,
                  apiResponseForDis: {}
                }

        }
    }
}
})
const mockOpenLTFunction = jest.mock('../../../src/component/AssessmentSlateCanvas/learningTool/openLTFunction', () => {
    return {
        openLTFunction: function (mockGetDiscipline) {
           return  (<div>null</div>)
        }
    }
}
)
describe('Testing Assessment Slate Data component', () => {
    const assessmentSlate = mount(<AssessmentSlateData />)
    let assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
    it('render Assessment Slate Data component without crashing ', () => {
        const assessmentSlate = mount(<AssessmentSlateData model={assessmentSlateDefault}/>)
        expect(assessmentSlate).toHaveLength(1);
        let assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
        expect(assessmentSlateDataInstance).toBeDefined();
    })
    it('onClick Assessment Type Event', () => {
        assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: 'Select'
        });
        assessmentSlate.find('div.slate_assessment_type_dropdown.activeDropdown').simulate('click');
        assessmentSlate.find('ul.slate_assessment_type_dropdown_options>li:first-child').simulate('click');
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('Full Assessment CITE');
    });
    it('onClick UsageType Event', () => {
        let props = {
            getAssessmentDataPopup: false,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,

        }
        const component = mount(<AssessmentSlateData {...props} />);
        const assessmentSlateDataInstance = component.instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment CITE",
            activeAssessmentUsageType: 'Quiz'
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        component.find('div.slate_assessment_metadata_container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        component.find('ul.slate_assessment_metadata_type_dropdown_options>li:first-child').simulate('click');
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('Full Assessment CITE');
        expect(assessmentSlateDataInstance.state.activeAssessmentUsageType).toBe('Quiz');

    });
    it('Test-Render succcessfully addedd screen', () => {
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: 'Full Assessment PUF',
            showElmComponent: true,
        });
        assessmentSlateDataInstance.forceUpdate();
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('Full Assessment PUF');
        expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
    });
    it('Test-Active assessment type handling', () => {
        let props = {
            getAssessmentData: true,
            getAssessmentDataPopup: false,
        }
        const component = mount(<AssessmentSlateData {...props} />);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Learning App Type"
        });
        assessmentSlateDataInstance.forceUpdate();
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Learning App Type");
    });
    describe('Test-change assessment',()=>{
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: false,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn,
            showBlocker: jest.fn(),
            openLtAction: jest.fn(),
            getDiscipline:jest.fn(), 
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        it('Change Assessment-CITE',()=>{
            const spychangeAssessment = jest.spyOn(assessmentSlateDataInstance, 'changeAssessment')
            const spyaddC2MediaAssessment = jest.spyOn(assessmentSlateDataInstance, 'addC2MediaAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Full Assessment CITE"
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.changeAssessment();
            assessmentSlateDataInstance.addC2MediaAssessment('Full Assessment CITE');
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Full Assessment CITE");
            expect(spychangeAssessment).toHaveBeenCalled();
            spychangeAssessment.mockClear(); 
            expect(spyaddC2MediaAssessment).toHaveBeenCalled();
            spyaddC2MediaAssessment.mockClear(); 
        })
        it('Change Assessment-PUF',()=>{
            const spychangeAssessment = jest.spyOn(assessmentSlateDataInstance, 'changeAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Full Assessment PUF",
                showElmComponent: true,
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.changeAssessment();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Full Assessment PUF");
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spychangeAssessment).toHaveBeenCalled();
            spychangeAssessment.mockClear(); 
        })
        it('Change Assessment-Learnosity',()=>{
            const spychangeAssessment = jest.spyOn(assessmentSlateDataInstance, 'changeAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Learnosity",
                showElmComponent: true,
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.changeAssessment();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Learnosity");
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spychangeAssessment).toHaveBeenCalled();
            spychangeAssessment.mockClear(); 
        })
        xit('Change Assessment-Learning App Type',()=>{
            const spychangeAssessment = jest.spyOn(assessmentSlateDataInstance, 'changeAssessment')
            const changeLearningApp = jest.fn();
            assessmentSlateDataInstance.setState({
                activeAssessmentType: 'learningtemplate'
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.changeAssessment();
            assessmentSlateDataInstance.changeLearningApp();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('learningtemplate');
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spychangeAssessment).toHaveBeenCalled();
            spychangeAssessment.mockClear(); 
        })
    })
    describe('Test-main assessment',()=>{
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        it('main Assessment-CITE',()=>{
            const spymainAddAssessment = jest.spyOn(assessmentSlateDataInstance, 'mainAddAssessment')
            const spyaddC2MediaAssessment = jest.spyOn(assessmentSlateDataInstance, 'addC2MediaAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Full Assessment CITE"
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.mainAddAssessment();
            assessmentSlateDataInstance.addC2MediaAssessment('Full Assessment CITE');
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Full Assessment CITE");
            expect(spymainAddAssessment).toHaveBeenCalled();
            spymainAddAssessment.mockClear(); 
            expect(spyaddC2MediaAssessment).toHaveBeenCalled();
            spyaddC2MediaAssessment.mockClear(); 
        })
        it('main Assessment-PUF',()=>{
            const spymainAddAssessment = jest.spyOn(assessmentSlateDataInstance, 'mainAddAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Full Assessment PUF",
                showElmComponent: true,
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.mainAddAssessment();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Full Assessment PUF");
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spymainAddAssessment).toHaveBeenCalled();
            spymainAddAssessment.mockClear(); 
        })
        it('main Assessment-Learnosity',()=>{
            const spymainAddAssessment = jest.spyOn(assessmentSlateDataInstance, 'mainAddAssessment')
            assessmentSlateDataInstance.setState({
                activeAssessmentType: "Learnosity",
                showElmComponent: true,
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.mainAddAssessment();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe("Learnosity");
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spymainAddAssessment).toHaveBeenCalled();
            spymainAddAssessment.mockClear(); 
        })
        xit('main Assessment-Learning App Type',()=>{
            const spymainAddAssessment = jest.spyOn(assessmentSlateDataInstance, 'mainAddAssessment')
            const changeLearningApp = jest.fn();
            assessmentSlateDataInstance.setState({
                activeAssessmentType: 'learningtemplate'
            });
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            assessmentSlateDataInstance.mainAddAssessment();
            assessmentSlateDataInstance.changeLearningApp();
            assessmentSlateDataInstance.forceUpdate();
            component.update();
            expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('learningtemplate');
            expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
            expect(spymainAddAssessment).toHaveBeenCalled();
            spymainAddAssessment.mockClear(); 
        })
    })
    it('Test-close elm window', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn,
            showBlocker:jest.fn()
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        const spycloseElmWindow = jest.spyOn(assessmentSlateDataInstance, 'closeElmWindow')
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment PUF",
            showElmComponent: true
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('Full Assessment PUF');
        expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
        assessmentSlateDataInstance.closeElmWindow();
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        expect(spycloseElmWindow).toHaveBeenCalled();
        spycloseElmWindow.mockClear(); 
    });
    it('Test-add puf assessment', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn,
            addPufAssessment:  function (pufObj) { }
        }      
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        const spyaddPufAssessment = jest.spyOn(assessmentSlateDataInstance, 'addPufAssessment')
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment PUF",
            showElmComponent: true
        });
        assessmentSlateDataInstance.addPufAssessment (pufObj);
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        expect(assessmentSlateDataInstance.state.activeAssessmentType).toBe('Full Assessment PUF');
        expect(assessmentSlateDataInstance.state.showElmComponent).toBe(true);
        expect(spyaddPufAssessment).toHaveBeenCalledWith(pufObj);
        spyaddPufAssessment.mockClear(); 
    });
    it('Test-closePopUp  function', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            getAssessmentData: true,
       }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        const spyclosePopUp = jest.spyOn(assessmentSlateDataInstance, 'closePopUp')
        assessmentSlateDataInstance.setState({
            changeLearningData: false
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        assessmentSlateDataInstance.closePopUp();        
        expect(assessmentSlateDataInstance.state.changeLearningData).toBe(false);
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        expect(spyclosePopUp).toHaveBeenCalled();
        spyclosePopUp.mockClear(); 
    });
    xit('Test-changeLearningApp  function', done  => {
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            getAssessmentData: true,
            openLtAction: jest.fn(),
            getDiscipline:jest.fn(), 
       }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        const spychangeLearningApp = jest.spyOn(assessmentSlateDataInstance, 'changeLearningApp')
        assessmentSlateDataInstance.setState({
            dropdownValue: 'Learning App Type',
            changeLearningData: true
        });       
        // assessmentSlateDataInstance.forceUpdate();
        // component.update();
        assessmentSlateDataInstance.changeLearningApp();
        assessmentSlateDataInstance.forceUpdate();
        // assessmentSlateDataInstance.mockOpenLTFunction(mockGetDiscipline);
        
        component.update();
        expect(assessmentSlateDataInstance.state.changeLearningData).toBe(true);
        expect(assessmentSlateDataInstance.state.dropdownValue).toBe('Learning App Type');
        expect(spychangeLearningApp).toHaveBeenCalled();
        done()
   
        spychangeLearningApp.mockClear(); 
    });
})