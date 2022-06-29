import React from 'react';
import { shallow } from 'enzyme';
import RoundedButton from '../../../src/component/ElementFigure/Rounded_Button';


describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<RoundedButton onClick={mockCallBack}></RoundedButton>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});