import React from 'react';
import LoadableComponent from '../src/component/LoadableComponent.jsx';

describe('testing tooltip component with case 1 props', () => {

    it('render tooltip component with class tooltipabove..', () => {
        const component = mount(<LoadableComponent />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
})