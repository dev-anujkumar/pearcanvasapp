import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../src/component/Sidebar';

describe('Test for Sidebar component', () => {
    let props = {
        elementType: 'element-authoredtext'
    };

    let sidebar = mount(<Sidebar {...props} />);
    it('Render element container ', () => {
        expect(sidebar).toMatchSnapshot();
    });

    it('onClick Event', () => {
        const sidebarInstance = sidebar.find('Sidebar').instance();
        sidebarInstance.setState({
            elementDropdown: 'primary',
            activeElementType: 'element-authoredtext',
            activePrimaryOption: 'primary-paragraph',
            activeSecondaryOption: 'secondary-paragraph',
            activeLabelText: 'P'
        });

        let target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'primary-heading';
                }
            }
        }

        sidebar.find('div.element-dropdown .element-dropdown-title').simulate('click');
        sidebar.find('div.element-dropdown ul.element-dropdown-content').simulate('click');
        sidebarInstance.handlePrimaryOptionChange(target);

        sidebarInstance.setState({
            elementDropdown: 'secondary'
        });

        target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'secondary-heading-1';
                }
            }
        }

        sidebarInstance.handleSecondaryOptionChange(target);

        // Attribution for secondary element type
        sidebarInstance.setState({
            activePrimaryOption: 'primary-blockquote',
            activeSecondaryOption: 'secondary-marginalia-attribution'
        });

        sidebarInstance.attributions();

        // Attribution for primary element type
        sidebarInstance.setState({
            activeElementType: 'figure',
            activePrimaryOption: 'primary-image-figure',
            activeSecondaryOption: 'secondary-image-figure-quarter'
        });

        sidebarInstance.attributions();
    });
});