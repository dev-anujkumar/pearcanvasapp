import React from 'react';
import { shallow } from 'enzyme';
import BlockListWrapper from '../../../src/component/BlockListComponent/BlockListWrapper';

describe('Testing BlockListWrapper component', () => {
    let props={
        indexTemp: '1-0-1',
        element:{
            listdata:{
                bodymatter:{}
            }
        }
    }
    it('BlockListWrapper Component', () => {
        const wrapper = shallow(<BlockListWrapper {...props} />);   
    })
});