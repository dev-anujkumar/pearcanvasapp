import { shallow } from 'enzyme';
import ListElement from '../../../src/component/ListElement/ListElement';
import React from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../../../src/component/tinyMceEditor"
// IMPORT - Assets //

describe('ListElement', () => {
  it('renders correctly', () => {
    let props = {
        element: {
            subType: 'figure',
            elementdata:{
                startNumber: 10
            }
        }
    }
    const wrapper = shallow(<ListElement {...props} />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});