import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementSingleAssessment } from '../../../src/component/ElementSingleAssessment/ElementSingleAssessment';
import {  singleAssessmentCITEDefault} from '../../../fixtures/ElementSingleAssessmentTestData'
import config from '../../../src/config/config';
describe('Testing Element Single Assessment component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementSingleAssessment model={singleAssessmentCITEDefault} index="" />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    let props = {
        model: singleAssessmentCITEDefault,
        index:"1",
        usagetype:"Practice",
        handleFocus: function(){},
        onClick : ()=>{},
     
    };

    let singleAssessment = mount(<ElementSingleAssessment {...props}  />);
    const div = document.createElement('div');
    it('Render Single Assessment default ', () => {
            ReactDOM.render(<ElementSingleAssessment {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
    });

    it('onClick Event', () => {
        const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        singleAssessmentInstance.setState({
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: 'Quiz'
        });

        let usageType = {
            usageType: {
                getAttribute: function(dataValue) {
                    return 'Diagnostic';
                }
            }
        }
      
        singleAssessment.find('div.singleAssessment_Dropdown_Container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        singleAssessment.find('ul.singleAssessment_Dropdown_options>li:first-child').simulate('click');
        singleAssessment.find('div.pearson-component.image').simulate('click');
        singleAssessment.find('div.figureElement').simulate('click');
        singleAssessmentInstance.handleAssessmentTypeChange('Diagnostic');

            
    });
    
    it('onClick', () => {
        const singleAssessment = mount(<ElementSingleAssessment model={singleAssessmentCITEDefault} index="30" {...props}/>);
        let singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        singleAssessmentInstance.handleC2AssessmentClick("");
        singleAssessmentInstance.setState({
            assessmentId:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            assessmentItemId:"urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
        })
        singleAssessmentInstance.forceUpdate();
    }) 
    // it('Simulating alfresco click without alfresco location', () =>{
    //     const singleAssessment = mount( <ElementSingleAssessment {...props} /> )
    //     singleAssessment.find('ElementSingleAssessment').instance().handleC2AssessmentClick({target : {tagName : 'b'}}) 
    // })
    // it('Simulating alfresco click with alfresco location', () =>{
    //     const singleAssessment = mount( <ElementSingleAssessment {...props} /> )
    //     config.alfrescoMetaData = {nodeRef : {}}
    //     singleAssessment.find('ElementSingleAssessment').instance().handleC2AssessmentClick({target : {tagName : 'b'}}) 
    // })

});