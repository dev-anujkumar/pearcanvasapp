import React from 'react';
import { mount } from 'enzyme';
import ErrorComp from '../../../../src/component/AssessmentSlateCanvas/learningTool/ErrorComp';

describe('Testing Learning Tool ErrorComp component', () => {
    it('Render ErrorComp', () => {
        let props = {
            errorMsg: "This is ErrorComp"
        };
        const component = mount(<ErrorComp {...props} />)
        expect(component).toHaveLength(1);
        expect(component.find('.ErrorComp')).toHaveLength(1)
    })

});