import React from 'react';
import { mount } from 'enzyme';
import ElementPoetryStanza from '../../../src/component/ElementPoetry/ElementPoetryStanza';
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
});
describe('Testing ElementPoetryStanza component', () => {
    let props = {
        divClass : '',
        figureClass : '',
        figLabelClass:'',
        figTitleClass:'',
        dataType:'',
        figCaptionClass:'',
        figCreditClass: '',
        permissions : [],
        index: 1,
        model : {
            html : {
                title: '',
                text: '<p><span></span></p>'
            }
        },
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    }
    const component = mount(<ElementPoetryStanza {...props}/>);
    const instance = component.instance();
    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
    });
})