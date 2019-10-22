import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ElmHeader from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmHeader';

describe('Testing ELM Header component', () => {
    let props={
        elmHeaderProps : 'Title',
        closeElmWindow : function(){}
    }
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElmHeader {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
});