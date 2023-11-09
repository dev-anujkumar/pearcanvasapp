import React from 'react';
import { shallow } from 'enzyme';
import SmallRoundedButton from '../../../src/component/ElementFigure/Small_RoundedButton';
 
describe('SmallRoundedButton', () => {
  it('should render button title correctly', () => {
    const wrapper = shallow(<SmallRoundedButton buttonTitle="Click me" />);
    expect(wrapper.find('.button_title'));
  });
 
  it('should render icon correctly', () => {
    const wrapper = shallow(<SmallRoundedButton icon="icon.png" />);
    expect(wrapper.find('.version-icon').prop('src')).toEqual('icon.png');
  });
 
  it('should apply custom class name correctly', () => {
    const wrapper = shallow(<SmallRoundedButton className="custom-class" />);
    expect(wrapper.find('.custom-class')).toHaveLength(1);
  });
});